import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Initial state for the form fields
const initialState = {
  firstName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ setActive, setUser }) => {
  // State to manage form fields and sign-up/sign-in toggle
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  // Destructuring state for easier access to form fields
  const { email, password, firstName, confirmPassword } = state;

  // Hook to enable navigation between pages
  const navigate = useNavigate();

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Function to handle sign-up or sign-in logic
  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      // Sign in logic
      if (!signUp) {
        if (email && password) {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          setUser(user);
          setActive("home");
          navigate("/");
        } else {
          toast.error("All fields are mandatory!");
        }
      }
      // Sign up logic
      else {
        if (password !== confirmPassword) {
          toast.error("Passwords don't match!");
        }
        if (firstName && email && password) {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, { displayName: `${firstName}` });
          setActive("home");
          navigate("/");
          toast.success("Sign-up successful! Please sign in.");
        } else {
          toast.error("All fields are mandatory!");
        }
      }
    } catch (error) {
      console.error("Authentication error:", error.message);

      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "Email address is already in use. Please sign in or use a different email."
        );
      } else {
        toast.error("Error during authentication. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="container-fluid mb-4">
        <div className="container">
          <div className="col-12 text-center">
            <div className="text-center heading py-2">
              {!signUp ? "Sign-In" : "Sign-Up"}
            </div>
          </div>
          <div className="row h-100 justify-content-center align-item-center">
            <div className="col-10 col-md-8 col-lg-6">
              <form className="row" onSubmit={handleAuth}>
                {signUp && (
                  <>
                    <div className="col-12 py-3">
                      <input
                        type="text"
                        className="form-control input-text-box"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
                <div className="col-12 py-3">
                  <input
                    type="email"
                    className="form-control input-text-box"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 py-3">
                  <input
                    type="password"
                    className="form-control input-text-box"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                {signUp && (
                  <div className="col-12 py-3">
                    <input
                      type="password"
                      className="form-control input-text-box"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="col-12 py-3 text-center">
                  <button
                    className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                    type="submit"
                  >
                    {!signUp ? "Sign-in" : "Sign-up"}
                  </button>
                </div>
              </form>
              <div>
                {!signUp ? (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?
                        <span
                          className="link-danger"
                          style={{ textDecoration: "none", cursor: "pointer" }}
                          onClick={() => setSignUp(true)}
                        >
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Already have an account?
                        <span
                          style={{
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "#298af2",
                          }}
                          onClick={() => setSignUp(false)}
                        >
                          Sign In
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
