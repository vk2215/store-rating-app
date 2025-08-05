import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Store Rating App</Link>
        <div className="flex items-center">
          {user ? (
            <>
              {user.role === 'System Administrator' && (
                <Link to="/admin/dashboard" className="mx-2 hover:text-gray-300">Admin Dashboard</Link>
              )}
              {user.role === 'Store Owner' && (
                <Link to="/store-owner/dashboard" className="mx-2 hover:text-gray-300">Owner Dashboard</Link>
              )}
              {user.role === 'Normal User' && (
                <Link to="/dashboard" className="mx-2 hover:text-gray-300">Dashboard</Link>
              )}
              <Link to="/account" className="mx-2 hover:text-gray-300">Account</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2 hover:text-gray-300">Login</Link>
              <Link to="/signup" className="mx-2 hover:text-gray-300">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;