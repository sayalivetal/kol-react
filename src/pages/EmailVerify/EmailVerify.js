import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import "./EmailVerify.css";
import {
  emailVerification,
  resendEmailOtp,
  userSelector,clearState
} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage} = useSelector(userSelector);
  // const userData = useSelector((state) => state?.user?.registerUser?.data);
  let email = localStorage.getItem("email")
  console.log(email);
  const userdata = useSelector((state) => state?.user?.loginUser);
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  const dispatch = useDispatch();
  //state for otp change
  const [otp, setOtp] = useState("");
  //function for otp change
  const [error,setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(otp === ""){
      setError("opt required")
    }
    dispatch(emailVerification({ otp, email })).then((data)=>{
  console.log(data);
      if(data?.payload?.statusCode == 200){
        navigate('/home');
        toast.success(data?.payload?.message)
       
      }else{
        toast.error(data?.payload?.message)
      }
      
   
    })
    e.target.reset();
  };

  const handleOtp = () => {
    dispatch(resendEmailOtp(email)).then((data)=>{
      console.log(data);
      if(data?.payload?.statusCode == 200){
        toast.success(data?.payload?.message)
        
      }else{
        toast.error(data?.payload?.message)
      }
    });
  };


  
  return (
    <section className="otp-bg">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-8 col-md-12">
              <div className="card otp-card">
                <div className="card-body otp-card-body ">
                  <div>
                    <div className="otp-heading mb-3 ">Enter Verification Code</div>

                    <p className="">
                      We have just sent a verification code to<br />
                      <span className="email-verify-name">{email}</span>
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="my-4 form-group otp-div">
                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          separator={<span>&nbsp;</span>}
                        />
                        {error && <span className="error-color">{error}</span>}
                      </div>
                      
                      <button className="btn theme-btn btn-lg btn-block my-3" type="submit">
                        Verify &amp; Proceed
                      </button>
                    </form>
                  </div>
                  <div className="col-12 align-items-center mt-3">
                    <p className="optionText font-weight-bold mb-2 ">
                      Don't receive the OTP?
                      <button
                        type="submit"
                        className="resend-button"
                        onClick={handleOtp}
                      >
                        RESEND OTP
                      </button>
                    </p>
                    <p className="font-weight-bold">OTP Will be expire in 1 mintue</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </section>
  );
};

export default EmailVerify;
