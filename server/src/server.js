
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import articleRoutes from './routes/articleRoutes.js';

import { seedQuizzes } from './controllers/quizController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/articles', articleRoutes);

// Health checks
app.get('/', (req, res) => {
  res.json({ message: 'EduRights API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'EduRights Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Connect database and start server
connectDB()
  .then(() => {
    seedQuizzes();

    app.listen(PORT, () => {
      console.log(`EduRights server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Server startup error:', error);
  });
