import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const userDetails = useSelector((state) => state?.user?.loginUser);
  const userLoginDetails = useEffect((state)=>state) 
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    token: "",
  });

  useEffect(() => {
    setUser((state) => {
      return {
        ...state,
        name: userDetails?.data?.user_name,
        email: userDetails?.data?.email,
        role: userDetails?.data?.role_id,
        token: userDetails?.data?.token,
      };
    });
  }, [userDetails]);
  console.log(user);
  return (
    <header className="d-flex flex-wrap py-3 mb-4 header">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-3">
            <a
              href="/"
              className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none logo"
            >
              KOL
            </a>
          </div>
          {user.token ? (
            <div className="col-md-6 text-end">
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item">Action</a>
                  </li>
                  <li>
                    <a className="dropdown-item">Another action</a>
                  </li>
                  <li>
                    <a className="dropdown-item">Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="col-md-6 text-end">
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
