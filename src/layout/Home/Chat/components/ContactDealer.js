import React, { useEffect, useState } from "react";
import "../Chat.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createDeal,PlaceOrder, deleteKolDeals } from "../../../../slices/DealsSlice/DealsSlice";
import {
  getDealsListOfKol,
  getDealsListForUsers,
  getOrderSummary,
} from "../../../../slices/api/simpleApi";
import { imageUrl, API } from "../../../../common/apis";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const ContactDealer = () => {
  const navigate = useNavigate()
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  //console.log(role);
  const [startDate, setStartDate] = useState(new Date());
 // console.log(startDate);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
   //console.log(id);

  const dispatch = useDispatch();
  const [dealModal, setDealModal] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const [kolProfile, setKolProfile] = useState([]);
  const [dealForm, setDealForm] = useState({
    title: "",
    description: "",
    price: "",
    total_days: "",
    type: "",
    token,
  });
  const [dealdetail, setDealDetails] = useState();
  const [kolDealForUser, setKolDealForUser] = useState();
  const [order, setOrder] = useState({
    deal_id: "",
    kol_profile_id: "",
    start_date: "",
    token,
  });
  const [placeOrderId, setPlacedOrderId] = useState();
  const [orderSummary, setOrderSummary] = useState();

  const showDealModal = () => {
    setDealModal(!dealModal);
  };

  const showOrderModal = () => {
    setOrderModal(!orderModal);
  };

  const kolList = async () => {
    const response = await fetch(`${API}/kol-profile/view?id=${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let data = await response.json();
   // console.log(data);
    setKolProfile([...data?.kolProfile]);
  };
 // console.log(kolProfile);
  useEffect(() => {
    kolList();
  }, [id]);

  const handleDealChange = (e) => {
    setDealForm((preState) => {
      return { ...preState, [e.target.name]: e.target.value };
    });
    //console.log(e.target.name, e.target.value );
  };

  const handleDealSubmit = (e) => {
    e.preventDefault();
    dispatch(createDeal(dealForm)).then((data) => {
     // console.log(data);
      if (data.payload.statusCode == 201) {
        const callback = (data) => {
          setDealDetails({ ...data });
          //console.log();
        };
        getDealsListOfKol(callback, token);
      }
    });
    setDealModal(false);
  };

  // kol own deals List
  useEffect(() => {
    const callback = (data) => {
      setDealDetails({ ...data });
      console.log();
    };
    getDealsListOfKol(callback, token);
  }, []);

  // kol deals list for users
  useEffect(() => {
    const callback = (data) => {
      setKolDealForUser([...data]);
      console.log();
    };
    getDealsListForUsers(callback, token, id);
  }, [id]);

 
  const handleDeals = (e, id) => {
    setOrder({
      ...order,
      kol_profile_id: id,
      deal_id: e.target.value,
    });
  };

  useEffect(() => {
    if (!startDate) return;
    let date = new Date(startDate);
    let dateStartTime = date.toLocaleTimeString();
    let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let finalDate = [date.getFullYear(), mnth, day].join("-");
   //console.log(finalDate, dateStartTime);
    setOrder({
      ...order,
      start_date: moment(`${finalDate} ${dateStartTime}`).format('YYYY-MM-DD hh:mm:ss')
    });
  }, [startDate]);

  // place order handler
  const handleOrder = (e) =>{
    e.preventDefault()
    dispatch(PlaceOrder(order)).then((data)=>{
      if(data.payload.statusCode == 201){
        showOrderModal();
        setPlacedOrderId(data?.payload?.orderPlacedId)
      }
    })
    console.log(order);
  }

    // order summary
    useEffect(() => {
      const callback = (data) => {
        setOrderSummary({...data});
       // console.log(data);
      }
      getOrderSummary(callback, token, placeOrderId)
    },[placeOrderId]);
  
    const handleDealDelete = (dealId) => {
      dispatch(deleteKolDeals({dealId, token}));
    }

  return (
    <>
      <div className="col-lg-12">
        <h5>About the Creator</h5>
      </div>

      {role == 2 ? (
        <>
          <div className="kol-user-card">
            <div className="kol-user-icon">
              <img
                className="rounded-circle  img-fluid"
                src={`${imageUrl}${dealdetail?.avatar}`}
                alt="avatar"
              />
            </div>
            <div className="kol-user-info">
              <div className="d-flex justify-content-between">
                <span className="deal-user-name">{`${dealdetail?.get_user?.name} ${dealdetail?.get_user?.last_name}`}</span>
                <span className="">
                  <i className="bi bi-instagram"></i> 456k
                </span>
              </div>
              <div className="kol-user-loc">
                <i className="loc bi-geo-alt"></i>
                <p>
                  {dealdetail?.city} {dealdetail?.state}, india
                </p>
              </div>
            </div>
          </div>

          <h5 className="mt-3 mb-1 theme-color d-flex">
            Deals
            <button className="btn btn-sm theme-btn ms-auto" onClick={showDealModal}> + Deal</button>
          </h5>
          <div className="kol-user-deals">
            {dealdetail?.get_deal &&
              dealdetail?.get_deal.map((item, index) => {
                return (
                  <div key={index} className="kol-list-deal">
                    <div className="kol-deal-row justify-content-between align-items-start mb-0">
                      <div className="kol-deal-heading h6">{item.title}</div>
                      <div className="deal-price h6">
                        ${item.price}
                        <input
                          className="form-check-input price-check"
                          type="radio"
                          name="price"
                          id=""
                        ></input>
                      </div>
                    </div>
                    <div className="kol-deal-row">
                      <span className="deal-icon-text">
                        <i className="fa fa-calendar"></i>
                        {item.total_days} Days
                      </span>
                      <span className="deal-icon-text">
                        <i className="fa fa-picture-o"></i> {item.type}
                      </span>
                    </div>
                    <p>{item.description}</p>
                    <div className="kol-deal-row">
                      <span className="deal-delete btn btn-sm btn-default">
                        <i className="bi bi-trash3" onClick={()=> {
                          handleDealDelete(item.id)
                        }}></i> Delete
                      </span>
                    </div>
                    
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          {kolProfile &&
            kolProfile.map((item, index) => {
             // console.log(item);
              return (
                <div className="kol-user-card">
                  <div className="kol-user-icon">
                    <img
                      className="rounded-circle  img-fluid"
                      src={`${imageUrl}${item?.avatar}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="kol-user-info">
                    <div className="d-flex justify-content-between">
                      <span className="deal-user-name">{`${item?.get_user?.name} ${item?.get_user?.last_name}`}</span>
                      <span className="">
                        <i className={`${item.social_active_icon}`}></i>
                      </span>
                    </div>
                    <div className="kol-user-loc">
                      <i className="loc bi-geo-alt"></i>
                      <p>
                        {item?.city} {item?.state}, india
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

          <h5 className="mt-3 mb-1 theme-color d-flex">Deals </h5>
          <div className="kol-user-deals">
            {kolDealForUser &&
              kolDealForUser.map((item, index) => {
                console.log(item);
                return (
                  <div key={index} className="kol-list-deal">
                    <div className="kol-deal-row justify-content-between align-items-start mb-0">
                      <div className="kol-deal-heading h6">{item.title}</div>
                      <div className="deal-price h6">
                        ${item.price}{" "}
                        <input
                          className="form-check-input price-check"
                          type="radio"
                          onChange={(e) => handleDeals(e, item.kol_profile_id)}
                          value={item.id}
                          name="deal"
                          id=""
                        />
                      </div>
                    </div>

                    <div className="kol-deal-row">
                      <span className="deal-icon-text">
                        <i className="fa fa-calendar"></i>
                        {item.total_days} Days
                      </span>
                      <span className="deal-icon-text">
                        <i className="fa fa-picture-o"></i> {item.type}
                      </span>
                    </div>

                    <p>{item.description}</p>
                  </div>
                );
              })}
          </div>

          <div className="deal-action-bar">
            <div className="deal-form-row">
              <DatePicker
                selected={startDate}
                dateFormat="yyyy-MM-dd hh:mm:ss aa"
                onChange={(date) => setStartDate(date)}
                className="form-control"
              />

              <button type="submit" onClick={handleOrder} className="btn theme-btn">
                Place Order
              </button>
            </div>
          </div>
        </>
      )}

      
      

      {orderModal && (
        <div className="modal-open overflow-hidden">
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header px-4">
                  <h5 className="modal-title theme-color">Order Summary</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={showOrderModal}
                  ></button>
                </div>

                  <div className="modal-body px-4">
                    <div className="col-12 mb-1">
                      <label className="form-label ">
                        <span className="fw-medium">Order Id :</span> {orderSummary.order_id}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                        <span className="fw-medium">Deal Id :</span> {orderSummary.deal_id}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Start Date :</span> {orderSummary.start_date}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">End Date :</span> {orderSummary.end_date}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Deal Title :</span>{orderSummary?.order_summary?.deal_title}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Deal Type :</span> {orderSummary?.order_summary?.type}
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Deal Description :</span> {orderSummary?.order_summary?.description}
                      </label>
                    </div>
                    
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Total days :</span> {orderSummary?.order_summary?.total_days} 
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Tax :</span> {orderSummary?.order_summary?.tax_percentage}%
                      </label>
                    </div>
                    <div className="col-12 mb-1">
                      <label className="form-label">
                      <span className="fw-medium">Price :</span> {orderSummary?.order_summary?.price} {orderSummary?.order_summary?.currency}
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-start px-4 py-3">
                    <button type="submit" className="btn theme-btn" onClick={()=> navigate("/order-details")}>
                      Buy Now
                    </button>
                  </div>

              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}

      {dealModal && (
        <div className="modal-open overflow-hidden">
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header px-4">
                  <h5 className="modal-title theme-color">Add Deal</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={showDealModal}
                  ></button>
                </div>
                <form onSubmit={handleDealSubmit}>
                  <div className="modal-body px-4">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label ">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          name="title"
                          required
                          autoComplete="off"
                          onChange={handleDealChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                          type="text"
                          className="form-control"
                          name="description"
                          rows="3"
                          autoComplete="off"
                          onChange={handleDealChange}
                        ></textarea>
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          required
                          autoComplete="off"
                          onChange={handleDealChange}
                        />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label">Days</label>
                        <input
                          type="number"
                          className="form-control"
                          name="total_days"
                          required
                          autoComplete="off"
                          onChange={handleDealChange}
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <div className="form-check d-inline-block me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="video"
                            value="video"
                            onChange={handleDealChange}
                          />
                          <label className="form-check-label" htmlFor="video">
                            Video
                          </label>
                        </div>
                        <div className="form-check d-inline-block">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="type"
                            id="image"
                            value="image"
                            onChange={handleDealChange}
                          />
                          <label className="form-check-label" htmlFor="image">
                            Image
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer justify-content-start px-4 py-3">
                    <button type="submit" className="btn theme-btn">
                      Create Deal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </>
  );
};

export default ContactDealer;
