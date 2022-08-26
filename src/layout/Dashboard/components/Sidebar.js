import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <div className="side-nav">
            <Link className="dash-logo" to={"/dashboard/profile-view"} >
                KOL DashBoard
            </Link>
            <NavLink to="profile-view" >
                <div className="side-nav-icon"><i className="fa fa-columns"></i></div>
                Personal Data
            </NavLink>
            <NavLink to="announcement/list">
                <div className="side-nav-icon"><i className="fa fa-columns"></i></div>
                Annoucement
            </NavLink>
        </div>
    </>
  )
}

export default Sidebar;