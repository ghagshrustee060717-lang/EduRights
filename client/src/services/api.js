const API_BASE_URL = "http://localhost:5000/api";

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