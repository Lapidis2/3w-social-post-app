import axios from "axios";
import type { Post } from "../types/types";


const api = axios.create({
  baseURL: "https://threew-social-post-app.onrender.com/api/posts",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createPostApi = async (formData: FormData): Promise<Post> => {
  const res = await api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getPostsApi = async (page = 1, limit = 5): Promise<{ posts: Post[]; totalPages: number; currentPage: number }> => {
  const res = await api.get("/", { params: { page, limit } });
  return res.data;
};

export const likePostApi = async (postId: string): Promise<Post> => {
  const res = await api.post(`/${postId}/like`);
  return res.data;
};

export const commentPostApi = async (postId: string, text: string): Promise<Post> => {
  const res = await api.post(`/${postId}/comment`, { text });
  return res.data;
};
