import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import Progress from '../models/Progress.js';
import BadgeStatus from '../models/BadgeStatus.js';
import { getMemoryUserById, getMemoryUserByEmail } from '../config/memoryStore.js';

const calculateLevel = (totalPoints) => {
  if (totalPoints >= 2000) {
    return {
      level: 5,
      title: 'Level 5 Champion',
      nextLevelPoints: 2000,
    };
  }

  if (totalPoints >= 1500) {
    return {
      level: 4,
      title: 'Level 4 Achiever',
      nextLevelPoints: 2000,
    };
  }

  if (totalPoints >= 1000) {
    return {
      level: 3,
      title: 'Level 3 Explorer',
      nextLevelPoints: 1500,
    };
  }

  if (totalPoints >= 500) {
    return {
      level: 2,
      title: 'Level 2 Learner',
      nextLevelPoints: 1000,
    };
  }

  return {
    level: 1,
    title: 'Level 1 Beginner',
    nextLevelPoints: 500,
  };
};

// Resilient user resolver handling MongoDB ObjectId, email lookup, demo user sync, and in-memory fallback
const resolveUser = async (reqUser) => {
  if (!reqUser) return null;
  const rawId = reqUser._id || reqUser.id;
  const email = reqUser.email ? reqUser.email.toLowerCase() : null;

  // 1. Try MongoDB if connected
  if (mongoose.connection.readyState === 1) {
    try {
      if (rawId && mongoose.Types.ObjectId.isValid(rawId)) {
        const found = await User.findById(rawId);
        if (found) return found;
      }

      if (email) {
        let found = await User.findOne({ email });
        if (found) return found;

        // Automatically persist demo / memory user into MongoDB so they have full ObjectId support
        try {
          found = await User.create({
            name: reqUser.name || 'Aarav',
            email,
            passwordHash: reqUser.passwordHash || 'demohash123',
            age: reqUser.age || 10,
            avatar: reqUser.avatar || 'superhero-aarav',
            role: reqUser.role || 'child',
            currentLevel: reqUser.currentLevel || 3,
            levelTitle: reqUser.levelTitle || 'Level 3 Explorer',
            totalPoints: reqUser.totalPoints ?? 750,
            nextLevelPoints: reqUser.nextLevelPoints ?? 1200,
            streakDays: reqUser.streakDays ?? 7,
            badgesEarned: reqUser.badgesEarned || [
              { badgeId: 'first-step', name: 'First Step', icon: '🏆', description: 'Joined EduRights adventure!' },
            ],
            completedModules: reqUser.completedModules || [],
          });
          return found;
        } catch (createErr) {
          // If concurrent create or validation, attempt find one more time
          found = await User.findOne({ email });
          if (found) return found;
        }
      }
    } catch (dbErr) {
      console.warn('User MongoDB resolve fallback note:', dbErr.message);
    }
  }

  // 2. In-memory fallback
  const memUser = (rawId ? getMemoryUserById(rawId) : null) || (email ? getMemoryUserByEmail(email) : null) || reqUser;
  return memUser;
};

// Seed initial default quizzes if they do not exist
export const seedQuizzes = async () => {
  try {
    const count = await Quiz.countDocuments();
    if (count > 0) return;

    const initialQuizzes = [
      {
        moduleId: 'm1',
        questions: [
          {
            questionText: 'Under the Right to Education (RTE Act), education is free and compulsory for children of which age group?',
            options: ['6 to 14 years', '3 to 8 years', '10 to 18 years', '5 to 12 years'],
            correctAnswer: '6 to 14 years',
            points: 25,
          },
          {
            questionText: 'Which law in India guarantees free and compulsory education for every child?',
            options: ['RTE Act 2009', 'Child Labor Act', 'POCSO Act', 'Juvenile Justice Act'],
            correctAnswer: 'RTE Act 2009',
            points: 25,
          },
          {
            questionText: 'Can a school deny admission to a child due to lack of a birth certificate?',
            options: ['No, admission cannot be denied', 'Yes, anytime', 'Only with principal permission', 'Only in private schools'],
            correctAnswer: 'No, admission cannot be denied',
            points: 25,
          },
          {
            questionText: 'What essential power does education give young citizens for their future?',
            options: ['Knowledge, equality, and opportunities', 'Only high exam marks', 'Compulsory homework', 'Exemption from sports'],
            correctAnswer: 'Knowledge, equality, and opportunities',
            points: 25,
          },
        ],
      },
      {
        moduleId: 'm2',
        questions: [
          {
            questionText: 'Why is play recognized as a fundamental human right for children by the UN?',
            options: [
              'It is vital for healthy physical and emotional development',
              'It replaces the need for school lessons',
              'It keeps children busy during holidays',
              'It is only allowed for sports athletes',
            ],
            correctAnswer: 'It is vital for healthy physical and emotional development',
            points: 25,
          },
          {
            questionText: 'Under Article 31 of the UNCRC, children have the right to:',
            options: [
              'Rest, leisure, and recreational activities',
              'Work in adult factories',
              'Skip health checkups',
              'Endless television screen time',
            ],
            correctAnswer: 'Rest, leisure, and recreational activities',
            points: 25,
          },
          {
            questionText: 'What should communities provide to support every child’s right to play?',
            options: [
              'Safe, accessible open parks and playgrounds',
              'Strict bans on street games',
              'Expensive paid gaming arcades only',
              'Fewer sports hours in school',
            ],
            correctAnswer: 'Safe, accessible open parks and playgrounds',
            points: 25,
          },
          {
            questionText: 'How do sports and recreational play develop character in children?',
            options: [
              'Builds teamwork, respect, and fair play',
              'Teaches that only winning matters',
              'Prevents children from socializing',
              'Encourages competition over compassion',
            ],
            correctAnswer: 'Builds teamwork, respect, and fair play',
            points: 25,
          },
        ],
      },
      {
        moduleId: 'm3',
        questions: [
          {
            questionText: 'What is the nationwide, 24/7 free emergency helpline for children in distress in India?',
            options: ['1098 (Childline)', '100 (Police)', '911 (Emergency)', '101 (Fire)'],
            correctAnswer: '1098 (Childline)',
            points: 30,
          },
          {
            questionText: 'Which law specifically safeguards children against physical abuse and exploitation?',
            options: ['POCSO Act 2012', 'Traffic Regulation Act', 'Consumer Protection Act', 'Patents Act'],
            correctAnswer: 'POCSO Act 2012',
            points: 30,
          },
        ],
      },
    ];

    await Quiz.insertMany(initialQuizzes);
    console.log('✅ Seeded default EduRights quizzes for modules m1, m2, and m3');
  } catch (err) {
    console.warn('⚠️ Quiz seed notice:', err.message);
  }
};

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { moduleId, questions } = req.body;

    if (!moduleId || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'moduleId and at least one question are required',
      });
    }

    const existingQuiz = await Quiz.findOne({ moduleId });
    if (existingQuiz) {
      return res.status(409).json({
        success: false,
        message: 'A quiz already exists for this module',
      });
    }

    const quiz = await Quiz.create({
      moduleId,
      questions,
    });

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    console.error('Create Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create quiz',
    });
  }
};

// Get quiz for a specific module
export const getQuizByModule = async (req, res) => {
  try {
    const { moduleId } = req.params;
    let quiz = await Quiz.findOne({ moduleId });

    // Fallback seed if m1 or m2 requested and database has not seeded yet
    if (!quiz && (moduleId === 'm1' || moduleId === 'm2' || moduleId === 'm3')) {
      await seedQuizzes();
      quiz = await Quiz.findOne({ moduleId });
    }

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found for this module',
      });
    }

    // Do NOT send correct answers to the frontend
    const safeQuiz = {
      id: quiz._id,
      moduleId: quiz.moduleId,
      questions: quiz.questions.map((question) => ({
        id: question._id,
        questionText: question.questionText,
        options: question.options,
        points: question.points,
      })),
    };

    res.status(200).json({
      success: true,
      quiz: safeQuiz,
    });
  } catch (error) {
    console.error('Get Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz',
    });
  }
};

// Submit quiz and calculate score
export const submitQuiz = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { answers } = req.body;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Answers are required',
      });
    }

    const quiz = await Quiz.findOne({ moduleId });
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found for this module',
      });
    }

    let score = 0;
    let totalPoints = 0;
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      totalPoints += question.points;
      const submittedAnswer = answers[question._id.toString()];
      if (submittedAnswer === question.correctAnswer) {
        score += question.points;
        correctAnswers++;
      }
    });

    const user = await resolveUser(req.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or session expired',
      });
    }

    if (!user.completedModules) user.completedModules = [];
    if (!user.badgesEarned) user.badgesEarned = [];

    // Check previous attempt
    const existingIndex = user.completedModules.findIndex(
      (m) => m.moduleId === moduleId
    );
    const isRetake = existingIndex !== -1;
    let isImproved = false;
    let previousScore = 0;

    const moduleTitles = {
      m1: 'Right to Education',
      m2: 'Right to Play',
      m3: 'Right to Safety',
      m4: 'Right to Privacy',
    };

    if (isRetake) {
      previousScore = user.completedModules[existingIndex].score || 0;
      if (score > previousScore) {
        isImproved = true;
        user.completedModules[existingIndex].score = score;
        user.completedModules[existingIndex].completedAt = new Date();
      }
    } else {
      user.completedModules.push({
        moduleId,
        title: moduleTitles[moduleId] || `Module ${moduleId}`,
        score,
        completedAt: new Date(),
      });
    }

    // Always keep total points synchronized with completed module scores
    const modulePointsSum = user.completedModules.reduce(
      (acc, m) => acc + (Number(m.score) || 0),
      0
    );

    if (user.email === 'aarav@edurights.org') {
      if (isRetake && isImproved) {
        user.totalPoints = (user.totalPoints || 0) + (score - previousScore);
      } else if (!isRetake) {
        user.totalPoints = (user.totalPoints || 0) + score;
      }
    } else {
      user.totalPoints = modulePointsSum;
    }

    const levelInfo = calculateLevel(user.totalPoints);
    user.currentLevel = levelInfo.level;
    user.levelTitle = levelInfo.title;
    user.nextLevelPoints = levelInfo.nextLevelPoints;

    // Badges logic
    const badgesToAward = [];
    if (user.completedModules.length > 0) {
      badgesToAward.push({
        badgeId: 'first-step',
        name: 'First Step',
        icon: '🏆',
        description: 'Completed your first quiz on EduRights!',
      });
    }

    if (score === totalPoints && totalPoints > 0) {
      badgesToAward.push({
        badgeId: 'quiz-master',
        name: 'Quiz Master',
        icon: '🌟',
        description: `Scored 100% on module ${moduleId.toUpperCase()}!`,
      });
    }

    if (user.totalPoints >= 100) {
      badgesToAward.push({
        badgeId: 'point-collector',
        name: 'Point Collector',
        icon: '⭐',
        description: 'Earned 100+ XP points',
      });
    }

    if (user.totalPoints >= 500) {
      badgesToAward.push({
        badgeId: 'rising-star',
        name: 'Rising Star',
        icon: '🚀',
        description: 'Reached Level 2 with 500+ XP',
      });
    }

    badgesToAward.forEach((newBadge) => {
      const alreadyHasBadge = user.badgesEarned.some(
        (b) => b.badgeId === newBadge.badgeId
      );
      if (!alreadyHasBadge) {
        user.badgesEarned.push({
          ...newBadge,
          earnedAt: new Date(),
        });
      }
    });

    if (typeof user.save === 'function') {
      await user.save();
    }

    // Persist to Progress and BadgeStatus collections if valid ObjectId exists
    try {
      if (user._id && mongoose.Types.ObjectId.isValid(user._id)) {
        await Progress.findOneAndUpdate(
          { userId: user._id, moduleId },
          {
            userId: user._id,
            moduleId,
            title: moduleTitles[moduleId] || `Module ${moduleId}`,
            score: isRetake ? Math.max(score, previousScore) : score,
            totalPossibleScore: totalPoints,
            percentage: totalPoints > 0 ? Math.round((Math.max(score, previousScore) / totalPoints) * 100) : 0,
            completedAt: new Date(),
          },
          { upsert: true, new: true }
        );

        for (const badge of user.badgesEarned) {
          await BadgeStatus.findOneAndUpdate(
            { userId: user._id, badgeId: badge.badgeId },
            { ...badge, userId: user._id, isUnlocked: true, unlockedAt: badge.earnedAt || new Date() },
            { upsert: true }
          );
        }
      }
    } catch (dbErr) {
      // safe fallback
    }

    const effectiveScore = isRetake ? Math.max(score, previousScore) : score;
    const percentage = totalPoints > 0 ? Math.round((effectiveScore / totalPoints) * 100) : 0;

    let responseMessage = 'Quiz submitted successfully!';
    if (isRetake) {
      if (isImproved) {
        responseMessage = `Awesome! You improved your score to ${score} XP!`;
      } else {
        responseMessage = `Quiz retake completed! Your highest score of ${previousScore} XP is preserved.`;
      }
    }

    res.status(200).json({
      success: true,
      message: responseMessage,
      alreadyCompleted: isRetake,
      isImproved,
      result: {
        moduleId,
        score: effectiveScore,
        attemptScore: score,
        totalPoints,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        percentage,
      },
      userProgress: {
        totalPoints: user.totalPoints,
        currentLevel: user.currentLevel,
        levelTitle: user.levelTitle,
        nextLevelPoints: user.nextLevelPoints,
        badgesEarned: user.badgesEarned,
        completedModules: user.completedModules,
      },
    });
  } catch (error) {
    console.error('Submit Quiz Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quiz',
      error: error.message,
    });
  }
};

// Get authenticated user progress
export const getUserProgress = async (req, res) => {
  try {
    const user = await resolveUser(req.user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Ensure totalPoints matches sum of module scores for registered users
    if (user.email !== 'aarav@edurights.org' && user.completedModules?.length > 0) {
      const sum = user.completedModules.reduce((s, m) => s + (Number(m.score) || 0), 0);
      if (user.totalPoints !== sum) {
        user.totalPoints = sum;
        const levelInfo = calculateLevel(user.totalPoints);
        user.currentLevel = levelInfo.level;
        user.levelTitle = levelInfo.title;
        user.nextLevelPoints = levelInfo.nextLevelPoints;
        if (typeof user.save === 'function') {
          await user.save();
        }
      }
    }

    res.status(200).json({
      success: true,
      userProgress: {
        totalPoints: user.totalPoints ?? 0,
        currentLevel: user.currentLevel || 1,
        levelTitle: user.levelTitle || 'Level 1 Beginner',
        nextLevelPoints: user.nextLevelPoints || 500,
        streakDays: user.streakDays || 1,
        badgesEarned: user.badgesEarned || [],
        completedModules: user.completedModules || [],
      },
    });
  } catch (error) {
    console.error('Get User Progress Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user progress',
    });
  }
};