import React from "react";
import "./Banner.css";
import KolPromotingSlider from "../KolPromotingSlider/KolPromotingSlider";
import { Carousel } from "react-bootstrap";
const Banner = () => {
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-12">
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
