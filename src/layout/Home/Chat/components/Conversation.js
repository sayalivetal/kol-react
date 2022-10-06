import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, imageUrl } from "../../../../common/apis";
import Moment from "react-moment";
import Dropdown from "react-bootstrap/Dropdown";
import { conversationList } from "../../../../slices/ChatSlice/ChatSlice";
import "../Chat.css";
import {
  sendMessage,
  chatSelector,
  messageEdit,
  messageDelete,
} from "../../../../slices/ChatSlice/ChatSlice";
import { useNavigate } from "react-router-dom";
const Conversation = ({ urlId }) => {
  const chatData = useSelector(chatSelector);

  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [chatList, setChatData] = useState([]);
  // const [deleteEdit, setDeleteEdit] = useState();
  const [kolProfile, setKolProfile] = useState([]);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  // let a = localStorage.getItem("persist:root");

  // let b = JSON.parse(a);
  // let localStorageData = JSON.parse(b.user);

  // let { username } = localStorageData;
  useEffect(() => {
    if (!chatData.chatData.length) {
      setChatData([]);
    } else {
      setChatData([...chatData.chatData]);
    }
  }, [chatData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ message, urlId, token })).then((data) => {
      if (data.payload.statusCode == 201) {
        dispatch(conversationList({ urlId, token })).then((data) => {
          // navigate(`/chat/${urlId}`);
        });
      }
    });
    e.target.reset();
  };

  return (
    <>
      <div className="chat-container">
        {chatList.length > 0 ? (
          chatList.map((item, index) => {
            return (
              <div className="chat-row">
                <div className="chat-thumb-container">
                  <div className="chat-user-thumb">
                    <img src={`${imageUrl}${item.avatar}`} alt="avatar" />
                  </div>
                  <span className="status-icon active"></span>
                </div>

                <div className="chat-info-container">
                  <div className="chat-user-name">
                    {item.name}{" "}
                    <span className="chat-time">
                      <Moment format="h:mm A">{item.sent_at}</Moment>
                    </span>
                  </div>

                  <div className="chat-message-text">{item.message}</div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="chat-row">
              <div className="chat-thumb-container">
                <div className="chat-user-thumb">
                  {/* <img src="Images/3.png" alt="avatar" /> */}
                </div>
                <span className="status-icon active"></span>
              </div>

              <div className="chat-info-container">
                <div className="chat-user-name">
                  <span className="chat-time">
                    <Moment format="h:mm A"></Moment>
                  </span>
                </div>
                <div className="chat-message-text"></div>
              </div>
            </div>
          </>
        )}
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
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Conversation;
