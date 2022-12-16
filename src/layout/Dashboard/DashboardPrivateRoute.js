import React from "react";
import { Navigate } from "react-router-dom";

const DashboardLayout = React.lazy(() => {
    import('./Dashboard')
});

const DashboardPrivateRoute = () => {
    let token = localStorage.getItem("token");

    return ( token ? <DashboardLayout /> : <Navigate to="/" />    );
}

export default DashboardPrivateRoute;