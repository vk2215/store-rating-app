import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
    const { authAxios } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('Normal User');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await authAxios.post('/admin/users/create', { name, email, password, address, role });
            setMessage('User created successfully!');
            setName('');
            setEmail('');
            setPassword('');
            setAddress('');
            setRole('Normal User');
            // Optionally, navigate to the user list
            // navigate('/admin/users/list');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create user.');
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New User</h2>
            {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mt-1 p-2 border rounded">
                        <option value="Normal User">Normal User</option>
                        <option value="Store Owner">Store Owner</option>
                        <option value="System Administrator">System Administrator</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                    Create User
                </button>
            </form>
        </div>
    );
};

export default CreateUserPage;