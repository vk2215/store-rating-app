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

router.get('/dashboard/stats', getDashboardStats);

router.get('/users/store-owners', getStoreOwnerList);

router.post('/users/create', createUser);


router.post('/stores', createStore);
router.get('/stores/list', listStores);
router.get('/users/list', listUsers);

export default router;
