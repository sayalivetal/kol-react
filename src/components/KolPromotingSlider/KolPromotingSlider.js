import React, { useState } from "react";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import { imageUrl } from "../../common/apis";
//import YouTube, { YouTubeProps } from "react-youtube";
import ReactPlayer from "react-player";

const KolPromotingSlider = (features) => {
  
  const [settings, setSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  // console.log('features slider',features.features)
  const koldata = features.features;
  //console.log('koldata132', koldata)
  // _onReady(e) {
  //   e.target.pauseVideo();
  // }

  // const opts = {
  //   height: "390",
  //   width: "640",
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 1,
  //   },
  // };

  const promotionVideos = {
    slidesToShow: 4,
    slidesToScroll: 1
  };

  

  return (
    <Slider {...settings} className="landing-Slider">
      {koldata?.map((item, index) => {

        //Calculate Final Star Rating
        let lengthFeedback = item["Feedbacks"].length;
        let ratingCount = 0;
        item["Feedbacks"].map((feedbackKey, i) => {
          return ratingCount += feedbackKey.rating;
        });
        let finalRating = Math.ceil(ratingCount / lengthFeedback);
        //Calculate Final Star Rating

        // make videos Array
        let videoArr = [];
        videoArr = item.video_links.split(",");

        // Make videos Array

        return (
          <div key={index}>
            <div className="card mt-2 b-radius">
                <div className="kol-profile-info">
                  <div className="row">
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
                </div> 

                <div className="kol-profile-videos">
                  <div className="row">
                    <div className="col-lg-12 py-2">
                      <h3>KOL promoting Videos</h3>
                    </div>

                    <div className="row">
                      {/* <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={onPlayerReady} /> */}
                      {/* <Slider {...promotionVideos} className=""> */}
                      {/* {console.log("hello",videoArr)} */}
                        {
                          videoArr.map((video, index) => {
                            return (
                                  <div className="col-lg-3" key={index}>
                                    <div className="video-item">
                                      <ReactPlayer
                                          url={video}
                                          width={310}
                                          height={180}
                                        />
                                    </div>
                                  </div>
                            );
                          })
                        }
                      {/* </Slider> */}
                    </div>
                  </div>
                </div> 

                <div className="profile-profile-btn">
                  <div className="row">
                    <div className="col-lg-12 text-center"><button className="btn theme-btn px-4">View more</button></div>
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
