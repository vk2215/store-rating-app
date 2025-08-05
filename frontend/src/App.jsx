import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NormalUserDashboard from './pages/NormalUserDashboard';
import StoreDetailModal from './components/StoreDetailModal';
import AdminDashboard from './pages/AdminDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import CreateStorePage from './pages/CreateStorePage';
import CreateUserPage from './pages/CreateUserPage';
import ListUsersPage from './pages/ListUsersPage';
import ListStoresAdminPage from './pages/ListStoresAdminPage';
import StoreOwnerPasswordPage from './pages/StoreOwnerPasswordPage';
import AccountPage from './pages/AccountPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Main Redirect logic after login will be handled in Login.jsx */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Normal User Routes */}
          <Route path="/dashboard" element={<PrivateRoute role="Normal User"><NormalUserDashboard /></PrivateRoute>} />
          <Route path="/stores/:storeId" element={<PrivateRoute role="Normal User"><StoreDetailModal /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute role="System Administrator"><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/stores/create" element={<PrivateRoute role="System Administrator"><CreateStorePage /></PrivateRoute>} />
          <Route path="/admin/users/create" element={<PrivateRoute role="System Administrator"><CreateUserPage /></PrivateRoute>} />
          <Route path="/admin/users/list" element={<PrivateRoute role="System Administrator"><ListUsersPage /></PrivateRoute>} />
          <Route path="/admin/stores/list" element={<PrivateRoute role="System Administrator"><ListStoresAdminPage /></PrivateRoute>} />

          {/* Store Owner Routes */}
          <Route path="/store-owner/dashboard" element={<PrivateRoute role="Store Owner"><StoreOwnerDashboard /></PrivateRoute>} />
          <Route path="/store-owner/update-password" element={<PrivateRoute role="Store Owner"><StoreOwnerPasswordPage /></PrivateRoute>} />

          {/* General Private Routes */}
          <Route path="/account" element={<PrivateRoute role={['Normal User', 'Store Owner', 'System Administrator']}><AccountPage /></PrivateRoute>} />

          {/* Fallback route for unmatched paths */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;