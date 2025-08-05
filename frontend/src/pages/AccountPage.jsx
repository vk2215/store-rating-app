import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Logout button clicked!");
        logout();
    };

    const handleChangePasswordClick = () => {
        if (user.role === 'Store Owner') {
            navigate('/store-owner/update-password');
        } else {
            console.log("Change password functionality for this role is not yet implemented.");
        }
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Account Details</h2>
                {user ? (
                    <>
                        <div className="text-left mb-2">
                            <span className="font-bold">Role:</span> {user.role}
                        </div>
                        <div className="text-left mb-2">
                            <span className="font-bold">User ID:</span> {user.id}
                        </div>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={handleChangePasswordClick}
                                className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-black text-white font-bold rounded hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="text-center">Please log in to view your account details.</p>
                )}
            </div>
        </div>
    );
};

export default AccountPage;