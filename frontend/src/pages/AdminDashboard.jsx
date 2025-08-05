import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { authAxios } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0,
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await authAxios.get('/admin/dashboard/stats');
                setStats(res.data);
            } catch (err) {
                setError('Failed to fetch dashboard stats.');
            }
        };
        fetchStats();
    }, [authAxios]);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
                    <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Stores</h3>
                    <p className="text-4xl font-bold mt-2">{stats.totalStores}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold text-gray-700">Total Ratings</h3>
                    <p className="text-4xl font-bold mt-2">{stats.totalRatings}</p>
                </div>
            </div>

            {/* Actions Section with Buttons */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Admin Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/admin/stores/create" className="bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors">
                        Add New Store
                    </Link>
                    <Link to="/admin/users/create" className="bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition-colors">
                        Add New User
                    </Link>
                    <Link to="/admin/stores/list" className="bg-purple-500 text-white text-center py-3 rounded-lg hover:bg-purple-600 transition-colors">
                        List All Stores
                    </Link>
                    <Link to="/admin/users/list" className="bg-yellow-500 text-white text-center py-3 rounded-lg hover:bg-yellow-600 transition-colors">
                        List All Users
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;