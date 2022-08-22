import React, {  useState } from "react";
import "../Chat.css";

const ContactDealer = () => {
  return (
    <>
      <div className="col-lg-12">
            <h5>About the Creator</h5>
      </div>

      <div className="kol-user-card">
          <div className="kol-user-icon"><img className="rounded-circle  img-fluid" src="Images/3.png"  alt="avatar"/></div>
          <div className="kol-user-info">
            <div className="d-flex justify-content-between"><span className="deal-user-name">Sara Jammal</span> <span className=""><i class="bi bi-instagram"></i> 456k</span></div>
            <div className="kol-user-loc">
                <i className="loc bi-geo-alt"></i>
                <p>Mohali Punjab, India</p>
              </div>
          </div>
      </div>

      <h5 className="mt-3 mb-1 theme-color">Deals</h5>
      <div className="kol-user-deals">
          <div className="kol-list-deal">
            <div className="kol-deal-row justify-content-between align-items-start mb-0">
              <div className="kol-deal-heading h6">Instagram Post</div>
              <div className="deal-price h6">$2500 <input class="form-check-input price-check" type="radio" name="" id=""></input></div>
            </div>

            <div className="kol-deal-row">
              <span className="deal-icon-text"><i className="fa fa-calendar"></i>Days</span>
              <span className="deal-icon-text"><i className="fa fa-picture-o"></i> Image</span>
            </div>
            
            <p>When you are submitting a CV for a job, it is essential to write a profile summary at the top.
              A profile summary is a brief description of your CV listing your unique skills and experience.</p>
          </div>
          
          <div className="kol-list-deal">
            <div className="kol-deal-row justify-content-between align-items-start mb-0">
              <div className="kol-deal-heading h6">Instagram Post</div>
              <div className="deal-price h6">$2500 <input class="form-check-input price-check" type="radio" name="" id=""></input></div>
            </div>
            
            <div className="kol-deal-row">
              <span className="deal-icon-text"><i className="fa fa-calendar"></i>Days</span>
              <span className="deal-icon-text"><i className="fa fa-picture-o"></i> Image</span>
            </div>
            
            <p>When you are submitting a CV for a job, it is essential to write a profile summary at the top.
              A profile summary is a brief description of your CV listing your unique skills and experience.</p>
          </div>

      </div>

      <div className="deal-action-bar">
          <form className="deal-form-row" >
            <select className="form-select">
              <option>Order Summary</option>
              <option>Order Summary</option>
              <option>Order Summary</option>
            </select>
            <button type="submit" className="btn theme-btn">
              Buy Now
            </button>
          </form>
      </div>
    </>
  );
};

export default ContactDealer;
