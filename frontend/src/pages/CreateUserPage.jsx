import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Utility function to validate a single field
const validateField = (name, value) => {
    switch (name) {
        case 'name':
            // You can adjust these constraints to match your backend model
            if (value.length < 20) {
                return 'Name must be at least 20 characters long.';
            }
            if (value.length > 60) {
                return 'Name cannot exceed 60 characters.';
            }
            break;
        case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
                return 'Please enter a valid email address.';
            }
            break;
        case 'password':
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]).{8,16}$/;
            if (!passwordRegex.test(value)) {
                return 'Password must be 8-16 characters, with at least one uppercase and one special character.';
            }
            break;
        case 'address':
            if (value.length > 400) {
                return 'Address cannot exceed 400 characters.';
            }
            break;
        default:
            return null;
    }
    return null;
};

const CreateUserPage = () => {
    const { authAxios } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'Normal User',
    });
    const [clientErrors, setClientErrors] = useState({});
    const [backendError, setBackendError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const error = validateField(name, value);
        setClientErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBackendError('');
        setSuccessMessage('');
        
        const finalErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                finalErrors[key] = error;
            }
        });

        if (Object.keys(finalErrors).length > 0) {
            setClientErrors(finalErrors);
            return;
        }

        try {
            await authAxios.post('/admin/users/create', formData);
            setSuccessMessage('User created successfully!');
            setTimeout(() => {
                navigate('/admin/users/list');
            }, 2000);
        } catch (err) {
            const serverErrors = err.response?.data?.errors;
            if (serverErrors) {
                const apiErrors = {};
                serverErrors.forEach(error => {
                    apiErrors[error.path] = error.message;
                });
                setClientErrors(apiErrors);
            } else {
                setBackendError(err.response?.data?.error || 'Failed to create user.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Add New User</h2>
                {successMessage && <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">{successMessage}</div>}
                {backendError && <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center">{backendError}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name" className="w-full mt-1 p-2 border rounded" onChange={handleChange} value={formData.name} required />
                        {clientErrors.name && <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email" className="w-full mt-1 p-2 border rounded" onChange={handleChange} value={formData.email} required />
                        {clientErrors.email && <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password" className="w-full mt-1 p-2 border rounded" onChange={handleChange} value={formData.password} required />
                        {clientErrors.password && <p className="text-red-500 text-sm mt-1">{clientErrors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input type="text" name="address" className="w-full mt-1 p-2 border rounded" onChange={handleChange} value={formData.address} required />
                        {clientErrors.address && <p className="text-red-500 text-sm mt-1">{clientErrors.address}</p>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select name="role" className="w-full mt-1 p-2 border rounded" onChange={handleChange} value={formData.role}>
                            <option value="Normal User">Normal User</option>
                            <option value="Store Owner">Store Owner</option>
                            <option value="System Administrator">System Administrator</option>
                        </select>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPage;