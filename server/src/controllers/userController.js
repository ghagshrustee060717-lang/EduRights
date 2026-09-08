import mongoose from 'mongoose';
import User from '../models/User.js';
import { getMemoryUserById, updateMemoryUser } from '../config/memoryStore.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (JWT)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(userId).select('-passwordHash');
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      user = getMemoryUserById(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
      });
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
        totalPoints: user.totalPoints,
        nextLevelPoints: user.nextLevelPoints,
        streakDays: user.streakDays,
        badgesEarned: user.badgesEarned,
        completedModules: user.completedModules || [],
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile',
      error: error.message,
    });
  }
};

// @desc    Update user profile (name, age, language, avatar)
// @route   PUT /api/users/profile
// @access  Private (JWT)
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, age, language, avatar } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name.trim();
    if (age !== undefined) updates.age = Number(age);
    if (language !== undefined) updates.language = language;
    if (avatar !== undefined) updates.avatar = avatar;

    let updatedUser = null;
    if (mongoose.connection.readyState === 1) {
      try {
        updatedUser = await User.findByIdAndUpdate(userId, updates, {
          new: true,
          runValidators: true,
        }).select('-passwordHash');
      } catch (e) {
        updatedUser = null;
      }
    }

    if (!updatedUser) {
      updatedUser = updateMemoryUser(userId, updates);
    }

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        id: updatedUser._id || updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        age: updatedUser.age,
        language: updatedUser.language,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        currentLevel: updatedUser.currentLevel,
        levelTitle: updatedUser.levelTitle,
        totalPoints: updatedUser.totalPoints,
        nextLevelPoints: updatedUser.nextLevelPoints,
        streakDays: updatedUser.streakDays,
        badgesEarned: updatedUser.badgesEarned,
        completedModules: updatedUser.completedModules || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};

// @desc    Gamification sync hook (for Person C to award points/badges)
// @route   POST /api/users/award-points
// @access  Private (JWT)
export const awardUserPoints = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { points = 50, badge = null, moduleCompleted = null } = req.body;

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(userId);
      } catch (e) {
        user = null;
      }
    }

    if (!user) {
      user = getMemoryUserById(userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newPoints = (user.totalPoints || 0) + Number(points);
    let currentLevel = user.currentLevel || 1;
    let nextLevelPoints = user.nextLevelPoints || 500;
    let levelTitle = user.levelTitle || 'Explorer';

    if (newPoints >= nextLevelPoints) {
      currentLevel += 1;
      nextLevelPoints = currentLevel * 500;
      levelTitle = `Level ${currentLevel} Champion`;
    }

    const updates = {
      totalPoints: newPoints,
      currentLevel,
      nextLevelPoints,
      levelTitle,
    };

    if (badge) {
      updates.badgesEarned = [...(user.badgesEarned || []), badge];
    }
    if (moduleCompleted) {
      updates.completedModules = [...(user.completedModules || []), moduleCompleted];
    }

    let updated = null;
    try {
      updated = await User.findByIdAndUpdate(userId, updates, { new: true });
    } catch (e) {
      updated = null;
    }

    if (!updated) {
      updated = updateMemoryUser(userId, updates);
    }

    return res.json({
      success: true,
      message: `🎉 +${points} XP Awarded!`,
      user: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
