import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  User,
  Edit,
  Trash2,
  Bookmark,
  Share2,
  FileText,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import api from '../services/api';

export default function ArticleReader({
  post,
  isOpen,
  onClose,
  currentUser,
  onEditPost,
  onPostDeleted
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const readerBodyRef = useRef(null);

  // Track scroll progress inside the reader modal
  const handleScroll = () => {
    if (!readerBodyRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = readerBodyRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const currentProgress = (scrollTop / totalScroll) * 100;
    setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
  };

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !post) return null;

  const isAuthor = currentUser && post.author && currentUser.username === post.author;
  const words = post.content ? post.content.trim().split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));

  // Handle post deletion via FastAPI DELETE endpoint
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.deletePost(post.id);
      onPostDeleted(post.id);
      onClose();
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert(err.message || 'Failed to delete post.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Markdown renderer for rich longform articles
  const renderMarkdown = (text = '') => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, i) => {
      if (para.startsWith('## ')) {
        return (
          <h3
            key={i}
            className="font-serif"
            style={{
              fontSize: '28px',
              fontWeight: 500,
              marginTop: '36px',
              marginBottom: '16px',
              color: 'var(--ink-primary)',
              letterSpacing: '-0.015em'
            }}
          >
            {para.replace('## ', '')}
          </h3>
        );
      }
      if (para.startsWith('# ')) {
        return (
          <h2
            key={i}
            className="font-serif"
            style={{
              fontSize: '34px',
              fontWeight: 500,
              marginTop: '40px',
              marginBottom: '18px',
              color: 'var(--ink-primary)',
              letterSpacing: '-0.02em'
            }}
          >
            {para.replace('# ', '')}
          </h2>
        );
      }
      if (para.startsWith('> ')) {
        return (
          <blockquote
            key={i}
            style={{
              borderLeft: '3px solid var(--accent-cobalt)',
              backgroundColor: 'var(--bg-subtle)',
              padding: '18px 24px',
              margin: '24px 0',
              fontStyle: 'italic',
              color: 'var(--ink-primary)',
              fontSize: '16.5px',
              lineHeight: 1.7,
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
            }}
            className="font-serif"
          >
            "{para.replace('> ', '')}"
          </blockquote>
        );
      }
      if (para.startsWith('```')) {
        return (
          <pre
            key={i}
            style={{
              backgroundColor: 'var(--bg-dark)',
              color: '#F8FAFC',
              padding: '20px 24px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13.5px',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '24px 0',
              border: '1px solid #1E293B'
            }}
          >
            <code>{para.replace(/```/g, '')}</code>
          </pre>
        );
      }
      if (para.startsWith('- ')) {
        const items = para.split('\n');
        return (
          <ul key={i} style={{ margin: '16px 0 16px 24px', color: 'var(--ink-secondary)', lineHeight: 1.8, fontSize: '16px' }}>
            {items.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {item.replace(/^[-\*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p
          key={i}
          style={{
            marginBottom: '22px',
            lineHeight: 1.8,
            color: 'var(--ink-secondary)',
            fontSize: '16.5px',
            letterSpacing: '-0.01em'
          }}
        >
          {para}
        </p>
      );
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '860px',
          height: '92vh',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-hairline)',
          boxShadow: 'var(--shadow-float)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Scroll Progress Bar at the Top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '3px',
            width: `${scrollProgress}%`,
            backgroundColor: 'var(--accent-cobalt)',
            zIndex: 10,
            transition: 'width 80ms ease-out'
          }}
        />

        {/* Reader Topbar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 28px',
            borderBottom: '1px solid var(--border-hairline)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-neutral font-mono">
              DISPATCH #{post.id}
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--ink-tertiary)'
              }}
              className="font-mono"
            >
              <Clock size={12} />
              <span>{minutes} MIN READ ({words} WORDS)</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Owner Actions */}
            {isAuthor && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
                <button
                  onClick={() => {
                    onClose();
                    onEditPost(post);
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '12.5px' }}
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="btn btn-danger"
                  style={{ padding: '6px 12px', fontSize: '12.5px' }}
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}

            {/* Close Modal */}
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
              aria-label="Close reader"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div
            style={{
              padding: '16px 28px',
              backgroundColor: '#FEF2F2',
              borderBottom: '1px solid #FCA5A5',
              color: '#991B1B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 500 }}>
              <AlertTriangle size={16} color="#DC2626" />
              <span>Are you sure you want to permanently delete this story? This cannot be undone.</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="btn btn-accent"
                style={{ backgroundColor: '#DC2626', borderColor: '#DC2626', padding: '6px 12px', fontSize: '12px' }}
              >
                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        )}

        {/* Reader Scrollable Canvas */}
        <div
          ref={readerBodyRef}
          onScroll={handleScroll}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '48px 36px 64px',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            
            {/* Title */}
            <h1
              className="font-serif"
              style={{
                fontSize: '44px',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                color: 'var(--ink-primary)',
                marginBottom: '24px'
              }}
            >
              {post.title}
            </h1>

            {/* Author Attribution Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '40px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--ink-primary)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700
                  }}
                  className="font-mono"
                >
                  {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    {post.author || 'Anonymous'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-tertiary)' }} className="font-mono">
                    PUBLISHED WRITER
                  </div>
                </div>
              </div>

              <div className="badge badge-emerald">
                <span>VERIFIED ENTRY</span>
              </div>
            </div>

            {/* Rendered Article Content */}
            <div className="article-body">
              {renderMarkdown(post.content)}
            </div>

            {/* Article Sign-off Rule */}
            <div
              style={{
                marginTop: '64px',
                paddingTop: '32px',
                borderTop: '1px solid var(--border-hairline)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'var(--ink-tertiary)',
                fontSize: '12.5px'
              }}
              className="font-mono"
            >
              <span>— END OF DISPATCH #{post.id} —</span>
              <button
                onClick={onClose}
                className="btn btn-ghost"
                style={{ fontSize: '12.5px', padding: '6px 12px' }}
              >
                <ArrowLeft size={14} />
                <span>Back to Journal</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
