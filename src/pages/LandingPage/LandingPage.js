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
            <div className="card mt-3">
              <div className="card-body">
                <div className="col-lg-12 px-4">
                  <div className="row py-1">
                    <div className="col-lg-12">
                      <h4>KOL are promoting Products</h4>
                    </div>
                    <div className="col-lg-12">
                      <KolPromotingSlider />
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
