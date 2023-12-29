import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@pathofdev/react-tag-input/build/index.css";

const initialState = {
  title: "",
  tags: [],
  trending: "",
  category: "",
  description: "",
  comments: [],
  likes: []
};

const categoryOptions = [
  "React/JavaScript",
  "Java",
  "Python",
  "NodeJs",
  "Firebase",
  "Other",
];

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const { title, tags, trending, category, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      if (!file) return;

      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused!");
              break;
            case "running":
              console.log("Upload is running...");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    uploadFile();
  }, [file]);

  useEffect(() => {
    const getBlogDetail = async () => {
      const docRef = doc(db, "solent-students-blogs", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setForm({ ...snapshot.data() });
      }
      setActive(null);
    };

    id && getBlogDetail();
  }, [id, setActive]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags});
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && tags && title && description && trending) {
      try {
        if (!id) {
          await addDoc(collection(db, "solent-students-blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully!");
        } else {
          await updateDoc(doc(db, "solent-students-blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully!");
        }

        navigate("/");
      } catch (err) {
        console.error("Error sending the data:", err);
        setSubmitMessage("Error sending the data. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update your blog" : "Create Blog"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <input
                  type="text"
                  className="form-control input-text-box"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 py-3">
                <div className="col-12 py-3">
                  <ReactTagInput
                    tags={tags || []}
                    placeholder="Tags"
                    onChange={handleTags}
                  />
                </div>
              </div>

              <div className="col-12 py-3">
                <div className="trending">Is it a trending blog?</div>
                <div className="form-check-inline mx-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    value="yes"
                    name="radioOption"
                    checked={trending === "yes"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    Yes&nbsp;
                  </label>

                  <input
                    type="radio"
                    className="form-check-input"
                    value="no"
                    name="radioOption"
                    checked={trending === "no"}
                    onChange={handleTrending}
                  />
                  <label htmlFor="radioOption" className="form-check-label">
                    No;
                  </label>
                </div>
              </div>
              <div className="col-12 py-3">
                <select
                  value={category}
                  onChange={onCategoryChange}
                  className="catg-dropdown"
                >
                  <option>Dear student, please select a category</option>
                  {categoryOptions.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <textarea
                  className="form-control description-box"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                  disabled={progress !== null && progress < 100}
                >
                  {id ? "Update your blog" : "Submit your blog"}
                </button>
                {submitMessage && (
                  <div className="mt-3 text-success">{submitMessage}</div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog;
