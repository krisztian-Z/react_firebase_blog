import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogSection from "./BlogSection";
import { db } from "../firebase";

const TagBlog = () => {
  const [tagBlogs, setTagBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tag } = useParams();

  const getTagBlogs = useCallback(async () => {
    setLoading(true);
    const blogRef = collection(db, "solent-students-blogs");
    const tagBlogQuery = query(blogRef, where("tags", "array-contains", tag));

    try {
      const docSnapshot = await getDocs(tagBlogQuery);
      let tagBlogsArray = [];

      docSnapshot.forEach((doc) => {
        tagBlogsArray.push({ id: doc.id, ...doc.data() });
      });

      setTagBlogs(tagBlogsArray);
    } catch (error) {
      console.error("Error fetching tag blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [tag]);

  useEffect(() => {
    getTagBlogs();
  }, [getTagBlogs]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-start py-2 mb-4">
            Tag: <strong>{tag.toLocaleUpperCase()}</strong>
          </div>
          {tagBlogs?.map((item) => (
            <div className="col-md-6" key={item.id}>
              <BlogSection {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagBlog;
