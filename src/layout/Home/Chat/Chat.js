import React, { useState } from 'react';
import './Chat.css';
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
const Chat = () => {
  const [term, setTerm] = useState('');
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-4'>
                  <h4>Chat</h4>
                </div>
                <div className='col-lg-8'>
                  {' '}
                  <span>
                    <i className='bi bi-telephone'></i>
                  </span>
                  <span>
                    <i className='bi bi-camera-video'></i>
                  </span>
                </div>
              </div>
              <hr />
              <div className='row'>
                <div>
                  <form className='form-inline'>
                    <i className='bi bi-search'></i>
                    <input
                      className='form-control form-control-sm ml-3 w-75'
                      type='text'
                      placeholder='Search'
                      aria-label='Search'
                      onChange={(e) => setTerm(e.target.value)}
                    />
                  </form>
                  <ContactList />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='card'>
            <div className='card-body'>
              <Conversation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
