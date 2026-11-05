const STORAGE_KEY = "edurights_completed_modules";
const FEEDBACK_KEY = "edurights_module_feedback";

const TOTAL_MODULES = 3;
const XP_FOR_ALL_MODULES = 200;
const XP_PER_QUIZ = 100;
const MAX_XP = 500;

const LEVELS = [
  { level: 1, title: "Rookie Explorer", minXP: 0 },
  { level: 2, title: "Rights Defender", minXP: 200 },
  { level: 3, title: "Legal Champion", minXP: MAX_XP },
];

export function getCompletedModules() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markModuleComplete(moduleId) {
  const completed = getCompletedModules();
  if (!completed.includes(moduleId)) {
    completed.push(moduleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }
  return completed;
}

export function isModuleUnlocked(moduleIndex, completed, modules) {
  if (moduleIndex === 0) return true;
  const previousModule = modules[moduleIndex - 1];
  return completed.includes(previousModule.id);
}

export function getModuleFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveModuleFeedback(moduleId, emoji) {
  const feedback = getModuleFeedback();
  feedback[moduleId] = emoji;
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedback));
  return feedback;
}

/* ---------- XP & Levels ---------- */

export function getXP(completed, quizCompleted = []) {
  const completedIds = new Set(completed);
  const completedQuizIds = new Set(quizCompleted);
  const quizCount = [...completedQuizIds].filter((moduleId) => completedIds.has(moduleId)).length;
  const lessonXP = Math.round(XP_FOR_ALL_MODULES * completedIds.size / TOTAL_MODULES);

  return Math.min(lessonXP + quizCount * XP_PER_QUIZ, MAX_XP);
}

export function getLevelInfo(xp) {
  let current = LEVELS[0];
  let next = null;

  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXP) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || null;
    }
  }

  const progressPercent = Math.min(
    Math.round(xp <= 200 ? xp / 4 : 50 + ((xp - 200) / 6)),
    100
  );

  return {
    level: current.level,
    title: current.title,
    currentXP: xp,
    nextLevelXP: next ? next.minXP : null,
    nextLevelTitle: next ? next.title : null,
    progressPercent,
    isMaxLevel: !next,
  };
}

/* ---------- Badges ---------- */

export function getBadges(completed, feedback, modules, quizCompleted = []) {
  const totalModules = modules.length;
  const feedbackCount = Object.keys(feedback || {}).length;
  const completedIds = new Set(completed);
  const completedQuizCount = new Set(
    quizCompleted.filter((moduleId) => completedIds.has(moduleId))
  ).size;
  const halfway = totalModules > 0 && completedQuizCount / totalModules >= 0.5;
  const allQuizzesComplete = totalModules > 0 && completedQuizCount === totalModules;

  return [
    {
      id: "first-steps",
      icon: "🥇",
      label: "First Steps",
      description: "Complete your first adventure quiz",
      unlocked: completedQuizCount >= 1,
    },
    {
      id: "halfway-hero",
      icon: "🔥",
      label: "Halfway Hero",
      description: "Complete quizzes for at least half of all adventures",
      unlocked: halfway,
    },
    {
      id: "rights-champion",
      icon: "🏆",
      label: "Rights Champion",
      description: "Complete every learning adventure quiz",
      unlocked: allQuizzesComplete,
    },
    {
      id: "voice-heard",
      icon: "💬",
      label: "Voice Heard",
      description: "Complete every adventure quiz or share how a module made you feel",
      unlocked: feedbackCount >= 1 || allQuizzesComplete,
    },
  ];
}