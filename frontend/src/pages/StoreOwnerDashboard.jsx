import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const StoreOwnerDashboard = () => {
    const { authAxios } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                 console.log('Requesting dashboard data with headers:', authAxios.defaults.headers.common);
                const res = await authAxios.get('/store-owner/dashboard');
                setDashboardData(res.data);
            } catch (err) {
                
                if (err.response) {
                    setError(`Error: ${err.response.data.error}`);
                } else if (err.request) {
                    setError('Error: No response from server. Check your network or server status.');
                } else {
                    setError('An unexpected error occurred. ' + err.message);
                }
            }
        };
        fetchDashboardData();
    }, [authAxios]);

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    if (!dashboardData) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Dashboard for {dashboardData.store.name}</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
                <h3 className="text-xl font-semibold text-gray-700">Average Rating</h3>
                <p className="text-5xl font-bold text-yellow-600 mt-2">{dashboardData.averageRating}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4">Customer Ratings</h3>
                {dashboardData.ratingsSubmitted.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <tr>
                                    <th className="py-3 px-6 text-left">User Name</th>
                                    <th className="py-3 px-6 text-left">User Email</th>
                                    <th className="py-3 px-6 text-left">Rating</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {dashboardData.ratingsSubmitted.map((rating) => (
                                    <tr key={rating.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left">{rating.User.name}</td>
                                        <td className="py-3 px-6 text-left">{rating.User.email}</td>
                                        <td className="py-3 px-6 text-left">{rating.rating}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No ratings have been submitted yet.</p>
                )}
            </div>
        </div>
    );
};

export default StoreOwnerDashboard;