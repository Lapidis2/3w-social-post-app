import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SocialHeader from '../components/social/SocialHeader';
import SearchBar from '../components/social/SearchBar';
import CreatePost from '../components/social/CreatePost';
import FilterTabs from '../components/social/FilterTabs';
import PostCard from '../components/social/PostCard';
import CommentDrawer from '../components/social/CommentDrawer';
import type { Post, User } from '../types/types';
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
  const fetchCurrentUser = async () => {
    const res = await fetch('/api/users/me');
    const data = await res.json();
    setCurrentUser(data);
  };

  fetchCurrentUser();
}, []);


const fetchPosts = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');

    const res = await fetch('https://threew-social-post-app.onrender.com/api/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch posts: ${errorText}`);
    }

    const data: {
      posts: Post[];
      totalPages: number;
      currentPage: number;
    } = await res.json();

    setPosts(data.posts); 

  } catch (error) {
    console.error('Fetch posts error:', error);
  } finally {
    setLoading(false);
  }
};





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


  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

 
  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?search=${query}`);
      const data = await res.json();
      setPosts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 
  const handlePost = async (content: string) => {
    try {
      const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');
      const res = await fetch('https://threew-social-post-app.onrender.com/api/posts', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: content }),
      });

      if (!res.ok) throw new Error('Post creation failed');

      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  
  const handleFilterChange = async (filterId: string) => {
    setActiveFilter(filterId);
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?sort=${filterId}`);
      const data = await res.json();
      setPosts(data);
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LIKE ================= */
  const handleLike = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (!res.ok) throw new Error('Like failed');

      const updatedPost = await res.json();

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= COMMENT ================= */
  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setCommentDrawerOpen(true);
  };

  const handleAddComment = async (content: string) => {
    if (!selectedPostId) return;

    try {
      const res = await fetch(
        `/api/posts/${selectedPostId}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content }),
        }
      );

      if (!res.ok) throw new Error('Comment failed');

      const updatedPost = await res.json();

      setPosts((prev) =>
        prev.map((post) =>
          post._id === selectedPostId ? updatedPost : post
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  /* ================= SHARE ================= */
  const handleShare = async (postId: string) => {
    try {
      await fetch(`/api/posts/${postId}/share`, {
        method: 'POST',
      });
    } catch (error) {
      console.error(error);
    }
  };

 
  /* ================= PAGE CHANGE ================= */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 400);
  };

  /* ================= SKELETON ================= */
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
                  key={post._id}
                  post={post}
                  
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                 
                 
                />
              ))}
          </div>

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

     {currentUser && (
  <CommentDrawer
    isOpen={commentDrawerOpen}
    onClose={() => setCommentDrawerOpen(false)}
    comments={
      posts.find((p) => p._id === selectedPostId)?.comments|| []
    }
    onAddComment={handleAddComment}
    postId={selectedPostId || ''}
    currentUser={currentUser}
  />
)}
    </div>
  );
};

export default SocialPage;
