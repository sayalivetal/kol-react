import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import {getAllCategory} from '../../slices/api/simpleApi'
import { Dropdown } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = () => {
  const [categoryList, setCategoryList] = useState([]);
  const userDetails = useSelector((state) => state?.user?.loginUser);
  const userLoginDetails = useEffect((state)=>state) 
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    token: "",
  });

  useEffect(() => {
    const callback = data =>{
      setCategoryList([...data])
    }
   getAllCategory(callback);
  }, []);
  console.log("asd",categoryList);

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
    <header className="d-flex flex-wrap py-3 mb-4 header head-back-color">
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

            
            <div className="col-md-5 text-end">

              <nav className="navbar bg-light">
                <form className="container-fluid">
                  <div className="input-group">
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        All Categories
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                      { 
                        categoryList && categoryList.map((item, i)=>{
                          console.log('dropdown',item.name)
                          return  <Dropdown.Item key={i} >{item.name}</Dropdown.Item>;
                        }) 
                      }
                      </Dropdown.Menu>
                    </Dropdown>
                    
                    <input type="text" className="form-control" placeholder="What are you looking for?" aria-label="Username" aria-describedby="basic-addon1"/>
                    <button
                      className="btn btn-secondary " type="button" aria-expanded="false">Search
                    </button>
                    
                  </div>
                </form>
              </nav>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="col">
                  
                  <i className="fa-regular fa-envelope"></i> 
                  <a href='#'><i className="fa fa-envelope"></i></a>
                  <a href='#'>
                    <span className="e-badge e-badge-secondary e-badge-notification e-badge-overlap">99</span>
                    <i className="fa fa-bell"></i>
                  </a>
                                       
                </div>

                <div className="col">      
                  <div className="dropdown">
                    <img src='./Images/1559154-200.png' width={25} height={25}/>
                    <button
                      className="btn btn-default  dropdown-toggle test"
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
