import React from 'react';
import { Outlet, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PrivateRoute = ({children, ...restProps}) => {
  const {isAuthenticated, user} = useAuth0();
  const isUser = isAuthenticated && user;
  console.log(isUser);
  return (
    isUser ? <Outlet/> : <Navigate to='/login' />
  )
}
export default PrivateRoute;
