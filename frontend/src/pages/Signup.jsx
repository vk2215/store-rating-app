import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        
        role: 'Normal User',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            setMessage('Registration successful! You can now log in.');
            setError('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed.');
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" className="w-full mt-1 p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" className="w-full mt-1 p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" className="w-full mt-1 p-2 border rounded" onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input type="text" name="address" className="w-full mt-1 p-2 border rounded" onChange={handleChange} required />
                    </div>
                   
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            className="w-full mt-1 p-2 border rounded"
                            onChange={handleChange}
                            value={formData.role}
                        >
                            <option value="Normal User">Normal User</option>
                            <option value="Store Owner">Store Owner</option>
                            <option value="System Administrator">System Administrator</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;