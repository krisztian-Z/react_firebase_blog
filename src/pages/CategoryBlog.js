import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { collection, getDocs, query, where } from "firebase/firestore";
import BlogSection from "../components/BlogSection";
import { db } from "../firebase";

const CategoryBlog = () => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  const getCategoryBlogs = useCallback(async () => {
    setLoading(true);
    const blogRef = collection(db, "solent-students-blogs");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));

    try {
      const docSnapshot = await getDocs(categoryBlogQuery);
      let categoryBlogs = [];

      docSnapshot.forEach((doc) => {
        categoryBlogs.push({ id: doc.id, ...doc.data() });
      });

      setCategoryBlogs(categoryBlogs);
    } catch (error) {
      console.error("Error fetching category blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    getCategoryBlogs();
  }, [getCategoryBlogs]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-start py-2 mb-4">
            Category: <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {categoryBlogs?.map((item) => (
            <div className="col-md-6" key={item.id}>
              <BlogSection {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
