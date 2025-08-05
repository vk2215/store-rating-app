import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import StoreDetailModal from '../components/StoreDetailModal';

const NormalUserDashboard = () => {
    const { authAxios } = useAuth();
    const [stores, setStores] = useState([]);
    const [filters, setFilters] = useState({ name: '', address: '' });
    const [sortBy, setSortBy] = useState('name');
    const [order, setOrder] = useState('ASC');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [selectedStore, setSelectedStore] = useState(null); // State for the modal

    const fetchStores = async () => {
        try {
            const query = new URLSearchParams(filters).toString();
            const res = await authAxios.get(`/normal-user/stores/list?${query}&sort_by=${sortBy}&order=${order}`);
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

    const handleRatingSubmit = async (storeId, rating) => {
        try {
            await authAxios.post('/normal-user/ratings', { storeId, rating });
            setMessage(`Rating submitted for store ID ${storeId}`);
            fetchStores(); 
        } catch (err) {
            setError('Failed to submit rating.'+err);
        }
    };

    const openModal = (store) => {
        setSelectedStore(store);
    };

    const closeModal = () => {
        setSelectedStore(null);
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">Available Stores</h2>
            {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

            {/* Filters and Sorting */}
            <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-700">Filter by Name:</label>
                    <input type="text" name="name" value={filters.name} onChange={handleFilterChange} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-gray-700">Filter by Address:</label>
                    <input type="text" name="address" value={filters.address} onChange={handleFilterChange} className="w-full mt-1 p-2 border rounded" />
                </div>
                <div className="flex-1 min-w-[150px]">
                    <label className="block text-gray-700">Sort By:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full mt-1 p-2 border rounded">
                        <option value="name">Name</option>
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

            {/* Store List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map(store => (
                    <div 
                        key={store.id} 
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => openModal(store)}
                    >
                        <h3 className="text-xl font-semibold">{store.name}</h3>
                        <p className="text-gray-600 my-2">{store.address}</p>
                        <div className="mt-4">
                            <div className="flex items-center space-x-2">
                                <span className="font-medium">Overall Rating:</span>
                                <StarRating rating={Math.round(store.overallRating)} size="text-lg"/>
                                <span className="text-sm text-gray-500">
                                    ({store.overallRating ? parseFloat(store.overallRating).toFixed(2) : 'N/A'})
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <span className="font-medium">Your Rating:</span>
                                <StarRating rating={store.userSubmittedRating || 0} size="text-lg"/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {stores.length === 0 && <p className="text-center text-gray-500 mt-10">No stores found.</p>}

            {selectedStore && (
                <StoreDetailModal 
                    store={selectedStore} 
                    onClose={closeModal} 
                    onRatingSubmit={handleRatingSubmit}
                />
            )}
        </div>
    );
};

export default NormalUserDashboard;