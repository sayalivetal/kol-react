import React from 'react'
import '../Chat.css'
const Conversation = () => {
 

  return (
    <>

    <div className='chat-container'>
      <div className='chat-row'>
        <div className='chat-thumb-container'>
          <div className='chat-user-thumb'>
              <img src="Images/avatar.png" />
          </div>
          <span className='status-icon active'></span>
        </div>

        <div className='chat-info-container'>
          <div className='chat-user-name'>Jone Doe  <span className='chat-time'>09:00 AM</span></div>
          <div className='chat-message-text'>Hi, How are you? why are you so late, i am waiting.</div>
          <div className='chat-message-text'>Hi, How are you? why are you so late.</div>
          <div className='chat-message-text'>Hi, How are you? .</div>
        </div>
      </div>

      <div className='chat-row'>
        <div className='chat-thumb-container'>
          <div className='chat-user-thumb'>
              <img src="Images/avatar.png" />
          </div>
          <span className='status-icon in-active'></span>
        </div>

        <div className='chat-info-container'>
          <div className='chat-user-name'>Jone Doe  <span className='chat-time'>09:00 AM</span></div>
          <div className='chat-message-text'>Hi, How are you? why are you so late, i am waiting.</div>
          <div className='chat-message-text'>Hi, How are you?</div>
          <div className='chat-message-text'>Hi, How are you? why are you so late, i am waiting.</div>
        </div>
      </div>

      <div className='chat-row'>
        <div className='chat-thumb-container'>
          <div className='chat-user-thumb'>
              <img src="Images/avatar.png" />
          </div>
          <span className='status-icon in-active'></span>
        </div>

        <div className='chat-info-container'>
          <div className='chat-user-name'>Jone Doe  <span className='chat-time'>09:00 AM</span></div>
          <div className='chat-message-text'>Hi, How are you? why are you so late, i am waiting.</div>
          <div className='chat-message-text'>Hi, How are you?</div>
          <div className='chat-message-text'>Hi, How are you? why are you so late, i am waiting.</div>
        </div>
      </div>

    </div>



    <div className='chat-input-container'>
        <div className='chat-input-row'>
          <input type="text" className="form-control chat-control" placeholder='Write your message here' />
          <button type="submit" className='chat-submit-btn'><i class="bi bi-send-fill"></i></button>
        </div>
    </div>


    </>
  )
}

export default Conversation