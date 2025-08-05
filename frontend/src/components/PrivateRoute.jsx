import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (Array.isArray(role) && !role.includes(user.role)) {
    // Redirect to a dashboard if the user's role is not allowed
    return <Navigate to="/dashboard" />;
  }

  if (typeof role === 'string' && user.role !== role) {
    // Redirect to a dashboard if the user's role is not allowed
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;