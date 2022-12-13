import React, { useEffect, useState } from "react";
import "../Chat.css";

import { useNavigate, useLocation, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  createDeal,
  PlaceOrder,
  deleteKolDeals,
} from "../../../../slices/DealsSlice/DealsSlice";
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
import { toast } from "react-toastify";
import ConfirmModal from "../../../../common/components/ConfirmModal";

const ContactDealer = ({ id }) => {
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  // console.log(token);
  const [startDate, setStartDate] = useState(new Date());
  // console.log(startDate);

  // const {id} = useParams();

  const dispatch = useDispatch();
  const [dealModal, setDealModal] = useState(false);
  const [modalProps, setModalProps] = useState({
    name: "",
    btnText: "",
  });

  const [kolProfile, setKolProfile] = useState([]);
  const [editedDealId, setEditedDealId] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [dealForm, setDealForm] = useState({
    title: "",
    description: "",
    price: "",
    total_days: "",
    type: "",
    token,
    id: editedDealId,
  });

  const [dealdetail, setDealDetail] = useState();
  const [kolDealForUser, setKolDealForUser] = useState();
  const [order, setOrder] = useState({
    deal_id: "",
    kol_profile_id: "",
    start_date: "",
    token,
  });

const [modalHeading, setModalHeading] = useState("");
const [showModal, setshowModal] = useState(false);
const[dealId,setDealId] = useState("")

  const kolList = async () => {
    const response = await fetch(`${API}/kol-profile/list`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    let data = await response.json();
    // console.log(data.kolProfiles);
    setKolProfile(
      [...data.kolProfiles].filter((item, index) => {
        if (item.user_id == id) {
          return item;
        }
      })
    );
  };

  console.log("aslkjflkasjflsjhello", kolProfile);

  useEffect(() => {
    kolList();
  }, [id]);

  const showDealModal = () => {
    setDealModal(!dealModal);
  };

  // add/update deal onchange  handler
  const handleDealChange = (e) => {
    setDealForm((preState) => {
      return { ...preState, [e.target.name]: e.target.value };
    });
    // console.log(e.target.name, e.target.value );
  };

  // add/update deal handler
  const handleDealSubmit = (e) => {
    e.preventDefault();
    // console.log("---------",dealForm,token)
    dispatch(createDeal(dealForm)).then((data) => {
      // console.log(data);
      if (data.payload.status) {
        const callback = (data) => {
          setDealDetail({ ...data });
          //console.log();
        };
        getDealsListOfKol(callback, token);
      }
    });
    setDealModal(false);
  };

  // Edit deal
  const handleDealEdit = (e, editedId) => {
    setEditedDealId(editedId);
    showDealModal();
    setModalProps({ name: "Edit Deal", btnText: "Save Deal" });
    dealdetail?.get_deal.filter((item, index) => {
      if (item.id == editedId) {
        setDealForm({
          ...dealForm,
          ...item,
        });
      }
    });
  };

  // add deal modal open handler
  const handlerAddDeal = () => {
    showDealModal();
    setModalProps({ name: "Add Deal", btnText: "Create Deal" });
    setDealForm({
      title: "",
      description: "",
      price: "",
      total_days: "",
      type: "",
      token,
      //  id,
    });
  };

  const handleDelModal = (id) => {
    setDealId(id)
    setModalHeading("Confirmation box");
    setshowModal(!showModal);
   }
  
   const showCustomModal = () => {
    setshowModal(!showModal);
  };

  // deal delete by id
  const handleDealDelete = (dealId) => {
    dispatch(deleteKolDeals({ dealId, token })).then((state) => {
      if (state.payload.statusCode == 200) {
        const callback = (data) => {
          setDealDetail({ ...data });
        };
        getDealsListOfKol(callback, token);
      }
    });
  };

  // kol own deals List
  useEffect(() => {
    const callback = (data) => {
      setDealDetail({ ...data });
      //console.log("deals list",data);
    };
    getDealsListOfKol(callback, token);
  }, []);

  // kol deals list for users
  useEffect(() => {
    const callback = (data) => {
      setKolDealForUser([...data]);
      // console.log("kol deal for user", data);
    };
    getDealsListForUsers(callback, token, id);
  }, [id]);

  // select deal for order
  const handleDeals = (e, id) => {
    setOrder({
      ...order,
      kol_profile_id: id,
      deal_id: e.target.value,
    });
    setBtnDisabled(e.target.value === '');
  };

  // select date for order
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
      start_date: moment(`${finalDate} ${dateStartTime}`).format(
        "YYYY-MM-DD hh:mm:ss"
      ),
    });
  }, [startDate]);

  // place order handler
  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(PlaceOrder(order)).then((data) => {
      if (data.payload.statusCode == 201) {
        // showOrderModal();
        navigate(`/checkout-paypal/${data?.payload?.orderPlacedId}`);
        toast.success(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
    // console.log(order);
  };

  return (
    <>
      <div className="col-lg-12">
        <h5>About the Creator</h5>
      </div>

      {role == 2 ? (
        <>
          <div className="kol-user-card">
            <div className="d-flex mb-2">
                <div className="kol-user-icon">
                  <img
                    className="rounded-circle  img-fluid"
                    src={`${imageUrl}${dealdetail?.avatar}`}
                    alt="avatar"
                  />
                </div>
                <div className="kol-user-info">
                      <div className="deal-user-name">{dealdetail?.get_user?.name}</div>
                      <div class="kol-user-text">{dealdetail?.get_user?.email}</div>
                </div>
            </div>

            <div className="kol-user-social">
                {dealdetail?.get_social_media.map((items, index)=>{
                  return(
                    <div key={index} className="kol-social-card">
                          <div className="kol-social-info">{items.social_user_id}<div className="kol-social-icon"><i className={items.social_icon} ></i> </div>{items.followers}</div>
                    </div>
                  )
                })}
            </div>
            
          </div>

          <h5 className="mt-3 mb-1 theme-color d-flex">
            Deals
            <button
              className="btn btn-sm theme-btn ms-auto"
              onClick={handlerAddDeal}
            >
              {" "}
              + Deal
            </button>
          </h5>
          <div className="kol-user-deals">
            {dealdetail?.get_deal &&
              dealdetail?.get_deal.map((item, index) => {
                // console.log(item)
                return (
                  <div key={index} className="kol-list-deal">
                    <div className="kol-deal-row justify-content-between align-items-start mb-0">
                      <div className="kol-deal-heading h6">{item.title}</div>
                      <div className="deal-price h6">
                        ${item.price}
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
                        <i
                          className={`fa ${
                            item.type == "video"
                              ? "fa-video-camera"
                              : "fa-picture-o"
                          }`}
                        ></i>{" "}
                        {item.type}
                      </span>
                    </div>
                    <p className="mb-1">{item.description}</p>
                    <div className="kol-deal-row">
                      <span
                        className="deal-delete btn btn-sm me-2 btn-default"
                        onClick={() => {
                          handleDelModal(item.id);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </span>
                      <span
                        className="deal-edit btn btn-sm  btn-default"
                        onClick={(e) => {
                          handleDealEdit(e, item.id);
                        }}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          {kolProfile.map((item, index) => {
            return (
              <>
                <div className="kol-user-card" key={index}>
                  <div className="d-flex mb-2">
                      <div className="kol-user-icon">
                        <img
                          className="rounded-circle  img-fluid"
                          src={`${imageUrl}${item?.avatar}`}
                          alt="avatar"
                        />
                      </div>
                      <div className="kol-user-info">
                            <div className="deal-user-name">{item?.username}</div>
                            <div class="kol-user-text">{item?.email}</div>
                      </div>
                  </div>

                  <div className="kol-user-social">
                      {item?.SocialMedia.map((items, index)=>{
                        return(
                          <div key={index} className="kol-social-card">
                                <div className="kol-social-info">{items.social_media_username}<div className="kol-social-icon"><i className={items.social_icon} ></i> </div>{items.followers}</div>
                          </div>
                        )
                      })}
                  </div>
                  
                </div>
                
              </>
            );
          })}

          <h5 className="mt-3 mb-1 theme-color d-flex">Deals </h5>
          <div className="kol-user-deals">
            {kolDealForUser &&
              kolDealForUser.map((item, index) => {
                //console.log(item);
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
                        <i
                          className={`fa ${
                            item.type == "video"
                              ? "fa-video-camera"
                              : "fa-picture-o"
                          }`}
                        ></i>{" "}
                        {item.type}
                      </span>
                    </div>

                    <p className="mb-1">{item.description}</p>
                  </div>
                );
              })}
          </div>
          {kolDealForUser?.length > 0 ? (
             <div className="deal-action-bar">
              <div className="deal-form-row">
                <DatePicker
                  selected={startDate}
                  dateFormat="yyyy-MM-dd hh:mm:ss aa"
                  onChange={(date) => setStartDate(date)}
                  className="form-control"
                  minDate={moment().toDate()}
                />

                <button
                  type="submit"
                  onClick={handleOrder}
                  className="btn theme-btn"
                  disabled={btnDisabled}
                >
                  Place Order
                </button>
              </div>
            </div>
          )
          
          : ""}
         

        </>
      )}

      {dealModal && (
        <div className="modal-open overflow-hidden">
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header px-4">
                  <h5 className="modal-title theme-color">{modalProps.name}</h5>
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
                          value={dealForm.title}
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
                          value={dealForm.description}
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
                          value={dealForm.price}
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
                          value={dealForm.total_days}
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
                            value={
                              dealForm.type == "video" ? dealForm.type : "video"
                            }
                            defaultChecked={dealForm.type == "video"}
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
                            value={
                              dealForm.type == "image" ? dealForm.type : "image"
                            }
                            defaultChecked={dealForm.type == "image"}
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
                      {modalProps.btnText}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}



      <ConfirmModal 
        modalName={modalHeading}
        showModalProp={showModal}
        closeModal={showCustomModal}
      >
          <div className="row">
            <div className="col-12 mb-3">
              <label className="form-label ">Are you sure to want to Delete to this Deal</label>
            </div>
            <div className="col-12 mb-3">
              <button type="submit" className="btn theme-btn" 
                onClick={()=> {
                handleDealDelete(dealId)
                setshowModal(!showModal);
                }}>Confirm</button>
              <button type="submit" className="btn btn-default mx-3" onClick={showCustomModal}>Cancel</button>
            </div>
          </div>
        
      </ConfirmModal>

    </>
  );
};

export default ContactDealer;
