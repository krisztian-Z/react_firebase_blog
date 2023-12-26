import React, { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc, doc, query, where, getDocs } from "firebase/firestore"; // Adaugă `getDocs` aici
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Tags from "../components/Tags";
import Popular from "../components/Popular"; 
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Trending from "../components/Trending";


const Home = ({setActive, user}) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTAgs] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "solent-students-blogs"); // Corectează aici
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };
  

  
  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "solent-students-blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        // for tags unicity
        const uniqueTags = [...new Set(tags)];
        setTAgs(uniqueTags);

        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );
  
    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, [setActive]); 
  

  if(loading) {
    return <Spinner />
  }

  const handleDelete = async (id) => {
    if (window.confirm ("Are you sure you want to delete the blog you just selected?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db ,"solent-students-blogs", id));
        toast.info("Your blog has been successfully deleted!")
        setLoading(false);
      }catch(err) {
        console.log(err);
      }
    }
  }
  console.log("blogs", blogs);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending  blogs={trendBlogs}/>
          <div className="col-md-8">
            <BlogSection blogs={blogs} user={user} handleDelete={handleDelete}/>
          </div>
          <div className="col-md-3">
            <Tags tags={tags} />
            <Popular  blogs={blogs}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
