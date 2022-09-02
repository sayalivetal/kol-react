import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../slices/api/simpleApi";
import { UpdateUserProfile ,UpdateProfileImage} from "../../slices/AuthSlice/AuthSlice";
import { useDispatch } from "react-redux";
import { imageUrl } from "../../common/apis";
const EditAccount = () => {
  // const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFile,setSelectedFile] = useState(null)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
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
  let token = localStorage.getItem("token");
  useEffect(() => {
    const callback = (data) => {
   
      setUserData({
        firstName: data.name,
        lastName: data.last_name,
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

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateUserProfile(userData)).then((data) => {
    
      if (data?.payload?.statusCode === 202) {
        navigate("/account");
      }
    });
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
    for (var pair of formData.entries()) {
  
  }
    dispatch(UpdateProfileImage(formData))
  };

  return (
    <div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <div className="col-lg-12 px-4">
              <div className="row justify-content-between p-md-5 list-row">
                <div className="col-xl-3 col-lg-3 col-12 py-2 align-self-start text-center">
                  <div className="kol-user-img">
                    <img
                      src={`${imageUrl}${userData.avatar}`}
                      className="img-fluid"
                      alt="avatar"
                    />
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
                        First Name
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter First name"
                          name="firstName"
                          defaultValue={userData.firstName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Last Name
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Last name"
                          name="lastName"
                          defaultValue={userData.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Mobile
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Emter Mobile number"
                          name="phone"
                          defaultValue={userData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Gender
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
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Address
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Address"
                          name="address"
                          onChange={handleChange}
                          defaultValue={userData?.address}
                        />
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
                          defaultValue={userData?.landmark}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        City
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter city"
                          name="city"
                          defaultValue={userData?.city}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        State
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter State"
                          name="state"
                          defaultValue={userData?.state}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Country
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Country"
                          name="country"
                          defaultValue={userData?.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-12 col-form-label fw-medium">
                        Zip Code
                      </label>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Zip code"
                          name="zip"
                          defaultValue={userData?.zip}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-12 mt-2">
                        <button type="submit" className="btn theme-btn">
                          Save Profile
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
