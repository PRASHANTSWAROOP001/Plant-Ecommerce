import React from 'react'

import { useLocation, Navigate } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {

  const location = useLocation();

  if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/registration"))){
    return <Navigate to={"/auth/login"}/>
  }


  if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/registration"))){
    if(user?.role == "admin"){

      return <Navigate to={"/admin/dashboard"}/>

    }
    else{
      return <Navigate to={"/shop/home"}/>
    }
  }


  // Prevent non-admin users from accessing admin pages
  if (isAuthenticated && location.pathname.includes("/admin") && user?.role !== "admin") {
    return <Navigate to="/unauth-page" />;
  }

  // Redirect admins accessing shop page to the admin dashboard
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Return children if none of the conditions match
  return <>{children}</>;
  
}

export default CheckAuth