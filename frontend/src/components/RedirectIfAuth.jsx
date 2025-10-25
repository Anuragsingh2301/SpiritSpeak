import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import GetCurrentUserData from '../hooks/GetCurrentUserData';
import LoadingScreen from './LoadingScreen';

const RedirectIfAuth = () => {
  const { isAuthenticated, isCheckingAuth } = GetCurrentUserData();

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    // If the user is logged in, redirect them to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is not logged in, show the child route (Login, Register, etc.)
  return <Outlet />;
};

export default RedirectIfAuth;