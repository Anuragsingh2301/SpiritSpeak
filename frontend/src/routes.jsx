import React, { Suspense } from "react";
import { Navigate, Outlet } from 'react-router-dom'
import RedirectIfAuth from "./components/RedirectIfAuth";
import ImplementAuth from "./components/ImplementAuth";
import LoadingScreen from "./components/LoadingScreen";

// public pages
const Hero = React.lazy(() => import("./pages/Dashboard/Dashboard"));

// auth pages
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));

// protected pages
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const Guide = React.lazy(() => import("./pages/Guide/Guide"));
const Progress = React.lazy(() => import("./pages/Progress/Progress"));

export const routes = [
  // --- THESE ARE YOUR NEW PUBLIC ROUTES ---
  // This wrapper will redirect if you are logged in
  {
    path: '/',
    element: <Suspense fallback={<LoadingScreen />}><RedirectIfAuth /></Suspense>,
    children: [
      { index: true, element: <Login /> }, // path: '/'
      {
        path: '/auth',
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
        ],
      },
    ],
  },

  // --- THESE ARE YOUR PROTECTED ROUTES ---
  // This wrapper will redirect if you are LOGGED OUT
  {
    path: '/',
    element: <Suspense fallback={<LoadingScreen />}><ImplementAuth /></Suspense>,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'guides', element: <Guide /> },
      { path: 'progress', element: <Progress /> },
      { path: 'profile', element: <Profile /> },
    ],
  },

  // --- FALLBACK ROUTE ---
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];