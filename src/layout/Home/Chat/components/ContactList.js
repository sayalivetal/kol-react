import React, { useState } from 'react';
import '../Chat.css';
const ContactList = () => {
  return (
    <div className='contact-div'>
      <div className='contact-table-scroll'>
        <table className='table table-hover'>
          <tbody>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src='./Images/5.jpg'
                  className='profile-image rounded-circle'
                />
              </td>
              <td>
                Jone Doe
                <br />
                <small>Hi, How are you?</small>
              </td>
              <td>
                <small>11:55 PM</small>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
