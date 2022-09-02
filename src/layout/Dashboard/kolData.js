import React from "react";
import { Route, Routes, Link } from "react-router-dom";

//routes config

import routing from "./routing";
const KolData = () => {
  
  return (
    <div className="container-fluid">
      <Routes>
        {routing.map((route, idx) => {
            return (
                route.element && (
                <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                />
                )
                );
            })
        }
      </Routes>

      <footer className="row py-4 mt-auto align-items-center justify-content-between small">
          <div className=" col-6 text-muted">Copyright &copy; Your Website 2022</div>
          <div className=" col-6 text-right">
              <Link className="ms-2 text-muted" to={"/dashboard/profile-view"} >Privacy Policy</Link>
              <Link className="ms-2 text-muted" to={"/dashboard/profile-view"} >Terms &amp; Conditions</Link>
          </div>
      </footer>

    </div>
  );
};

export default KolData;
