import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedProps {
    children: ReactNode;
  }
const  ProtectedRoute: React.FC<ProtectedProps>  = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/"/>;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
