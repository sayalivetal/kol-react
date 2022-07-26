import React from "react";
import KolPromotingSlider from "../../components/KolPromotingSlider/KolPromotingSlider";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <section>
        <div className="container">
          <div className="row">
            <h3>Best KOL Profiles</h3>
            <KolPromotingSlider />

            <div className="row">
              <div className="col-lg-12">
                <h3>About Us</h3>

                <div className="row">
                  <div className="col-lg-7">
                    <div className="card">
                      <div className="card-body">
                        <h2 className="card-title">We do things differently</h2>
                        <div className="card-text">
                          But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain was born and
                          I will give you a complete account of the system, and
                          expound the actual teachings of the great explorer of
                          the truth
                        </div>

                        <div className="kol-counts">
                          <ul className="kol-count-list">
                            <li>
                              <div className="count-num">100k</div>
                              <div className="count-label">User</div>
                            </li>
                            <li>
                              <div className="count-num">500+</div>
                              <div className="count-label">KOL</div>
                            </li>
                            <li>
                              <div className="count-num">2000+</div>
                              <div className="count-label">Video</div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="card">
                      <div className="card-body">
                        <h2 className="card-title">How can we help You?</h2>
                        <form className="cta-form row">
                          <div className="col-lg-6 mb-2">
                            <label className="form-label">First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" />
                          </div>
                          <div className="col-lg-6 mb-2">
                            <label className="form-label">Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" />
                          </div>
                          <div class="col-lg-6 mb-2">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" placeholder="Enter Email" />
                          </div>
                          <div class="col-lg-6 mb-2">
                            <label className="form-label">Phone No.</label>
                            <input type="text" className="form-control" placeholder="Enter Phone No." />
                          </div>
                          <div class="col-lg-12 mb-2">
                            <label className="form-label">Message</label>
                            <textarea type="text" className="form-control" placeholder="Enter Message" rows="3"></textarea>
                          </div>
                          <div class="col-lg-12 mb-2">
                            <button type="submit" className="btn theme-btn ">Send Message</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
