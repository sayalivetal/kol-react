import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
const BioData = lazy(() => import("./components/BioData"));
const Announcement = lazy(() => import("../Dashboard/components/Announcement"));
const ProfileView = lazy(() => import("../Dashboard/components/ProfileView"));

const ProfileUpdate = lazy(() => import("../Dashboard/components/ProfileUpdate"));
const AnnouncementList = lazy(() => import("../Dashboard/components/AnnouncementList"));
const AnnouncementView = lazy(() => import("../Dashboard/components/AnnouncementView"));


const routing = [
    { path: "/profileupdate", name: "BioData", element: BioData },
    { path: "/profileview", name: "ProfileView", element: ProfileView },
    { path: "/profile", name: "ProfileUpdate", element: ProfileUpdate },

    { path: "/announcement/:id", name: "Announcement", element: Announcement },
    { path: "/announcement/", name: "Announcement", element: Announcement },
    { path: "/announcement/list", name: "AnnouncementList", element: AnnouncementList },
    { path: "/announcement/view/:id", name: "AnnouncementView", element: AnnouncementView },
];

export default routing;
