import React from 'react'

import { useLocation, Navigate } from 'react-router-dom'

function CheckAuth({isAuthenticated, user, children}) {

  const location = useLocation();

  if(!isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/registration"))){
    return <Navigate to={"/auth/login"}/>
  }


  if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/registration"))){
    if(user?.role == "admin"){

      

    }
    else{
      return <Navigate to={"/shop/home"}/>
    }
  }



  return (
    <div>CheckAuth</div>
  )
}

export default CheckAuth