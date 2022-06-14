import React, { useState } from "react";
import GoogleButton from "react-google-button";
// import {signInWithGoogle} from './Firebase'

import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../Firebase";
import { Container, Row, Col } from "react-bootstrap";
const Register = () => {
  //state for firebase values
  const [firebaseUser, setFirebaseuser] = useState({
    name: "",
    email: "",
    token: "",
    role:"",
    password:""
  });
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
    setFirebaseuser({...firebaseUser,[e.target.name]:e.target.value})
  };
  //function for handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(firebaseUser);
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <form onSubmit={handleSubmit}>
            <h3>Register</h3>

            <div className="form-group">
              <label>name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="First name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={handleChange}
                name="role"
              >
                <option>Select Role</option>
                <option value="1">Customer</option>
                <option value="2">KOL</option>
              </select>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
            <p className="forgot-password text-right">
              Already registered <a href="#">log in?</a>
            </p>
          </form>{" "}
          <GoogleButton onClick={signInWithGoogle} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default Register;
