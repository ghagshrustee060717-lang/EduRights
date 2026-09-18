import User from "../models/User.js";

// Get the currently logged-in user's profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      user
    });
  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      message: "Server error while fetching profile"
    });
  }
};

// Update learning progress
export const updateProgress = async (req, res) => {
  try {
    const { completedModules, xp, badges } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (Array.isArray(completedModules)) {
      user.completedModules = completedModules;
    }

    if (typeof xp === "number" && xp >= 0) {
      user.xp = xp;
    }

    if (Array.isArray(badges)) {
      user.badges = badges;
    }

    await user.save();

    return res.status(200).json({
      message: "Progress updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        completedModules: user.completedModules,
        xp: user.xp,
        badges: user.badges
      }
    });
  } catch (error) {
    console.error("Update progress error:", error);

    return res.status(500).json({
      message: "Server error while updating progress"
    });
  }
};