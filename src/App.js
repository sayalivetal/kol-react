import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LandingPage from './pages/LandingPage/LandingPage';
import './App.css';
import PrivateRoute from './PrivateRoute';
import DashboardPrivateRoute from './layout/Dashboard/DashboardPrivateRoute';


const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const EmailVerify = React.lazy(() => import('./pages/EmailVerify/EmailVerify'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword/ForgotPassword'));
const ChangePassword = React.lazy(() => import('./pages/ChangePassword/ChangePassword'));
const Role = React.lazy(() => import('./pages/Role/Role'));
const EmailCheck = React.lazy(() => import('./pages/EmailCheck/EmailCheck'));
const PasswordSuccess = React.lazy(() => import('./pages/PasswordUpdate/PasswordUpdate'));

const App = () => {

  return (
    <div>
      <Suspense fallback={<div className='spinner-container'><Spinner animation='grow' variant="light" /></div>}>
        <Routes>
          <Route exact path='*' name='Home' element={<PrivateRoute />} />
          <Route path='/' element={<LandingPage/>} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard/*' element={<DashboardPrivateRoute />} />

          <Route exact path='/register' element={<Register />} />
          <Route exact path='/emailVerify' element={<EmailVerify />} />
          <Route exact path='/forgotPassword' element={<ForgotPassword />} />
          <Route exact path='/changePassword' element={<ChangePassword />} />
          <Route exact path='/role' element={<Role />} />
          <Route exact path='/emailCheck' element={<EmailCheck />} />
          <Route  exact path='/passwordSuccess' element={<PasswordSuccess />} />
        </Routes>
        <ToastContainer autoClose={1000} limit={1} />
      </Suspense>
    </div>

  );
};

export default App;
