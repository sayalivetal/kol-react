import React, {  useState, useEffect } from "react";
import { getOrderSummary } from "../../slices/api/simpleApi";
import { useParams } from "react-router-dom";
import PaypalBtn from "./PaypalBtn";

const Checkout = () => {

  const { id } = useParams();
  // console.log(id)
  const [orderSummary, setOrderSummary] = useState({});
  let token = localStorage.getItem("token");

//   order summary api call for detail
  useEffect(() => {
    const callback = (data) => {
      setOrderSummary({...data});
      // console.log(data);
    }
    getOrderSummary(callback, token, id)
  },[id]);    


    return(
      <>
        {orderSummary?.order_summary?.price ? (
          <div className="container">
            <div className="card">
              <div className="card-body">
                <div className="row my-3">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="my-2"><b>Checkout Detail of Order</b></h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-4">
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Deal Type :</span> {orderSummary?.order_summary?.type}
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Deal Title : </span>{orderSummary?.order_summary?.deal_title}
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Deal Description : </span> {orderSummary?.order_summary?.description}
                            </label>
                          </div>

                          <div className="col-4">
                            <label className="form-label col-12 mb-1">
                            <span className="fw-medium">Order Id :</span> {orderSummary?.order_id}
                            </label>
                            <label className="form-label col-12 mb-1">
                            <span className="fw-medium">Deal Id :</span> {orderSummary?.deal_id}
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Date From :</span> {orderSummary?.start_date} to {orderSummary?.end_date}
                            </label>
                          </div>

                          <div className="col-4">
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Tax :</span> {orderSummary?.order_summary?.tax_percentage}%
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="fw-medium">Total days :</span> {orderSummary?.order_summary?.total_days}
                            </label>
                            <label className="form-label col-12 mb-1">
                            <span className="fw-medium">Price :</span> {orderSummary?.order_summary?.price} {orderSummary?.order_summary?.currency}
                            </label>
                          </div>

                        </div>
                              <PaypalBtn price={orderSummary?.order_summary?.price} />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : "" }

      </>

    );
};


export default Checkout; 