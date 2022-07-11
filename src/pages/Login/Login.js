import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser,signupUser,loginWithGoogle,clearState,userSelector } from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { isFetching, isSuccess,statusCode, isError, errorMessage } = useSelector(userSelector)
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [firebaseUser, setFirebaseuser] = useState({
    name: "",
    email: "",
    token: "",
  
  });
  let token = localStorage.getItem('token');
  console.log(token);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(()=>{
    if (token) {
    navigate('/home')
    }
  },[token])
  useEffect(()=>{
    if (statusCode == 401) {
      navigate('/emailVerify')
      toast.success(errorMessage)
      }
  },[statusCode])
  const [password, setpassword] = useState("password");
  // useEffect(()=>{
  //   if(loginUserData?.message){
  //     toast.error(loginUserData?.message);
  //   }
  // },[loginUserData])
  // useEffect(()=>{
  //   if(loginUserData?.data?.email){
  //     navigate('/role')
  //   }
  //   if(loginUserData?.data?.token){
  //     navigate('/home')
  //   }
  // },[loginUserData])
  // useEffect(()=>{
  //   if(loginUserData?.email){
  //     navigate('/emailVerify')
  //   }
  // },[loginUserData])
  // useEffect(()=>{
  //   if(loginUserData?.data?.token){
  //     navigate('/home')
  //   }
  // },[loginUserData])
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(loginData));
    e.target.reset();
  };
 
  const Eye = () => {
    if (password == "password") {
      setpassword("text");
      seteye(false);
      settype(true);
    } else {
      setpassword("password");
      seteye(true);
      settype(false);
    }
  };
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
  useEffect(()=>{
    if (!firebaseUser.token) return;
    dispatch(loginWithGoogle(firebaseUser))
  },[firebaseUser.token])
  return (
    <div className="main-div">
      <section>
        <div className="container">
          <div className="card login-card">
            <div className="card-body login-card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 login-div">
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
                <div className="col-lg-6  col-sm-12 login-form">
                  <div className="row align-items-center ">
                    <form onSubmit={handleSubmit}>
                      <h2 className="login-heading mb-3">Login</h2>
                      <div className="form-group mb-3">
                        <label>Email</label><span className="astric-span">*</span>
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group mb-3">
                        <label>Password</label><span className="astric-span">*</span>
                        <div className="position-relative">
                          <input
                            type={password}
                            id="form2Example27"
                            className="form-control"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleChange}
                          />
                          <i
                            onClick={Eye}
                            className={`eye-icon fa ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                          type="submit"
                          className="btn theme-btn btn-lg btn-block"
                        >
                          Login
                        </button>
                        <span className="optionText1 text-right">
                          <Link to="/emailCheck">Forgot password ?</Link>
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
                    <div className="col-12 d-flex justify-content-center align-items-center mt-3">
                      <span className="optionText text-center">
                        Don't have an account?{" "}
                        <Link to="/role">Register here</Link>
                      </span>
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

export default Login;
