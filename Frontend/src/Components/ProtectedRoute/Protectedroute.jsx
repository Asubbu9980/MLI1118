import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../Login/Login'

const Protectedroute = () => {
    let token = localStorage.getItem("token")
  return (
    <>

    {token ? <Outlet/> :<Navigate to="/"/>}
    
    
    </>
  )
}

export default Protectedroute