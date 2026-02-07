import { Router } from "express";
import auth from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
import {
  createPost,
  getPosts,
  likePost,
  commentPost
} from "../controller/post.controller";

const router = Router();

router.post("/", auth, upload.single("image"), createPost);
router.get("/", auth, getPosts);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, commentPost);

export default router;
