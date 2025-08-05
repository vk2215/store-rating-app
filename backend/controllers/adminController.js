import bcrypt from 'bcryptjs';
import db from '../models/index.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await db.User.count();
        const totalStores = await db.Store.count();
        const totalRatings = await db.Rating.count();
        res.status(200).json({ totalUsers, totalStores, totalRatings });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const createStore = async (req, res) => {
    const { name, email, address, store_owner_id } = req.body;
    try {
        const store = await db.Store.create({ name, email, address, store_owner_id });
        res.status(201).json({ message: 'Store created successfully!', store });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Store email already exists.' });
        }
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const createUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({
            name, email, password: hashedPassword, address, role
        });
        res.status(201).json({ message: `${role} user created successfully!`, user });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'User email already exists.' });
        }
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const listStores = async (req, res) => {
    const { name, email, address, rating, sort_by = 'name', order = 'ASC' } = req.query;
    const where = {};
    if (name) where.name = { [db.Sequelize.Op.like]: `%${name}%` };
    if (email) where.email = { [db.Sequelize.Op.like]: `%${email}%` };
    if (address) where.address = { [db.Sequelize.Op.like]: `%${address}%` };

    try {
        const stores = await db.Store.findAll({
            where,
            order: [[sort_by, order]],
            include: [{
                model: db.Rating,
                attributes: [],
            }],
            attributes: {
                include: [
                    [db.Sequelize.fn('AVG', db.Sequelize.col('Ratings.rating')), 'overallRating']
                ]
            },
            group: ['Store.id']
        });
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

export const listUsers = async (req, res) => {
    const { name, email, address, role, sort_by = 'name', order = 'ASC' } = req.query;
    const where = {};
    if (name) where.name = { [db.Sequelize.Op.like]: `%${name}%` };
    if (email) where.email = { [db.Sequelize.Op.like]: `%${email}%` };
    if (address) where.address = { [db.Sequelize.Op.like]: `%${address}%` };
    if (role) where.role = role;

    try {
        const users = await db.User.findAll({
            where,
            order: [[sort_by, order]],
            include: {
                model: db.Store,
                as: 'ownedStores',
                required: false,
                include: [{
                    model: db.Rating,
                    attributes: [],
                }],
                attributes: {
                    include: [
                        [db.Sequelize.fn('AVG', db.Sequelize.col('ownedStores->Ratings.rating')), 'overallRating']
                    ]
                },
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// New function to fetch a list of store owners
export const getStoreOwnerList = async (req, res) => {
    try {
        const storeOwners = await db.User.findAll({
            where: {
                role: 'Store Owner'
            },
            attributes: ['id', 'name', 'email'] // Fetch only necessary fields
        });
        res.status(200).json(storeOwners);
    } catch (error) {
        console.error('Error fetching store owners:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};