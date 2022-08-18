import React from "react";

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
                      <div className="col-lg-2 py-2">
                        <div className="kol-user-img-details">
                          <img src="Images/3.png" className="img-fluid" alt="avatar" />
                        </div>
                      </div>
                      <div className="col-lg-10  py-2">
                        <div className="row justify-content-between">
                            <h2>User Profile</h2>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Name</label>
                          <label className="col-sm-10 col-form-label">Sara Jammal</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Mobile</label>
                          <label className="col-sm-10 col-form-label">+91 7508482411</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Gender</label>
                          <label className="col-sm-10 col-form-label">Female</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Address</label>
                          <label className="col-sm-10 col-form-label">TENEIL IT TOWER PLOT NO F-549, IT PARK, IND AREA, Sector 75, Sahibzada Ajit Singh Nagar, Punjab 160055</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Landmark</label>
                          <label className="col-sm-10 col-form-label">Judicial Court</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">City</label>
                          <label className="col-sm-10 col-form-label">Mohali</label>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-2 col-form-label">Zip Code</label>
                          <label className="col-sm-10 col-form-label">140055</label>
                        </div>
                        <div className="row ">
                          <div className="col-sm-12 mt-4">
                            <button type="button" className="btn  btn-lg theme-btn">Edit Profile</button>
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
