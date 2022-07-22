import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const BioData = lazy(() => import("./components/BioData"));
const Announcement = lazy(() => import("../Dashboard/components/Announcement"));
const ProfileView = lazy(() => import("../Dashboard/components/ProfileView"));

const ProfileUpdate = lazy(() => import("../Dashboard/components/ProfileUpdate"));

const routing = [
    // { path: "/", exact: true, name: "Dashboard", element: Dashboard },
    { path: "/profileupdate", name: "BioData", element: BioData },
    { path: "/announcement", name: "Announcement", element: Announcement },
    { path: "/profileview", name: "ProfileView", element: ProfileView },
    { path: "/profile", name: "ProfileUpdate", element: ProfileUpdate },
];

export default routing;
