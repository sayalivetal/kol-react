import React from "react";
import { useState } from 'react';
import '../css/styles.css'
import { Form } from 'react-bootstrap';
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';


const Announcement = () => {

    const [time, setTime] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [announcement , setAnnouncement] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        social_platform: '',
        Image: ''
    });

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
        console.log('announcement',announcement);
        
        const formData = new FormData();
        formData.append("Image", selectedFile);
        formData.append("title", announcement.title);
        formData.append("description", announcement.description);
        formData.append("start_date", announcement.start_date);
        formData.append("end_date", announcement.end_date);
        formData.append("social_platform", announcement.social_platform);
        
    }    

    return <>
        <h1 className="mt-4">Announcement</h1>

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
                        <Form.Group controlId="dob">
                            <label className="form-label">
                            <b>Start Date</b>
                            </label>
                            <Form.Control type="date" name="start_date" onChange={handleChange} placeholder="" />
                        </Form.Group>    
                    </div>
                    <div className="col-6">
                        <Form.Group controlId="dob">
                            <label className="form-label">
                            <b>End Date</b>
                            </label>
                            <Form.Control type="date" name="end_date" onChange={handleChange} placeholder="" />
                        </Form.Group>    
                    </div>
                        
                </div>
                <div className="row mt-3">
                    <div className="col-6 ">
                        <label className="form-label">
                        <b>Start Time</b>
                        </label>
                        <TimePicker
                            placeholder="Select Time"
                            className="form-control"
                            use12Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="hh:mm A"
                            onChange={e => setTime(e.format('LT'))}
                        />
                        {/* <p>Selected Time: {time || '-'}</p> */}
                    </div>
                    <div className="col-6 ">
                        <label className="form-label">
                        <b>End Time</b>
                        </label>
                        <TimePicker
                            placeholder="Select Time"
                            className="form-control"
                            use12Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="hh:mm A"
                            onChange={e => setTime(e.format('LT'))}
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
                    <b>Bio</b>
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