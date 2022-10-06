import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const ThankYou = () => {

  const paypalStoreData = useSelector((state)=> state?.deal?.paypalOrderDetail );
 // console.log(paypalStoreData)

    return(

          <div className="container">
              <div className="">
                <div className="row my-3">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="my-2"><b>Thanks you page</b></h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-6">
                              <img src="../Images/paypal-payment.jpg" alt="payment" className="img-fluid" />
                          </div>

                          <div className="col-6 paymentInfo align-self-center">
                            <h2 className="my-4"><i class="bi bi-check-circle-fill theme-color"></i> Payment Successful</h2>
                            <label className="form-label col-12 mb-2">
                              <span className="labelText">Payment Id : </span> <span>{paypalStoreData?.id}</span>
                            </label>
                            <label className="form-label col-12 mb-2">
                              <span className="labelText">Payment Status : </span> <span>{paypalStoreData?.status}</span>
                            </label>
                            <label className="form-label col-12 mb-2">
                              <span className="labelText">Payment Time : </span> <span>{paypalStoreData?.update_time}</span>
                            </label>
                            
                            <label className="form-label col-12 mb-2">
                              <span className="labelText">Payer Paypal Email : </span> <span>{paypalStoreData?.payer?.email_address}</span>
                            </label>
                            <label className="form-label col-12 mb-2">
                              <span className="labelText">Payer Name : </span> <span>{paypalStoreData?.payer?.name?.given_name} {paypalStoreData?.payer?.name?.surname}</span>
                            </label>

                            {paypalStoreData?.purchase_units.map((item, index) => {
                              return(<>
                                      <label className="form-label col-12 mb-2">
                                        <span className="labelText">Paid Amount : </span> <span>{item?.amount?.currency_code} {item?.amount?.value} </span>
                                      </label>
                                      <label className="form-label col-12 mb-2">
                                        <span className="labelText">Shipping Address : </span>
                                        <span> {item?.shipping?.address?.address_line_1}, {item?.shipping?.address?.admin_area_1},  {item?.shipping?.address?.admin_area_2},  {item?.shipping?.address?.country_code}, {item?.shipping?.address?.postal_code}
                                        </span>
                                      </label>
                                  </>
                              )
                            })}
                          
                          </div>

                          <div className="col-12 text-center my-5">
                            <Link to="/home" className="btn theme-btn">Back to Home</Link>
                          </div>
                        </div> 
                              
                      </div>
                    </div>

                  </div>
                </div>
              </div>
          </div>



    );
};


export default ThankYou; 