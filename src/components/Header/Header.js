import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory, getAllLanguage } from "../../slices/api/simpleApi";
import { userSelector, clearState } from "../../slices/AuthSlice/AuthSlice";
import { Dropdown } from "react-bootstrap";
import { kolType, kolName } from "../../slices/KolListing/KolSlices";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState({});
  const [categoryType, setCategory] = useState("");
  const [language, setLanguage] = useState({});
  const {
    isFetching,
    isError,
    username,
    message,
    email,
    role:{payload}
  } = useSelector(userSelector);

  let token = localStorage.getItem("token");

  useEffect(() => {
    const callback = (data) => {
      setCategoryList({ ...data });
    };
    getAllCategory(callback, token);
  }, []);
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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(kolName(categoryType));
  };


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
              <div className="col-md-6 text-end">
                <nav className="search-bar">
                  <select
                    className="form-select custom-btn"
                    aria-label="Default select example"
                    onChange={handleChange}
                  >
                    <option defaultValue>Select Category</option>
                    {categoryList &&
                      Object.entries(categoryList).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                      ))}
                  </select>
                  <form className="search-form" onSubmit={handleSubmit}>
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
              <div className="col-md-3">
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
                      <span className="count-badge">15</span>
                    </Link>
                    {/* <Link to={"/chat"}>

                      <i className="bi bi-bell"></i>{" "}
                      <span className="count-badge">15</span>
                    </Link> */}
                    <Dropdown className="notify-dropdown">
                      <Dropdown.Toggle
                        variant=""
                        className="notify-drop-btn"
                        id="dropdown-notify"
                      >
                        <i className="bi bi-bell"></i>{" "}
                      <span className="count-badge">15</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <div className="notification-list">
                          <Link to={"/chat"} className="list-item">Please add a deal as per the promotion Notification Text</Link>
                          <Link to={"/chat"} className="list-item">Please add a deal as per the promotion Notification Text</Link>
                          <Link to={"/chat"} className="list-item">Please add a deal as per the promotion Notification Text</Link>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="header-profile">
                    <div className="profile-user-icon">
                      <img src="Images/avatar.png" alt="avatar"/>
                    </div>
                    <Dropdown className="user-dropdown">
                      <Dropdown.Toggle
                        variant=""
                        className="profile-btn"
                        id="dropdown-basic"
                      >
                        {username}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <div className="user-drop-list">
                          <div className="list-item-profile">
                            <div className="profile-user-icon">
                              <img src="Images/avatar.png" />
                            </div>
                            <div className="profile-user-name">
                              <div className="user-name">{username}</div>
                              <div className="user-designation">
                                {username}{" "}
                              </div>
                            </div>
                          </div>


                          <Link className="list-item" to="/account">
                            Profile
                          </Link>
                          <Link className="list-item" to="/account">
                            Your Account
                          </Link>
                          <Link className="list-item" to="/bookmark">
                            Bookmarks
                          </Link>
                          <div className="list-item" onClick={signOut}>
                           Sign out
                          </div>

                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-md-4 text-end">
              <Link className="btn  me-4 outlined-button text-light" to="/role">
                Sign Up
              </Link>

              <Link className="btn outlined-button text-light" to="/login">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;











