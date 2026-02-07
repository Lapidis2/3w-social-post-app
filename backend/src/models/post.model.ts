import { Schema, model, Document } from "mongoose";

interface IComment {
  username: string;
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  userId: string;
  username: string;
  text?: string;
  image?: string;
  likes: string[];
  comments: IComment[];
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    username: String,
    text: String
  },
  { timestamps: true }
);

const PostSchema = new Schema<IPost>(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    text: String,
    image: String,
    likes: { type: [String], default: [] },
    comments: { type: [CommentSchema], default: [] }
  },
  { timestamps: true }
);

export default model<IPost>("Post", PostSchema);
