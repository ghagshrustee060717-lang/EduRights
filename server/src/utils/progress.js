export const TOTAL_MODULES = 3;
export const XP_FOR_ALL_MODULES = 200;
export const XP_PER_QUIZ = 100;
export const MAX_XP = 500;

const LEVELS = [
  { level: 1, title: 'Rookie Explorer', minXP: 0 },
  { level: 2, title: 'Rights Defender', minXP: 200 },
  { level: 3, title: 'Legal Champion', minXP: MAX_XP },
];

export const calculateLevel = (totalXP) => {
  const xp = Math.max(0, Number(totalXP) || 0);
  const current = [...LEVELS].reverse().find((item) => xp >= item.minXP);
  const next = LEVELS.find((item) => item.level === current.level + 1);

  return {
    level: current.level,
    title: current.title,
    nextLevelPoints: next ? next.minXP : LEVELS[LEVELS.length - 1].minXP,
    progressPercent: Math.min(
      xp <= 200 ? xp / 4 : 50 + ((xp - 200) / 6),
      100
    ),
  };
};

export const getXPFromCompletedModules = (completedModules = []) => {
  const moduleQuizStatus = new Map();

  completedModules.forEach((module) => {
    const moduleId = typeof module === 'object' ? module?.moduleId : module;
    if (!moduleId) return;

    const lessonCompleted = typeof module !== 'object' || module?.lessonCompleted !== false;
    const quizCompleted = typeof module === 'object' && module?.quizCompleted === true;
    const previousStatus = moduleQuizStatus.get(moduleId) || {
      lessonCompleted: false,
      quizCompleted: false,
    };
    moduleQuizStatus.set(moduleId, {
      lessonCompleted: previousStatus.lessonCompleted || lessonCompleted,
      quizCompleted: previousStatus.quizCompleted || quizCompleted,
    });
  });

  const moduleStatuses = [...moduleQuizStatus.values()];
  const completedLessons = moduleStatuses.filter((status) => status.lessonCompleted).length;
  const completedQuizzes = moduleStatuses.filter(
    (status) => status.lessonCompleted && status.quizCompleted
  ).length;
  const lessonXP = Math.round(XP_FOR_ALL_MODULES * completedLessons / TOTAL_MODULES);

  return Math.min(lessonXP + completedQuizzes * XP_PER_QUIZ, MAX_XP);
};
