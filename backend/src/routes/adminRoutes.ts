import express from 'express';
import { getAllSubmissions, updateStatus } from '../controllers/adminController';
import { adminAuth } from '../middlewares/adminAuthMiddleware';

const router = express.Router();

router.use(adminAuth); // Protect all admin routes

router.get('/', getAllSubmissions);
router.put('/:id', updateStatus);

export default router;
