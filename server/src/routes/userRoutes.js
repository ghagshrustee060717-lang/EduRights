import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  awardUserPoints,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/award-points', protect, awardUserPoints);

export default router;
