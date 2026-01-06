import express from 'express';
const router = express.Router();

import * as userController from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/logout', verifyToken, userController.logoutUser);

export default router;
