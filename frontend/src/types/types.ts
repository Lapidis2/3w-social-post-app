export interface User {
  id: string;
  username: string;
  avatar?: string;
  isFollowing?: boolean;
}

export interface Comment {
  _id: string;
  username: string;
  text: string;
  createdAt: string; 
  updatedAt: string;

}

export interface PostFromApi {
  _id: string;
  userId: string;
  username: string;
  text: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Post {
  _id: string;
  userId: string;
  username: string;
  text: string;
  image: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date; 
  updatedAt: Date;
  __v: number;
}

export interface ApiResponse {
  posts: PostFromApi[];
  totalPages: number;
  currentPage: number;
}

