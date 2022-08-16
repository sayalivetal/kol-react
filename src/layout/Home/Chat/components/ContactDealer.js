import React, { useEffect, useState } from "react";


import "../Chat.css";

const ContactDealer = () => {
  return (
    <>
      <div className="col-lg-12">
            <h5>About the Creator</h5>
      </div>

      <div className="chat-input-container">
        <div>
          <form className="chat-input-row" >
            <input
              type="text"
              className="form-control chat-control"
              placeholder="Write your message here"
              
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

export default ContactDealer;
