import { Navigate, Outlet } from 'react-router-dom';

const ImplementAuth = () => {
  const isAuthenticated = true

  // If there's no  authentication failed, redirect to login
  if ((!isAuthenticated)) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default ImplementAuth;
