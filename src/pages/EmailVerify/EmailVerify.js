import React,{useState} from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { emailVerification ,resendEmailOtp} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch,useSelector } from "react-redux";
const EmailVerify = () => {
    const emailVerify = useSelector((state)=>state.user.registerUser.email)
    const dispatch = useDispatch()
    //state for otp change
const[otp ,setOtp] = useState("")
//function for otp change
const handleChange = (e) =>{
    setOtp(e.target.value)
}
const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(emailVerification({otp,emailVerify}))
}
const handleOtp = () =>{
    dispatch(resendEmailOtp(emailVerify))
}
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
            <Card.Title style={{ width: "100%", textAlign:"center" }}>KOL</Card.Title>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Verify email address</Card.Title>

                <Card.Text>
                  To verify your email, we've sent a One Time Password (OTP) to{" "}
                  <span>{emailVerify}</span>
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
