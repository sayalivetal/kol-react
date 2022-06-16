import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import './App.css';
const DefaultLayout = React.lazy(() => import("./layout/KOLMarketPlace/KolMarketPlace"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Dashboard = React.lazy(()=>import('./layout/Dashboard/Dashboard'));
const EmailVerify = React.lazy(()=>import('./pages/EmailVerify/EmailVerify'))
const ForgotPassword = React.lazy(()=>import('./pages/ForgotPassword/ForgotPassword'))
const ChangePassword = React.lazy(()=>import('./pages/ChangePassword/ChangePassword'))
const Role = React.lazy(()=>import('./pages/Role/Role'))
const Home = React.lazy(()=>import('./layout/Home/Home'))
const loading = <Spinner animation="grow" />;

const App = () => {
  return (
    <div>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="/" name="Home" element={<DefaultLayout />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/EmailVerify" element={<EmailVerify />} />
          <Route path="/ForgotPassword"  element={<ForgotPassword />} />
          <Route path="/ChangePassword"  element={<ChangePassword />} />
          <Route path="/Role"  element={<Role />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
