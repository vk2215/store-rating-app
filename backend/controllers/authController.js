import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import { ValidationError } from 'sequelize';

export const signup = async (req, res) => {
    const { name, email, password, address, role } = req.body;
    console.log('Received signup request for:', email);

    try {
       
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]).{8,16}$/;
        if (!passwordRegex.test(password)) {
            console.log('Password validation failed on the backend.');
            return res.status(400).json({ 
                errors: [{ 
                    path: 'password', 
                    message: 'Password must be 8-16 characters, with at least one uppercase and one special character or number.' 
                }] 
            });
        }
        
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        const newUser = await db.User.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: role || 'Normal User'
        });

        console.log('User created successfully!');
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ 
            message: 'User registered successfully!', 
            token, 
            user: { id: newUser.id, name: newUser.name, role: newUser.role } 
        });

    } catch (error) {
        console.error('Signup error:', error);
        
        if (error instanceof ValidationError) {
            const errors = error.errors.map(err => ({
                path: err.path,
                message: err.message
            }));
            console.log('Validation failed:', errors);
            return res.status(400).json({ errors });
        }
        
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log('Signup failed: Email already exists.');
            return res.status(409).json({ errors: [{ path: 'email', message: 'Email already exists.' }] });
        }

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