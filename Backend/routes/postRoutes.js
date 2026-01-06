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

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.get('/user/posts', verifyToken, getPostsByUser);

router.post('/', verifyToken, createPost);

router.put('/:id', verifyToken, updatePost);

router.patch('/:id', verifyToken, patchPost);

router.delete('/:id', verifyToken, deletePost);

export default router;
