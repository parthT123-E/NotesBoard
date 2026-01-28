import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

// Helper to generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// };


const sendToken = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // in dev: false
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

// Register
router.post("/register", rateLimiter, async (req,res) => {
    const { username, email, password } = req.body;

    try {
      let userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });

      // Check if username exists
    let usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({ username, email, password: hashedPassword });

      sendToken(res, user); // <-- sets cookie
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        // token: generateToken(user._id),
      });
    } catch (err) {
       console.error("Register error:", err); // log actual error
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login
router.post("/login", rateLimiter, async (req, res) => {

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "Invalid email or password" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

      sendToken(res, user); // <-- sets cookie
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        // token: generateToken(user._id),
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);


router.post("/logout", rateLimiter, (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

// Protected route example
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

export default router;




