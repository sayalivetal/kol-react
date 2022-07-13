import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory, getAllLanguage } from "../../slices/api/simpleApi";
import { userSelector, clearState } from "../../slices/AuthSlice/AuthSlice";
import { Dropdown } from "react-bootstrap";
import {kolType,kolName} from '../../slices/KolListing/KolSlices'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState({});
  const [categoryType, setCategory] = useState("")
  const [language, setLanguage] = useState({});
  const {
    isFetching,
    isError,
    username,
    message,
    email,
    role: { payload },
  } = useSelector(userSelector);
  console.log(payload, email, username);

  console.log(categoryList);
  let token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    const callback = (data) => {
      console.log(data);
      setCategoryList({ ...data });
    };
    getAllCategory(callback, token);
  }, []);
  console.log(categoryList);
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      navigate("/login");
    }
  }, [isError]);
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleChange = (e) => {
    dispatch(kolType(e.target.value));
  };
  const handleCategoryChange = (e) =>{
    console.log(e.target.value);
    setCategory(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(kolName(categoryType))
  }
  console.log(categoryType);
  return (
    <header className="d-flex flex-wrap py-1 mb-4 header head-back-color">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-3">
            <a
              href="/"
              className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none logo"
            >
              {" "}
              KOL{" "}
            </a>
          </div>
          {token ? (
            <>
              <div className="col-md-5 text-end">
                <nav className="search-bar">
                <select
                      className="form-select custom-btn"
                      aria-label="Default select example"
                      onChange={handleChange}
                    >
                      <option selected>Select Category</option>
                      {categoryList &&
                        Object.entries(categoryList).map(([key, value]) => (
                          <option value={key}>{value}</option>
                        ))}
                 
                    </select>
                  <form className="" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      className=" search-box"
                      placeholder="What are you looking for?"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={handleCategoryChange}
                    />
                    <button
                      className="btn btn-search "
                      type="submit"
                      aria-expanded="false"
                    >
                      Search
                    </button>
                  </form>
                </nav>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <div className="header-icon-bar">
                    {payload == 2 ? (
                      <>
                        <Link to="/dashboard">
                          <i className="bi bi-grid"></i>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}

                    <Link to={"/chat"}>
                      <i className="bi bi-chat-dots"></i>
                    </Link>
                    <Link to={"/chat"}>
                      <i className="bi bi-bell"></i>{" "}
                      <span className="count-badge">99</span>
                    </Link>
                  </div>

                  <div className="header-profile">
                    <div className="profile-user-icon">
                      <img src="Images/avatar.png" />
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        className="profile-btn"
                        id="dropdown-basic"
                      >
                        {username}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/account">Your Account</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <button>
                            <span onClick={signOut}>Sign out</span>
                          </button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-md-4 text-end">
              <button type="button" className="btn  me-4 outlined-button">
                <Link to="/role"> Sign Up</Link>
              </button>
              <button type="button" className="btn outlined-button">
                <Link to="/login">Sign In</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
