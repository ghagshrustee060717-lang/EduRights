import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no authorization token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ||
        "edurights-development-secret"
    );

    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User session not found or expired. Please sign in again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};

// Keep the old name working for any existing route that still imports `auth`
export default protect;