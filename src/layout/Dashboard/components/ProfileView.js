import React, { useEffect, useState } from "react";
import { getKolprofile } from "../../../slices/api/simpleApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import { imageUrl } from "../../../common/apis";


const ProfileView = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [kolProfile, setKolProfile] = useState({});

  useEffect(() => {
    const callback = (data) => {
      console.log("new user", data);
      if (!data) {
        navigate("../profile-add")
      }
      else {
        setKolProfile(data);
      }
    };
    getKolprofile(callback, token);
  }, []);


 
  
  return (
    <>
      <div className="card">
        <div className="card-header">
            <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
              <span>Kol Profile View</span> <Link className="btn theme-btn btn-sm" to={`../profile-update`}>Edit</Link>
            </div>
        </div>
        <div className="card-body px-4 dash-profile-info" >
          <div className="col-12">
            <div className="row ">
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Name : </b>
                </label>
                <span>{kolProfile?.get_user?.name}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Email : </b>
                </label>
                <span>{kolProfile?.personal_email}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Kol Type : </b>
                </label>
                <span className="text-capitalize">{kolProfile?.kol_type}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>City : </b>
                </label>
                <span className="text-capitalize">{kolProfile?.city}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Zip Code : </b>
                </label>
                <span>{kolProfile?.zip_code}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>State : </b>
                </label>
                <span className="text-capitalize">{kolProfile?.state}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Langauge : </b>
                </label>
                <span className="text-capitalize">{kolProfile?.languages}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Most Active Platform : </b>
                </label>
                <span className="text-capitalize">{kolProfile.social_active}</span>
              </div>
              <div className="col-6 mt-3">
                <label className="form-label">
                  <b>Tags : </b>
                </label>
                <span>{kolProfile?.tags}</span>
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
                <span>
                  <div className="social-cards">
                    {
                      kolProfile?.get_social_media?.map((item, index) => {
                        return (
                          <div key={index} className="card me-2 mb-2">
                            <div className="card-body">
                              <span className="fw-bold">{item.social_user_id}</span> <i className={item.social_icon} ></i> <span className="fw-bold">{item.followers}</span>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </span>
              </div>
              
              <div className="col-12 mt-3">
                <label className="form-label">
                    <b>Avatar, Banner : </b>
                  </label>
                  <div className="col-12">
                    <div className='card profile-thumb me-4'>
                      <div className="card-header">
                        <div className="card-title h6  m-0 d-flex ">
                          <span className="">Avatar Thumb </span> 
                        </div>
                      </div>
                      <div className="card-body p-1">
                        <div className="thumb-block"> <img src={`${imageUrl}${kolProfile?.avatar}`} alt="avatar" className="img-fluid" /></div>
                      </div>
                    </div>
                    <div className='card profile-thumb'>
                      <div className="card-header">
                      <div className="card-title h6  m-0 d-flex ">
                          <span className="">Banner Thumb </span> 
                        </div>
                      </div>
                      <div className="card-body p-1">
                        <div className="thumb-block"> <img src={`${imageUrl}${kolProfile?.banner}`} alt="avatar" className="img-fluid" /></div>
                      </div>
                    </div>
                  </div>  
              </div>

              <div className="col-12 mt-3">
                <label className="form-label">
                  <b>Videos : </b>
                </label>
                <div className="row col-12">
                  {kolProfile?.video_links?.split(",").map((videoItem, index)=> {
                    return (
                      <div className="col-xl-3 col-lg-4 col-md-6 mb-4" key={index}>
                          <ReactPlayer
                            url={videoItem}
                            width='100%'
                            height='100%'
                          />
                      </div>
                    );
                  })}
                  
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
