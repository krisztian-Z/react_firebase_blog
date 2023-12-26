import Auth from "./pages/Auth";
import { useState, useEffect } from "react";
import "./App.css";
import "./style.scss";
import "./media-query.css";
import Home from "./pages/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
  const [active, setActive] = useState("auth"); // Setează pagina activă inițial la pagina de autentificare
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
      <ToastContainer position="top-center" />
      <Routes>
        {/* <Route path="/" element={<Navigate to="/auth" />} /> */}
        <Route path="/" element={<Home  setActive={setActive} user={user}/>} />
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
        <Route path="/detail/:id" element={<Detail  setActive={setActive}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

// import { useState } from 'react';
// import './App.css';
// import './style.scss';
// import Home from './pages/Home';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Detail from './pages/Detail';
// import AddEditBlog from './pages/AddEditBlog';
// import About from './pages/About';
// import Auth from './pages/Auth';
// import NotFound from './pages/NotFound';
// import Header from './components/Header';

// function App() {
//   const [active, setActive] = useState('home');

//   return (
//     <div className="App">
//       <Header setActive={setActive} active={active} />
//       <ToastContainer position="top-center" />
//       <Routes>
//         <Route path="/" element={<Navigate to="/home" />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/create" element={<AddEditBlog />} />
//         <Route path="/update/:id" element={<AddEditBlog />} />
//         <Route path="/detail/:id" element={<Detail />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/auth" element={<Auth setActive={setActive} />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

// import { useState } from "react";
// import "./App.css";
// import "./style.scss";
// import Home from "./pages/Home";
// import { Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Detail from "./pages/Detail";
// import AddEditBlog from "./pages/AddEditBlog";
// import About from "./pages/About";
// import Auth from "./pages/Auth";
// import NotFound from "./pages/NotFound";
// import Header from "./components/Header";

// function App() {
//   const [active, setActive] = useState("home"); // to achive active links; also home page will be my by default active
//   return (
//     <div className="App">
//       <Header setActive={setActive} active={active} />
//       <ToastContainer position="top-center" />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create" element={<AddEditBlog />} />
//         <Route path="/update/:id" element={<AddEditBlog />} />
//         <Route path="/detail/:id" element={<Detail />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/auth" element={<Auth setActive={setActive} />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
