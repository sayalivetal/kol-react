import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
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
          <div className="col-md-6 text-end">
            
          </div>
          <div className="col-md-3 text-end">
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
