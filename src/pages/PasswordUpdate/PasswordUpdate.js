import React ,{useEffect} from "react";
import "./PasswordUpdate.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const PasswordUpdate = () => {
  const statusCode = useSelector((state) => state?.user?.loginUser?.statusCode);
  
  return (
    <div className="main-div">
      <section>
        <div className="container">
          <div className="card login-card">
            <div className="card-body login-card-body">
              <div className="row">
                <div className="col-lg-6 col-sm-12 login-div">
                  <div className="d-flex  flex-wrap align-items-center">
                    <div className="rounded-circle roundIcon my-3">&nbsp;</div>
                    <h2 className="text-white form-heading">
                      Target More &amp; Influence More Users With KOL
                    </h2>
                    <div className="bordered-text col-lg-8 col-md-12">
                      <p className="text-white mb-0">
                        To get the maximum attention on your product and
                        services, invest in KOL.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6  col-sm-12 login-form">
                  <div className="row align-items-center justify-content-center ">
                    <div className= {statusCode?'roundIconUpdate rounded-circle my-3':'roundIconUpdate1 rounded-circle my-3'} >
                      {statusCode?<i className="bi bi-check2 check-mark"></i>:<i className="bi bi-x check-mark"></i>}
                    </div>
                    <div className="d-flex justify-content-center flex-wrap">
                      {statusCode ? <h3 className="text-center">Password Updated successfully!</h3>:<h3 className="text-center">Password not Updated successfully!</h3>}
                      <p className="text-center">
                        Your password has been changed successfully Use your new
                        password to log in.
                      </p>
                      <div>
                        <span className="optionText1">
                          <Link to="/login">Back to Login</Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PasswordUpdate;
