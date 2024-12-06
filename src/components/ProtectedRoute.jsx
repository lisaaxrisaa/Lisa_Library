import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // Get logged-in user state

  // Redirect to login page if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render children if user is authenticated
  return children;
};

export default ProtectedRoute;
