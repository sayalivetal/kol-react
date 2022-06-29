import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./ListingDetails.css";
import DetailSlider from "../components/DetailSlider/DetailSlider";
const ListingDetails = () => {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="banner-container">
              <div className="col-lg-12 detail-bg"></div>
            </div>
            <div className="col-lg-12 px-4">
              <div className="row justify-content-between py-4 list-row">
                <div className="col-lg-2 py-2">
                  <div className="kol-user-img">
                    <img src="./Images/4.jpg" />
                  </div>
                </div>
                <div className="col-lg-10  py-2">
                  <div className="row justify-content-between">
                    <div className="col-lg-9">
                      <h3 className="text-bold">
                        Sara Jammal
                        <sup>
                          <i className="bi bi-patch-check-fill heading-icon"></i>
                        </sup>
                      </h3>
                      <p>( Lorm ipsum dummy )</p>
                    </div>
                    <div className="col-lg-3">
                      <p className="text-right">
                        <i className="bi bi-geo-alt mx-1 geo-icon"></i>
                        <span>Mohali Punjab,india</span>
                        <span className="book-icon">
                          <i className="bi bi-bookmark mx-1 bookmark-icon"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row py-1">
                <div className="col-lg-12 d-flex">
                  <h5 className="text-bold">
                    Languages: <span className="text-normal">English</span>
                  </h5>
                  <ul className="social-count-list">
                    <li className="">
                      <span></span>
                      <i className="bi bi-instagram"></i> 20k
                    </li>
                    <li className="">
                      <span></span>
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="facebook-icon"
                      />
                      20k
                    </li>
                    <li className="">
                      <span></span>
                      <i className="bi bi-youtube youtube-icon"></i> 20k
                    </li>
                    <li className="">
                      <span></span>
                      <i className="bi bi-tiktok"></i> 20k
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row py-1">
                <div className="col-lg-12">
                  <h5 className="text-bold">Bio</h5>
                  <p className="kol-bio">
                    The Lorem ipsum text is derived from sections and of
                    Cicero's De finibus bonorum et malorum The physical source
                    may have been the Loeb Classical Library edition of De
                    finibus, where the Latin text, presented on the left-hand
                    pages, breaks off on page with Neque porro quisquam est qui
                    do- and continues on page with lorem ipsum , suggesting that
                    the galley type of that page was mixed.
                  </p>
                </div>
                <div className="col-lg-12 text-right">
                  <button className="ml-auto btn theme-btn">
                    <span className="mx-2">
                      <i className="bi bi-chat-dots"></i>
                    </span>{" "}
                    Chat with me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <div className="col-lg-12 px-4">
              <div className="row py-1">
                <div className="col-lg-12">
                  <h4>KOL are promoting Products</h4>
                </div>
                <div className="col-lg-12">
                  <DetailSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <div className="col-lg-12 px-4">
              <div className="row py-1">
                <div className="col-lg-8">
                  <div className="card"><div className="card-body">hello</div></div>
                </div>
                <div className="col-lg-4">hi</div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mt-3">
          <div className="card-body">
            <div className="col-lg-12 px-4">
              <div className="row py-1">
                <div className="col-lg-12"></div>
                <div className="col-lg-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
