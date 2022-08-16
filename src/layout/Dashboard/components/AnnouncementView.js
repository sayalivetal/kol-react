import React, { useEffect , useState } from 'react'
import {getAnnouncement} from '../../../slices/api/simpleApi'
import { useParams } from "react-router-dom";
import {imageUrl} from '../../../common/apis' 
import { Link } from "react-router-dom";

const AnnouncementView = () => {
  
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [announcementData , setAnnouncementData] = useState({imageUrl: ''});
  
  useEffect(() => {
    const callback = (data) => {
      setAnnouncementData(data[0])
    };
    getAnnouncement(callback, token , id);
  }, []);



  return (
    <>
      <div className="row col-12">
        <div className="col-6">
            <h3 className="mt-4">Add Announcement</h3>
        </div>
        <div className="col-6">
          <Link to={`/dashboard/announcement/${id}`}>Edit</Link>
          <Link to={`/dashboard/announcement`}>Add</Link>
        </div>

      </div>
    
      <div className="dashboard-main-form">
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Title : </b>
            </label>
            <span> {announcementData.title}</span>
          </div>
          <div className="col-6">
            <label className="form-label">
              <b>Start Date : </b>
            </label>
            <span> {announcementData.start_date}</span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Description : </b>
            </label>
            <span> {announcementData.description}</span>
          </div>
          <div className="col-6">
              <label className="form-label">
                <b>End Date : </b>
              </label>
              <span> {announcementData.end_date}</span>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <label className="form-label">
              <b>Social Media Platform : </b>
            </label>
            <span> {announcementData.platform}</span>
          </div>
          <div className="col-6">
              <label className="form-label">
                <b>Image : </b>
              </label>
              <img src={`${imageUrl}${announcementData.imageUrl}` } /> 
          </div>
        </div>
      </div>
    </>
  )
}

export default AnnouncementView