import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase";
import { Container, Row, Col } from "react-bootstrap";
import { signupUser } from "../../slices/AuthSlice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const role = useSelector((state) => state?.user?.role?.payload?.role);
  //state for firebase values
  const [firebaseUser, setFirebaseuser] = useState({
    name: "",
    email: "",
    token: "",
    role: role,
  });
  //state for Register Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    token: "",
    role: role,
    password: "",
  });
  //state for store data of user register
  const [data, setData] = useState({});
  //navigaion
  const navigate = useNavigate();
  //useSelector for getting data from store
  const userDetails = useSelector((state) => state?.user?.registerUser);
  // const userRegister = useSelector((state)=>state.user.registerUser)
  console.log(userDetails);
  useEffect(() => {
    if (!userDetails?.otp) return;
    setData(userDetails);
  }, [userDetails?.otp]);
  useEffect(() => {
    if (!userDetails?.data?.token) return;
    setData(userDetails);
  }, [userDetails?.data?.token]);


  useEffect(() => {
    if (data?.data?.token) {
     
       navigate("/Home");
    }
  }, [data]);
  console.log(data);
  useEffect(() => {
    if (data?.otp) {
      navigate("/EmailVerify");
    }
  }, [data]);


  if(userDetails?.statusCode == 301){
    toast.error("User already exists");
  }
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
    console.log(formData);
    dispatch(signupUser(formData));
  };
  //action for signInwithGoogle
  useEffect(() => {
    if (!firebaseUser.token) return;
    console.log(firebaseUser);
    dispatch(signupUser(firebaseUser));
  }, [firebaseUser.token]);
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
                    {" "}
                    <form className="col-12" onSubmit={handleSubmit}>
                      <h2 className="register-heading mb-3">Register</h2>

                      <div className="form-group mb-3">
                        <label>Name</label><span className="astric-span">*</span>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="First name"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group  mb-3">
                        <label>Email</label><span className="astric-span">*</span>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group  mb-3">
                        <label>Password</label><span className="astric-span">*</span>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter password"
                          onChange={handleChange}
                        />
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
                        label="Sign up with Google"
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
