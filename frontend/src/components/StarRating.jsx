import React from 'react';

const StarRating = ({ rating, size = 'text-xl' }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={`${size} ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
            </span>
        );
    }
    return <div className="flex">{stars}</div>;
};

export default StarRating;
