import User from "../models/User.js";

/* ================================
   GET USER PROFILE
================================ */

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-passwordHash");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: user.toProfileJSON(),
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load profile",
    });
  }
};

/* ================================
   UPDATE USER PROFILE
================================ */

export const updateUserProfile = async (req, res) => {
  try {
    const {
      name,
      age,
      language,
      avatar,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (language !== undefined) user.language = language;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user.toProfileJSON(),
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

/* ================================
   AWARD POINTS / UPDATE PROGRESS
================================ */

export const awardUserPoints = async (req, res) => {
  try {
    const {
      points = 0,
      badge = null,
      completedModule = null,
      completedModules = null,
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* ---------- POINTS ---------- */

    const pointsToAdd = Number(points);

    if (Number.isFinite(pointsToAdd) && pointsToAdd > 0) {
      user.totalPoints += pointsToAdd;
    }

    /* ---------- LEVEL ---------- */

    if (user.totalPoints >= 1000) {
      user.currentLevel = 5;
      user.levelTitle = "Rights Champion";
      user.nextLevelPoints = 1000;
    } else if (user.totalPoints >= 500) {
      user.currentLevel = 4;
      user.levelTitle = "Rights Defender";
      user.nextLevelPoints = 1000;
    } else if (user.totalPoints >= 250) {
      user.currentLevel = 3;
      user.levelTitle = "Rights Explorer";
      user.nextLevelPoints = 500;
    } else if (user.totalPoints >= 100) {
      user.currentLevel = 2;
      user.levelTitle = "Explorer";
      user.nextLevelPoints = 250;
    } else {
      user.currentLevel = 1;
      user.levelTitle = "Level 1 Beginner";
      user.nextLevelPoints = 100;
    }

    /* ---------- COMPLETED MODULE ---------- */

    if (completedModule && completedModule.moduleId) {
      const alreadyCompleted = user.completedModules.some(
        (module) => module.moduleId === completedModule.moduleId
      );

      if (!alreadyCompleted) {
        user.completedModules.push({
          moduleId: completedModule.moduleId,
          title: completedModule.title || "",
          score: completedModule.score ?? 0,
          completedAt: new Date(),
        });
      }
    }

    /* ---------- COMPLETE MODULE LIST ---------- */

    if (Array.isArray(completedModules)) {
      user.completedModules = completedModules;
    }

    /* ---------- BADGE ---------- */

    if (badge) {
      const badgeId =
        typeof badge === "string"
          ? badge
          : badge.badgeId;

      const alreadyHasBadge = user.badgesEarned.some(
        (existingBadge) => existingBadge.badgeId === badgeId
      );

      if (!alreadyHasBadge) {
        if (typeof badge === "string") {
          user.badgesEarned.push({
            badgeId: badge,
            name: badge,
            icon: "🏆",
            description: "",
            earnedAt: new Date(),
          });
        } else {
          user.badgesEarned.push({
            badgeId: badge.badgeId,
            name: badge.name || "",
            icon: badge.icon || "🏆",
            description: badge.description || "",
            earnedAt: new Date(),
          });
        }
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      user: user.toProfileJSON(),
    });
  } catch (error) {
    console.error("Award points error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update progress",
    });
  }
};