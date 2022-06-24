import React from "react";
import './Footer.css'
const Footer = () => {
  return (
    <footer className="footer-clr">
      <div className="container ">
        <div className="row">

            <div className="col-lg-5">
              <div>
                <h3 className="text-color">
                  Logo
                </h3 >
                <h3 className="text-color">
                  Newsletter &amp; Get Updates
                </h3>
                <span className="text-color">
                  Sign Up for our newsletter to get up-to-date from us
                </span>
                <form class="form-inline">
                  <div className="form-group text-color">
                    <input type="text" placeholder="Enter Your mail" className="form-control input-typ"/>
                    <button className="btn submt-bttn">Submit</button>
                  </div>
                </form>
                <div className="row text-color">
                  <span>100% Secure and Trusted Payment</span>
                </div>
                <div>
                  <a href='' ><i class="fa fa-paypal"></i></a>
                  <a href='' ><i className="fa fa-cc-visa"></i></a>
                  <a href=''><i class="fa fa-cc-mastercard"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row">
                <div className="col-3">
                  <ul>
                    <li className="li-first-cls">Quick Link</li>
                    <li className="li-rest">New York</li>
                    <li className="li-rest">London SF</li>
                    <li className="li-rest">Cockfoster BP</li>
                    <li className="li-rest">Los Angles</li>
                    <li className="li-rest">Chicago</li>
                    <li className="li-rest">Las Vegas</li>
                    <li className="li-rest">Albarto</li>
                  </ul>
                </div>
                <div className="col-3">
                  <ul>
                    <li className="li-first-cls">Quick Link</li>
                    <li className="li-rest">Quick Link</li>
                    <li className="li-rest">New York</li>
                    <li className="li-rest">London SF</li>
                    <li className="li-rest">Cockfoster BP</li>
                    <li className="li-rest">Los Angles</li>
                    <li className="li-rest">Chicago</li>
                    <li className="li-rest">Las Vegas</li>
                    <li className="li-rest">Albarto</li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul>
                    <li className="li-first-cls">Contact US</li>
                    <li className="li-rest">Address : Painted Auto Body parts 2525 Unlimited Lane Elk Grove Village, IL 60007</li>
                    <li className="li-rest"> Mobnday through Friday : 8am-5pm CST</li>
                    <li className="li-rest">Email: test@test.com</li>
                    <li className="li-rest">Phone: (+65) 66653 8060</li>
                  </ul>
                </div>
              </div>
            </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
