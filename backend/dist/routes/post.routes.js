"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const post_controller_1 = require("../controller/post.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, upload_middleware_1.default.single("image"), post_controller_1.createPost);
router.get("/", auth_middleware_1.default, post_controller_1.getPosts);
router.post("/:id/like", auth_middleware_1.default, post_controller_1.likePost);
router.post("/:id/comment", auth_middleware_1.default, post_controller_1.commentPost);
exports.default = router;
