import React from "react";
import { useState } from 'react';
import '../css/styles.css'
import { Form } from 'react-bootstrap';
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';


const Announcement = () => {

    const [time, setTime] = useState('');
    return <>
        <h1 className="mt-4">Announcement</h1>
        <div className="row">
            <form>
                <div className="col-6">
                
                </div>
                <div className="col-6">
                    <div className="col-12">
                        <label for="exampleInputEmail1" className="form-label">Event</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        
                    </div>
                    
                    <div className="col-12">
                        <label for="exampleInputPassword1" className="form-text form-label">Venue</label>
                        <input type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="col-12">
                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                    <div>
                        <TimePicker
                            placeholder="Select Time"
                            use12Hours
                            showSecond={false}
                            focusOnOpen={true}
                            format="hh:mm A"
                            onChange={e => setTime(e.format('LT'))}
                        />
                    </div>
                    <p>Selected Time: {time || '-'}</p>
                    
                </div>
                <div>
                    <button type="submit" className="btn btn-primary form-text">Submit</button>
                </div>
                
            </form>
        </div>
    </>
}

export default Announcement;