"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    username: String,
    text: String
}, { timestamps: true });
const PostSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    text: String,
    image: String,
    likes: { type: [String], default: [] },
    comments: { type: [CommentSchema], default: [] }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Post", PostSchema);
