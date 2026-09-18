import express from "express";

import {
  getArticles,
  getArticleById,
  createArticle
} from "../controllers/articleController.js";

const router = express.Router();

// Get all articles
router.get("/", getArticles);

// Get one article
router.get("/:id", getArticleById);

// Create an article
router.post("/", createArticle);

export default router;