import React, { lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Account = lazy(() => import("./pages/Account/Account"));
const Home = lazy(() => import("./layout/Home/Home"));
const Details = lazy(() =>
  import("./layout/Home/LisitngDetails/ListingDetails")
);
const routes = [
  { path: "/", exact: true, name: "landing", element: LandingPage },
  { path: "/account", exact: true, name: "Account", element: Account },
  { path: "/home", exact: true, name: "Home", element: Home },
  { path: "/details", exact: true, name: "Details", element: Details },
];

export default routes;
