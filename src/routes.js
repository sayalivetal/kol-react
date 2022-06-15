import React, { lazy } from "react";
import Dashboard from "./layout/Dashboard/Dashboard";
// import Banner from "./components/Banner/Banner";
import Home from "./layout/Home/Home";
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));

const routes = [
{ path: "/", exact: true, name: "landing", element: LandingPage },

];

export default routes;
