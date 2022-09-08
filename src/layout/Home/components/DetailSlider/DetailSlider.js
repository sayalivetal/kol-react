import React, { useState, useEffect } from "react";
import "./DetailSlider.css";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";


const DetailSlider = ({video}) => {

  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };
  // const data = useSelector(
  //   (state) => state?.kolListing?.listingDetails?.kolProfile
  // );
  // useEffect(() => {
  //   setKolProfile([...data]);
  // }, [data]);
  let videoUrl = video.split(",");

  // videoUrl?.push(
  //   "https://www.youtube.com/shorts/hl0v_nuIkXU",
  //   // "https://www.youtube.com/shorts/hl0v_nuIkXU"
  // );

  return (
    <div className="row detail-main">
      <Slider {...settings}>
        
            {videoUrl && videoUrl.map((videoItem,index)=>{
              // console.log("askjdflksf", videoItem)
              return(
                <div className="slider-div" key={index}>
                <div className="video-item">
                    <ReactPlayer
                        url={videoItem}
                        width='100%'
                        height='100%'
                      />
                  {/* <div className="card-body">
                    <h5 className="card-title">Nike shose</h5>
                    <div className="card-text">
                      The Lorem ipsum text is derived from sections and of
                      Cicero's De Lorem ipsum text is derived 
                    </div>
                  </div> */}
                </div>
              </div>
            
              )
            })}

      </Slider>
    </div>
  );
};

export default DetailSlider;
