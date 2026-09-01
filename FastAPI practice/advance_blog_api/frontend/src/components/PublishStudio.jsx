import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Eye,
  Edit3,
  Columns,
  Bold,
  Italic,
  Heading,
  Quote,
  Code,
  List,
  Clock,
  FileText,
  Lock,
  Sparkles
} from 'lucide-react';
import api from '../services/api';

export default function PublishStudio({
  isOpen,
  onClose,
  onPublished,
  editingPost = null,
  user,
  onOpenAuth
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [viewMode, setViewMode] = useState('write'); // 'write' | 'split' | 'preview'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Initialize or populate for editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || '');
      setContent(editingPost.content || '');
    } else {
      setTitle('');
      setContent('');
    }
    setError(null);
  }, [editingPost, isOpen]);

  if (!isOpen) return null;

  // Real-time metric calculations
  const wordCount = content.trim() ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = content.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Markdown toolbar helper
  const insertMarkdown = (prefix, suffix = '') => {
    const textarea = document.getElementById('studio-textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 4));
    }, 10);
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!title.trim()) {
      setError('Please enter a headline for your dispatch.');
      return;
    }
    if (!content.trim()) {
      setError('Please write some content before publishing.');
      return;
    }

    if (!api.isAuthenticated()) {
      setError('Authentication required. Please sign in to publish.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      if (editingPost && editingPost.id) {
        // Update existing post
        const updated = await api.updatePost(editingPost.id, {
          title: title.trim(),
          content: content.trim()
        });
        onPublished(updated, 'updated');
      } else {
        // Create new post
        const created = await api.createPost({
          title: title.trim(),
          content: content.trim()
        });
        onPublished(created, 'created');
      }
      onClose();
    } catch (err) {
      console.error('Publish error:', err);
      setError(err.message || 'Failed to publish story.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render markdown preview
  const renderSimpleMarkdown = (text) => {
    if (!text) return <p style={{ color: 'var(--ink-tertiary)', fontStyle: 'italic' }}>Live preview will appear here as you type...</p>;

    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, i) => {
      if (para.startsWith('## ')) {
        return (
          <h3
            key={i}
            className="font-serif"
            style={{ fontSize: '26px', marginTop: '24px', marginBottom: '12px', color: 'var(--ink-primary)' }}
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
            style={{ fontSize: '32px', marginTop: '28px', marginBottom: '14px', color: 'var(--ink-primary)' }}
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
              paddingLeft: '16px',
              margin: '16px 0',
              fontStyle: 'italic',
              color: 'var(--ink-secondary)',
              fontSize: '15.5px'
            }}
          >
            {para.replace('> ', '')}
          </blockquote>
        );
      }
      if (para.startsWith('```')) {
        return (
          <pre
            key={i}
            style={{
              backgroundColor: 'var(--bg-subtle)',
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              overflowX: 'auto',
              margin: '16px 0'
            }}
          >
            <code>{para.replace(/```/g, '')}</code>
          </pre>
        );
      }
      return (
        <p key={i} style={{ marginBottom: '16px', lineHeight: 1.7, color: 'var(--ink-secondary)', fontSize: '15.5px' }}>
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
        backgroundColor: 'var(--bg-modal-overlay)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1080px',
          height: '90vh',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-hairline)',
          boxShadow: 'var(--shadow-float)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Studio Topbar */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-hairline)',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="badge badge-cobalt">
              <Sparkles size={13} />
              <span>{editingPost ? 'EDIT DISPATCH' : 'WRITER STUDIO'}</span>
            </span>

            {/* Metrics */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontSize: '12px',
                color: 'var(--ink-tertiary)'
              }}
              className="font-mono"
            >
              <span>{wordCount} WORDS</span>
              <span>{charCount} CHARS</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span>{readingTime} MIN READ</span>
              </span>
            </div>
          </div>

          {/* View Toggles & Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            
            {/* View Mode Switcher */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px'
              }}
            >
              <button
                onClick={() => setViewMode('write')}
                className={`btn btn-ghost ${viewMode === 'write' ? 'btn-secondary' : ''}`}
                style={{ padding: '5px 10px', fontSize: '12px' }}
                title="Editor only"
              >
                <Edit3 size={14} />
                <span>Write</span>
              </button>

              <button
                onClick={() => setViewMode('split')}
                className={`btn btn-ghost ${viewMode === 'split' ? 'btn-secondary' : ''}`}
                style={{ padding: '5px 10px', fontSize: '12px' }}
                title="Split screen"
              >
                <Columns size={14} />
                <span>Split</span>
              </button>

              <button
                onClick={() => setViewMode('preview')}
                className={`btn btn-ghost ${viewMode === 'preview' ? 'btn-secondary' : ''}`}
                style={{ padding: '5px 10px', fontSize: '12px' }}
                title="Reader preview"
              >
                <Eye size={14} />
                <span>Preview</span>
              </button>
            </div>

            {/* Close Studio */}
            <button
              onClick={onClose}
              className="btn btn-ghost"
              style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
              aria-label="Close studio"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Toolbar */}
        {viewMode !== 'preview' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 24px',
              borderBottom: '1px solid var(--border-hairline)',
              backgroundColor: 'var(--bg-subtle)'
            }}
          >
            <button
              type="button"
              onClick={() => insertMarkdown('**', '**')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Bold (**text**)"
            >
              <Bold size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('*', '*')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Italic (*text*)"
            >
              <Italic size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('## ')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Heading (## Heading)"
            >
              <Heading size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('> ')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Blockquote (> quote)"
            >
              <Quote size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('```\n', '\n```')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Code block"
            >
              <Code size={15} />
            </button>
            <button
              type="button"
              onClick={() => insertMarkdown('- ')}
              className="btn btn-ghost"
              style={{ padding: '6px 8px' }}
              title="Bullet list"
            >
              <List size={15} />
            </button>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: '#FEF2F2',
              borderBottom: '1px solid #FCA5A5',
              color: '#991B1B',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Studio Body: Write / Split / Preview */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Write Panel */}
          {(viewMode === 'write' || viewMode === 'split') && (
            <div
              style={{
                flex: 1,
                padding: '32px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                borderRight: viewMode === 'split' ? '1px solid var(--border-hairline)' : 'none'
              }}
            >
              {/* Title Input */}
              <input
                type="text"
                placeholder="Title of your story..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-serif"
                style={{
                  fontSize: '36px',
                  fontWeight: 600,
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--ink-primary)',
                  marginBottom: '20px',
                  width: '100%',
                  letterSpacing: '-0.02em'
                }}
              />

              {/* Content Textarea */}
              <textarea
                id="studio-textarea"
                placeholder="Write your story using markdown..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  flex: 1,
                  minHeight: '340px',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  color: 'var(--ink-secondary)',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-sans)',
                  resize: 'none',
                  width: '100%'
                }}
              />
            </div>
          )}

          {/* Preview Panel */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div
              style={{
                flex: 1,
                padding: '32px',
                overflowY: 'auto',
                backgroundColor: 'var(--bg-canvas)'
              }}
            >
              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <span className="badge badge-neutral font-mono" style={{ marginBottom: '16px' }}>
                  READER PREVIEW
                </span>
                
                <h1
                  className="font-serif"
                  style={{
                    fontSize: '38px',
                    lineHeight: 1.15,
                    color: 'var(--ink-primary)',
                    marginBottom: '20px'
                  }}
                >
                  {title || 'Untitled Dispatch'}
                </h1>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid var(--border-hairline)',
                    marginBottom: '24px'
                  }}
                >
                  <div className="author-avatar avatar-sm">
                    {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                    {user?.username || 'Author'}
                  </span>
                  <span style={{ color: 'var(--ink-tertiary)', fontSize: '12px' }}>•</span>
                  <span style={{ fontSize: '12px', color: 'var(--ink-tertiary)' }} className="font-mono">
                    {readingTime} MIN READ
                  </span>
                </div>

                <div className="preview-rendered-body">
                  {renderSimpleMarkdown(content)}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Studio Bottom Bar */}
        <footer
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-hairline)',
            backgroundColor: 'var(--bg-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Auth State Note */}
          <div>
            {!user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--accent-rose)' }}>
                <Lock size={14} />
                <span>You must be signed in to publish dispatches.</span>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="btn btn-ghost"
                  style={{ padding: '2px 8px', fontSize: '12.5px', textDecoration: 'underline', color: 'var(--accent-cobalt)' }}
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--ink-secondary)' }}>
                <span>Publishing as</span>
                <strong style={{ color: 'var(--ink-primary)' }}>{user.username}</strong>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !user}
              className="btn btn-accent"
              style={{
                opacity: (!user || isSubmitting) ? 0.7 : 1,
                cursor: (!user || isSubmitting) ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <Send size={15} />
                  <span>{editingPost ? 'Save Updates' : 'Publish Dispatch'}</span>
                </>
              )}
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
