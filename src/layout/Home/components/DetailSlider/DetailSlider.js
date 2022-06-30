import React, { useState } from 'react';
import './DetailSlider.css';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
const DetailSlider = () => {
  const [settings, setSettings] = useState({
    slidesToShow: 4,
    slidesToScroll: 1,
  });

  return (
    <div className='row detail-main'>
      <Slider {...settings}>
        <div className='slider-div'>
          <div className='card'>
            <div>
              <img
                className='card-img-top'
                src='http://placekitten.com/g/400/200'
              />
            </div>

            <div className='card-body'>
              <h5 className='card-title'>Nike shose</h5>
              <div className='card-text'>
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className='slider-div'>
          <div className='card'>
            <div>
              <img
                className='card-img-top'
                src='http://placekitten.com/g/400/200'
              />
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Nike shose</h5>
              <div className='card-text'>
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className='slider-div'>
          <div className='card'>
            <div>
              <img
                className='card-img-top'
                src='http://placekitten.com/g/400/200'
              />
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Nike shose</h5>
              <div className='card-text'>
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className='slider-div'>
          <div className='card'>
            <div>
              <img
                className='card-img-top'
                src='http://placekitten.com/g/400/200'
              />
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Nike shose</h5>
              <div className='card-text'>
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum
              </div>
            </div>
          </div>
        </div>
        <div className='slider-div'>
          <div className='card'>
            <div>
              <img
                className='card-img-top'
                src='http://placekitten.com/g/400/200'
              />
            </div>
            <div className='card-body'>
              <h5 className='card-title'>Nike shose</h5>
              <div className='card-text'>
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

export default DetailSlider;
