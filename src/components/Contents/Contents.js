import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

//routes config
import routes from "../../routes";
const Contents = () => {
  console.log(routes.path);
  return (
    <div>
      {" "}
      <Routes>
        {routes.map((route, idx) => {
        let token = localStorage.getItem('token');
          console.log(route,token);
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
        })}
     
      </Routes>
    </div>
  );
};

export default Contents;
