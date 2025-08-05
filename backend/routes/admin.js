import { Router } from 'express';
import { authenticateToken, checkRole } from '../middleware/auth.js';
import { 
    getDashboardStats, 
    createUser, 
    createStore, 
    listUsers, 
    listStores,
    getStoreOwnerList 
} from '../controllers/adminController.js';

const router = Router();

router.use(authenticateToken, checkRole('System Administrator'));

// This route serves the specific dashboard stats the frontend is requesting
router.get('/dashboard/stats', getDashboardStats);

// This route serves the list of store owners for your CreateStorePage
router.get('/users/store-owners', getStoreOwnerList);


//other admin routes
router.post('/stores', createStore);
router.post('/users', createUser);
router.get('/stores/list', listStores);
router.get('/users/list', listUsers);

export default router;