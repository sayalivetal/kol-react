import React from "react";
import { Route, Routes } from "react-router-dom";

//routes config

import routing from "./routing";
const KolData = () => {
  
  return (
    <div>
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
    </div>
  );
};

export default KolData;
