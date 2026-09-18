import express from "express";

import {
  getModules,
  getModuleById,
  createModule,
  updateModule
} from "../controllers/moduleController.js";

const router = express.Router();

// Get all modules
router.get("/", getModules);

// Get one module
router.get("/:id", getModuleById);

// Create a module
router.post("/", createModule);

// Update a module
router.put("/:id", updateModule);

export default router;