import React, { useState } from "react";
import { Container, Form, Row, Button, Alert } from "react-bootstrap";
import { ChangePasswordUser } from "../../slices/AuthSlice/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import "./ChangePassword.css";
import Loader from "react-js-loader";

const ChangePassword = () => {
  const email = useSelector((state) => state?.user?.loginuser?.email);
  const token = useSelector((state) => state?.user?.loginuser?.token);
  const successMessage = useSelector(
    (state) => state?.user?.loginuser?.message
  );
 
  const dispatch = useDispatch();
  const[btnLoader,setBtnLoader] = useState(false);
  const [passwordValue, setPasswordValue] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email,
    token,
  });
  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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
        case "currentPassword":
          if (!value) {
            stateObj[name] = "please enter current password";
          }
          break;

        case "newPassword":
          if (!value) {
            stateObj[name] = "Please enter new Password.";
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
    setBtnLoader(true)
   
    dispatch(ChangePasswordUser(passwordValue));
    setBtnLoader(false)
  };
  return (
    <Container>
      <Row>
        <Form onSubmit={handlSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              name="currentPassword"
              type="password"
              placeholder="Enter current password"
              onChange={handleChange}
            />
            {error.currentPassword && (
            <span className="err">{error.currentPassword}</span>
          )}
          </Form.Group>
          

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              name="newPassword"
              type="password"
              placeholder="Enter New Password"
              onChange={handleChange}
            />
            {error.newPassword && (
            <span className="err">{error.newPassword}</span>
            )}
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              onChange={handleChange}
            />
            {error.confirmNewPassword && (
                <span className="err">{error.confirmNewPassword}</span>
              )}
          </Form.Group>
          
          <Button variant="primary" type="submit" className="spiner-btn">
            {btnLoader ? <Loader type="spinner-cub"  title={"Submit"} size={20} />:'Submit'}
          </Button>
        </Form>
        {successMessage && (
          <Alert key="success" variant="success">
            {successMessage}
          </Alert>
        )}
      </Row>
    </Container>
  );
};
export default ChangePassword;
