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
import { getAnnouncement } from "../../../slices/api/simpleApi";
import { toast } from "react-toastify";

const Announcement = () => {
  const dispatch = useDispatch();

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

  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    social_platform: "",
    Image: "",
    imageUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
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
    console.log(finalDate,dateStartTime);
    setAnnouncement(() => {
      return {
        ...announcement,
        start_date: `${finalDate} ${dateStartTime}`,
      };
    });
  }, [startDate]);
console.log(announcement.start_date);
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
        end_date: finalDate + " " + dateEndTime,
      };
    });
  }, [endDate]);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });

    if (e.target.name == "userImage") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
        console.log("File is large");
        return;
      }
      setSelectedFile(e.target.files[0]);
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // let date = new Date(startDate);

    // let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    // let day = ("0" + date.getDate()).slice(-2);
    // const finalDate = [date.getFullYear(), mnth, day].join("-");

    // setAnnouncement({ ...announcement, start_date: finalDate });
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

    const formData = new FormData();
    if(!selectedFile){
        // formData.append("image", selectedFile);
        formData.append("title", announcement.title);
        formData.append("description", announcement.description);
        formData.append("start_date", announcement.start_date);
        formData.append("end_date", announcement.end_date);
        formData.append("social_platform", announcement.social_platform);
    }else{
        formData.append("image", selectedFile);
        formData.append("title", announcement.title);
        formData.append("description", announcement.description);
        formData.append("start_date", announcement.start_date);
        formData.append("end_date", announcement.end_date);
        formData.append("social_platform", announcement.social_platform);
    }
   
    console.log(formData);

    //Submit data
    dispatch(announceDataFormSubmission(formData)).then((data)=>{
        console.log(data);
        if(data.payload.statusCode == 201){
            navigate("../../dashboard/announcement/list");
        }
       
    })

    // toast.success(message)
  };

  return (
    <>
      <div className="row col-12">
        <div className="col-6">
          <h3 className="mt-4">Add Announcement</h3>
        </div>
        <div className="col-6">
          {id && <Link to={`/dashboard/announcement/view/${id}`}>View</Link>}
        </div>
      </div>

      <div className="row">
        <form className="dashboard-main-form" onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col-6">
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
            <div className="col-6 ">
              <label className="form-label">
                <b>Social Media Platform</b>
              </label>
              <input
                type="text"
                className="form-control"
                value={announcement.social_platform}
                onChange={handleChange}
                name="social_platform"
              />
              {error.social_platform == 1 ? (
                <span className="error-show">
                  Please fill valid social Media
                </span>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <label className="form-label">
                <b>Start Date</b>
              </label>
              <DatePicker
                selected={startDate}
                name="start_date_time"
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="yyyy-MM-dd hh:mm:ss aa"
                showTimeInput
                value={announcement.start_date}
              />
              {error.start_date == 1 ? (
                <span className="error-show">Please fill valid start date</span>
              ) : null}
            </div>
            <div className="col-6">
              <label className="form-label">
                <b>End Date</b>
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                timeInputLabel="Time:"
                dateFormat="yyyy-MM-dd hh:mm:ss aa"
                showTimeInput
                name="end_date_time"
                value={announcement.end_date}
              />
              {error.start_date == 1 ? (
                <span className="error-show">Please fill valid end date</span>
              ) : null}
            </div>
          </div>
       
          <div className="col-12 mt-3">
            <label className="form-label">
              <b>Description</b>
            </label>
            <textarea
              className="form-control form-text"
              id="exampleFormControlTextarea1"
              name="description"
              onChange={handleChange}
              rows="3"
              value={announcement.description}
            ></textarea>
            {error.description == 1 ? (
              <span className="error-show">Please fill description</span>
            ) : null}
          </div>
          <div className="row mt-3">
            <label className="form-label">
              <b>Upload Avatar</b>
            </label>
            <input type="file" name="userImage" onChange={handleChange} />
          </div>

          {announcement.imageUrl && (
            <img src={`${imageUrl}${announcement.imageUrl}`} />
          )}

          <div>
            <button type="submit" className="btn btn-primary form-text">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Announcement;
