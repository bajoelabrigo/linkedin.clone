import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createPost,
  getFeedPosts,
  deletePost,
  getPostById,
  createComment,
  likePost,
 
} from "../controllers/post.controller.js";
import upload from "../middleware/multer.js"
import path from "path";

const router = express.Router();

router.get("/", protectRoute, upload.single("file"), getFeedPosts);
router.post("/create",  protectRoute, upload.single("file"), createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);

export default router;
