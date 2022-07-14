import React,{ useState} from 'react'
import './ReviewSlider.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Slider from 'react-slick';


const ReviewSlider = () => {

  const [settings, setSettings] = useState({
    slidesToShow: 1,
    // slidesToScroll: 1,
  });


  return (
    <div>
      <Slider {...settings}>
        <div>
      <div className="row justify-content-between py-2 list-row">
        <div className="col-lg-3 py-2">
          <div className="kol-review-user-img">
            <img src="./Images/4.jpg" />
          </div>
        </div>
        <div className="col-lg-9  py-2">
          <div className="row justify-content-between">
            <div className="col-lg-9">
              <h3 className="text-bold"><b>Sara Jammal</b> </h3>
              <p>CEO MSTUDIO</p>
            </div>
           
          </div>

          <div className="row py-1">
            <div className="col-lg-12 d-flex mb-3">
            <h3 className='weight-normal m-0'>4.0</h3>
              <ul className='rating-stars'>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star"></i></li>
              </ul>
            </div>
          </div>

          <div className="row py-1">
            <div className="col-lg-12">
             
              <p className="kol-bio">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum The physical source may have been the
                Loeb Classical Library edition of De finibus, where the Latin
                text, presented on the left-hand pages, breaks off on page with
                Neque porro quisquam est qui do- and continues on page with
                lorem ipsum , suggesting that the galley type of that page was
                mixed.
              </p>
            </div>
          </div>

         
        </div>
      </div>
      </div>

      <div>
      <div className="row justify-content-between py-2 list-row">
        <div className="col-lg-3 py-2">
          <div className="kol-review-user-img">
            <img src="Imgaes/4.jpg" />
          </div>
        </div>
        <div className="col-lg-9  py-2">
          <div className="row justify-content-between">
            <div className="col-lg-9">
              <h3 className="text-bold"><b>Sara Jammal</b> </h3>
              <p>CEO MSTUDIO</p>
            </div>
           
          </div>

          <div className="row py-1">
            <div className="col-lg-12 d-flex mb-3">
            <h3 className='weight-normal m-0'>4.0</h3>
              <ul className='rating-stars'>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star-fill"></i></li>
                <li><i className="bi bi-star"></i></li>
              </ul>
            </div>
          </div>

          <div className="row py-1">
            <div className="col-lg-12">
             
              <p className="kol-bio">
                The Lorem ipsum text is derived from sections and of Cicero's De
                finibus bonorum et malorum The physical source may have been the
                Loeb Classical Library edition of De finibus, where the Latin
                text, presented on the left-hand pages, breaks off on page with
                Neque porro quisquam est qui do- and continues on page with
                lorem ipsum , suggesting that the galley type of that page was
                mixed.
              </p>
            </div>
          </div>

         
        </div>
      </div>
      </div>
      </Slider>
    </div>
  )
}

export default ReviewSlider