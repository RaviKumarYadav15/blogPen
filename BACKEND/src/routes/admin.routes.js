import express from 'express';
import { adminLogin,verifyAdmin, getDashboard } from '../controllers/adminControllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/verify', verifyToken, verifyAdmin);
adminRouter.get('/dashboard', verifyToken, getDashboard);

export default adminRouter;