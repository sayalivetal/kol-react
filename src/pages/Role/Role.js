import React, { useState } from "react";
import { addRole } from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./Role.css";
const Role = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [renderButton, setRenderButton] = useState("");
  const [userRole, setUserRole] = useState({
    role: "",
  });

  const onChangeValue = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
    if (e.target.value === "3") {
      setRenderButton(" as User");
    } else {
      setRenderButton(" as KOL");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRole(userRole));
    navigate("/register");
  };

  return (
    <section className="main">
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="row full-width">
          <div className="col-12 mb-4 logo-text">KOL</div>
        </div>

        <div className="row full-width justify-content-center">
          <div className="col-lg-8 col-md-12">
            <div className="card card-kol">
              <div className="card-body p-4">
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <h3 className="join-heading mt-3 mb-4">
                      Join as a User or KOL
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                      <div className="col-lg-5 col-sm-12">
                        <div className="card joiner-card">
                          <div className="card-body">
                            <div className="joiner-avatar-bg justify-content-center">
                              <div className="joiner-avatar">
                                <img src="/Images/Group-102.png" alt="" />
                              </div>
                            </div>
                            <div className="joiner-option form-group">
                              <input type="radio" value="3" name="role" id="user" onChange={onChangeValue} />
                              <label htmlFor="user" className="join-option-label" name="role">Join as a User</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-sm-12">
                        <div className="card joiner-card">
                          <div className="card-body">
                            <div className="joiner-avatar-bg justify-content-center">
                              <div className="joiner-avatar">
                                <img src="/Images/Group-103.png" alt="" />
                              </div>
                            </div>
                            <div className="joiner-option form-group">
                              <input type="radio" value="2" name="role" id="kol" onChange={onChangeValue} />
                              <label htmlFor="kol" className="join-option-label" name="role"> Join as a Kol</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-lg theme-btn">
                        Join{renderButton && <span>{renderButton}</span>}
                      </button>
                    </div>
                  </form>

                  <div className="col-12 text-center mt-5">
                    <p className="optionText">
                      Already Registered <Link to="/login">log in? </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row full-width align-self-end">
          <div className="col-12 text-center">
            <p className="cp-text">
              Copyright &copy; 2010-2022 KOL Company S.L. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Role;
