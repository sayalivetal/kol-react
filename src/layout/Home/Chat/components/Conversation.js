import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "../Chat.css";
import {sendMessage} from '../../../../slices/ChatSlice/ChatSlice'
const Conversation = ({ id }) => {
  let token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const [message,setMessage] = useState("")
  console.log(id);
  const handleChange = (e) =>{
    setMessage(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(sendMessage({message,id,token}))
// console.log(message);
  }
  return (
    <>
      <div className="chat-container">
        <div className="chat-row">
          <div className="chat-thumb-container">
            <div className="chat-user-thumb">
              <img src="Images/avatar.png" />
            </div>
            <span className="status-icon active"></span>
          </div>

          <div className="chat-info-container">
            <div className="chat-user-name">
              Jone Doe <span className="chat-time">09:00 AM</span>
            </div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late, i am waiting.
            </div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late.
            </div>
            <div className="chat-message-text">Hi, How are you? .</div>
          </div>
        </div>

        <div className="chat-row">
          <div className="chat-thumb-container">
            <div className="chat-user-thumb">
              <img src="Images/avatar.png" />
            </div>
            <span className="status-icon in-active"></span>
          </div>

          <div className="chat-info-container">
            <div className="chat-user-name">
              Jone Doe <span className="chat-time">09:00 AM</span>
            </div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late, i am waiting.
            </div>
            <div className="chat-message-text">Hi, How are you?</div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late, i am waiting.
            </div>
          </div>
        </div>

        <div className="chat-row">
          <div className="chat-thumb-container">
            <div className="chat-user-thumb">
              <img src="Images/avatar.png" />
            </div>
            <span className="status-icon in-active"></span>
          </div>

          <div className="chat-info-container">
            <div className="chat-user-name">
              Jone Doe <span className="chat-time">09:00 AM</span>
            </div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late, i am waiting.
            </div>
            <div className="chat-message-text">Hi, How are you?</div>
            <div className="chat-message-text">
              Hi, How are you? why are you so late, i am waiting.
            </div>
          </div>
        </div>
      </div>

      <div className="chat-input-container">
        <div>
          <form className="chat-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control chat-control"
              placeholder="Write your message here"
              onChange={handleChange}
            />
            <button type="submit" className="chat-submit-btn">
              <i class="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Conversation;
