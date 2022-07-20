import React, { useState, useEffect } from "react";
import "../Chat.css";
import Moment from 'react-moment'
import { useDispatch,useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { getChatList } from "../../../../slices/api/simpleApi";
import {conversationList,chatSelector} from '../../../../slices/ChatSlice/ChatSlice'
const ContactList = ({ id }) => {
  const navigate = useNavigate()
  const {isSuccess} = useSelector(chatSelector)
  console.log(isSuccess);
  const dispatch = useDispatch()
  console.log("==========>", id);
  let token = localStorage.getItem("token");
  const [contactList, setContactList] = useState([]);
  const handleClick = (id) =>{
    
    dispatch(conversationList({id,token}))
    
  }
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
                      <span className="user-item-name" onClick={()=>handleClick(item.profile_id)}>
                        {item.name}
                      </span>
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
