import { Router } from 'express';
//import { auth } from '../middleware/auth.js';
import { authenticateToken, checkRole } from '../middleware/auth.js';
import { listStores, submitRating, updatePassword } from '../controllers/normalUserController.js';

const router = Router();

router.use(authenticateToken, checkRole('Normal User'));
router.get('/stores/list', listStores);
router.post('/ratings', submitRating);
router.put('/password', updatePassword);

export default router;
