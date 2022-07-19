import React, { useState, useEffect } from "react";
import "../Chat.css";
import Moment from 'react-moment'
import { Link } from "react-router-dom";
import { getChatList } from "../../../../slices/api/simpleApi";
const ContactList = ({ id }) => {
  console.log("==========>", id);
  let token = localStorage.getItem("token");
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    const callback = (data) => {
      setContactList([...data]);
    };
    getChatList(callback, token);
  }, []);
  console.log(contactList);
  return (
    <div className="contact-div">
      <div className="contact-table-scroll">
        <div className="chat-users-block">
          {contactList &&
            contactList.map((item, index) => {
              return (
                <div key={index} className="user-item-chat">
                  <div className="user-item-thumb">
                    <img
                      src={item.avatar}
                      className="profile-image rounded-circle"
                    />
                    <span className="status-icon in-active"></span>
                  </div>
                  <div className="user-item-text">
                    <div className="user-item-row">
                      <Link to=""className="user-item-name">
                        {item.name}
                      </Link>
                      <span className="user-item-time"><Moment format='h:mm A'>{item.time}</Moment></span>
                    </div>

                    <div className="user-item-last-msg">{item.last_msg}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
