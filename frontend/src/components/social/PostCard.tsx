import React from 'react';
import type { Comment } from '../../types/types';

export interface Post {
  _id: string;
  userId: string;
  username: string;
  text: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare }) => {
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return d.toLocaleDateString('en-US', options).replace(',', '');
  };

 const renderContent = () => {
  if (!post.text) return <p className="mb-1 small text-muted">No content</p>;

  return post.text.split('\n').map((part, index) => (
    <p key={index} className="mb-1 small text-dark">{part}</p>
  ));
};


  return (
    <article className="bg-white mb-2 p-3 shadow-sm">
      
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <img
            src="/default-avatar.png" 
            alt={post.username}
            className="post-avatar"
          />
          <div>
            <h4 className="mb-0 fs-6 fw-bold text-dark">
              {post.username}
              <span className="fw-normal text-secondary ms-1">@{post.username}</span>
            </h4>
            <p className="mb-0 text-muted small">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <button
          className="follow-btn follow" 
          onClick={() => console.log('Follow user:', post.userId)}
        >
          Follow
        </button>
      </div>

     
      <div className="mb-3" style={{ lineHeight: 1.6 }}>
        {renderContent()}
      </div>

      
      {post.image && (
        <img src={`https://threew-social-post-app.onrender.com/${post.image}`} alt="Post content" className="post-image mb-3" />
      )}

    
      <div className="d-flex justify-content-between align-items-center pt-3 border-top">
        <button
          className="action-btn d-flex align-items-center gap-1 px-3 py-2"
          onClick={() => onLike(post._id)}
        >
          <i className="bi bi-heart"></i>
          <span className="small">{post.likes.length}</span>
        </button>
        <button
          className="action-btn d-flex align-items-center gap-1 px-3 py-2"
          onClick={() => onComment(post._id)}
        >
          <i className="bi bi-chat-square"></i>
          <span className="small">{post.comments.length}</span>
        </button>
        <button
          className="action-btn d-flex align-items-center gap-1 px-3 py-2"
          onClick={() => onShare(post._id)}
        >
          <i className="bi bi-share"></i>
          <span className="small">0</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
