import React, { useEffect, useState } from "react";
import GoogleButton from "react-google-button";
// import {signInWithGoogle} from './Firebase'
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../Firebase";
import { Container, Row, Col } from "react-bootstrap";
import { signupUser } from "../../slices/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const role = useSelector((state)=>state?.user?.role?.payload?.role)
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
  const userDetails = useSelector((state) => state.user.registerUser);
  // const userRegister = useSelector((state)=>state.user.registerUser)
  useEffect(() => {
    if (!userDetails.otp) return;
     setData(userDetails)
    
  }, [userDetails.otp]);
  useEffect(() => {
    if (!userDetails?.data?.token) return;
    setData(userDetails);
  }, [userDetails.token]);
 
  useEffect(() => {
    if (data?.data?.token) {
      navigate("/Home");
    }
  }, [data]);
  console.log(data);
  useEffect(() => {
    if (data.otp) {
      navigate("/EmailVerify");
    }
  }, [data]);
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
    setFormData({});
  };
  //action for signInwithGoogle
  useEffect(() => {
    if (!firebaseUser.token) return;
    console.log(firebaseUser);
    dispatch(signupUser(firebaseUser));
  }, [firebaseUser.token]);
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
                <option value="3">Customer</option>
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
          <div className="form-group">
            <label>Role</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                setFirebaseuser({
                  ...firebaseUser,
                  [e.target.name]: e.target.value,
                })
              }
              name="role"
            >
              <option>Select Role</option>
              <option value="1">Customer</option>
              <option value="2">KOL</option>
            </select>
          </div>
          <GoogleButton onClick={signInWithGoogle} />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default Register;
