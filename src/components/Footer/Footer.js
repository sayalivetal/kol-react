import React from "react";
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="container ">
        <div className="row">
        <div className="col-lg-12">
          <h3 className="footer-logo"> Logo </h3 >
          </div>
            <div className="col-lg-5">
              <div className="news-letter-block">
                <h3 className="text-color">Newsletter &amp; Get Updates</h3>
                <p className="text-color"> Sign Up for our newsletter to get up-to-date from us</p>
                <form className=" news-group">
                    <input type="text" placeholder="Enter Your mail" className="form-control newsletter-box"/>
                    <button className="btn newsletter-btn">Submit</button>
                </form>
                <div className="row text-color">
                  <p>100% Secure and Trusted Payment</p>
                </div>
                <div className="payment-card">

                  <a className="p-card" href=''><img src="../Images/visa.png" alt="" /></a>
                  <a className="p-card" href=''><img src="../Images/mastercard.png" alt="" /></a>
                  <a className="p-card" href=''><img src="../Images/paypal_card.png" alt="" /></a>

                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <h5 className="footer-menu-head">Quick Link</h5>
                  <ul className="footer-menu">
                    <li>New York</li>
                    <li>London SF</li>
                    <li>Cockfoster BP</li>
                    <li>Los Angles</li>
                    <li>Chicago</li>
                    <li>Las Vegas</li>
                    <li>Albarto</li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                <h5 className="footer-menu-head">Quick Link</h5>
                  <ul className="footer-menu">
                    <li>New York</li>
                    <li>London SF</li>
                    <li>Cockfoster BP</li>
                    <li>Los Angles</li>
                    <li>Chicago</li>
                    <li>Las Vegas</li>
                    <li>Albarto</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                <h5 className="footer-menu-head">CONTACT US</h5>
                  <ul className="footer-menu">
                    <li>Address : Painted Auto Body parts 2525 Unlimited Lane Elk Grove Village, IL 60007</li>
                    <li>Monday through Friday :<br /> 8am-5pm CST</li>
                    <li>Email: test@test.com</li>
                    <li>Phone: (+65) 66653 8060</li>
                  </ul>
                </div>
              </div>
            </div>

        </div>
      </div>
      <div className="footer-cp">
        <div className="container cp-text">Copyright &copy; 2010-2022 KOL Company S.L. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
