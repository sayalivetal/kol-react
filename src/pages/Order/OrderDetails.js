import React, { useEffect, useState } from "react";
import { getUserOrderHistory, getKolOrderHistory } from "../../slices/api/simpleApi";

const OrderDetails = () => {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role"); 
  const [userOrderDetails, setUserOrderDetails] = useState();
  const [kolOrderDetails, setKolOrderDetails] = useState();

  // user order history
  useEffect(()=>{
    const callback = (data) => {
      setUserOrderDetails([...data]);
      //console.log(data);
    }
    getUserOrderHistory(callback, token)
  },[])

  // kol order history
  useEffect(()=> {
    const callback = (data) => {
      setKolOrderDetails([...data]);
     // console.log(data);
    }
    getKolOrderHistory(callback, token)
  },[])

//  console.log("--------",kolOrderDetails)

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="row my-3">
            <div className="col-lg-12">
              <div className="card">
                {role === 3 ?
                  (
                    <>
                      <div className="card-header">
                        <h5 className="my-2"><b>User Order History</b></h5>
                      </div>
                      <div className="card-body p-0">

                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order Id</th>
                              <th>KOL&nbsp;Id</th>
                              <th>Deal&nbsp;Id</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Deal Title</th>
                              <th>Deal&nbsp;Type</th>
                              <th width="260">Deal Description</th>
                              <th>Total&nbsp;days</th>
                              <th>Tax</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userOrderDetails && userOrderDetails.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.order_id}</td>
                                  <td>{item.kol_profile_id}</td>
                                  <td>{item.deal_id}</td>
                                  <td>{item.start_date}</td>
                                  <td>{item.end_date}</td>
                                  <td>{item?.order_summary?.deal_title}</td>
                                  <td>{item?.order_summary?.type}</td>
                                  <td>{item?.order_summary?.description}</td>
                                  <td>{item?.order_summary?.total_days}</td>
                                  <td>{item?.order_summary?.tax_percentage}</td>
                                  <td>{item?.order_summary?.price} {item?.order_summary?.currency}</td>
                                </tr>
                              );
                            })
                            }
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) :

                  (
                    <>
                      <div className="card-header">
                        <h5 className="my-2"><b>Kol Order History</b></h5>
                      </div>
                      <div className="card-body p-0">

                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order Id</th>
                              <th>User&nbsp;Id</th>
                              <th>Deal&nbsp;Id</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Deal Title</th>
                              <th>Deal&nbsp;Type</th>
                              <th width="260">Deal Description</th>
                              <th>Total&nbsp;days</th>
                              <th>Tax</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kolOrderDetails && kolOrderDetails.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.order_id}</td>
                                  <td>{item.end_user_id}</td>
                                  <td>{item.deal_id}</td>
                                  <td>{item.start_date}</td>
                                  <td>{item.end_date}</td>
                                  <td>{item?.order_summary?.deal_title}</td>
                                  <td>{item?.order_summary?.type}</td>
                                  <td>{item?.order_summary?.description}</td>
                                  <td>{item?.order_summary?.total_days}</td>
                                  <td>{item?.order_summary?.tax_percentage}</td>
                                  <td>{item?.order_summary?.price} {item?.order_summary?.currency}</td>
                                </tr>
                              );
                            })
                            }
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}

              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
