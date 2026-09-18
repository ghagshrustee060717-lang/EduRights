import express from "express";
import auth from "../middleware/auth.js";
import {
  getProfile,
  updateProgress
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", auth, getProfile);
router.put("/progress", auth, updateProgress);

export default router;