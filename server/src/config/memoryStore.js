// Resilient in-memory fallback store for offline development and instant demo eval
import bcrypt from 'bcryptjs';

const demoPasswordHash = bcrypt.hashSync('explorer123', 10);

export const memoryUsers = [
  {
    _id: 'usr_aarav_001',
    id: 'usr_aarav_001',
    name: 'Aarav',
    email: 'aarav@edurights.org',
    passwordHash: demoPasswordHash,
    age: 10,
    language: 'en',
    avatar: 'superhero-aarav',
    role: 'child',
    currentLevel: 3,
    levelTitle: 'Level 3 Explorer',
    totalPoints: 750,
    nextLevelPoints: 1200,
    streakDays: 7,
    badgesEarned: [
      { badgeId: 'b1', name: 'First Steps', icon: '🌟', description: 'Began the rights journey', earnedAt: new Date() },
      { badgeId: 'b2', name: 'Quiz Master', icon: '🏆', description: 'Scored 100% on safety quiz', earnedAt: new Date() },
      { badgeId: 'b3', name: 'Story Explorer', icon: '📖', description: 'Finished Chapter 1', earnedAt: new Date() },
      { badgeId: 'b4', name: 'Helper', icon: '🤝', description: 'Learned how to speak up for friends', earnedAt: new Date() },
    ],
    completedModules: [
      { moduleId: 'mod_01', title: 'Right to Education - Chapter 1', score: 100, completedAt: new Date() },
    ],
    createdAt: new Date('2026-09-01'),
  },
];

export const getMemoryUserByEmail = (email) => {
  return memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const getMemoryUserById = (id) => {
  return memoryUsers.find((u) => (u._id === id || u.id === id));
};

export const addMemoryUser = (user) => {
  const newUser = {
    _id: 'usr_' + Date.now(),
    id: 'usr_' + Date.now(),
    currentLevel: 1,
    levelTitle: 'Novice Explorer',
    totalPoints: 0,
    nextLevelPoints: 500,
    streakDays: 1,
    badgesEarned: [],
    completedModules: [],
    createdAt: new Date(),
    ...user,
  };
  memoryUsers.push(newUser);
  return newUser;
};

export const updateMemoryUser = (id, updates) => {
  const index = memoryUsers.findIndex((u) => u._id === id || u.id === id);
  if (index !== -1) {
    memoryUsers[index] = { ...memoryUsers[index], ...updates };
    return memoryUsers[index];
  }
  return null;
};
