import React, { useState } from 'react';
import { type Comment, currentUser } from '../../data/mockData';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (content: string) => void;
  postId: string;
}

const CommentDrawer: React.FC<CommentDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="comment-overlay" onClick={onClose}></div>
      <div className={`comment-drawer ${isOpen ? 'open' : ''}`}>
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          <h5 className="mb-0 fw-semibold">Comments ({comments.length})</h5>
          <button className="btn btn-light btn-sm rounded-circle" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="comments-list p-3">
          {comments.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-chat-square-text d-block fs-1 text-muted mb-2"></i>
              <p className="text-secondary mb-0">No comments yet</p>
              <span className="text-muted small">Be the first to comment!</span>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="d-flex gap-2 mb-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.name}
                  className="rounded-circle shrink-0"
                  style={{ width: 40, height: 40, objectFit: 'cover' }}
                />
                <div className="grow">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-semibold small">{comment.user.name}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="mb-1 small" style={{ lineHeight: 1.5 }}>{comment.content}</p>
                  <div className="d-flex gap-3">
                    <button className="btn btn-link text-muted p-0 text-decoration-none small d-flex align-items-center gap-1">
                      <i className="bi bi-heart"></i>
                      <span>{comment.likes}</span>
                    </button>
                    <button className="btn btn-link text-muted p-0 text-decoration-none small d-flex align-items-center gap-1">
                      <i className="bi bi-reply"></i>
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form className="d-flex align-items-center gap-2 p-3 border-top bg-white" onSubmit={handleSubmit}>
          <img
            src={currentUser.avatar}
            alt="Your avatar"
            className="rounded-circle shrink-0"
            style={{ width: 36, height: 36, objectFit: 'cover' }}
          />
          <div className="d-flex align-items-center bg-light rounded-pill grow ps-3 pe-1">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input grow"
            />
            <button
              type="submit"
              className="send-comment-btn"
              disabled={!newComment.trim()}
            >
              <i className="bi bi-send-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentDrawer;
