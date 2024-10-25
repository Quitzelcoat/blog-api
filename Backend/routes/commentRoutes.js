const express = require("express");
const router = express.Router();
const {
  getComments,
  createComments,
  deleteComment,
} = require("../controllers/commentController");

router.get("/post/:postId", getComments);

router.post("/post/:postId", createComments);

router.delete("/:id", deleteComment);

module.exports = router;
