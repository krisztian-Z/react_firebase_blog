import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
  limit,
  Timestamp,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import Popular from "../components/Popular";
import RelatedBlogs from "../components/RelatedBlog";
import { isEmpty } from "lodash";
import UserComments from "../components/UserComments";
import CommentBox from "../components/CommentBox";
import LikeButton from "../components/LikeButton";
import Spinner from "../components/Spinner";
import './Detail.css';


const Detail = ({ setActive, user }) => {
  const userId = user?.uid;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  let [likes, setLikes] = useState([]);
  const [userComment, setUserComment] = useState("");

  const getBlogDetail = useCallback(async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "solent-students-blogs", id);
      const blogDetail = await getDoc(docRef);
      setBlog(blogDetail.data());

      if (blogDetail.data()) {
        const tags = blogDetail.data().tags;
        setTags(tags);

        const relatedBlogsQuery = query(
          collection(db, "solent-students-blogs"),
          where("tags", "array-contains-any", tags),
          limit(2)
        );

        setComments(
          blogDetail.data().comments ? blogDetail.data().comments : []
        );
        setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);

        const relatedBlogSnapshot = await getDocs(relatedBlogsQuery);
        const relatedBlogsData = relatedBlogSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRelatedBlogs(relatedBlogsData);
        setActive(null);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching blog detail:", error);
    }
  }, [id, setActive]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id, getBlogDetail]);

  if (loading) {
    return <Spinner />;
  }

  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Your comment has been posted successfully!");
    await updateDoc(doc(db, "solent-students-blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };
 const handleLike = async () => {
  if (userId) {
    if (blog?.likes) {
      const index = likes.findIndex((id) => id === userId);
      if (index === -1) {
        likes.push(userId);
        setLikes([...new Set(likes)]);
      } else {
        likes = likes.filter((id) => id !== userId);
        setLikes(likes);
      }
    }
    await updateDoc(doc(db, "solent-students-blogs", id), {
      ...blog,
      likes,
      timestamp: serverTimestamp(),
    });
  }
};

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp?.toDate().toDateString()}
                <LikeButton
                  handleLike={handleLike}
                  likes={likes}
                  userId={userId}
                />
              </span>
              <p className="text-start">{blog?.description}</p>
              <div className="text-start">
                <Tags tags={blog?.tags} />
              </div>
              <br />
              <div className="custombox">
                <div className="scroll">
                <h4 className="small-title">{comments?.length} Comments</h4>
                {isEmpty(comments) ? (
                  <UserComments
                    msg={"No comments yet for this blog. Feel free to comment."}
                  />
                ) : (
                  <>
                    {comments.map((comment) => (
                      <UserComments {...comment} />
                    ))}
                  </>
                )}
                </div>
              </div>
              <CommentBox
                userId={userId}
                userComment={userComment}
                setUserComment={setUserComment}
                handleComment={handleComment}
              />
            </div>
            <div className="col-md-3">
              <div className="blog-heading text-start py-2 mb-4">Tags</div>
              <Tags tags={tags} />
              <Popular blogs={relatedBlogs} />
            </div>
          </div>
          <RelatedBlogs id={id} blogs={relatedBlogs} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
