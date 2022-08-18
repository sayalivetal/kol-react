import React, { useState, useEffect } from "react";
import "./DetailSlider.css";
import ReactDOM from "react-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";
const DetailSlider = ({video}) => {
 console.log(video);
  const [settings, setSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 1,
  });

  // const data = useSelector(
  //   (state) => state?.kolListing?.listingDetails?.kolProfile
  // );
  // useEffect(() => {
  //   setKolProfile([...data]);
  // }, [data]);
  let a = video.split(",");
  a?.push(
    "https://www.youtube.com/shorts/hl0v_nuIkXU",
    "https://www.youtube.com/shorts/hl0v_nuIkXU"
  );
  console.log(a);
  return (
    <div className="row detail-main">
      <Slider {...settings}>
        
            {a && a.map((c,i)=>{
              return(
                <div className="slider-div">
                <div className="card">
                  <div>
                    <iframe
                      src={c}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      title="video"
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="card-title">Nike shose</h5>
                    <div className="card-text">
                      The Lorem ipsum text is derived from sections and of
                      Cicero's De Lorem ipsum text is derived 
                    </div>
                  </div>
                </div>
              </div>
            
              )
            })}
             
    
        
      </Slider>
    </div>
  );
};

export default DetailSlider;
