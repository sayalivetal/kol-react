import React, { useState } from "react";
import { addRole } from "../../slices/AuthSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Role.css";
const Role = () => {
  const dispatch = useDispatch();
  const [renderButton, setRenderButton] = useState("");
  const [userRole, setUserRole] = useState({
    role: "",
  });

  const onChangeValue = (e) => {
    setUserRole({ ...userRole, [e.target.name]: e.target.value });
    if (e.target.value === "3") {
      setRenderButton(" as Customer");
    } else {
      setRenderButton(" as KOL");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRole(userRole));
  };

  return (
    <section className="main">
      <div className="container">
        <div className="row">
          <div className="col-12">KOL</div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <div className="card">
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <h3>Join as a User or KOL</h3>
                  </div>
                  <form onSubmit={handleSubmit}>
                  <div className="row justify-content-center">
                    <div className="col-5">
                      <div className="card">
                        <div className="card-body">
                          <input
                            type="radio"
                            value="3"
                            name="role"
                            onChange={onChangeValue}
                          />{" "}
                          Customer
                        </div>
                      </div>
                    </div>
                    <div className="col-5">
                      <div className="card">
                        <div className="card-body">
                          <input
                            type="radio"
                            value="2"
                            name="role"
                            onChange={onChangeValue}
                          />{" "}
                          KOL
                        </div>
                      </div>
                    </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit">
                        Join{renderButton && <span>{renderButton}</span>}
                      </button>
                    </div>
                  </form>

                  <div className="col-12 text-center">
                    <h3>
                      Already Registered <Link to="/login">log in? </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>Copyright © 2010-2022 KOL Company S.L. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Role;
