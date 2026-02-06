import React, { useState } from 'react';

interface CreatePostProps {
  onPost: (content: string, type: 'all' | 'promotion') => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPost }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'all' | 'promotion'>('all');

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content, postType);
      setContent('');
    }
  };

  return (
    <div className="bg-white my-2 p-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h6 fw-semibold mb-0">Create Post</h3>
        <div className="d-flex bg-light rounded-pill p-1">
          <button
            className={`post-type-tab ${postType === 'all' ? 'active' : ''}`}
            onClick={() => setPostType('all')}
          >
            All Posts
          </button>
          <button
            className={`post-type-tab ${postType === 'promotion' ? 'active' : ''}`}
            onClick={() => setPostType('promotion')}
          >
            Promotions
          </button>
        </div>
      </div>

      <textarea
        className="create-post-input"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={2}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center gap-3">
          <button className="tool-btn" title="Add Photo">
            <i className="bi bi-camera"></i>
          </button>
          <button className="tool-btn" title="Add Emoji">
            <i className="bi bi-emoji-smile"></i>
          </button>
          <button className="tool-btn" title="Format Text">
            <i className="bi bi-text-left"></i>
          </button>
          <button className="btn btn-link text-primary fw-semibold text-decoration-none p-0 d-flex align-items-center gap-1">
            <i className="bi bi-megaphone"></i>
            Promote
          </button>
        </div>

        <button
          className={`btn rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 ${content.trim() ? 'btn-primary' : 'btn-secondary'}`}
          onClick={handleSubmit}
          disabled={!content.trim()}
        >
          <i className="bi bi-send"></i>
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
