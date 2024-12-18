const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  getPostsByUser,
  createPost,
  updatePost,
  patchPost,
  deletePost,
} = require("../controllers/postController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.get("/user/posts", verifyToken, getPostsByUser);

router.post("/", verifyToken, createPost);

router.put("/:id", verifyToken, updatePost);

router.patch("/:id", verifyToken, patchPost);

router.delete("/:id", verifyToken, deletePost);

module.exports = router;
