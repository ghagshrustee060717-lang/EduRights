const STORAGE_KEY = "edurights_completed_modules";
const FEEDBACK_KEY = "edurights_module_feedback";

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