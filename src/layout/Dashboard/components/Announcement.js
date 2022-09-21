import React, { useEffect, useState } from "react";

import "../css/styles.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { imageUrl } from "../../../common/apis";
import { useDispatch, useSelector } from "react-redux";
import {
  announceDataFormSubmission,
  dashboardSelector,
} from "../../../slices/Dashboard/dashboard";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAnnouncement, getAllStreams } from "../../../slices/api/simpleApi";
import { toast } from "react-toastify";
import moment from "moment";


const Announcement = () => {
  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    social_platform: "",
    // Image: "",
    imageUrl: "",
  });

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { message } = useSelector(dashboardSelector);
  let navigate = useNavigate();

  useEffect(() => {
    toast.success(message);
  }, [message]);

  useEffect(() => {
    const callback = (data) => {
      if (data.length) {
        setAnnouncement(() => {
          return {
            ...announcement,
            title: data[0].title,
            description: data[0].description,
            start_date: data[0].start_date,
            end_date: data[0].end_date,
            social_platform: data[0].social_platform,
            imageUrl: data[0].image,
          };
        });
      }
    };
    getAnnouncement(callback, token, id);
  }, [id]);


 
  const [selectedFile, setSelectedFile] = useState(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [social_active, setSocialActive] = useState([]);
  const [error, setError] = useState({
    title: 0,
    description: 0,
    start_date: 0,
    end_date: 0,
    social_platform: 0,
  });

  useEffect(() => {
    if (!startDate) return;
    let date = new Date(startDate);
    let dateStartTime = date.toLocaleTimeString();
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let finalDate = [date.getFullYear(), mnth, day].join("-");

   


    setAnnouncement(() => {
      return {
        ...announcement,
        start_date: moment(`${finalDate} ${dateStartTime}`).format('YYYY-MM-DD hh:mm:ss')
      };
    });
  }, [startDate]);


  useEffect(() => {
    if (!endDate) return;
    let date = new Date(endDate);
    let dateEndTime = date.toLocaleTimeString();
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let finalDate = [date.getFullYear(), mnth, day].join("-");

    setAnnouncement(() => {
      return {
        ...announcement,
        end_date: moment(`${finalDate} ${dateEndTime}`).format('YYYY-MM-DD hh:mm:ss')
      };
    });
  }, [endDate]);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });

    if (e.target.name == "userImage") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
      
        return;
      }
      setSelectedFile(e.target.files[0]);
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!id){
      let a = {};
      for (const announcementKey in announcement) {
        if (
          announcement[announcementKey] == "" ||
          announcement[announcementKey] == undefined
        ) {
          a[announcementKey] = 1;
          setError({
            ...a,
          });
        }
      }
  
      for (let key in error) {
        if (error[key] == 0) {
          toast.error("Please fill details");
          return;
        }
      }
    }
 

    const formData = new FormData();
    if (selectedFile) {
   
      formData.append("image", selectedFile);
    }
    if(id){
      formData.append("id",id);
    }
    
    formData.append("title", announcement.title);
    formData.append("description", announcement.description);
    formData.append("start_date", announcement.start_date);
    formData.append("end_date", announcement.end_date);
    formData.append("social_platform", announcement.social_platform);
 

    //Submit data
    dispatch(announceDataFormSubmission(formData)).then((data) => {
  
      if (data.payload.statusCode == 201) {
        navigate("../../dashboard/announcement/list");
      }
      if (data.payload.statusCode == 202) {
        navigate("../../dashboard/announcement/list");
      }
    });

    // toast.success(message)
  };

  useEffect(() => {
    const callback = (data) => {
   
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);


  const handleChangeSocialActive = (e) => {
    //setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
    setAnnouncement((prevState) => {
      return { ...prevState, [e.target.name]: [e.target.value] };
    });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Announcements </span> {id && <Link className="btn theme-btn btn-sm" to={`/dashboard/announcement/view/${id}`}>View</Link>}
          </div>
        </div>
        <div className="card-body px-4" >

          <form className="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Title</b>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={announcement.title}
                  onChange={handleChange}
                  name="title"
                />
                {error.title == 1 ? (
                  <span className="error-show">Please fill valid title</span>
                ) : null}
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Social Media Platform</b>
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  value={announcement.social_platform}
                  onChange={handleChange}
                  name="social_platform"
                  autoComplete="off"
                />
                {error.social_platform == 1 ? (
                  <span className="error-show">
                    Please fill valid social Media
                  </span>
                ) : null} */}

                    <select
                    className="form-select"
                    name="social_platform"
                    onChange={handleChangeSocialActive}
                  >
                    {/* <option defaultValue>Select Event Type</option> */}
                    <option value={announcement?.social_platform}>
                        {announcement.social_platform ? announcement.social_platform : "Social platform"}
                    </option>

                    {Object.keys(social_active).map((keyName, keyIndex) => {
                      return (
                        <option key={keyIndex} value={keyName}>
                          {keyName}
                        </option>
                      );
                    })}
                  </select>

              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Start Date</b>
                </label>
                <DatePicker
                  selected={startDate}
                  name="start_date_time"
                  onChange={(date) => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd hh:mm:ss "
                  showTimeInput
                  value={announcement.start_date}
                  className="form-control"
                  autoComplete="off"
                />
                {error.start_date == 1 ? (
                  <span className="error-show">Please fill valid start date</span>
                ) : null}
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>End Date</b>
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd hh:mm:ss "
                  showTimeInput
                  name="end_date_time"
                  value={announcement.end_date}
                  className="form-control"
                  autoComplete="off"
                />
                {error.start_date == 1 ? (
                  <span className="error-show">Please fill valid end date</span>
                ) : null}
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Description</b>
                </label>
                <textarea
                  className="form-control "
                  name="description"
                  onChange={handleChange}
                  rows="6"
                  value={announcement.description}
                ></textarea>
                {error.description == 1 ? (
                  <span className="error-show">Please fill description</span>
                ) : null}
              </div>
              <div className="col-lg-6 col-sm-12 mt-3 d-flex">
                <div className="profile-img-thumb mt-1" style={{width:"24%"}}> 
                  {announcement.imageUrl && (
                    <img className="img-fluid" src={`${imageUrl}${announcement.imageUrl}`} alt="Banner" />
                  )}
                </div>
                <div className="profile-img-group">
                  <label className="form-label">
                    <b>Upload Banner Thumb</b>
                  </label>
                  <input type="file" className="form-control" name="userImage" onChange={handleChange} />
                </div>
              </div>



              <div className="col-12 mt-3">
                <button type="submit" className="btn theme-btn form-text">
                  Submit
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>  

      
    </>
  );
};

export default Announcement;
