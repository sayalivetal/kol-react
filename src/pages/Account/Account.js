import React from "react";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <div>
      <div className="container">
        <div className="card">
            <div className="card-body">
                  <div className="banner-container">
                    <div
                      className="col-lg-12 detail-bg"
                      style={{ backgroundImage: `url(Images/details.png)` }}
                    ></div>
                  </div>
                  <div className="col-lg-12 px-4">
                    <div className="row justify-content-between py-4 list-row">
                      <div className="col-xl-2 col-lg-3 col-md-12 py-2 align-self-start user-thumb">
                        <div className="kol-user-img">
                          <img src="Images/3.png" className="img-fluid" alt="avatar" />
                        </div>
                      </div>
                      <div className="col-xl-10 col-lg-9 col-md-12  px-4">
                        <div className="row justify-content-between">
                            <h2 className="mb-4">User Profile</h2>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">Name</label>
                          <label className="col-lg-10 col-form-label">Sara Jammal</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">Mobile</label>
                          <label className="col-lg-10 col-form-label">+91 7508482411</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">Gender</label>
                          <label className="col-lg-10 col-form-label">Female</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">Address</label>
                          <label className="col-lg-10 col-form-label">TENEIL IT TOWER PLOT NO F-549, IT PARK, IND AREA, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium ">Landmark</label>
                          <label className="col-lg-10 col-form-label">Judicial Court</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">City</label>
                          <label className="col-lg-10 col-form-label">Mohali</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-lg-2 col-sm-12 col-form-label fw-medium">Zip Code</label>
                          <label className="col-lg-10 col-form-label">140055</label>
                        </div>
                        <div className="row ">
                          <div className="col-lg-12 mt-4">
                            <Link to={"/edit-account"} className="btn  theme-btn">Edit Profile</Link>
                          </div>
                        </div>

                      </div>
                    </div>


                  </div>
                </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
