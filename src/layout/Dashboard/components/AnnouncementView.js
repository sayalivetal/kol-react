import React, { useEffect, useState } from 'react'
import { getAnnouncement } from '../../../slices/api/simpleApi'
import { useParams } from "react-router-dom";
import { imageUrl } from '../../../common/apis'
import { Link } from "react-router-dom";

const AnnouncementView = () => {

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [announcementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    const callback = (data) => {

      setAnnouncementData([...data])
    };
    getAnnouncement(callback, token, id);
  }, [id]);



  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>View Announcements </span> <Link className="btn theme-btn btn-sm" to={`/dashboard/announcement/${id}`}>Edit</Link>
          </div>
        </div>
        <div className="card-body px-4" >
          {
            announcementData && announcementData.map((item, index) => {
              return (
                <div className="" key={index}>
                  <div className="row announcement-view">
                      <div className="col-lg-3 col-sm-12 mt-3">
                        <div className='card'>
                          <div className="card-header">
                            <div className="card-title h5  m-0 d-flex ">
                              <span>Banner Thumb</span> 
                            </div>
                          </div>
                          <img className='img-fluid' src={`${imageUrl}${item.image}`} />
                        </div>
                      </div>

                      <div className="col-lg-9 col-sm-12 ">
                        <div className="col-12 mt-3">
                          <label className="form-label">
                            <b>Title : </b>
                          </label>
                          <span> {item.title}</span>
                        </div>
                        <div className="col-12 mt-3">
                          <label className="form-label">
                            <b>Start Date : </b>
                          </label>
                          <span> {item.start_date}</span>
                        </div>

                        <div className="col-12 mt-3">
                          <label className="form-label">
                            <b>Description : </b>
                          </label>
                          <span> {item.description}</span>
                        </div>
                        <div className="col-12 mt-3">
                          <label className="form-label">
                            <b>End Date : </b>
                          </label>
                          <span> {item.end_date}</span>
                        </div>

                        <div className="col-12 mt-3">
                          <label className="form-label">
                            <b>Social Media Platform : </b>
                          </label>
                          <span> {item.social_platform}</span>
                        </div>
                      </div>
                    
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>



    </>
  )
}

export default AnnouncementView