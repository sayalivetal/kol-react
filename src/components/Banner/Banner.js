import React, { useState } from "react";
//import KolPromotingSlider from "../KolPromotingSlider/KolPromotingSlider";
import Carousel from "react-bootstrap/Carousel";
import { imageUrl } from "../../common/apis";
// import bannerImg from './Images/group.png'

const Banner = ({ bannerList }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <section>
      <div className="container">
        <div className="row py-2">
          <div className="col-12">
            <Carousel variant="dark" activeIndex={index} onSelect={handleSelect}>
              {bannerList?.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <div className="row">
                    <div className="col-lg-6 bannerCol">
                      <Carousel.Caption>
                        <h1 className="banner-title">{item.title} </h1>
                        <p className="banner-text">{item.description}</p>
                        <button className="btn theme-btn banner-btn"> Try for Free</button>
                      </Carousel.Caption>
                    </div>
                    <div className="col-lg-6 bannerCol">
                      <img className="d-block w-100 banner-img" src={`${imageUrl}${item.banner}`} alt="thumb" />
                    </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
