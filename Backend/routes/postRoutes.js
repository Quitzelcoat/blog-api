const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", verifyToken, createPost);

router.put("/:id", verifyToken, updatePost);

router.delete("/:id", verifyToken, deletePost);

module.exports = router;
