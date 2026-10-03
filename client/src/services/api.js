const API_BASE_URL = "http://localhost:5000/api";

/* ================================
   AUTHENTICATION
================================ */

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
};

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
  const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`);

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
  const response = await fetch(`${API_BASE_URL}/articles/${articleId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
};

/* ================================
   AUTHENTICATED USER PROFILE
================================ */

export const getProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
};

export const updateProfile = async (token, profileData) => {
  const response = await fetch(`${API_BASE_URL}/users/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  return data;
};

/* ================================
   USER PROGRESS / GAMIFICATION
================================ */

export const awardUserPoints = async (token, progressData) => {
  const response = await fetch(`${API_BASE_URL}/users/award-points`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(progressData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user progress");
  }

  return data;
};