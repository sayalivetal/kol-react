import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./ListingDetails.css";
const ListingDetails = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-body p-0">
                <div className="row detail-bg"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">hello</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingDetails;
