import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (with automatic graceful fallback)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root & Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'EduRights Backend API',
    moduleOwner: 'Person A (Auth & User System)',
    timestamp: new Date().toISOString(),
  });
});

// Stubs for teammates (Person B - Modules, Person C - Quizzes) to prevent broken links
app.get('/api/modules', (req, res) => {
  res.json({
    success: true,
    modules: [
      { id: 'm1', title: 'Right to Education', chapter: 'Chapter 2 of 5', xp: 50, status: 'in-progress' },
      { id: 'm2', title: 'Right to Play', chapter: 'Chapter 1 of 3', xp: 50, status: 'available' },
      { id: 'm3', title: 'Right to Safety', chapter: 'Chapter 1 of 4', xp: 60, status: 'available' },
      { id: 'm4', title: 'Right to Privacy', chapter: 'Chapter 1 of 3', xp: 40, status: 'locked' },
    ],
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 EduRights Server running on port ${PORT}`);
  console.log(`🔒 Person A (Auth & User System) Ready at http://localhost:${PORT}/api/auth`);
});
