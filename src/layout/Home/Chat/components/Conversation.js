import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import Dropdown from "react-bootstrap/Dropdown";
import "../Chat.css";
import {
  sendMessage,
  chatSelector,
  messageEdit,
  messageDelete,
} from "../../../../slices/ChatSlice/ChatSlice";
const Conversation = ({ id }) => {
  const chatData = useSelector(chatSelector);
  // console.log(chatData.chatData);
  let token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [chatList, setChatData] = useState([]);
  // const [deleteEdit, setDeleteEdit] = useState();
  const [edit, setEdit] = useState();
  const [editData, setEditData] = useState("");

  // console.log(editData);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  let a = localStorage.getItem("persist:root");

  let b = JSON.parse(a);
  let localStorageData = JSON.parse(b.user);
  //console.log(localStorageData);
  let { username } = localStorageData;
  useEffect(() => {
    if (!chatData.chatData.length) {
      setChatData([]);
    } else {
      setChatData([...chatData.chatData]);
    }
  }, [chatData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ message, id, token }));
    e.target.reset();
    const newObj = {
      avatar:
        "http://8ed8-203-145-168-10.in.ngrok.io/uploads/profile/16576921762043.face-sachin.jpg",
      message: message,
      name: username,
      sent_at: new Date(),
    };
    setChatData([...chatList, newObj]);
  };
  // const handleDeleteEdit = (id, message) => {
  //   setDeleteEdit(id);

  //   console.log(id, message);
  // };
  //console.log("==============>", chatList);

  // const handleMouseOut = () => {
  //   setDeleteEdit("");
  // };
  // const handleEditDeleteChange = (e, id) => {
  //   if (e == "edit") {
  //     setEdit(id);
  //   }
  //   if (e == "delete") {
  //     dispatch(messageDelete({token,id}))
  //   }
  // };
  // const handleSaveMessage = (id) => {
  //   // dispatch(messageEdit({ token, editData, id }));

  //   const newObj1 = {
  //     message: chatData,
  //     name: username,
  //     avatar: null,
  //     edit_at: "",
  //     last_name: null,
  //     message_id: null,
  //     receiver_id: null,
  //     sender_id: null,
  //     sent_at: "",
  //   };

  //   setChatData([...chatList, newObj1]);
  // };

  //console.log("jhfdgfhgfdhgfjhg", edit);

  return (
    <>
      <div className="chat-container">
        {chatList.length > 0 ? (
          chatList.map((item, index) => {
            return (
              <div className="chat-row">
                <div className="chat-thumb-container">
                  <div className="chat-user-thumb">
                    <img src={item.avatar}  alt="avatar" />
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
                  <img src="Images/3.png" alt="avatar" />
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
