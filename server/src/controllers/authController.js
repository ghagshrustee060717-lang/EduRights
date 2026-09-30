import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {
  getMemoryUserByEmail,
  getMemoryUserById,
  addMemoryUser,
} from '../config/memoryStore.js';

// Generate JWT token
export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'edurights_super_secret_child_rights_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new child / user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, language, avatar, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check if MongoDB is connected, otherwise use memory store
    const isMongo = mongoose.connection.readyState === 1;
    let userExists = null;

    if (isMongo) {
      try {
        userExists = await User.findOne({ email: email.toLowerCase() });
      } catch (e) {
        userExists = getMemoryUserByEmail(email);
      }
    } else {
      userExists = getMemoryUserByEmail(email);
    }

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let newUser;
    if (isMongo) {
      try {
        const created = await User.create({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          passwordHash,
          age: age ? Number(age) : 10,
          language: language || 'en',
          avatar: avatar || 'superhero-aarav',
          role: role || 'child',
          currentLevel: 1,
          levelTitle: 'Level 1 Beginner',
          totalPoints: 0,
          nextLevelPoints: 500,
          streakDays: 1,
          badgesEarned: [],
          completedModules: [],
        });
        newUser = created.toProfileJSON();
      } catch (err) {
        // Fallback to memory
        newUser = addMemoryUser({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          passwordHash,
          age: age ? Number(age) : 10,
          language: language || 'en',
          avatar: avatar || 'superhero-aarav',
          role: role || 'child',
        });
      }
    } else {
      newUser = addMemoryUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        passwordHash,
        age: age ? Number(age) : 10,
        language: language || 'en',
        avatar: avatar || 'superhero-aarav',
        role: role || 'child',
      });
    }

    const token = generateToken(newUser.id || newUser._id);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to EduRights!',
      token,
      user: {
        id: newUser.id || newUser._id,
        name: newUser.name,
        email: newUser.email,
        age: newUser.age,
        language: newUser.language,
        avatar: newUser.avatar,
        role: newUser.role,
        currentLevel: newUser.currentLevel,
        levelTitle: newUser.levelTitle,
        totalPoints: newUser.totalPoints,
        nextLevelPoints: newUser.nextLevelPoints,
        streakDays: newUser.streakDays,
        badgesEarned: newUser.badgesEarned,
        completedModules: newUser.completedModules || [],
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// @desc    Authenticate user & get JWT token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    let user = null;
    const isMongo = mongoose.connection.readyState === 1;
    if (isMongo) {
      try {
        user = await User.findOne({ email: email.toLowerCase() });
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      user = getMemoryUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Verify password
    let isMatch = false;
    if (user.matchPassword && typeof user.matchPassword === 'function') {
      isMatch = await user.matchPassword(password);
    } else {
      isMatch = await bcrypt.compare(password, user.passwordHash);
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id || user.id);

    let effectiveTotalPoints = user.totalPoints ?? 0;
    if (user.email !== 'aarav@edurights.org' && user.completedModules?.length > 0) {
      effectiveTotalPoints = user.completedModules.reduce((s, m) => s + (Number(m.score) || 0), 0);
      if (user.totalPoints !== effectiveTotalPoints) {
        user.totalPoints = effectiveTotalPoints;
        if (typeof user.save === 'function') user.save().catch(() => {});
      }
    }

    return res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        language: user.language,
        avatar: user.avatar,
        role: user.role,
        currentLevel: user.currentLevel || 1,
        levelTitle: user.levelTitle || 'Level 1 Beginner',
        totalPoints: effectiveTotalPoints,
        nextLevelPoints: user.nextLevelPoints ?? 500,
        streakDays: user.streakDays || 1,
        badgesEarned: user.badgesEarned || [],
        completedModules: user.completedModules || [],
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Get logged in user profile (JWT protected)
// @route   GET /api/auth/me
// @access  Private (JWT)
export const getMe = async (req, res) => {
  try {
    const user = req.user;

    let effectiveTotalPoints = user.totalPoints ?? 0;
    if (user.email !== 'aarav@edurights.org' && user.completedModules?.length > 0) {
      effectiveTotalPoints = user.completedModules.reduce((s, m) => s + (Number(m.score) || 0), 0);
      if (user.totalPoints !== effectiveTotalPoints) {
        user.totalPoints = effectiveTotalPoints;
        if (typeof user.save === 'function') user.save().catch(() => {});
      }
    }

    return res.json({
      success: true,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        language: user.language,
        avatar: user.avatar,
        role: user.role,
        currentLevel: user.currentLevel,
        levelTitle: user.levelTitle,
        totalPoints: effectiveTotalPoints,
        nextLevelPoints: user.nextLevelPoints,
        streakDays: user.streakDays,
        badgesEarned: user.badgesEarned,
        completedModules: user.completedModules || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile',
    });
  }
};
