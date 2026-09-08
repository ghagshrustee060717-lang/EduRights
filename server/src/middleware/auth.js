import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getMemoryUserById } from '../config/memoryStore.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'edurights_super_secret_child_rights_jwt_key_2026'
      );

      // Check DB first if connected, otherwise fallback to memory store
      let user = null;
      if (mongoose.connection.readyState === 1) {
        try {
          user = await User.findById(decoded.id).select('-passwordHash');
        } catch (err) {
          // Mongoose error
        }
      }

      if (!user) {
        user = getMemoryUserById(decoded.id);
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User session not found or expired. Please sign in again.',
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('JWT Auth Error:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized, invalid or expired token',
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no authorization token provided',
    });
  }
};
