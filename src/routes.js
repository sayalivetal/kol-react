import React, { lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const Account = lazy(() => import("./pages/Account/Account"));
const EditAccount = lazy(() => import("./pages/Account/EditAccount"));
const Home = lazy(() => import("./layout/Home/Home"));
const NotFound = lazy(()=>import("./pages/404page/404"))
const Chat = lazy(()=>import('./layout/Home/Chat/Chat'))
const Bookmark = lazy(()=>import('./pages/Bookmark/Bookmark'))
const Order = lazy(()=> import('./pages/Order/OrderDetails'))
const Checkout = lazy(()=> import('./pages/Payment/Checkout'))
const ThankYou = lazy(()=> import('./pages/Payment/ThankYou'))
const Details = lazy(() =>
  import("./layout/Home/LisitngDetails/ListingDetails")
);
const routes = [
  // { path: "/", exact: true, name: "landing", element: LandingPage },
  { path: "/account", exact: true, name: "Account", element: Account },
  { path: "/edit-account", exact: true, name: "Edit-Account", element: EditAccount },
  { path: "/home", exact: true, name: "Home", element: Home },
  { path: "/details/:id", exact: true, name: "Details", element: Details },
  { path: "/chat", exact: true, name: "Chat", element: Chat },
  { path: "/bookmark", exact: true, name: "Bookmark", element: Bookmark },
  { path: "/order-details", exact: true, name: "Order", element: Order},
  { path: "/checkout-paypal/:id", exact: true, name: "Checkout", element: Checkout },
  { path: "/thank-you", exact: true, name: "ThankYou", element: ThankYou },
  { path: "*", exact: true, name: "NotFound", element: NotFound },
];

export default routes;
