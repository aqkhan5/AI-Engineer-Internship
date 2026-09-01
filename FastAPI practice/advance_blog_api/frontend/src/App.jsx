import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSpotlight from './components/HeroSpotlight';
import ArticleFeed from './components/ArticleFeed';
import PublishStudio from './components/PublishStudio';
import ArticleReader from './components/ArticleReader';
import AuthModal from './components/AuthModal';
import ToastNotification from './components/ToastNotification';
import api from './services/api';

export default function App() {
  const [apiOnline, setApiOnline] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [toast, setToast] = useState(null);

  // Theme Mode State ('light' | 'dark' | 'system')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ink_theme') || 'system';
  });

  // Modal States
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [activeReadingPost, setActiveReadingPost] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Synchronize theme to document element and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ink_theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    const label = newTheme === 'dark' ? 'Dark' : newTheme === 'light' ? 'Light' : 'System Default';
    showToast(`Switched appearance to ${label} mode.`, 'info');
  };

  // Fetch articles from FastAPI
  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await api.getPosts();
      setPosts(Array.isArray(data) ? data : []);
      setApiOnline(true);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      if (err.status === 0) {
        setApiOnline(false);
      }
    } finally {
      setLoadingPosts(false);
    }
  };

  // Check backend health & authenticate on mount
  useEffect(() => {
    const existingUser = api.getUser();
    if (existingUser && api.isAuthenticated()) {
      setUser(existingUser);
    }

    const init = async () => {
      try {
        await api.checkHealth();
        setApiOnline(true);
      } catch {
        setApiOnline(false);
      }
      fetchPosts();
    };

    init();
    const interval = setInterval(init, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    api.logout();
    setUser(null);
    showToast('You have been logged out successfully.', 'info');
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (authenticatedUser, message) => {
    setUser(authenticatedUser);
    setIsAuthOpen(false);
    showToast(message || 'Authentication successful!', 'success');
    fetchPosts();
  };

  const handleReadPost = (post) => {
    setActiveReadingPost(post);
  };

  const handleOpenEditor = (postToEdit = null) => {
    if (!user) {
      showToast('Please sign in to write or edit dispatches.', 'info');
      handleOpenAuth('login');
      return;
    }
    setEditingPost(postToEdit);
    setIsEditorOpen(true);
  };

  const handlePostPublished = (post, mode) => {
    fetchPosts();
    if (mode === 'updated') {
      showToast('Dispatch updated successfully!', 'success');
      if (activeReadingPost && activeReadingPost.id === post.id) {
        setActiveReadingPost(post);
      }
    } else {
      showToast('New dispatch published to the journal!', 'success');
    }
  };

  const handlePostDeleted = (deletedId) => {
    setPosts((prev) => prev.filter((p) => p.id !== deletedId));
    setActiveReadingPost(null);
    showToast('Dispatch was successfully deleted.', 'info');
  };

  // Select the featured lead post (first/latest post)
  const featuredPost = posts.length > 0 ? posts[0] : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Section 1: Masthead Header with Theme Switcher */}
      <Header
        apiOnline={apiOnline}
        user={user}
        onOpenAuth={handleOpenAuth}
        onOpenEditor={() => handleOpenEditor(null)}
        onLogout={handleLogout}
        postCount={posts.length}
        currentTheme={theme}
        onThemeChange={handleThemeChange}
      />

      {/* Main Canvas Container */}
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="app-container">
          
          {/* Section 2: Hero & Featured Story Spotlight */}
          <HeroSpotlight
            featuredPost={featuredPost}
            onReadPost={handleReadPost}
            onOpenEditor={() => handleOpenEditor(null)}
          />

          {/* Section 3: Interactive Feed & Filter Bar */}
          <ArticleFeed
            posts={posts}
            loading={loadingPosts}
            onReadPost={handleReadPost}
            onOpenEditor={() => handleOpenEditor(null)}
          />

        </div>
      </main>

      {/* Section 4: Publishing Studio Modal */}
      <PublishStudio
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingPost(null);
        }}
        onPublished={handlePostPublished}
        editingPost={editingPost}
        user={user}
        onOpenAuth={handleOpenAuth}
      />

      {/* Section 5: Immersive Article Reader Modal */}
      <ArticleReader
        post={activeReadingPost}
        isOpen={Boolean(activeReadingPost)}
        onClose={() => setActiveReadingPost(null)}
        currentUser={user}
        onEditPost={(post) => handleOpenEditor(post)}
        onPostDeleted={handlePostDeleted}
      />

      {/* Section 6: Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Global Toast Feedback */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
