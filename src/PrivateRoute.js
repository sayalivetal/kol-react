import React from 'react'
import { Navigate } from 'react-router-dom';
const DefaultLayout = React.lazy(() =>
  import('./layout/KOLMarketPlace/KolMarketPlace')
);

const PrivateRoute = () => {

    let token = localStorage.getItem("token");
    //console.log(token);
    return token ? <DefaultLayout /> : <Navigate to="/"  />;

}

export default PrivateRoute