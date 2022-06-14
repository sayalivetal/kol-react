import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "react-bootstrap";
const DefaultLayout = React.lazy(() => import("./layout/KolMarketPlace"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const Dashboard = React.lazy(()=>import('./layout/Dashboard'))
const loading = <Spinner animation="grow" />;
const App = () => {
  return (
    <div>
      <Suspense fallback={loading}>
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route path="/Dashboard" name="Home" element={<Dashboard />} />
          <Route path="/login" name="Home" element={<Login />} />
          <Route path="/register" name="Home" element={<Register />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
