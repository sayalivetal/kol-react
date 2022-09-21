import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../slices/api/simpleApi";
import { imageUrl } from "../../common/apis";
const Account = () => {
  const [userDetails, setUserDetails] = useState({});
  let token = localStorage.getItem("token");
  useEffect(() => {
    const callback = (data) => {
      setUserDetails({...data});
      localStorage.setItem("avatar", data.avatar)
    };
    getUserDetails(callback, token);
  }, []);

  console.log("user",userDetails)


 // console.log(userDetails);
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
                    <img
                      src={`${imageUrl}${userDetails.avatar}`}
                      className="img-fluid"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="col-xl-10 col-lg-9 col-md-12  px-4">
                  <div className="row justify-content-between">
                    <h2 className="mb-4">User Profile</h2>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Name
                    </label>
                    <label className="col-lg-10 col-form-label">
                      {userDetails?.name} {userDetails?.last_name}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Mobile
                    </label>
                    <label className="col-lg-10 col-form-label">
                     {userDetails?.phone}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Gender
                    </label>
                    <label className="col-lg-10 col-form-label">{userDetails?.gender}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Address
                    </label>
                    <label className="col-lg-10 col-form-label">
                      {userDetails?.get_address?.address}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium ">
                      Landmark
                    </label>
                    <label className="col-lg-10 col-form-label">
                    {userDetails?.get_address?.landmark}
                    </label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      City
                    </label>
                    <label className="col-lg-10 col-form-label">{userDetails?.get_address?.city}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      State
                    </label>
                    <label className="col-lg-10 col-form-label">{userDetails?.get_address?.state}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Country
                    </label>
                    <label className="col-lg-10 col-form-label">{userDetails?.get_address?.country}</label>
                  </div>
                  <div className="row mb-3">
                    <label className="col-lg-2 col-sm-12 col-form-label fw-medium">
                      Zip Code
                    </label>
                    <label className="col-lg-10 col-form-label">{userDetails?.get_address?.zip}</label>
                  </div>
                  <div className="row ">
                    <div className="col-lg-12 mt-4">
                      <Link to={"/edit-account"} className="btn  theme-btn">
                        Edit Profile
                      </Link>
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
