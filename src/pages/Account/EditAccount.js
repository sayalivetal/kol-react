import React from "react";

const EditAccount = () => {
  return (
    <div>
      <div className="container">
        <div className="card">
            <div className="card-body">

                  <div className="col-lg-12 px-4">
                    <div className="row justify-content-between p-md-5 list-row">
                      <div className="col-xl-3 col-lg-3 col-12 py-2 align-self-start text-center">
                        <div className="kol-user-img">
                          <img src="Images/3.png" className="img-fluid" alt="avatar" />
                        </div>
                        <button type="button" className="btn theme-btn col-12 mb-4">Update Photo</button>
                      </div>
                      <div className="col-xl-9 col-lg-9 col-12 px-lg-4">
                        <div className="row justify-content-between">
                            <h2 className="mb-4">Edit your Profile</h2>
                        </div>

                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">First Name</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">Last Name</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">Mobile</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">Gender</label>
                          <div className="col-12">
                            <div className="form-check d-inline-block me-3">
                                <input className="form-check-input" type="radio" name="gender" id="male" />
                                <label className="form-check-label" htmlFor="male">
                                    Male
                                </label>
                            </div>
                            <div className="form-check d-inline-block">
                                <input className="form-check-input" type="radio" name="gender" id="female" />
                                <label className="form-check-label" htmlFor="female">
                                    Female
                                </label>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">Address</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium ">Landmark</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">City</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-12 col-form-label fw-medium">Zip Code</label>
                          <div className="col-12">
                            <input type="text" className="form-control" placeholder="" name="" />
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-12 mt-2">
                            <button type="button" className="btn theme-btn">Save Profile</button>
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

export default EditAccount;
