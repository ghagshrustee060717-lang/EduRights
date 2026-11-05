import mongoose from 'mongoose';
import User from '../models/User.js';
import { getMemoryUserById, updateMemoryUser } from '../config/memoryStore.js';
import {
  calculateLevel,
  getXPFromCompletedModules,
} from '../utils/progress.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private (JWT)
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    let user = null;
    if (mongoose.connection.readyState === 1) {
      try {
        if (mongoose.Types.ObjectId.isValid(userId)) {
          user = await User.findById(userId).select('-passwordHash');
        } else if (req.user?.email) {
          user = await User.findOne({ email: req.user.email.toLowerCase() }).select('-passwordHash');
        }
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

    const effectiveTotalPoints = getXPFromCompletedModules(user.completedModules);
    const levelInfo = calculateLevel(effectiveTotalPoints);
    if (
      user.totalPoints !== effectiveTotalPoints ||
      user.currentLevel !== levelInfo.level ||
      user.levelTitle !== levelInfo.title ||
      user.nextLevelPoints !== levelInfo.nextLevelPoints
    ) {
      user.totalPoints = effectiveTotalPoints;
      user.currentLevel = levelInfo.level;
      user.levelTitle = levelInfo.title;
      user.nextLevelPoints = levelInfo.nextLevelPoints;
      if (typeof user.save === 'function') await user.save();
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
        currentLevel: levelInfo.level,
        levelTitle: levelInfo.title,
        totalPoints: effectiveTotalPoints,
        nextLevelPoints: levelInfo.nextLevelPoints,
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
        if (mongoose.Types.ObjectId.isValid(userId)) {
          updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
          }).select('-passwordHash');
        } else if (req.user?.email) {
          updatedUser = await User.findOneAndUpdate(
            { email: req.user.email.toLowerCase() },
            updates,
            { new: true, runValidators: true }
          ).select('-passwordHash');
        }
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

    const {
      points = 50,
      badge = null,
      moduleCompleted = null,
      completedModule = null,
      completedModules = null,
    } = req.body;

    let user = null;

    // Find user in MongoDB
    if (
      mongoose.connection.readyState === 1 &&
      mongoose.Types.ObjectId.isValid(userId)
    ) {
      try {
        user = await User.findById(userId);
      } catch (error) {
        console.error(
          "MongoDB user lookup failed:",
          error.message
        );
      }
    }

    // Fallback to in-memory user
    if (!user) {
      user = getMemoryUserById(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =====================================
    // MODULE COMPLETION
    // =====================================

    const existingModules = user.completedModules || [];
    const moduleToAdd = completedModule || moduleCompleted;
    let updatedModules = existingModules;
    let pointsToAward = Number(points) || 0;
    let isModuleCompletionUpdate = false;

    const markLessonComplete = (item) => {
      isModuleCompletionUpdate = true;
      const moduleId = typeof item === 'object'
        ? item?.moduleId
        : item;
      if (!moduleId) return;

      const existingModule = updatedModules.find(
        (module) => (typeof module === 'object' ? module?.moduleId : module) === moduleId
      );
      if (existingModule) {
        if (typeof existingModule === 'object') {
          existingModule.lessonCompleted = true;
          existingModule.completedAt = new Date();
          if (item?.title) existingModule.title = item.title;
        }
        return;
      }

      updatedModules.push({
        ...(typeof item === 'object' ? item : { moduleId }),
        lessonCompleted: true,
        quizCompleted: false,
        completedAt: new Date(),
      });
    };

    if (Array.isArray(completedModules)) {
      updatedModules = [...existingModules];
      completedModules.forEach(markLessonComplete);
    } else if (moduleToAdd) {
      updatedModules = [...existingModules];
      markLessonComplete(moduleToAdd);
    }

    // =====================================
    // TOTAL XP
    // =====================================

    const newPoints = isModuleCompletionUpdate
      ? getXPFromCompletedModules(updatedModules)
      : (Number(user.totalPoints) || 0) + pointsToAward;
    if (isModuleCompletionUpdate) {
      pointsToAward = Math.max(0, newPoints - (Number(user.totalPoints) || 0));
    }

    // =====================================
    // LEVEL SYSTEM
    // Must match client/src/utils/progress.js
    // =====================================

    const levelInfo = calculateLevel(newPoints);

    // =====================================
    // UPDATE USER
    // =====================================

    const updates = {
      totalPoints: newPoints,
      currentLevel: levelInfo.level,
      nextLevelPoints: levelInfo.nextLevelPoints,
      levelTitle: levelInfo.title,
      completedModules: updatedModules,
    };

    // =====================================
    // BADGES
    // =====================================

    if (badge) {
      const existingBadges = user.badgesEarned || [];

      const alreadyHasBadge = existingBadges.some(
        (item) =>
          (typeof item === "string" ? item : item.badgeId || item.id) ===
          (typeof badge === "string" ? badge : badge.badgeId || badge.id)
      );

      if (!alreadyHasBadge) {
        updates.badgesEarned = [
          ...existingBadges,
          badge,
        ];
      }
    }

    // =====================================
    // SAVE TO MONGODB
    // =====================================

    let updated = null;

    if (
      mongoose.connection.readyState === 1 &&
      mongoose.Types.ObjectId.isValid(userId)
    ) {
      try {
        updated = await User.findByIdAndUpdate(
          userId,
          updates,
          { new: true, runValidators: true }
        );
      } catch (error) {
        console.error(
          "MongoDB progress update failed:",
          error.message
        );
      }
    }

    // Fallback to memory store
    if (!updated) {
      updated = updateMemoryUser(userId, updates);
    }

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Could not save user progress",
      });
    }

    return res.json({
      success: true,
      message: `🎉 +${pointsToAward} XP Awarded!`,
      user: updated,
    });

  } catch (error) {
    console.error("Award points error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

;
