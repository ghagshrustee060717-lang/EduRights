import express from 'express';
import {
  createQuiz,
  getQuizByModule,
  submitQuiz,
  getUserProgress,
} from '../controllers/quizController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// User progress endpoint
router.get('/user/progress', protect, getUserProgress);

// Create quiz
router.post('/', createQuiz);

// Get quiz by module
router.get('/:moduleId', getQuizByModule);

// Submit quiz
router.post('/:moduleId/submit', protect, submitQuiz);

export default router;