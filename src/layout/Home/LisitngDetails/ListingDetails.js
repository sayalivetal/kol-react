import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "./ListingDetails.css";
import DetailSlider from "../components/DetailSlider/DetailSlider";
import ReviewSlider from "../components/ReviewSlider/ReviewSlider";
import { useSelector } from "react-redux";
const ListingDetails = () => {
  const [kolProfile, setKolProfile] = useState([]);

  const data = useSelector(
    (state) => state?.kolListing?.listingDetails?.kolProfile
  );
  useEffect(() => {
    setKolProfile([...data]);
  }, [data]);

  console.log(data);
  return (
    <>
      {kolProfile &&
        kolProfile.map((item, index) => {
          return (
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="banner-container">
                    <div className="col-lg-12 detail-bg" style={{backgroundImage: `url(${item.banner})`}}></div>
                  </div>
                  <div className="col-lg-12 px-4">
                    <div className="row justify-content-between py-4 list-row">
                      <div className="col-lg-2 py-2">
                        <div className="kol-user-img">
                          <img src={item.avatar} />
                        </div>
                      </div>
                      <div className="col-lg-10  py-2">
                        <div className="row justify-content-between">
                          <div className="col-lg-9">
                            <h3 className="text-bold">
                              {item.get_user.name}
                              <sup>
                                <i className="bi bi-patch-check-fill heading-icon"></i>
                              </sup>
                            </h3>
                            <p>({item.tags})</p>
                          </div>
                          <div className="col-lg-3">
                            <p className="text-right">
                              <i className="bi bi-geo-alt mx-1 geo-icon"></i>
                              <span>{item.city} {item.state},india</span>
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
                          Languages:{" "}
                          <span className="text-normal">{item.languages}</span>
                        </h5>
                        {item.get_social_media.map((c, i) => {
                        return (
                          <ul key={i} className="social-count-list">
                            <li className="">
                              <span></span>
                              <i className={c.social_icon}></i> {c.followers}k
                            </li>
                          </ul>
                        );
                      })}
                       
                      </div>
                    </div>
                    <div className="row py-1">
                      <div className="col-lg-12">
                        <h5 className="text-bold">Bio</h5>
                        <p className="kol-bio">
                          {item.bio}
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
              <div className="card mt-3 border-0">
                <div className="card-body">
                  <div className="col-lg-12 px-4">
                    <div className="row py-1">
                      <div className="col-lg-7">
                        <div className="card annoucement-card">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-8">
                                <h5>Announcement</h5>
                                <div className="live-stream">Live Stream</div>
                                <h3>A Product Launch</h3>
                                <ul className="announement-date-list">
                                  <li>
                                    <div>Thur</div>
                                    <div>DAY</div>
                                  </li>
                                  <li className="first">
                                    <div>JULY</div>
                                    <div>30</div>
                                  </li>
                                  <li className="first">
                                    <div>10</div>
                                    <div>PM</div>
                                  </li>
                                </ul>
                              </div>

                              <div className="col-lg-4">
                                <div className="rounded-circle roundIcon my-3">
                                  <p className="annocement-text">
                                    Watch me on youtube
                                  </p>
                                  <span className="icon-block">
                                    {" "}
                                    <i className="bi bi-youtube youtube-circle-icon"></i>
                                    <span className="youtube-bg"></span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5">hi</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3 border-0">
                <div className="card-body review-block">
                  <div className="col-lg-12 px-4">
                    <div className="row py-1">
                      <div className="col-lg-12">
                        <h3 className="theme-color weight-600">
                          See What Our Clients Talk About Us
                        </h3>
                      </div>
                      <ReviewSlider />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ListingDetails;
