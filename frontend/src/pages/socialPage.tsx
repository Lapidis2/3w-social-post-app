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

const POSTS_PER_PAGE = 5;

const SocialPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

 
  const fetchPosts = async () => {
    setLoading(true);
   
    await new Promise((res) => setTimeout(res, 800));
    setPosts(mockPosts);
    setLoading(false);
  };

  // Effect to check login and fetch posts
  useEffect(() => {
    const checkAndFetch = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }
      await fetchPosts();
    };
    checkAndFetch();
  }, [navigate]);

  // Pagination calculation
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const filtered = mockPosts.filter(
        (post) =>
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.user.name.toLowerCase().includes(query.toLowerCase()) ||
          post.hashtags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setPosts(filtered);
      setCurrentPage(1);
    } else {
      setPosts(mockPosts);
      setCurrentPage(1);
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
    setCurrentPage(1);
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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 400); // simulate delay for skeleton
  };

  // Skeleton component
  const renderSkeleton = () => {
    return Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
      <div key={i} className="card mb-3 p-3">
        <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 20, width: '50%' }} />
        <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 14, width: '100%' }} />
        <div className="bg-secondary bg-opacity-25 rounded mb-2" style={{ height: 14, width: '90%' }} />
        <div className="bg-secondary bg-opacity-25 rounded" style={{ height: 200, width: '100%' }} />
      </div>
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
            {loading
              ? renderSkeleton()
              : paginatedPosts.length === 0
              ? <div className="text-center p-4"><p className="text-muted">No posts found</p></div>
              : paginatedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onFollow={handleFollow}
                />
              ))}
          </div>

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <nav className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                </li>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Comment Drawer */}
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
