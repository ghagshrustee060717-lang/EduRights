const STORAGE_KEY = "edurights_completed_modules";
const FEEDBACK_KEY = "edurights_module_feedback";

const XP_PER_MODULE = 100;

const LEVELS = [
  { level: 1, title: "Rookie Explorer", minXP: 0 },
  { level: 2, title: "Rights Explorer", minXP: 100 },
  { level: 3, title: "Justice Defender", minXP: 250 },
  { level: 4, title: "Rights Champion", minXP: 500 },
  { level: 5, title: "Legal Legend", minXP: 1000 },
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

export function getXP(completed) {
  return completed.length * XP_PER_MODULE;
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

  const progressPercent = next
    ? Math.round(
        ((xp - current.minXP) / (next.minXP - current.minXP)) * 100
      )
    : 100;

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

export function getBadges(completed, feedback, modules) {
  const totalModules = modules.length;
  const feedbackCount = Object.keys(feedback || {}).length;
  const halfway = totalModules > 0 && completed.length / totalModules >= 0.5;
  const allComplete = totalModules > 0 && completed.length === totalModules;

  return [
    {
      id: "first-steps",
      icon: "🥇",
      label: "First Steps",
      description: "Complete your first adventure",
      unlocked: completed.length >= 1,
    },
    {
      id: "halfway-hero",
      icon: "🔥",
      label: "Halfway Hero",
      description: "Complete at least half of all adventures",
      unlocked: halfway,
    },
    {
      id: "rights-champion",
      icon: "🏆",
      label: "Rights Champion",
      description: "Complete every learning adventure",
      unlocked: allComplete,
    },
    {
      id: "voice-heard",
      icon: "💬",
      label: "Voice Heard",
      description: "Share how a module made you feel",
      unlocked: feedbackCount >= 1,
    },
  ];
}