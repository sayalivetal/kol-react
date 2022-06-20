import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  emailVerification,
  resendEmailOtp,
} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EmailVerify = () => {
  const navigate = useNavigate()
  const emailVerify = useSelector((state) => state?.user?.registerUser?.email);
  const userData = useSelector((state) => state?.user?.registerUser?.data);
  const data = useSelector((state)=>state?.user?.loginUser)
  const[email,setEmail]= useState("")
  useEffect(() => {
    if (emailVerify) {
      toast.success(
        "You have been successfully registered, We have sent a verification code to your mail,plaese verify it!"
      );
    }
  }, [emailVerify]);

  useEffect(() => {
    if (userData?.message) {
      toast.success(userData.message);
    }
  }, [userData]);
  useEffect(() => {
    if (userData?.data?.token) {
      navigate('/home')
    }
  }, [userData]);
let asd;
  useEffect(() => {
    if (data?.statusCode == 401) {
      toast.success(data.message);
      asd = emailVerify?emailVerify:data.email
      setEmail(asd)
     
    }
  }, [data]);
console.log(email);
  const dispatch = useDispatch();
  //state for otp change
  const [otp, setOtp] = useState("");
  //function for otp change
  const handleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailVerification({ otp, email }));
  };
  const handleOtp = () => {
    dispatch(resendEmailOtp(email));
  };
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Card.Title style={{ width: "100%", textAlign: "center" }}>
              KOL
            </Card.Title>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Verify email address</Card.Title>

                <Card.Text>
                  To verify your email, we've sent a One Time Password (OTP) to{" "}
                  <span>{email}</span>
                </Card.Text>
                <Link to="/register">Change</Link>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      name="otpVerify"
                      placeholder="Enter OTP"
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </Form>
              </Card.Body>
              <div>
                <button onClick={handleOtp}>resend otp</button>
              </div>
              <div></div>
            </Card>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default EmailVerify;
