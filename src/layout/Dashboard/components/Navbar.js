import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

const navigate = useNavigate();    
const signOut = () => {
    localStorage.removeItem("token");
    navigate("/");
}
  return (
    <>
        <nav className="main-navbar">
            <div className="row">
                <div className="col-lg-6">
                    <Link className='btn theme-btn btn-sm' to={"/home"}>Back to Home</Link>
                </div>
                <div className="col-lg-6 text-right ">
                    <button className='btn btn-sm btn-logout' onClick={signOut} ><i className="bi bi-power"></i></button>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar;