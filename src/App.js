import Auth from "./pages/Auth";
import { useState, useEffect } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Scroll from "./components/Scroll.js";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import TagBlog from "./components/TagBlog.js";
import CategoryBlog from "./pages/CategoryBlog.js";

function App() {
  const [active, setActive] = useState("auth"); 
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  //logout logic
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <Scroll />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home  setActive={setActive} active={active} user={user}/>} />
        <Route path="/search" element={<Home  setActive={setActive} user={user}/>} />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? <AddEditBlog user={user} setActive={setActive}/> : <Navigate to="/" />
          }
        />
        <Route path="/detail/:id" element={<Detail  setActive={setActive} user={user}/>} />
        <Route path="/tag/:tag" element={<TagBlog />} />
        <Route path="/category/:category" element={<CategoryBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
