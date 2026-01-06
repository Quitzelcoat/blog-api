import express from 'express';
import {
  getComments,
  createComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';

import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:postId', getComments);
router.post('/:postId', verifyToken, createComments);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

export default router;
