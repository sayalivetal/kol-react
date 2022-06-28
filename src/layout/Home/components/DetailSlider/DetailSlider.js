import React,{useState} from 'react'
import './DetailSlider.css'
import ReactDOM from "react-dom";
import Slider from "react-slick";
const DetailSlider = () => {
    const [settings,setSettings] = useState({
        slidesToShow: 3,
        slidesToScroll: 1
    })
  
      return (
        <div className='asd'>
          <Slider {...settings}>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
            <div>
              <img src="http://placekitten.com/g/400/200" />
            </div>
          </Slider>
        </div>
      );
}

export default DetailSlider