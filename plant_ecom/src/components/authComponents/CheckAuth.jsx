import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect to login if not authenticated and not on login or registration page
  if (!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/registration"))) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users away from login and registration pages
  if (isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/registration"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent non-admin users from accessing admin pages
  if (isAuthenticated && location.pathname.includes("/admin") && user?.role !== "admin") {
    return <Navigate to="/unauth-page" />;
  }

  // Return children if none of the conditions match
  return <>{children}</>;
}

export default CheckAuth;