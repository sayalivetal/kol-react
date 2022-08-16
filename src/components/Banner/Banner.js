import React, { useState } from "react";
import KolPromotingSlider from "../KolPromotingSlider/KolPromotingSlider";
import Carousel from 'react-bootstrap/Carousel';
import { imageUrl } from "../../common/apis";
// import bannerImg from './Images/group.png'

const Banner = ({bannerList}) => {

  const [count , setCount] = useState(0);
  const [altImg , setAltImg] = useState("");

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  console.log('bannerList', bannerList)
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Carousel activeIndex={index} onSelect={handleSelect} >
              {/* <div className="backgroundBannerImage"> */}
              
              {
                
                  bannerList.map((bannerImage)=> {
                  
                    <Carousel.Item key={bannerImage.id}  > 
                      {/* <div className="col-lg-6"> */}
                        <Carousel.Caption>
                          {/* <h3>Target More Influence More & <span>Users with Kol</span></h3>
                          <p>
                            To get maximum attention on your product and services, invest in KOl. 
                          </p> */}
                        </Carousel.Caption>
                      {/* </div> */}
                      {/* <div className="col-lg-6">
                        
                          </div> */}
                        <img
                          className="d-block banner-img"
                          src={`${imageUrl}${bannerImage.banner}`}
                          alt="image"
                        />
                    </Carousel.Item>  
                    
                  })
              }
              {/* </div> */}
            </Carousel>
            
            <Carousel variant="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='Images/Banner1.png'
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='Images/Banner1.png'
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src='Images/Banner1.png'
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  
  );
};

export default Banner;
