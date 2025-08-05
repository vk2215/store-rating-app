import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ListStoresAdminPage = () => {
    const { authAxios } = useAuth();
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({ name: '', email: '', address: '' });
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('ASC');
    const [error, setError] = useState('');

    const fetchStores = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await authAxios.get(`/admin/stores/list?${query}&sort_by=${sortBy}&order=${order}`);
            setStores(res.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch stores.'+err);
            setStores([]);
        }
    };

    useEffect(() => {
        fetchStores();
    }, [filters, sortBy, order]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Manage Stores</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            {/* Filters and Sorting */}
            <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-700">Filter by Name:</label>
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-700">Filter by Email:</label>
                    <input type="text" name="email" value={filters.email} onChange={handleFilterChange} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-700">Filter by Address:</label>
                    <input type="text" name="address" value={filters.address} onChange={handleFilterChange} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-gray-700">Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full mt-1 p-2 border rounded">
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                    </select>
                </div>
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-gray-700">Order:</label>
                    <select value={order} onChange={(e) => setOrder(e.target.value)} className="w-full mt-1 p-2 border rounded">
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
            </div>

            {/* Stores Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Address</th>
                            <th className="py-3 px-6 text-left">Avg Rating</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {stores.map(store => (
                            <tr key={store.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{store.id}</td>
                                <td className="py-3 px-6 text-left">{store.name}</td>
                                <td className="py-3 px-6 text-left">{store.email}</td>
                                <td className="py-3 px-6 text-left">{store.address}</td>
                                <td className="py-3 px-6 text-left">{store.overallRating ? parseFloat(store.overallRating).toFixed(2) : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {stores.length === 0 && <p className="text-center text-gray-500 mt-10">No stores found.</p>}
        </div>
    );
};

export default ListStoresAdminPage;