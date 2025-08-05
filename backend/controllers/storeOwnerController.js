import db from '../models/index.js';
import bcrypt from 'bcryptjs';

export const getDashboard = async (req, res) => {
    try {
        const store = await db.Store.findOne({ where: { store_owner_id: req.user.id } });
        if (!store) {
            return res.status(404).json({ error: 'Store not found for this owner.' });
        }

        const ratings = await db.Rating.findAll({
            where: { store_id: store.id },
            include: [{
                model: db.User,
                attributes: ['name', 'email']
            }]
        });

        const avgRatingResult = await db.Rating.findOne({
            where: { store_id: store.id },
            attributes: [
                [db.Sequelize.fn('AVG', db.Sequelize.col('rating')), 'averageRating']
            ]
        });

        const averageRating = avgRatingResult.getDataValue('averageRating');

        res.status(200).json({
            store: { id: store.id, name: store.name },
            averageRating: averageRating ? parseFloat(averageRating).toFixed(2) : 0,
            ratingsSubmitted: ratings
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const updatePassword = async (req, res) => {
    const { new_password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await req.user.update({ password: hashedPassword });
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};