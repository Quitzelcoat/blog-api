// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", verifyToken, userController.logoutUser);

module.exports = router;
