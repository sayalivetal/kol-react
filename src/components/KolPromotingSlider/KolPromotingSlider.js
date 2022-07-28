import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
const KolPromotingSlider = () => {
  const [settings, setSettings] = useState({
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  return (
    <Slider {...settings} className="landing-Slider">
      <div className="card mt-3">
        <div className="card-body">
          <div className="col-lg-12 px-4">
            <div className="row py-1">
              <div className="col-lg-9">
                <h3>Logitech</h3>
                  <div>
                    <i className="bi bi-geo-alt"></i>
                    <p>
                      TENEIL IT Tower Plot No. F-549, IT Park, Ind. Area, Sector
                      75, SAS Nagar (Mohali) Punjab 160055.
                    </p>
                  </div>

                  <div>
                    <h3 className="weight-normal m-0">Preeti Parihar</h3>
                    <p>
                      The Lorem ipsum text is derived from sections of Cicero De
                      finibus bonorum et malorum The physical source may have
                      been the Loeb Classical Library edition of De finibus,
                      where the Latin text, presented on the left-hand pages,
                      breaks off on page 34 with Neque porro quisquam est qui do
                      and continues on page.
                    </p>
                    <h3 className="weight-normal m-0">4</h3>
                    <ReactStars
                          count={6}
                          size={24}
                          activeColor="#ffd700"
                          value={4}
                        />
                  </div>
              </div>
              <div className="col-lg-3">
                  <div className="kol-profile-logo">
                    <img src=""/>
                  </div>
              </div>

              <div className="col-lg-12">
                  <h3>Description</h3>
                  <p>The Lorem ipsum text is derived from sections and of Cicero's De finibus bonorum et malorum The physical source may have been the 1914 Loeb Classical Library edition of De finibus, where the Latin text, presented on the left-hand even pages, breaks off on page 34 with Neque porro quisquam est qui do and continues on page 36 with lorem ipsum suggesting that the galley type of that page was mixed up to make the dummy text seen today.</p>
                </div>
            </div>

            <div className="row py-1">
              <div className="col-lg-12">
                <h4>KOL are promoting Products</h4>
              </div>

              <div className="row">
                <div className="col-lg-3">
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
                        The Lorem ipsum text is derived from sections and of
                        Cicero's De finibus bonorum et malorum
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
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
                        The Lorem ipsum text is derived from sections and of
                        Cicero's De finibus bonorum et malorum
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
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
                        The Lorem ipsum text is derived from sections and of
                        Cicero's De finibus bonorum et malorum
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3">
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
                        The Lorem ipsum text is derived from sections and of
                        Cicero's De finibus bonorum et malorum
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row"><button>View more</button></div>
            </div>
          </div>
        </div>
      </div>
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
    </Slider>
  );
};

export default KolPromotingSlider;
