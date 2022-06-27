import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
const DefaultLayout = React.lazy(() =>
  import("./layout/KOLMarketPlace/KolMarketPlace")
);
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Dashboard = React.lazy(() => import("./layout/Dashboard/Dashboard"));
const EmailVerify = React.lazy(() => import("./pages/EmailVerify/EmailVerify"));
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);
const ChangePassword = React.lazy(() =>
  import("./pages/ChangePassword/ChangePassword")
);
const Role = React.lazy(() => import("./pages/Role/Role"));
const Home = React.lazy(() => import("./layout/Home/Home"));
const EmailCheck = React.lazy(() => import("./pages/EmailCheck/EmailCheck"));
const Account = React.lazy(() => import("./pages/Account/Account"));
const PasswordSuccess = React.lazy(() =>
  import("./pages/PasswordUpdate/PasswordUpdate")
);
const loading = <Spinner animation="grow" />;

const App = () => {
  return (
    <div>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/emailVerify" element={<EmailVerify />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/role" element={<Role />} />
          <Route path="/emailCheck" element={<EmailCheck />} />
          <Route path="/passwordSuccess" element={<PasswordSuccess />} />
        </Routes>
        <ToastContainer />
      </Suspense>
    </div>
  );
};

export default App;
