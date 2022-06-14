import React, { lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));

const routes = [{ path: "*", exact: true, name: "Home", element: LandingPage }];

export default routes;
