import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase";
//import { Container, Row, Col } from "react-bootstrap";
import {
  signupUser,
  userSelector,
  clearState,
} from "../../slices/AuthSlice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const { isFetching, isSuccess, statusCode, isError, errorMessage } = useSelector(userSelector);
  const role = useSelector((state) => state?.user?.role?.payload);
  //state for firebase values
  console.log(isSuccess, statusCode);
  const [firebaseUser, setFirebaseuser] = useState({
    name: "",
    email: "",
    token: "",
    role: role,
  });
  console.log(role);
  //state for Register Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    token: "",
    role: role,
    password: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  let token = localStorage.getItem("token");
  console.log(token);

  //navigaion
  const navigate = useNavigate();
  //useSelector for getting data from store
  //Dispatch form react redux
  const dispatch = useDispatch();
  //function for response from firebase
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        setFirebaseuser((state) => {
          return {
            ...state,
            name: res.user.displayName,
            email: res.user.email,
            token: res.user.accessToken,
          };
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //function for handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //function for handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name == "" ||
      formData.email == "" ||
      token == "" ||
      formData.password == "" ||
      role == ""
    ) {
      setError("All fields required please select all field");
      setStatus(true);
    } else {
      console.log(formData);
      dispatch(signupUser(formData)).then((data)=>{
        console.log(data);
        if(data.payload.status){
          toast.success(data.payload.message)
        }
      })
      e.target.reset();
    }
  };
  //action for signInwithGoogle
  useEffect(() => {
    if (!firebaseUser.token) return;
    console.log(firebaseUser);
    dispatch(signupUser(firebaseUser));
  }, [firebaseUser.token]);

  //new Changes

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      navigate("/EmailVerify");
    }
    if (statusCode === 301) {
      navigate("/register");
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);
  console.log(status);
  return (
    <div className="main-div">
      <section>
        <div className="container">
          <div className="card register-card">
            <div className="card-body register-card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 register-div">
                  <div className="d-flex  flex-wrap align-items-center">
                    <div className="rounded-circle roundIcon my-3">&nbsp;</div>
                    <h2 className="text-white form-heading">
                      Target More &amp; Influence More Users With KOL
                    </h2>
                    <div className="bordered-text col-lg-8 col-md-12">
                      <p className="text-white mb-0">
                        To get the maximum attention on your product and
                        services, invest in KOL.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6  col-sm-12 register-form">
                  <div className="row align-items-center ">
                    <form className="col-12" onSubmit={handleSubmit}>
                      <h2 className="register-heading mb-3">Register</h2>

                      <div className="form-group mb-3">
                        <label>Name</label>
                        <span className="astric-span">*</span>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${
                             error === "" || formData.name
                              ? ""
                              : "border-danger"
                          }`}
                          placeholder="First name"
                          onChange={handleChange}
                        />
                        {error && formData.name == "" && (
                          <span className="text-danger">{error}</span>
                        )}
                      </div>

                      <div className="form-group  mb-3">
                        <label>Email</label>
                        <span className="astric-span">*</span>
                        <input
                          type="email"
                          name="email"
                          className={`form-control  ${
                            error === "" || formData.email 
                            ? ""
                            : "border-danger"
                          }`}
                          placeholder="Enter email"
                          onChange={handleChange}
                        />
                        {error && formData.email == "" && (
                          <span className="text-danger">{error}</span>
                        )}
                      </div>

                      <div className="form-group  mb-3">
                        <label>Password</label>
                        <span className="astric-span">*</span>
                        <input
                          type="password"
                          name="password"
                          className={`form-control  ${
                            error === "" || formData.password
                            ? ""
                            : "border-danger"
                          }`}
                          placeholder="Enter password"
                          onChange={handleChange}
                        />
                        {error && formData.password == "" && (
                          <span className="text-danger">{error}</span>
                        )}
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                          type="submit"
                          className="btn theme-btn btn-lg btn-block"
                        >
                          Register
                        </button>
                        <span className="optionText text-right">
                          Already registered <Link to="/login">Login</Link>
                        </span>
                      </div>
                    </form>
                    <div className="col-12 justify-content-center align-items-center position-relative my-4">
                      <hr className="col-12" />{" "}
                      <span className="orText">or </span>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center mb-3">
                      <GoogleButton
                        label="Sign in with Google"
                        style={{ background: "#342951" }}
                        onClick={signInWithGoogle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Register;
