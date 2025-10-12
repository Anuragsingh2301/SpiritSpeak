import { Navigate, Outlet } from 'react-router-dom';
import GetCurrentUserData from '../hooks/GetCurrentUserData';
import LoadingScreen from './LoadingScreen';

const ImplementAuth = () => {
  const {
    isAuthenticated,
    isCheckingAuth,
  } = GetCurrentUserData();

  // If checking authentication, show loading screen
  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  // If there's no authentication, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default ImplementAuth;
