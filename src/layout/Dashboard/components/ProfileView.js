import React , { useEffect, useState }from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getKolprofile} from '../../../slices/Dashboard/dashboard'
import { dashboardSelector } from '../../../slices/Dashboard/dashboard';
import { useNavigate} from 'react-router-dom';

const ProfileView = () => {

  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const {biodata:{kolProfile}} = useSelector(dashboardSelector);

  console.log('view====',kolProfile);

  const openPersonalDataForm = () => {
    if (Object.keys(kolProfile).length === 0) {
      navigate("../profileupdate")
    }else{
      navigate("../profile")
    }
      
  }

  return (

    <>
      <h3 className="mt-4">Kol Profile View</h3>
      <button className="btn btn-outline-secondary" onClick={openPersonalDataForm}>Edit</button>

      <div className='dashboard-main-form' >
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Name : </b>
            </label>
            <span> {kolProfile?.get_user.name}</span>
          </div>
          <div className="col-6">
            <label className="form-label">
              <b>Email : </b>
            </label>
            <span> {kolProfile?.personal_email}</span>
          </div>  
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Kol Type : </b>
            </label>
            <span> {kolProfile?.kol_type}</span>
          </div>
          <div className="col-6">
            <label className="form-label">
              <b>City : </b>
            </label>
            <span> {kolProfile?.city}</span>
          </div>  
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Zip Code : </b>
            </label>
            <span> {kolProfile?.zip_code}</span>
          </div>
          <div className="col-6">
            <label className="form-label">
              <b>State : </b>
            </label>
            <span> {kolProfile?.state}</span>
          </div>  
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Langauge : </b>
            </label>
            <span> {kolProfile?.languages}</span>
          </div>
           <div className="col-6">
            <label className="form-label">
              <b>State : </b>
            </label>
            <span> Uttar Pradesh</span>
          </div>   
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Most Active Platform : </b>
            </label>
            <span> {kolProfile?.social_active.charAt(0).toUpperCase() + kolProfile?.social_active.slice(1)}</span>
          </div>
          <div className="col-6">
            <label className="form-label">
              <b>Tags : </b>
            </label>
            <span> {kolProfile?.tags}</span>
          </div>  
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Social Media Info : </b>
            </label>
            <div style={{marginLeft: '20px'}} className='row'>
              <div className='col'> <h6>Platform :</h6> Youtube </div>
              <div className='col'> <h6>Username :</h6> amitYoutuber@123</div>
              <div className='col'> <h6>Followers :</h6> Youtube </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Videos : </b>
            </label>
            <div className='row col-12'>
              <span>{kolProfile?.video_links}</span>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Description :  </b>
            </label>
            <span>{ kolProfile?.bio}</span>
          </div>
        </div>
      </div>  
    </>
  )
}

export default ProfileView