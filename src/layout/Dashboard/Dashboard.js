import React from "react";
import { useState } from 'react';
import './css/styles.css'
import { useDispatch,useSelector } from "react-redux";
import BioData from './components/BioData';
import Announcement from './components/Announcement'
import Sidebar from "./components/Sidebar";
import { useLocation } from 'react-router-dom'
import KolData from "./kolData";


const Dashboard = () => {

  return (
    <>

        <body className="sb-nav-fixed">
            <nav className="sb-topnav navbar navbar-expand header">
                <a className="text-decoration-none logo" href="#">Kol Dash</a>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />                   
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <KolData/>
                        </div>
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2022</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script src="js/scripts.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossOrigin="anonymous"></script>
        <script src="assets/demo/chart-area-demo.js"></script>
        <script src="assets/demo/chart-bar-demo.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossOrigin="anonymous"></script>
        <script src="js/datatables-simple-demo.js"></script>
    </>

  );
};

export default Dashboard;
