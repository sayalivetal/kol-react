import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import OtpInput from "react-otp-input";
import "./EmailVerify.css";
import {
  emailVerification,
  resendEmailOtp,
} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  const navigate = useNavigate();
  const emailVerify = useSelector((state) => state?.user?.registerUser?.email);
  // const userData = useSelector((state) => state?.user?.registerUser?.data);
  const userdata = useSelector((state) => state?.user?.loginUser);
 
  const [email, setEmail] = useState("");


  // useEffect(() => {
  //   if (userdata?.data?.message) {
  //     toast.success(userdata?.data?.message);
  //   }
  // }, [userdata]);
  useEffect(() => {
    if (userdata?.data?.data?.token) {
      navigate("/home");
    }
  }, [userdata]);
  let asd;
  useEffect(() => {
    if (emailVerify) {
      toast.success(
        "You have been successfully registered, We have sent a verification code to your mail,please verify it!"
      );
      setEmail(emailVerify)
    }
  }, [emailVerify]);
  useEffect(() => {
    if (userdata?.email) {
      //  toast.success(userdata.message);
      asd = emailVerify ? emailVerify : userdata?.email;
      setEmail(asd);
    }
  }, [userdata]);
  console.log(email);
  const dispatch = useDispatch();
  //state for otp change
  const [otp, setOtp] = useState("");
  //function for otp change

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailVerification({ otp, email }));
  };
  const handleOtp = () => {
    dispatch(resendEmailOtp(email));
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
