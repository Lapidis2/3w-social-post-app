import React from 'react';
import type { Post } from '../../data/mockData';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onFollow: (userId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onComment, onShare, onFollow }) => {
  const formatDate = (date: Date) => {
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
    return date.toLocaleDateString('en-US', options).replace(',', '');
  };

  const renderContent = () => {
    const parts = post.content.split('\n');
    return parts.map((part, index) => (
      <p key={index} className="mb-1 small text-dark">
        {part}
        {index === parts.length - 1 && post.hashtags.length > 0 && (
          <>
            <br />
            {post.hashtags.map((tag, i) => (
              <span key={i} className="post-hashtag">#{tag} </span>
            ))}
          </>
        )}
      </p>
    ));
  };

  return (
    <article className="bg-white mb-2 p-3 shadow-sm">
      {/* Post Header */}
      <div className="d-flex align-items-start justify-content-between mb-3">
        <div className="d-flex align-items-center gap-2">
          <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
          <div>
            <h4 className="mb-0 fs-6 fw-bold text-dark">
              {post.user.name}
              <span className="fw-normal text-secondary ms-1">@{post.user.username}</span>
            </h4>
            <p className="mb-0 text-muted small">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <button
          className={`follow-btn ${post.user.isFollowing ? 'following' : 'follow'}`}
          onClick={() => onFollow(post.user.id)}
        >
          {post.user.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-3" style={{ lineHeight: 1.6 }}>
        {renderContent()}
      </div>

      {/* Achievement */}
      {post.hasAchievement && post.achievement && (
        <>
          <div className="achievement-card mb-3">
            <h3 className="h5 fw-bold mb-1">{post.achievement.title}</h3>
            <p className="mb-0" style={{ opacity: 0.9 }}>{post.achievement.subtitle}</p>
          </div>

          <div className="text-center mb-3">
            <img src={post.user.avatar} alt={post.user.name} className="achievement-avatar mb-2" />
            <h5 className="fw-bold mb-0">{post.user.name}</h5>
            <p className="text-muted small mb-0">@{post.user.username}</p>
          </div>

          <div className="text-center mt-3">
            <h4 className="fs-6 fw-semibold d-flex align-items-center justify-content-center gap-2 mb-3">
              <span>📊</span> MY LEADERBOARD RANKS
            </h4>
            <div className="d-flex justify-content-center gap-3">
              {post.achievement.ranks.map((rank) => (
                <div key={rank.type} className="rank-card">
                  <div className="small fw-semibold text-uppercase" style={{ letterSpacing: 1, opacity: 0.9, fontSize: '0.7rem' }}>POINTS</div>
                  <div className="fw-bold" style={{ fontSize: '1.8rem' }}>#{rank.rank}</div>
                  <div className="small fw-semibold text-uppercase">{rank.type}</div>
                  <div className="small d-flex align-items-center justify-content-center gap-1" style={{ opacity: 0.9 }}>
                    {rank.points} pts <span>🏆</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Post Image */}
      {post.image && (
        <img src={post.image} alt="Post content" className="post-image mb-3" />
      )}


      <div className="d-flex justify-content-between align-items-center pt-3 border-top">
        <button className={`action-btn d-flex align-items-center gap-1 px-3 py-2 ${post.isLiked ? 'liked' : ''}`} onClick={() => onLike(post.id)}>
          <i className={`bi ${post.isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          <span className="small">{post.likes}</span>
        </button>
        <button className="action-btn d-flex align-items-center gap-1 px-3 py-2" onClick={() => onComment(post.id)}>
          <i className="bi bi-chat-square"></i>
          <span className="small">{post.comments}</span>
        </button>
        <button className="action-btn d-flex align-items-center gap-1 px-3 py-2" onClick={() => onShare(post.id)}>
          <i className="bi bi-share"></i>
          <span className="small">{post.shares}</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
