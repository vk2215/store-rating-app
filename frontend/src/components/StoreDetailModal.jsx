import React, { useState } from 'react';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';

const StoreDetailModal = ({ store, onClose, onRatingSubmit }) => {
    const { authAxios } = useAuth();
    const [newRating, setNewRating] = useState(store?.userSubmittedRating || 0);

    const handleSaveRating = async () => {
        await onRatingSubmit(store.id, newRating);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-xl w-11/12 md:w-1/2 p-6">
                <div className="flex justify-between items-center pb-3">
                    <h3 className="text-2xl font-bold">Store Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none font-semibold">&times;</button>
                </div>
                <div className="mt-4">
                    <img src="/images/store1.png" alt="Store" className="w-full h-48 object-cover rounded-lg mb-4"/>
                    <h4 className="text-xl font-bold">{store.name}</h4>
                    <p className="text-sm text-gray-500">{store.role}</p>
                    <div className="my-4">
                        <h5 className="font-semibold text-gray-700">Contact Info</h5>
                        <p>Email: {store.email}</p>
                        <p>Address: {store.address}</p>
                    </div>
                    <div className="my-4">
                        <h5 className="font-semibold text-gray-700">Rating</h5>
                        <StarRating rating={Math.round(store.overallRating)} />
                        <p className="text-sm text-gray-500 mt-1">Overall Rating: {store.overallRating ? parseFloat(store.overallRating).toFixed(2) : 'N/A'}</p>
                    </div>
                    <div className="my-4">
                        <h5 className="font-semibold text-gray-700">Your Rating</h5>
                        <div className="flex items-center space-x-2">
                            <StarRating rating={newRating} size="text-2xl" />
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => setNewRating(star)}
                                        className={`px-2 py-1 ml-2 rounded ${newRating === star ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
                                    >
                                        {star}
                                    </button>
                                ))}
                            </div>
                            <button onClick={handleSaveRating} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDetailModal;