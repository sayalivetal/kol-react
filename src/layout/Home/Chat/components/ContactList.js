import React, { useState, useEffect } from "react";
import "../Chat.css";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getChatList } from "../../../../slices/api/simpleApi";
import {
  conversationList,
  chatSelector,
} from "../../../../slices/ChatSlice/ChatSlice";
import { imageUrl } from "../../../../common/apis";
const ContactList = ({ id }) => {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const { isSuccess } = useSelector(chatSelector);
  console.log(isSuccess);
  const [urlId, seturlId] = useState();

  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    seturlId(id);
  }, []);

  useEffect(() => {
    if (!id) return;
    handleClick(id);
  }, [id]);
  const handleClick = (id) => {
  
    if(id){
      seturlId(id)
      navigate(`/chat/${id}`)
    }
   
  };

  useEffect(() => {
    dispatch(conversationList({ urlId, token }));
  }, [urlId]);
  useEffect(() => {
    if(term){
      let a =  contactList.filter((item,index)=>{
        return item.name.includes(term)
      })
      setContactList([...a]);
      return;
    }
    const callback = (data) => {
      if(!data)return;
        setContactList([...data]);
      
     
    };
    getChatList(callback, token);
  }, [term,isSuccess]);

 

  return (
    <>
      <form className="chat-user-search">
        <i className="bi bi-search search-icon"></i>
        <input
          className="form-control user-search-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
      <div className="contact-div">
        <div className="contact-table-scroll">
          <div className="chat-users-block">
            {contactList &&
              contactList.map((item, index) => {
           
                return (
                  <div
                    key={index}
                    className={`user-item-chat ${
                      item.profile_id == urlId ? "current-active" : ""
                    }`}
                    onClick={() => handleClick(item.profile_id)}
                  >
                    <div className="user-item-thumb">
                      <img
                        src={`${imageUrl}${item.avatar}`}
                        className="profile-image rounded-circle"
                      />
                      <span className="status-icon in-active"></span>
                    </div>
                    <div className="user-item-text">
                      <div className="user-item-row">
                        <span className="user-item-name">{item.name}</span>
                        <span className="user-item-time">
                          <Moment format="h:mm A">{item.time}</Moment>
                        </span>
                      </div>

                      <div className="user-item-last-msg">{item.last_msg}</div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactList;
