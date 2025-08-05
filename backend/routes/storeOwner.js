import express from 'express';
import { getDashboard, updatePassword } from '../controllers/storeOwnerController.js';
import { authenticateToken, checkRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticateToken, checkRole('Store Owner'), getDashboard);
router.put('/update-password', authenticateToken, checkRole('Store Owner'), updatePassword);

export default router;