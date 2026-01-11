// routes/postRoutes.js
import express from 'express';
const router = express.Router();

import {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  patchPost,
  deletePost,
} from '../controllers/postController.js';

import verifyToken from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

router.get('/', getAllPosts);

// Put the more specific non-parameterized route BEFORE the param route
router.get('/user/posts', verifyToken, getPostsByUser);

router.get('/:id', getPostById);

router.post('/', verifyToken, upload.single('image'), createPost);
router.put('/:id', verifyToken, upload.single('image'), updatePost);
router.patch('/:id', verifyToken, upload.single('image'), patchPost);
router.delete('/:id', verifyToken, deletePost);

export default router;
