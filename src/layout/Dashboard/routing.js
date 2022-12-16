import React, { lazy } from "react";

const ProfileAdd = lazy(() => import("./components/ProfileAdd"));
const ProfileView = lazy(() => import("../Dashboard/components/ProfileView"));
const ProfileUpdate = lazy(() => import("../Dashboard/components/ProfileUpdate"));

const AnnouncementList = lazy(() => import("../Dashboard/components/AnnouncementList"));
const AnnouncementView = lazy(() => import("../Dashboard/components/AnnouncementView"));
const Announcement = lazy(() => import("../Dashboard/components/Announcement"));

const routing = [
    { path: "/profile-add", name: "ProfileAdd", element: ProfileAdd },
    { path: "/profile-view", name: "ProfileView", element: ProfileView },
    { path: "/profile-update", name: "ProfileUpdate", element: ProfileUpdate },

    { path: "/announcement/:id", name: "Announcement", element: Announcement },
    { path: "/announcement/", name: "Announcement", element: Announcement },
    { path: "/announcement/list", name: "AnnouncementList", element: AnnouncementList },
    { path: "/announcement/view/:id", name: "AnnouncementView", element: AnnouncementView },
];

export default routing;
