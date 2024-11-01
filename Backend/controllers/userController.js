// controllers/userController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username,
        isAuthor: req.body.isAuthor || false,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if already logged in (token is in headers)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return res.status(200).json({ message: "Already logged in" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, isAuthor: user.isAuthor },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.logoutUser = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
