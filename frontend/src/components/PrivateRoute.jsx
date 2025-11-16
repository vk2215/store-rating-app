import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (Array.isArray(role) && !role.includes(user.role)) {
    
    return <Navigate to="/dashboard" />;
  }

  if (typeof role === 'string' && user.role !== role) {
    
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
