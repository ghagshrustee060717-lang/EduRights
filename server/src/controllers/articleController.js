import Article from "../models/Article.js";

// Get all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    return res.status(200).json({
      articles
    });
  } catch (error) {
    console.error("Get articles error:", error);

    return res.status(500).json({
      message: "Server error while fetching articles"
    });
  }
};

// Get a single article by ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: "Article not found"
      });
    }

    return res.status(200).json({
      article
    });
  } catch (error) {
    console.error("Get article error:", error);

    return res.status(500).json({
      message: "Server error while fetching article"
    });
  }
};

// Create a new article
export const createArticle = async (req, res) => {
  try {
    const { title, body, category, tags } = req.body;

    if (!title || !body || !category) {
      return res.status(400).json({
        message: "Title, body and category are required"
      });
    }

    const article = await Article.create({
      title: title.trim(),
      body,
      category: category.trim(),
      tags: Array.isArray(tags) ? tags : []
    });

    return res.status(201).json({
      message: "Article created successfully",
      article
    });
  } catch (error) {
    console.error("Create article error:", error);

    return res.status(500).json({
      message: "Server error while creating article"
    });
  }
};