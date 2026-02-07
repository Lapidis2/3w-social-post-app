import { Response } from "express";
import Post from "../models/post.model";
import { AuthRequest } from "../middleware/auth.middleware";

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const post = await Post.create({
      userId: req.user.id,
      username: req.user.username,
      text: req.body.text,
      image: req.file?.path
    });

    res.status(201).json(post);
  } catch {
    res.status(500).json({ message: "Post creation failed" });
  }
};

export const getPosts = async (req: AuthRequest, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();

  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    posts,
    totalPages: Math.ceil(total / limit),
    currentPage: page
  });
};

export const likePost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.likes.includes(req.user.username)) {
    post.likes = post.likes.filter(u => u !== req.user.username);
  } else {
    post.likes.push(req.user.username);
  }

  await post.save();
  res.json(post);
};

export const commentPost = async (req: AuthRequest, res: Response) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  post.comments.push({
    username: req.user.username,
    text: req.body.text,
    createdAt: new Date()
  });

  await post.save();
  res.json(post);
};
