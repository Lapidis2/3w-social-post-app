import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialHeader from '../components/social/SocialHeader';
import SearchBar from '../components/social/SearchBar';
import CreatePost from '../components/social/CreatePost';
import FilterTabs from '../components/social/FilterTabs';
import PostCard from '../components/social/PostCard';
import CommentDrawer from '../components/social/CommentDrawer';
import { mockPosts, type Post, currentUser, type Comment } from '../data/mockData';
import '../styles/index.css';

const SocialPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeFilter, setActiveFilter] = useState('all');
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [navigate]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const filtered = mockPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.user.name.toLowerCase().includes(query.toLowerCase()) ||
          post.hashtags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setPosts(filtered);
    } else {
      setPosts(mockPosts);
    }
  };

  const handlePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      user: { ...currentUser, id: 'current-user' },
      content,
      hashtags: content.match(/#\w+/g)?.map((tag) => tag.slice(1)) || [],
      hasAchievement: false,
      likes: 0,
      comments: 0,
      commentsList: [],
      shares: 0,
      isLiked: false,
      createdAt: new Date(),
    };
    setPosts([newPost, ...posts]);
  };

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    const sortedPosts = [...mockPosts];
    switch (filterId) {
      case 'mostliked':
        sortedPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'mostcommented':
        sortedPosts.sort((a, b) => b.comments - a.comments);
        break;
      case 'mostshared':
        sortedPosts.sort((a, b) => b.shares - a.shares);
        break;
    }
    setPosts(sortedPosts);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map((post) =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setCommentDrawerOpen(true);
  };

  const handleAddComment = (content: string) => {
    if (!selectedPostId) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      content,
      likes: 0,
      createdAt: new Date(),
    };
    setPosts(posts.map((post) =>
      post.id === selectedPostId
        ? { ...post, comments: post.comments + 1, commentsList: [newComment, ...post.commentsList] }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  const handleFollow = (userId: string) => {
    setPosts(posts.map((post) =>
      post.user.id === userId
        ? { ...post, user: { ...post.user, isFollowing: !post.user.isFollowing } }
        : post
    ));
  };

  return (
    <div className="social-page-wrapper container my-4">
      <SocialHeader />
      <SearchBar onSearch={handleSearch} />

      <div className="row mt-3">
        {/* Main Feed */}
        <div className="col-lg-8 col-md-12">
          <CreatePost onPost={handlePost} />
          <FilterTabs activeFilter={activeFilter} onFilterChange={handleFilterChange} />

          <div className="mt-3">
            {posts.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted">No posts found</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onFollow={handleFollow}
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4 d-none d-lg-block">
          <div className="sidebar p-3 border rounded">
            <h5>Trending</h5>
            {/* Add trending users, hashtags, etc */}
          </div>
        </div>
      </div>

      {/* Comment Drawer as modal */}
      <CommentDrawer
        isOpen={commentDrawerOpen}
        onClose={() => setCommentDrawerOpen(false)}
        comments={posts.find((p) => p.id === selectedPostId)?.commentsList || []}
        onAddComment={handleAddComment}
        postId={selectedPostId || ''}
      />
    </div>
  );
};

export default SocialPage;
