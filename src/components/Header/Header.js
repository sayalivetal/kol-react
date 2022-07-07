import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../slices/api/simpleApi";
import { Dropdown } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const userDetails = useSelector((state) => state?.user?.loginUser);
  const userRegister = useSelector((state) => state?.user?.registerUser);
  console.log(userRegister);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    token: "",
  });

  useEffect(() => {
    const callback = (data) => {
      setCategoryList([...data]);
    };
    getAllCategory(callback);
  }, []);

  useEffect(() => {

    if (userDetails) {
      setUser((state) => {
        return {
          ...state,
          name: userDetails?.data?.user_name,
          email: userDetails?.data?.email,
          role: userDetails?.data?.role_id,
          token: userDetails?.data?.token,
        };
      });
    }
    if (userRegister) {
      setUser((state) => {
        return {
          ...state,
          name: userRegister?.data?.user_name,
          email: userRegister?.data?.email,
          role: userRegister?.data?.role_id,
          token: userRegister?.data?.token,
        };
      });
    }
  }, [userDetails, userRegister]);

  console.log(user);
  const signOut = () => {
    localStorage.removeItem("persist:root");
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

          {user.token ? (
            <>
              <div className="col-md-5 text-end">
                <nav className="">
                  <form className="search-bar">
                    <Dropdown>
                      <Dropdown.Toggle
                        className="custom-btn"
                        variant=""
                        id="dropdown-basic"
                      >
                        All Categories
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {
                          categoryList && categoryList.map((item, i) => {
                            console.log('dropdown', item.name)
                            return <Dropdown.Item key={i} >{item.name}</Dropdown.Item>;
                          })
                        }
                      </Dropdown.Menu>
                    </Dropdown>

                    <input type="text" className=" search-box" placeholder="What are you looking for?" aria-label="Username" aria-describedby="basic-addon1" />
                    <button className="btn btn-search " type="button" aria-expanded="false">Search</button>
                  </form>
                </nav>
              </div>
              <div className="col-md-4">
                <div className="d-flex justify-content-end">
                  <div className="header-icon-bar">
                    {user.role == 2 ? (
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
                      <img src='./Images/1559154-200.png' width={25} height={25} />
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant=""
                        className="custom-btn"
                        id="dropdown-basic"
                      >
                        {user.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to="/account">Your Account</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <button><span onClick={signOut}>Sign out</span></button>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </>
            ):(
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