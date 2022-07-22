import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const KolPromotingSlider = () => {
  const [settings, setSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 1,
  });
  return (
    <div className="col-12">
      <Slider {...settings}>
        <div className="slider-div">
          <div className="card">
            <div>
              <iframe
                src=""
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">Nike shoose</h5>
              <div className="card-text">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className="slider-div">
          <div className="card">
            <div>
              <iframe
                src=""
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">Nike shoose</h5>
              <div className="card-text">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className="slider-div">
          <div className="card">
            <div>
              <iframe
                src=""
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">Nike shoose</h5>
              <div className="card-text">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className="slider-div">
          <div className="card">
            <div>
              <iframe
                src=""
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>

            <div className="card-body">
              <h5 className="card-title">Nike shoose</h5>
              <div className="card-text">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default KolPromotingSlider;
