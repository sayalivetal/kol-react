import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const BioData = lazy(() => import("../Dashboard/components/BioData"));
const Announcement = lazy(() => import("../Dashboard/components/Announcement"));

const routing = [
    // { path: "/", exact: true, name: "Dashboard", element: Dashboard },
    { path: "/biodata", name: "BioData", element: BioData },
    { path: "/announcement", name: "Announcement", element: Announcement },
];

export default routing;
