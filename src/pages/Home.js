import React, { useState, useEffect, useCallback } from "react";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import BlogSection from "../components/BlogSection";
import Tags from "../components/Tags";
import Popular from "../components/Popular";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Trending from "../components/Trending";
import Search from "../components/Search";
import { isNull } from "lodash";
import { useLocation } from "react-router-dom";
import Category from "../components/Category";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = ({ setActive, user, active }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [trendBlogs, setTrendBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const queryString = useQuery();
  const searchQuery = queryString.get("searchQuery");
  const location = useLocation();
  const [lastBlog, setLastBlog] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [showNoMoreBlogs, setShowNoMoreBlogs] = useState(false);

  const getBlogs = async () => {
    const blogRef = collection(db, "solent-students-blogs");
    const initialQuery = query(blogRef, orderBy("title"), limit(4));
    const docSnapshot = await getDocs(initialQuery);
    const docs = docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBlogs(docs);
    if (docSnapshot.size < 2) {
      setHasMore(false);
    } else {
      setLastBlog(docSnapshot.docs[docSnapshot.size - 1]);
    }
  };

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "solent-students-blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };

  const searchBlogs = useCallback(async () => {
    const blogRef = collection(db, "solent-students-blogs");
    const searchTitleQuery = query(blogRef, where("title", "==", searchQuery));
    const searchTagQuery = query(
      blogRef,
      where("tags", "array-contains", searchQuery)
    );

    try {
      const titleSnapshot = await getDocs(searchTitleQuery);
      const tagSnapshot = await getDocs(searchTagQuery);
      let searchTitleBlogs = [];
      let searchTagBlogs = [];
      titleSnapshot.forEach((doc) => {
        searchTitleBlogs.push({ id: doc.id, ...doc.data() });
      });
      tagSnapshot.forEach((doc) => {
        searchTagBlogs.push({ id: doc.id, ...doc.data() });
      });
      const combineSearchBlogs = searchTitleBlogs.concat(searchTagBlogs);
      setBlogs(combineSearchBlogs);
      setActive("");
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }, [searchQuery, setActive]);

  useEffect(() => {
    getTrendingBlogs();
    setSearch("");
    const unsubscribe = onSnapshot(
      collection(db, "solent-students-blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setTotalBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log("Error fetching blogs:", error);
      }
    );

    return () => {
      unsubscribe();
      getTrendingBlogs();
    };
  }, [setActive, active]);

  useEffect(() => {
    getBlogs();
  }, [active]);

  useEffect(() => {
    if (!isNull(searchQuery)) {
      searchBlogs();
    }
  }, [searchQuery, searchBlogs]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the selected blog?"
    );

    if (confirmDelete) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "solent-students-blogs", id));
        toast.info("Your blog has been successfully deleted!");
      } catch (error) {
        console.error("Error deleting blog:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchMoreBlogs = async () => {
    if (lastBlog) {
      const blogRef = collection(db, "solent-students-blogs");
      const nextQuery = query(
        blogRef,
        orderBy("title"),
        startAfter(lastBlog),
        limit(4) 
      );
      const nextSnapshot = await getDocs(nextQuery);
      const nextDocs = nextSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs((prevBlogs) => [...prevBlogs, ...nextDocs]);
      if (nextSnapshot.size < 4) {
        setHasMore(false);
        setShowNoMoreBlogs(true);
      } else {
        setLastBlog(nextSnapshot.docs[nextSnapshot.size - 1]);
      }
    }
  };
  

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim() === "") {
      resetSearch();
    }
  };

  const resetSearch = () => {
    setSearch("");
    getBlogs();
  };
//category count
const counts = totalBlogs.reduce((prevValue, currentValue) => {
  let name = currentValue.category;
  if(!prevValue.hasOwnProperty(name)){
    prevValue[name] = 0;
  }
  prevValue[name]++;
  delete prevValue["udefined"];
  return prevValue;
}, {});

const categoryCount = Object.keys(counts).map((k) => {
  return {
    category: k,
    count: counts[k]
  }
})
console.log("categoryCount", categoryCount);
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <Trending blogs={trendBlogs} />
          <div className="col-md-8">
            <div className="blog-heading text-start py-2 mb-4">Daily Blogs</div>
            {blogs.length === 0 && location.pathname !== "/" && (
              <>
                <h4>
                  We couldn't find any blog with the keyword:{" "}
                  <strong> {searchQuery}</strong>
                </h4>
              </>
            )}
            {blogs?.map((blog) => (
              <BlogSection
                key={blog.id}
                user={user}
                handleDelete={handleDelete}
                {...blog}
              />
            ))}

            {hasMore ? (
              <button
                className="btn btn-primary"
                onClick={fetchMoreBlogs}
                disabled={!isNull(searchQuery)} // Disable when search is active
              >
                Load More
              </button>
            ) : null}
            {showNoMoreBlogs && (
              <div className="alert alert-info mt-3" role="alert">
                No more blogs available.
              </div>
            )}
          </div>
          <div className="col-md-3">
            <Search search={search} handleSearch={handleSearch} />
            <div className="blog-heading text-start py-2 mb-4">Tags</div>
            <Tags tags={tags} />
            <Popular blogs={blogs} />
            <Category catgBlogsCount={categoryCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
