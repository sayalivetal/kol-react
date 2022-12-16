import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import Loader from "react-js-loader";
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
  const { isFetching, isSuccess, statusCode, isError, errorMessage } =
    useSelector(userSelector);
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
  const [fieldError, setfieldError] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [btnLoader, setBtnLoader] = useState(false);

  const [regPassword, setRegPassword] = useState("password");
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);

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

  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);;
  }

  //function for handleChange
  const handleChange = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      }
    });
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setfieldError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "name":
          if (!value) {
            stateObj[name] = "Please enter name";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email";
          } else if (!isValidEmail(value)) {
            stateObj[name] = "Please enter correct email";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter password";
          } else if (value.length < 8) {
            stateObj[name] = "Password must be atleast 8 characters";
          }
          break;
        default:
          break;
      }

      return stateObj;
    });
  };

 
  //function for handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoader(true)
    if (fieldError.name.length > 0 || fieldError.email.length > 0 || fieldError.password.length > 0 ){ 
      setBtnLoader(false)
      return;
    }
    if (formData.name == "" || formData.email == "" || formData.password == "" ) {
      setError("Please fill the mandatory filed");
      setStatus(true);
      setBtnLoader(false)
    } else {
      dispatch(signupUser(formData)).then((data) => {
        console.log(data);
        if (data.payload.statusCode == 201) {
          toast.success(data.payload.message);
          setBtnLoader(false)
          //localStorage.setItem("email", data.payload.email)
        }else {
          toast.error(data?.payload?.message)
          setBtnLoader(false)
        }
      });
      e.target.reset();
    }
  };
  // console.log(error);
  //action for signInwithGoogle
  useEffect(() => {
    if (!firebaseUser.token) return;
    console.log(firebaseUser);
    localStorage.setItem('email',firebaseUser.email)
    dispatch(signupUser(firebaseUser)).then((data) => {
      console.log(data);
      if (data.payload.statusCode === 422) {
        navigate('/role')
        
      }
    });
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


  const Eye = () => {
    if (regPassword == "password") {
      setRegPassword("text");
      seteye(false);
      // settype(true);
    } else {
      setRegPassword("password");
      seteye(true);
      // settype(false);
    }
  };

  return (
    <div className="main-div">
      <section className="container d-flex flex-wrap justify-content-center align-items-center">
        <div className=" reg-container">
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
                          className={`form-control ${error === "" || formData.name
                              ? ""
                              : "border-danger"
                            }`}
                          placeholder="Enter name"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <span className="err text-danger">
                          {fieldError.name || error && formData.name == "" && (
                            <>{error || fieldError.name}</>
                          )}
                        </span>
                      </div>

                      <div className="form-group  mb-3">
                        <label>Email</label>
                        <span className="astric-span">*</span>
                        <input
                          type="text"
                          name="email"
                          className={`form-control  ${error === "" || formData.email
                              ? ""
                              : "border-danger"
                            }`}
                          placeholder="Enter email"
                          onChange={handleChange}
                          autoComplete="off"
                        />
                        <span className="err text-danger">
                          {fieldError.email || error && formData.email == "" && (
                            <>{error || fieldError.email}</>
                          )}
                        </span>

                      </div>

                      <div className="form-group  mb-3">
                        <label>Password</label>
                        <span className="astric-span">*</span>
                        <div className="position-relative">
                          <input
                            type={regPassword}
                            name="password"
                            className={`form-control  ${error === "" || formData.password
                                ? ""
                                : "border-danger"
                              }`}
                            placeholder="Enter password"
                            onChange={handleChange}
                            autoComplete="off"
                            // minLength={8}
                          />
                          <i
                            onClick={Eye}
                            className={`eye-icon fa ${eye ? "fa-eye-slash" : "fa-eye"
                              }`}
                          ></i>
                        </div>
                        <span className="err text-danger">
                          {fieldError.password || error && formData.password == "" && (
                            <>{error || fieldError.password}</>
                          )}
                        </span>


                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button type="submit" disabled={btnLoader?true:false} className="btn theme-btn btn-lg btn-block spiner-btn">
                          {btnLoader ? <Loader type="spinner-cub" title={"Register"} size={20} /> : 'Register'}
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
