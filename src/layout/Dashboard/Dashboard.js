import React from "react";
import './css/styles.css'
import Sidebar from "./components/Sidebar";
import { Link } from 'react-router-dom'
import KolData from "./kolData";
import Navbar from "./components/Navbar";


const Dashboard = () => {

  return (
    <>

        <body>
            <div className="content-dashboard">
                <div className="side-bar">
                    <Sidebar />                   
                </div>
                <div className="component-block">
                    <Navbar />
                    <KolData/>
                </div>
            </div>
        </body>
    </>

  );
};

export default Dashboard;
