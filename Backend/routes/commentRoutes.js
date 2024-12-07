const express = require("express");
const router = express.Router();
const {
  getComments,
  createComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const verifyToken = require("../middlewares/authMiddleware");

router.get("/:postId", getComments);

router.post("/:postId", verifyToken, createComments);

router.put("/:id", verifyToken, updateComment);

router.delete("/:id", verifyToken, deleteComment);

module.exports = router;
