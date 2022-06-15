import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const DefaultLayout = React.lazy(() => import("./layout/KOLMarketPlace/KolMarketPlace"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Dashboard = React.lazy(()=>import('./layout/Dashboard/Dashboard'));
const EmailVerify = React.lazy(()=>import('./pages/EmailVerify/EmailVerify'))
const ForgotPassword = React.lazy(()=>import('./pages/ForgotPassword/ForgotPassword'))
const ChangePassword = React.lazy(()=>import('./pages/ChangePassword/ChangePassword'))
const Home = React.lazy(()=>import('./layout/Home/Home'))
const loading = <Spinner animation="grow" />;
const App = () => {
  return (
    <div>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route path="/Dashboard" name="Home" element={<Dashboard />} />
          <Route path="/Home" name="Home" element={<Home />} />
          <Route path="/login" name="Home" element={<Login />} />
          <Route path="/register" name="Home" element={<Register />} />
          <Route path="/EmailVerify" name="Home" element={<EmailVerify />} />
          <Route path="/ForgotPassword" name="Home" element={<ForgotPassword />} />
          <Route path="/ChangePassword" name="Home" element={<ChangePassword />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
