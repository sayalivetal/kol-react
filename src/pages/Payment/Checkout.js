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
              <div className="">
                <div className="row my-3">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="my-2"><b>Checkout Detail of Order</b></h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                          <label className="form-label col-12 mb-1">
                            <span className="labelText">Order Id :</span> <span>{orderSummary?.order_id}</span>
                            </label>
                            <label className="form-label col-12 mb-1">
                            <span className="labelText">Deal Id :</span> <span>{orderSummary?.deal_id}</span>
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="labelText">Deal Title : </span> <span>{orderSummary?.order_summary?.deal_title}</span>
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="labelText">Deal Description : </span> <span>{orderSummary?.order_summary?.description}</span>
                            </label>
                            <label className="form-label col-12 mb-1">
                              <span className="labelText">Date From :</span> <span>{orderSummary?.start_date} <span className="labelText">&nbsp; to &nbsp;</span>  {orderSummary?.end_date}</span>
                            </label>
                          </div>


                          <div className="col-6">
                            <label className="form-label col-12 mb-1 text-right">
                              <span className="labelText">Deal Type :</span> <span className="">{orderSummary?.order_summary?.type}</span>
                            </label>
                            <label className="form-label col-12 mb-1 text-right">
                              <span className="labelText">Total days :</span> <span className="">{orderSummary?.order_summary?.total_days}</span>
                            </label>
                            <label className="form-label col-12 mb-1 text-right">
                              <span className="labelText">Tax :</span> <span className="">{orderSummary?.order_summary?.tax_percentage}%</span>
                            </label>
                            <label className="form-label col-12 mb-1 text-right">
                              <span className="labelText">Price {orderSummary?.order_summary?.currency} :</span> <span className="">{orderSummary?.order_summary?.price} </span>
                            </label>
                          </div>

                        </div>
                          <hr style={{opacity: ".10"}}/>
                        <div className="row text-center"> 
                              <p>Checkout with</p>
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