import React from 'react'
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    {/* <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to="#">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" ></i></div>
                        Dashboard
                    </Link> */}
                    <div className="sb-sidenav-menu-heading">Personal Setting</div>
                    <Link className="nav-link collapsed" to="profileupdate" >
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Personal Data
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <Link className="nav-link collapsed" to="announcement" >
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Annoucement
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="#">Static Navigation</Link>
                            <Link className="nav-link" to="#">Light Sidenav</Link>
                        </nav>
                    </div>
                    {/* <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                        <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                        Pages
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link> */}
                </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    </>
  )
}

export default Sidebar;