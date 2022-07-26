import React, { useEffect, useState } from "react";
import '../css/styles.css'
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
import { useDispatch, useSelector } from "react-redux";
import {announceDataFormSubmission} from "../../../slices/Dashboard/dashboard";

const Announcement = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [announcement , setAnnouncement] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        social_platform: '',
        Image: ''
    });

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    useEffect(() => {
    
        let date = new Date(startDate);
        let dateStartTime = date.toLocaleTimeString();
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let finalDate = [date.getFullYear(), mnth, day].join("-");

        setAnnouncement(() => {
            return {
                ...announcement,
                start_date: finalDate + ' ' + dateStartTime,
            };
        });
    }, [startDate]);

    useEffect(() => {

        let date = new Date(endDate);
        let dateEndTime = date.toLocaleTimeString();
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let finalDate = [date.getFullYear(), mnth, day].join("-");

        setAnnouncement(() => {
          return {
            ...announcement,
            end_date: finalDate + ' '+ dateEndTime,
          };
        });
    }, [endDate]);

    const dispatch = useDispatch();

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
        console.log('announcement', announcement);
        return false;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let date = new Date(startDate);

        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        const finalDate = [date.getFullYear(), mnth, day].join("-");
        console.log('finalDate',finalDate);

        setAnnouncement({ ...announcement, 'start_date' : finalDate });
        
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("title", announcement.title);
        formData.append("description", announcement.description);
        formData.append("start_date", announcement.start_date);
        formData.append("end_date", announcement.end_date);
        formData.append("social_platform", announcement.social_platform);
        
        //Submit data
        dispatch(announceDataFormSubmission(formData));
    }    

    const announcementListMethod = () => {
        // useDispatch(getKolAnnouncements());
        // dispatch(getKolprofile());
        // navigate("../profile")
    }

    return <>
        <div className="row col-12">
            <div className="col-6">
                <h3 className="mt-4">Add Announcement</h3>
            </div>
            <div className="col-6">
                <button
                    className="btn btn-outline-secondary"
                    onClick={announcementListMethod}
                >
                    View
                </button>
            </div>
        </div>

        <div className="row">
            <form className="dashboard-main-form" onSubmit={handleSubmit}>
                <div className="row mt-3">
                    <div className="col-6">
                        <label className="form-label">
                        <b>Title</b>
                        </label>
                        <input type="text" className="form-control" onChange={handleChange} name='title' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-6">
                        <label className="form-label">
                        <b>Venue</b>
                        </label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
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
                            // format='yyyy-MM-dd'
                            showTimeInput
                        />
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
                        />
                    </div>
                        
                </div>
                <div className="col-12 mt-3">
                    <div className="col-6 ">
                        <label className="form-label">
                        <b>Social Media Platform</b>
                        </label>
                        <input type="text" className="form-control" onChange={handleChange} name='social_platform'/>
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
                    // onChange={handleChange}
                    rows="3"
                    ></textarea>
                </div>
                <div className="row mt-3">
                    <label className="form-label">
                    <b>Upload Avatar</b>
                    </label>
                    <input type="file" name="userImage" onChange={handleChange} />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary form-text">Submit</button>
                </div>
                
            </form>
        </div>
    </>
}

export default Announcement;