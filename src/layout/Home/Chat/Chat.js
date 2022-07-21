import React, { useState } from 'react';
import './Chat.css';
import {useLocation} from "react-router-dom";
import ContactList from './components/ContactList';
import Conversation from './components/Conversation';
const Chat = () => {

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  console.log(id);
  const [term, setTerm] = useState('');
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-4'>
          <div className='card'>
            <div className='card-body p-0'>
              <div className='chat-head-bar'>
                <div className='chat-head-row'>
                  <div className='chat-head-text'>
                    <h3 className='m-0'>Chat</h3>
                  </div>
                  <div className='chat-head-icons'>
                    {' '}
                      <i className='span-icon bi bi-telephone'></i>
                      <i className='span-icon bi bi-camera-video'></i>
                  </div>
                </div>
              </div>
              <div className='chat-bar-body'>
                <div className='row'>
                  <div>
                    <form className='chat-user-search'>
                      <i className='bi bi-search search-icon'></i>
                      <input
                        className='form-control user-search-control'
                        type='text'
                        placeholder='Search'
                        aria-label='Search'
                        onChange={(e) => setTerm(e.target.value)}
                      />
                    </form>
                    <ContactList id={`${id}`}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-8'>
          <div className='card'>
            <div className='card-body p-0'>
              <Conversation id={`${id}`}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
