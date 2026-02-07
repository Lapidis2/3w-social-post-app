"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentPost = exports.likePost = exports.getPosts = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../models/post.model"));
const createPost = async (req, res) => {
    try {
        const post = await post_model_1.default.create({
            userId: req.user.id,
            username: req.user.username,
            text: req.body.text,
            image: req.file?.path
        });
        res.status(201).json(post);
    }
    catch {
        res.status(500).json({ message: "Post creation failed" });
    }
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await post_model_1.default.countDocuments();
    const posts = await post_model_1.default.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    res.json({
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page
    });
};
exports.getPosts = getPosts;
const likePost = async (req, res) => {
    const post = await post_model_1.default.findById(req.params.id);
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    if (post.likes.includes(req.user.username)) {
        post.likes = post.likes.filter(u => u !== req.user.username);
    }
    else {
        post.likes.push(req.user.username);
    }
    await post.save();
    res.json(post);
};
exports.likePost = likePost;
const commentPost = async (req, res) => {
    const post = await post_model_1.default.findById(req.params.id);
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    if (!post)
        return res.status(404).json({ message: "Post not found" });
    post.comments.push({
        username: req.user.username,
        text: req.body.text,
        createdAt: new Date()
    });
    await post.save();
    res.json(post);
};
exports.commentPost = commentPost;
