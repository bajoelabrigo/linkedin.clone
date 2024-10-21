import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);

router.put("/profile", protectRoute, updateProfile);

export default router;
