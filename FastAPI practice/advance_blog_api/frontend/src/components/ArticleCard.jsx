import React from 'react';
import { Clock, ArrowUpRight, User, BookOpen } from 'lucide-react';

export default function ArticleCard({ post, onReadPost, index }) {
  // Calculate reading time
  const calculateReadingTime = (text = '') => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const minutes = calculateReadingTime(post.content);
  const excerpt = post.content && post.content.length > 140
    ? post.content.substring(0, 140) + '...'
    : post.content || 'No content provided.';

  return (
    <article
      onClick={() => onReadPost(post)}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = 'var(--ink-primary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-hairline)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      className="animate-fade-in"
    >
      <div>
        {/* Card Header Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span className="badge badge-neutral font-mono" style={{ fontSize: '10.5px' }}>
            #{String(post.id || index + 1).padStart(2, '0')}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11.5px',
              color: 'var(--ink-tertiary)'
            }}
            className="font-mono"
          >
            <Clock size={12} />
            <span>{minutes} MIN READ</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-serif"
          style={{
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            color: 'var(--ink-primary)',
            marginBottom: '10px'
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p
          style={{
            fontSize: '14px',
            color: 'var(--ink-secondary)',
            lineHeight: 1.6,
            marginBottom: '20px'
          }}
        >
          {excerpt}
        </p>
      </div>

      {/* Card Footer: Author & Read CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-hairline)',
          marginTop: 'auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-hairline)',
              color: 'var(--ink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700
            }}
            className="font-mono"
          >
            {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-primary)' }}>
            {post.author || 'Anonymous'}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            fontSize: '12.5px',
            fontWeight: 600,
            color: 'var(--accent-cobalt)'
          }}
        >
          <span>Read</span>
          <ArrowUpRight size={14} />
        </div>
      </div>
    </article>
  );
}
