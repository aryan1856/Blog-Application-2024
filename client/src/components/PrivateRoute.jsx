import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = () => {
  const { isLoggedIn, isCheckingUser } = useContext(UserContext);

  if (isCheckingUser) {
    // Optionally render a loading indicator or return null while checking
    return <div>Loading...</div>; // or return null;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
