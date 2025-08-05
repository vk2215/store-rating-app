import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreateStorePage = () => {
    const { authAxios } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [address, setAddress] = useState('');
    const [storeOwnerId, setStoreOwnerId] = useState('');
    const [storeOwners, setStoreOwners] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStoreOwners = async () => {
            try {
                const res = await authAxios.get('/admin/users/store-owners');
                setStoreOwners(res.data);
            } catch (err) {
                setError('Failed to fetch store owners. ' + (err.response?.data?.error || err.message));
            }
        };
        fetchStoreOwners();
    }, [authAxios]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            
            await authAxios.post('/admin/stores', { name, email, address, store_owner_id: storeOwnerId });
            setMessage('Store created successfully!');
            setName('');
            setEmail('');
            setAddress('');
            setStoreOwnerId('');
            navigate('/admin/stores/list');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create store.');
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Store</h2>
            {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Store Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full mt-1 p-2 border rounded" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Store Owner</label>
                    <select value={storeOwnerId} onChange={(e) => setStoreOwnerId(e.target.value)} className="w-full mt-1 p-2 border rounded" required>
                        <option value="">Select a Store Owner</option>
                        {storeOwners.map(owner => (
                            <option key={owner.id} value={owner.id}>{owner.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                    Create Store
                </button>
            </form>
        </div>
    );
};

export default CreateStorePage;