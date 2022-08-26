import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKolprofile } from "../../../slices/api/simpleApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProfileView = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [kolProfile, setKolProfile] = useState({});

  useEffect(() => {
    const callback = (data) => {
      console.log("hbjfhjfg", data);
      if (data === 'Please add profile details first.') {
        navigate("../profileupdate")
      }
      else {
        setKolProfile(data);
      }
    };
    getKolprofile(callback, token);
  }, []);

  const openPersonalDataForm = () => {
    // dispatch(getKolprofile());
    // navigate("../profile")
  };

  console.log("data", kolProfile);

  return (
    <>
      <div className="card">
        <div className="card-header">
            <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
              <span>Kol Profile View</span> <Link className="btn theme-btn btn-sm" to={`../profile-update`}>Edit</Link>
            </div>
        </div>
        <div className="card-body px-4" >
          <div className="col-12">
            <div className="row ">
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Name : </b>
                </label>
                <span> {kolProfile?.get_user?.name}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Email : </b>
                </label>
                <span> {kolProfile?.personal_email}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Kol Type : </b>
                </label>
                <span> {kolProfile?.kol_type}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>City : </b>
                </label>
                <span> {kolProfile?.city}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Zip Code : </b>
                </label>
                <span> {kolProfile?.zip_code}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>State : </b>
                </label>
                <span> {kolProfile?.state}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Langauge : </b>
                </label>
                <span> {kolProfile?.languages}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Most Active Platform : </b>
                </label>
                <span>{kolProfile.social_active}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Tags : </b>
                </label>
                <span> {kolProfile?.tags}</span>
              </div>
              <div className="col-12 mt-3">
                <label className="form-label">
                  <b>Description : </b>
                </label>
                <span>{kolProfile?.bio}</span>
              </div>
              <div className="col-12 mt-3">
                <label className="form-label">
                  <b>Social Media Info : </b>
                </label>
                {
                  kolProfile?.get_social_media?.map((item, index) => {
                    console.log(item);
                    return (
                      <div style={{ marginLeft: "20px" }} className="row">
                        <div className="col">
                          {" "}
                          <h6>Platform :</h6>{item.name}
                        </div>
                        <div className="col">
                          {" "}
                          <h6>Username :</h6>{item.social_user_id}
                        </div>
                        <div className="col">
                          {" "}
                          <h6>Followers :</h6>{item.followers}
                        </div>
                        {/* <div className="col">
                          {" "}
                          <h6>Icon :</h6>{item.social_icon}
                        </div> */}
                      </div>
                    )
                  })
                }
              </div>
              
              
              <div className="col-12 mt-3">
                <label className="form-label">
                  <b>Videos : </b>
                </label>
                <div className="row col-12">
                  <span>{kolProfile?.video_links}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default ProfileView;
