import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { API,imageUrl } from "../../../common/apis";
import { useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import {kolAddBookmark,kolDeleteBookmark} from '../../../slices/KolListing/KolSlices'
import "./ListingDetails.css";
import DetailSlider from "../components/DetailSlider/DetailSlider";
import ReviewSlider from "../components/ReviewSlider/ReviewSlider";
import { useDispatch,useSelector } from "react-redux";
import { getFeedback } from "../../../slices/api/simpleApi";

const ListingDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");
  const[feedback,setFeedback]= useState([])
  console.log(token);
  const [kolProfile, setKolProfile] = useState(null);

  const kolListing = async (actionType = "normal") => {
    const response = await fetch(`${API}/kol-profile/view?id=${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let data = await response.json();
    console.log(data.kolProfile);
    setKolProfile([...data?.kolProfile]);
  };
  useEffect(() => {
    kolListing();
  }, []);

  useEffect(() => {
    const callback = (data) => {
      setFeedback([...data]);
    };
    getFeedback(callback, token,id);
  }, [id]);
 
  console.log("======================>",feedback);
  const handleBookmark = (profileId, e) => {
    let operationType = e.target.classList.contains("active");
    if (!operationType) {
      e.target.classList.add("active");
      dispatch(kolAddBookmark({ profileId, token }));
    } else {
      e.target.classList.remove("active");
      dispatch(kolDeleteBookmark({ profileId, token }));
    }
  };
  return (
    <>
      {kolProfile &&
        kolProfile?.map((item, index) => {
          console.log(item);
          return (
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="banner-container">
                    <div
                      className="col-lg-12 detail-bg"
                      style={{ backgroundImage: `url(${imageUrl}${item.banner})` }}
                    ></div>
                  </div>
                  <div className="col-lg-12 px-4">
                    <div className="row justify-content-between py-4 list-row">
                      <div className="col-lg-2 py-2">
                        <div className="kol-user-img-details">
                          <img src={`${imageUrl}${item.avatar}`} />
                        </div>
                      </div>
                      <div className="col-lg-10  py-2">
                        <div className="row justify-content-between">
                          <div className="col-lg-8">
                            <h3 className="text-bold">
                              {item.get_user.name}
                              <sup>
                                <i className="bi bi-patch-check-fill heading-icon"></i>
                              </sup>
                            </h3>
                            <p>({item.tags})</p>
                          </div>
                          <div className="col-lg-4">
                            <p className="text-right">
                              <i className="bi bi-geo-alt mx-1 geo-icon"></i>
                              <span>
                                {item.city} {item.state},india
                              </span>
                              <span className="book-icon">
                                <i
                                  className={`bi bi-bookmark mx-1 bookmark-icon ${
                                    item.Bookmark ? "active" : ""
                                  }`}
                                  onClick={(e) => {
                                    handleBookmark(item.user_id, e);
                                  }}
                                ></i>
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
                        <p className="kol-bio">{item.bio}</p>
                      </div>
                      <div className="col-lg-12 text-right">
                        <Link to="/chat">
                          <button className="ml-auto btn theme-btn">
                            <span className="mx-2">
                              <i className="bi bi-chat-dots"></i>
                            </span>{" "}
                            Chat with me
                          </button>
                        </Link>
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
                        <DetailSlider video={item.video_links} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Announcement announcement={item.announcement} />

              <div className="card mt-3 border-0">
                <div className="card-body review-block">
                  <div className="col-lg-12 px-4">
                    <div className="row py-1">
                      <div className="col-lg-12">
                        <h3 className="theme-color weight-600">
                          See What Our Clients Talk About Us
                        </h3>
                      </div>
                      <ReviewSlider feedback={feedback}/>
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
