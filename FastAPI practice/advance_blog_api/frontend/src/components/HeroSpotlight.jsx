import React from 'react';
import { ArrowRight, Clock, User, Feather, Bookmark, Sparkles, FileText } from 'lucide-react';

export default function HeroSpotlight({ featuredPost, onReadPost, onOpenEditor }) {
  // Reading time calculator: ~200 words per minute
  const calculateReadingTime = (text = '') => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, minutes };
  };

  if (!featuredPost) {
    // Empty state editorial hero
    return (
      <section
        style={{
          marginBottom: '48px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-hairline)',
          borderRadius: 'var(--radius-lg)',
          padding: '48px 40px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="animate-fade-in"
      >
        {/* Subtle architectural background line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '15%',
            width: '1px',
            height: '100%',
            backgroundColor: 'var(--border-hairline)',
            opacity: 0.5
          }}
        />

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span className="badge badge-cobalt">
              <Sparkles size={12} />
              <span>Editorial Journal</span>
            </span>
            <span className="badge badge-neutral">
              <span>Volume I</span>
            </span>
          </div>

          <h1
            className="font-serif"
            style={{
              fontSize: '48px',
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: '-0.025em',
              color: 'var(--ink-primary)',
              marginBottom: '20px'
            }}
          >
            Where ideas find their sharpest expression.
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.65,
              marginBottom: '32px',
              maxWidth: '600px'
            }}
          >
            A distraction-free publishing space for essays, engineering deep-dives, and independent thought. No clutter, no algorithms—just craftsmanship and typography.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenEditor}
              className="btn btn-accent"
              style={{ padding: '12px 22px', fontSize: '14.5px' }}
            >
              <Feather size={16} />
              <span>Publish First Dispatch</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    );
  }

  const { words, minutes } = calculateReadingTime(featuredPost.content);
  const excerpt = featuredPost.content && featuredPost.content.length > 220
    ? featuredPost.content.substring(0, 220) + '...'
    : featuredPost.content || 'No content provided.';

  return (
    <section
      style={{
        marginBottom: '48px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        boxShadow: 'var(--shadow-md)',
        transition: 'all var(--transition-smooth)'
      }}
      className="animate-fade-in"
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}
      >
        {/* Left: Lead Content */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span className="badge badge-cobalt">
              <span>FEATURED DISPATCH</span>
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
              <Clock size={13} />
              <span>{minutes} MIN READ</span>
            </span>
          </div>

          <h2
            className="font-serif"
            style={{
              fontSize: '40px',
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--ink-primary)',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
            onClick={() => onReadPost(featuredPost)}
          >
            {featuredPost.title}
          </h2>

          <p
            style={{
              fontSize: '15.5px',
              color: 'var(--ink-secondary)',
              lineHeight: 1.65,
              marginBottom: '28px'
            }}
          >
            {excerpt}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {/* Author Attribution */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
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
                {featuredPost.author ? featuredPost.author.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--ink-primary)' }}>
                  {featuredPost.author || 'Anonymous'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--ink-tertiary)' }} className="font-mono">
                  STAFF WRITER
                </div>
              </div>
            </div>

            {/* Read CTA */}
            <button
              onClick={() => onReadPost(featuredPost)}
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontSize: '13.5px' }}
            >
              <span>Read Full Story</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Right: Architectural Manuscript Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-md)',
            padding: '28px',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} color="var(--accent-cobalt)" />
              <span className="font-mono" style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--ink-secondary)' }}>
                DISPATCH #{featuredPost.id}
              </span>
            </div>
            <Bookmark size={15} color="var(--ink-tertiary)" />
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-hairline)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
              fontStyle: 'italic',
              color: 'var(--ink-secondary)',
              fontSize: '14px',
              lineHeight: 1.6,
              marginBottom: '20px'
            }}
            className="font-serif"
          >
            "{excerpt.substring(0, 120)}..."
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              paddingTop: '14px',
              borderTop: '1px dashed var(--border-dashed)',
              fontSize: '12px'
            }}
            className="font-mono"
          >
            <div>
              <span style={{ color: 'var(--ink-tertiary)', display: 'block', fontSize: '10px' }}>WORD COUNT</span>
              <span style={{ fontWeight: 600, color: 'var(--ink-primary)' }}>{words} words</span>
            </div>
            <div>
              <span style={{ color: 'var(--ink-tertiary)', display: 'block', fontSize: '10px' }}>STATUS</span>
              <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>PUBLISHED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
