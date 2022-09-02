import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const OrderDetails = () => {
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");


  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="banner-container">
            <div className="col-lg-12 bookmark-bg"></div>
          </div>
          <div className="row my-3">
            Order Component
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
