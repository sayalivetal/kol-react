import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../slices/api/simpleApi";
import { UpdateUserProfile ,UpdateProfileImage} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch } from "react-redux";
import { imageUrl } from "../../common/apis";
import { toast } from "react-toastify";
import 'react-phone-input-2/lib/style.css'
import { getAllStates } from "../../slices/api/simpleApi";


const EditAccount = () => {
  // const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile,setSelectedFile] = useState(null)
  const [fieldError,setfieldError] = useState(null)
  const [states, setStates] = useState({});
  const [formError,setFormError] = useState({
    phoneError : "",
    zipError : ""
  })
  const [userData, setUserData] = useState({
    firstName: "",
  //  lastName: "",
    phone: "",
    gender: "",
    address: "",
    landmark: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    avatar: "",
  });
  let {firstName, lastName,phone,gender,address,landmark,city,zip,state,country,avatar} = userData
  let token = localStorage.getItem("token");
  useEffect(() => {
    const callback = (data) => {
   
      setUserData({
        firstName: data.name,
     //   lastName: data.last_name,
        phone: data.phone,
        gender: data.gender,
        address: data?.get_address?.address,
        landmark: data?.get_address?.landmark,
        city: data?.get_address?.city,
        zip: data?.get_address?.zip,
        state: data?.get_address?.state,
        country: data?.get_address?.country,
        avatar:data.avatar,
        token,
      });
      
    };
    getUserDetails(callback, token);
  }, []);


  useEffect(() => {
    const callback = (data) => {
      setStates({ ...data });
    };
    getAllStates(callback);
  }, []);







  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if(e.target.name == "phone" && e.target.value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
      setFormError(state => {
        return{
          ...state,
          phoneError : ""
        }
      })
    }else if (e.target.name == "phone" && e.target.value.length == 0){
      setFormError(state => {
        return{
          ...state,
          phoneError : ""
        }
      })
    }else if (e.target.name == "phone"){
      setFormError(state => {
        return{
          ...state,
          phoneError : "please check your phone"
        }
      })
    }
    if(e.target.name == "zip" && e.target.value.match(/(^\d{6}$)|(^\d{6}-\d{6}$)/)){
      setFormError(state => {
        return{
          ...state,
          zipError : ""
        }
      })
    }else if (e.target.name == "zip" && e.target.value.length == 0){
      setFormError(state => {
        return{
          ...state,
          zipError : ""
        }
      })
    }else if (e.target.name == "zip"){
      setFormError(state => {
        return{
          ...state,
          zipError : "please check your zip code"
        }
      })
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(firstName && phone && gender && address &&city && zip && state && country){

      if(phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) &&  zip.match(/(^\d{6}$)|(^\d{6}-\d{6}$)/)){

        dispatch(UpdateUserProfile(userData)).then((data) => {
          //console.log("-------------------->>>>>>>>",data)
          if (data?.payload?.statusCode === 201 || data?.payload?.statusCode === 202) {
            toast.success(data?.payload?.message)
            navigate("/account");
          }
          else{
            toast.error(data?.payload?.message)
          }
        });
      }
    }else{
      setfieldError("Please fill the mandatory filed")
    }
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const onFileUpload = (e) => {
    e.preventDefault()
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append('avatar',selectedFile)
  //   for (var pair of formData.entries()) {
  
  // }
    dispatch(UpdateProfileImage(formData)).then((data)=> {
      if(data?.payload?.statusCode === 201){
        const callback = (data) => {
          setUserData({
            ...userData,
            avatar:data.avatar,
          });
        };
        getUserDetails(callback, token);
      }
    })
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="col-lg-12 px-4">
              <div className="row justify-content-between p-md-5">
                <div className="col-xl-3 col-lg-3 col-12 py-2 align-self-start text-center">
                  <div className="kol-profile-img">
                    {userData?.avatar ? (
                      <img
                      src={`${imageUrl}${userData.avatar}`}
                      className="img-fluid"
                      alt="avatar"
                    />
                    ) : "Avatar"}
                    
                  </div>
                  <input type="file" className="form-control mb-2" onChange={onFileChange} />
                  <button
                    type="button"
                    className="btn theme-btn col-12 mb-4"
                    onClick={onFileUpload}
                  >
                    Update Photo
                  </button>
                </div>
                <div className="col-xl-9 col-lg-9 col-12 px-lg-4">
                  <div className="row justify-content-between">
                    <h2 className="mb-4">Edit your Profile</h2>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        User Name
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${(!firstName && fieldError)? "border-danger": ""}`}
                          placeholder="Enter First name"
                          name="firstName"
                          value={userData.firstName}
                          onChange={handleChange}
                          disabled
                        />
                        <span className="err text-danger">
                        {!firstName && fieldError}
                        </span> 
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Last Name
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${(!lastName && fieldError)? "border-danger": ""}`}
                          placeholder="Enter Last name"
                          name="lastName"
                          value={userData.lastName}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {!lastName && fieldError}
                        </span>
                      </div>
                    </div> */}
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Mobile <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${((!phone && fieldError) || formError.phoneError)? "border-danger": ""}`}
                          placeholder="Enter Mobile number"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {(!phone && fieldError) || formError.phoneError}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Gender <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <div className="form-check d-inline-block me-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={userData.gender == "male"}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male 
                          </label>
                        </div>
                        <div className="form-check d-inline-block">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                            checked={userData.gender == "female"}
                            value="female"
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </div>
                      </div>
                      <span className="err text-danger">
                        {!gender && fieldError}
                        </span>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Address <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${(!address && fieldError)? "border-danger": ""}`}
                          placeholder="Enter Address"
                          name="address"
                          onChange={handleChange}
                          value={userData?.address}
                        />
                        <span className="err text-danger">
                        {!address && fieldError}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium ">
                        Landmark
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Landmark"
                          name="landmark"
                          value={userData?.landmark}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        City <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={` form-control ${(!city && fieldError)? "border-danger": ""}`}
                          placeholder="Enter city"
                          name="city"
                          value={userData?.city}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {!city && fieldError}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        State <span className="text-danger">*</span>
                      </label>
                      {/* <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${(!state && fieldError)? "border-danger": ""}`}
                          placeholder="Enter State"
                          name="state"
                          value={userData?.state}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {!state && fieldError}
                        </span>
                      </div> */}
                      <div className="col-12">
                        <select
                          className={`form-select ${(!state && fieldError)? "border-danger": ""}`}
                          onChange={handleChange}
                          name="state"
                          value={userData?.state}
                        >
                          <option value="">Select State</option>
                          {states &&
                            Object.entries(states).map(([key, value]) => (
                              <option value={key}>{value}</option>
                            ))}
                        </select>
                        <span className="err text-danger">
                          {!state && fieldError}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Country <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${(!country && fieldError)? "border-danger": ""}`}
                          placeholder="Enter Country"
                          name="country"
                          value={userData?.country}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {!country && fieldError}
                        </span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Zip Code <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className={`form-control ${((!zip && fieldError) || formError.zipError)? "border-danger": ""}`}
                          placeholder="Enter Zip code"
                          name="zip"
                          value={userData?.zip}
                          onChange={handleChange}
                        />
                        <span className="err text-danger">
                        {(!zip && fieldError) || formError.zipError}
                        </span>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-12 mt-2">
                        <button type="submit" className="btn theme-btn me-3">
                          Save Profile
                        </button>
                        <button type="button" className="btn btn-default" onClick={()=> navigate("/account")}>
                          View Profile
                        </button>
                       </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
