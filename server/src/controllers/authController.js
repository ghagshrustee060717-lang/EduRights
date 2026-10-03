import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "edurights-development-secret",
    {
      expiresIn: "7d",
    }
  );
};

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  age: user.age,
  language: user.language,
  avatar: user.avatar,
  role: user.role,
  currentLevel: user.currentLevel,
  levelTitle: user.levelTitle,
  totalPoints: user.totalPoints,
  nextLevelPoints: user.nextLevelPoints,
  streakDays: user.streakDays,
  badgesEarned: user.badgesEarned,
  completedModules: user.completedModules,
});

/* ================================
   REGISTER
================================ */

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      language = "en",
      avatar = "superhero-aarav",
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      passwordHash,
      age,
      language,
      avatar,
      role: "child",
    });

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

/* ================================
   LOGIN
================================ */

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: buildUserResponse(user),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

/* ================================
   CURRENT USER
================================ */

export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      user: buildUserResponse(req.user),
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load user profile",
    });
  }
};