import React, { useState } from "react";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import { imageUrl } from "../../common/apis";
import YouTube, { YouTubeProps } from "react-youtube";
import ReactPlayer from "react-player";

const KolPromotingSlider = (features) => {
  const [settings, setSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  // console.log('features slider',features.features)
  const koldata = features.features;
  // console.log('koldata132', koldata)
  // _onReady(e) {
  //   e.target.pauseVideo();
  // }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <Slider {...settings} className="landing-Slider">
      {koldata?.map((item, index) => {
        //Calculate Final Star Rating
        let lengthFeedback = item["Feedbacks"].length;
        let ratingCount = 0;
        item["Feedbacks"].map((feedbackKey, i) => {
          ratingCount += feedbackKey.rating;
        });
        let finalRating = Math.ceil(ratingCount / lengthFeedback);
        //Calculate Final Star Rating

        // make videos Array
        let videoArr = [];
        videoArr = item.video_links.split(",");

        // Make videos Array

        return (
          <div key={index}>
            <div className="card mt-3">
              <div className="card-body px-0">
                <div className="col-lg-12">
                  <div className="row py-1 px-4">
                    <div className="col-lg-9">
                      <div className="candidate-info">
                        <div className="employee-detail">
                          <h3 className="weight-normal m-0">{item.username}</h3>
                          <p>{item.bio}</p>
                          <div className="rating">
                            <h3 className="weight-normal m-0">{finalRating}</h3>
                            <ReactStars
                              count={6}
                              size={24}
                              activeColor="#ffd700"
                              value={finalRating}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="info py-4">
                        <i className="bi bi-geo-alt"></i>
                        <p>
                          {item.Address.address +
                            ", " +
                            item.Address.city +
                            " , " +
                            item.Address.state +
                            " , " +
                            item.Address.zip}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="kol-profile-logo">
                        <img src={`${imageUrl}${item.avatar}`} className="best-kol-img" alt="logo"/>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div className="row pt-4 py-1 px-4">
                    <div className="col-lg-12 py-4">
                      <h4>KOL promoting Videos</h4>
                    </div>

                    <div className="row">
                      {/* <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} /> */}
                      {videoArr.map((videoUrl, id) => {
                        return (
                          <div className="col-lg-3" key={id}>
                            <div className="card">
                              <div>
                                <ReactPlayer
                                  url={videoUrl}
                                  width={310}
                                  height={180}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button className="view-btn">View more</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  );
};

export default KolPromotingSlider;
