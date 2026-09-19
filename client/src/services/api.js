const API_BASE_URL = "http://localhost:5000/api";

/* ================================
   MODULES
================================ */

export const getModules = async () => {
  const response = await fetch(`${API_BASE_URL}/modules`);

  if (!response.ok) {
    throw new Error("Failed to fetch modules");
  }

  return response.json();
};

export const getModuleById = async (moduleId) => {
  const response = await fetch(
    `${API_BASE_URL}/modules/${moduleId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch module");
  }

  return response.json();
};

/* ================================
   ARTICLES / KNOWLEDGE HUB
================================ */

export const getArticles = async () => {
  const response = await fetch(`${API_BASE_URL}/articles`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
};

export const getArticleById = async (articleId) => {
  const response = await fetch(
    `${API_BASE_URL}/articles/${articleId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
};

/* ================================
   USER PROFILE
================================ */

export const getProfile = async (token) => {
  const response = await fetch(
    `${API_BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

/* ================================
   USER PROGRESS
================================ */

export const updateProgress = async (
  token,
  completedModules,
  xp,
  badges
) => {
  const response = await fetch(
    `${API_BASE_URL}/users/progress`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completedModules,
        xp,
        badges,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update progress");
  }

  return response.json();
};