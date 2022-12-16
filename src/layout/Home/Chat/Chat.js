import React, { useState, useEffect } from "react";
import "./Chat.css";

import { useLocation, useParams, useNavigate } from "react-router-dom";

import ContactList from "./components/ContactList";
import Conversation from "./components/Conversation";
import ContactDealer from "./components/ContactDealer";
const Chat = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [finishStatus, setFinishStatus] = useState(false);
  const onBackButtonEvent = (e) => {
    navigate(-1);
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [id]);


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="card">
            <div className="card-body p-0">
              <div className="chat-head-bar">
                <div className="chat-head-row">
                  <div className="chat-head-text">
                    <h3 className="m-0">Chat</h3>
                  </div>
                  <div className="chat-head-icons">
                    {" "}
                    <i className="span-icon bi bi-telephone"></i>
                    <i className="span-icon bi bi-camera-video"></i>
                  </div>
                </div>
              </div>
              <div className="chat-bar-body">
                <ContactList id={`${id}`} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body p-0">
              <Conversation urlId={`${id}`} />
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card" style={{minHeight: "576px"}}>
            <div className="card-body">
              <ContactDealer id={`${id}`} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Chat;
