import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../slices/AuthSlice/AuthSlice";
const ForgotPassword = () => {
  const email = useSelector((state) => state?.user?.loginuser?.email);
  const token = useSelector((state) => state?.user?.loginuser?.token);
  const successMessage = useSelector(
    (state) => state?.user?.loginuser?.message
  );
  console.log(token);
  console.log(email);
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
    console.log(passwordValue);
     dispatch(ResetPassword(passwordValue))
  };
  return (
    <div>
      <div className="card-body py-5 px-md-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4">
            <h2 className="fw-bold mb-5">Reset Your Password</h2>
            <form onSubmit={handlSubmit}>
              <div className="row">
                <div className="form-outline">
                  <input
                    type="text"
                    id="form3Example1"
                    className="form-control"
                    name="otp"
                    onChange={handleChange}
                  />
                  <label className="form-label">OTP</label>
                </div>
              </div>
              {error.otp && <span className='err'>{error.otp}</span>}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form3Example3"
                  className="form-control"
                  name="newPassword"
                  onChange={handleChange}
                />
                <label className="form-label">Password</label>
                {error.newPassword && <span className='err'>{error.newPassword}</span>}
              </div>
              
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control"
                  name="confirmNewPassword"
                  onChange={handleChange}
                />
                <label className="form-label">Confirm Password</label>
              </div>
              {error.confirmNewPassword && <span className='err'>{error.confirmNewPassword}</span>}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
