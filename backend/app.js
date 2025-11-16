import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './models/index.js';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import normalUserRoutes from './routes/normalUser.js';
import storeOwnerRoutes from './routes/storeOwner.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the Store Rating API!');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/normal-user', normalUserRoutes);
app.use('/api/store-owner', storeOwnerRoutes);

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
