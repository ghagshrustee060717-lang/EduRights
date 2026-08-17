const STORAGE_KEY = "edurights_completed_modules";

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