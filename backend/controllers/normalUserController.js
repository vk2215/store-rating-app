import db from '../models/index.js';
import bcrypt from 'bcryptjs';

export const listStores = async (req, res) => {
    const { name, address, sort_by = 'name', order = 'ASC' } = req.query;
    const where = {};
    if (name) where.name = { [db.Sequelize.Op.like]: `%${name}%` };
    if (address) where.address = { [db.Sequelize.Op.like]: `%${address}%` };

    try {
        const stores = await db.Store.findAll({
            where,
            order: [[sort_by, order]],
            attributes: [
                'id',
                'name',
                'address',
                [db.Sequelize.fn('AVG', db.Sequelize.col('Ratings.rating')), 'overallRating'],
                [db.Sequelize.literal(`(SELECT rating FROM ratings WHERE store_id = Store.id AND user_id = ${req.user.id})`), 'userSubmittedRating']
            ],
            include: {
                model: db.Rating,
                attributes: [],
            },
            group: ['Store.id']
        });
        res.status(200).json(stores);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const submitRating = async (req, res) => {
    const { storeId, rating } = req.body;
    try {
        const existingRating = await db.Rating.findOne({
            where: { user_id: req.user.id, store_id: storeId }
        });

        if (existingRating) {
            existingRating.rating = rating;
            await existingRating.save();
            return res.status(200).json({ message: 'Rating modified successfully!' });
        } else {
            await db.Rating.create({ user_id: req.user.id, store_id: storeId, rating });
            return res.status(201).json({ message: 'Rating submitted successfully!' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const updatePassword = async (req, res) => {
    const { new_password } = req.body;
    try {
        // Implement password validation here
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await req.user.update({ password: hashedPassword });
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};