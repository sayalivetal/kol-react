import React, { useEffect, useState } from "react";
import "../css/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { imageUrl } from "../../../common/apis";
import { useDispatch, useSelector } from "react-redux";
import { announceDataFormSubmission, } from "../../../slices/Dashboard/dashboard";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAnnouncement, getAllStreams } from "../../../slices/api/simpleApi";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "react-js-loader";


const Announcement = () => {

  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    social_platform: "",
    imageUrl: "",
  });

  const { id } = useParams();
  const token = localStorage.getItem("token");

  let navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [social_active, setSocialActive] = useState([]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const callback = (data) => {
      setSocialActive({ ...data });
    };
    getAllStreams(callback, token);
  }, []);

  const handleChange = (e) => {
    setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
    //setError({});
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
    setBtnLoader(true)

    // if(!id){
    //   let a = {};
    //   setBtnLoader(false)
    //   for (const announcementKey in announcement) {
    //     if (announcement[announcementKey] == "" || announcement[announcementKey] == undefined) {
    //       a[announcementKey] = 1;
    //       setError({
    //         ...a,
    //       });
    //     }
    //   }
    //   for (let key in error) {
    //     if (error[key] == 0) {
    //       toast.error("Please fill details");
    //       return;
    //     }
    //   }
    // }
 
    const formData = new FormData();
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    if(id){
      formData.append("id",id);
    }

    formData.append("title", announcement.title);
    formData.append("social_platform", announcement.social_platform);
    formData.append("start_date", announcement.start_date);
    formData.append("end_date", announcement.end_date);
    formData.append("description", announcement.description);

    if (announcement.title == "" || announcement.social_platform == "" || announcement.start_date == "" || announcement.end_date_time == "" || announcement.description == "" ) {
      setError("Please fill the mandatory filed");
      setBtnLoader(false);
      return;
    }else {
      dispatch(announceDataFormSubmission(formData)).then((data) => {
        if (data.payload.statusCode === 201 || data.payload.statusCode === 202 ) {
          toast.success(data?.payload?.message)
          navigate("../../dashboard/announcement/list");
          setBtnLoader(false)
        }else if (data.payload.statusCode === 500 ) {
          toast.warning(data?.payload?.message)
          navigate("../../dashboard/profile-add");
          setBtnLoader(false)
        }else{
          toast.error(data?.payload?.message)
          setBtnLoader(false)
        }
      });
    }
  };

  // const handleChangeSocialActive = (e) => {
  //   //setSocialActive(Array.isArray(e) ? e.map((x) => x.value) : []);
  //   setAnnouncement((prevState) => {
  //     return { ...prevState, [e.target.name]: [e.target.value] };
  //   });
  // };

  return (
    <>
      <div className="card mb-5">
        <div className="card-header">
          <div className="card-title h5 justify-content-between m-0 d-flex align-items-center">
            <span>Announcements </span> {id && <Link className="btn theme-btn btn-sm" to={`/dashboard/announcement/view/${id}`}>View</Link>}
          </div>
        </div>
        <div className="card-body px-4" >

          <form className="" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label"><b>Title <span className="text-danger">*</span></b></label>
                <input
                  type="text"
                  className={`form-control ${error === "" || announcement.title
                      ? ""
                      : "border-danger"
                    }`}
                  value={announcement.title}
                  onChange={handleChange}
                  name="title"
                  placeholder="Enter Announcement Title"
                />
                <span className="err text-danger">
                  {error && announcement.title == "" && (
                    <>{error}</>
                  )}
                </span>
              </div>
              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Social Media Platform <span className="text-danger">*</span></b>
                </label>
                    <select
                    className={`form-select ${error === "" || announcement.social_platform
                        ? ""
                        : "border-danger"
                      }`}
                    name="social_platform"
                    onChange={handleChange}
                    value={announcement.social_platform ? announcement.social_platform : "Select Social platform"}
                  >
                    <option value="">Select Social platform</option>
                    {/* <option value={announcement?.social_platform}>
                        {announcement.social_platform ? announcement.social_platform : "Social platform"}
                    </option> */}

                    {Object.keys(social_active).map((keyName, keyIndex) => {
                      return (
                        <option key={keyIndex} value={keyName}>
                          {keyName}
                        </option>
                      );
                    })}
                  </select>

                  <span className="err text-danger">
                    {error && announcement.social_platform == "" && (
                      <>{error}</>
                    )}
                  </span>

              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Start Date <span className="text-danger">*</span></b>
                </label>
                <DatePicker
                  selected={startDate}
                  name="start_date"
                  onChange={(date) => setStartDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd hh:mm:ss "
                  showTimeInput
                  value={announcement.start_date}
                  minDate={moment().toDate()}
                  className={`form-control ${error === "" || announcement.start_date
                      ? ""
                      : "border-danger"
                    }`}
                  autoComplete="off"
                  placeholderText="Select Date"
                />
                <span className="err text-danger">
                    {error && announcement.start_date == "" && (
                      <>{error}</>
                    )}
                </span>
              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>End Date <span className="text-danger">*</span></b>
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  timeInputLabel="Time:"
                  dateFormat="yyyy-MM-dd hh:mm:ss "
                  showTimeInput
                  name="end_date_time"
                  minDate={moment().toDate()}
                  value={announcement.end_date}
                  className={`form-control ${error === "" || announcement.end_date
                      ? ""
                      : "border-danger"
                    }`}
                  autoComplete="off"
                  placeholderText="Select Date"
                />
                <span className="err text-danger">
                    {error && announcement.end_date == "" && (
                      <>{error}</>
                    )}
                </span>

              </div>

              <div className="col-lg-6 col-sm-12 mt-3">
                <label className="form-label">
                  <b>Description <span className="text-danger">*</span></b>
                </label>
                <textarea
                  className={`form-control ${error === "" || announcement.description
                      ? ""
                      : "border-danger"
                    }`}
                  name="description"
                  onChange={handleChange}
                  rows="6"
                  value={announcement.description}
                  placeholder="Enter Description"
                ></textarea>
                <span className="err text-danger">
                    {error && announcement.description == "" && (
                      <>{error}</>
                    )}
                </span>
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
                <button type="submit" className="btn theme-btn form-text spiner-btn">
                  {btnLoader ? <Loader type="spinner-cub" title={"Submit"} size={16} /> : 'Submit'}
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
