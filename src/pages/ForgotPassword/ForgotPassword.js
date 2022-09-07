import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword, userSelector } from "../../slices/AuthSlice/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { isFetching, isSuccess, statusCode, isError, errorMessage, email } =
    useSelector(userSelector);

 

  const dispatch = useDispatch();
  const [passwordValue, setPasswordValue] = useState({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
    email,
  });
  const [error, setError] = useState({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [eye, seteye] = useState(true);
  const [type, settype] = useState(false);
  const [password, setpassword] = useState("password");
  const [eye1, seteye1] = useState(true);
  const [type1, settype1] = useState(false);
  const [password1, setpassword1] = useState("password");
  const [errorSubmit, setErrorSubmit] = useState("");
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
  const Eye1 = () => {
    if (password1 == "password") {
      setpassword1("text");
      seteye1(false);
      settype1(true);
    } else {
      setpassword1("password");
      seteye1(true);
      settype1(false);
    }
  };
  const handleChange = (e) => {
    setPasswordValue((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "otp":
          if (!value) {
            stateObj[name] = "please enter correct otp";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Please new Password.";
          } else if (
            passwordValue.confirmNewPassword &&
            value !== passwordValue.confirmNewPassword
          ) {
            stateObj["confirmNewPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmNewPassword"] = passwordValue.confirmNewPassword
              ? ""
              : error.confirmNewPassword;
          }
          break;

        case "confirmNewPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (
            passwordValue.newPassword &&
            value !== passwordValue.newPassword
          ) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handlSubmit = (e) => {
 
    e.preventDefault();
    if (passwordValue.email == "" || passwordValue.otp == "" || passwordValue.newPassword == "" || passwordValue.confirmNewPassword == "") {
      setErrorSubmit("All fields required ");
    }else{
      dispatch(ResetPassword(passwordValue)).then((data) => {
        console.log(data);
        if(data.payload.statusCode === 201){
          
          navigate("/passwordSuccess");
        }else{
          toast.error(data.payload.message)
        }
        
      });
    }
 
  };

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
                    <form onSubmit={handlSubmit}>
                      <h2 className="login-heading mb-3">Change Password</h2>
                      <div className="form-group mb-3">
                        <label>Create Password</label>
                        <span className="astric-span">*</span>
                        <div className="position-relative">
                          <input
                            type={password}
                            id="form3Example3"
                            className={`form-control ${
                              errorSubmit === "" || passwordValue.newPassword ? "" : "border-danger"
                            }`}
                            name="newPassword"
                            onChange={handleChange}
                          />
                          <i
                            onClick={Eye}
                            className={`eye-icon fa ${
                              eye ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        
                          {errorSubmit && passwordValue.newPassword == "" && (
                          <span className="text-danger">{errorSubmit}</span>
                        )}
                        </div>
                      </div>
                      {error.newPassword && (
                        <span className="err text-danger">{error.newPassword}</span>
                      )}
                      <div className="form-group mb-3">
                        <label>Confirm Password</label>
                        <span className="astric-span">*</span>
                        <div className="position-relative">
                          <input
                            type={password1}
                            id="form3Example4"
                            className={`form-control ${
                              errorSubmit === "" || passwordValue.confirmNewPassword ? "" : "border-danger"
                            }`}
                            name="confirmNewPassword"
                            onChange={handleChange}
                          />
                          <i
                            onClick={Eye1}
                            className={`eye-icon fa ${
                              eye1 ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                          {errorSubmit && passwordValue.confirmNewPassword == "" && (
                          <span className="text-danger">{errorSubmit}</span>
                        )}
                        </div>
                      </div>
                      {error.confirmNewPassword && (
                        <span className="err text-danger">{error.confirmNewPassword}</span>
                      )}
                      <div className="form-group mb-3">
                        <label>OTP</label>
                        <span className="astric-span">*</span>
                        <input
                          type="text"
                          id="form3Example1"
                          className={`form-control ${
                            errorSubmit === "" || passwordValue.otp ? "" : "border-danger"
                          }`}
                          name="otp"
                          onChange={handleChange}
                        />
                        {errorSubmit && passwordValue.otp == "" && (
                          <span className="text-danger">{errorSubmit}</span>
                        )}
                      </div>
                      {error.otp && <span className="err">{error.otp}</span>}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <button
                          type="submit"
                          className="btn theme-btn btn-lg btn-block mt-6"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                    <div className="">
                      <span className="optionText1 text-right">
                        Back to <Link to="/login">Login</Link>
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

export default ForgotPassword;
