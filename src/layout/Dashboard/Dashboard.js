import React from "react";
import './css/styles.css'
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import KolData from "./kolData";
import Navbar from "./components/Navbar";


const Dashboard = () => {

  return (
        <>
            <div className="content-dashboard">
                <div className="side-bar">
                    <Sidebar />                   
                </div>
                <div className="component-block">
                    <Navbar />
                    <KolData/>
                </div>
            </div>
    
        </>
  );
};

export default Dashboard;
