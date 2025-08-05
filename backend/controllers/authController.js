import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { ValidationError } from 'sequelize';

export const signup = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    console.log('Received signup request for:', email);

    try {
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Signup failed: Email already exists.');
            return res.status(409).json({ error: 'Email already exists.' });
        }

        console.log('No existing user found. Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('Creating new user in the database...');
        await db.User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: role || 'Normal User'
        });

        console.log('User created successfully!');
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};