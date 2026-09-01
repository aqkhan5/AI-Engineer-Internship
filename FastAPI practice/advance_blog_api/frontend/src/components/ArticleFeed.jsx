import React, { useState, useMemo } from 'react';
import ArticleCard from './ArticleCard';
import { Search, X, SlidersHorizontal, Layers, Sparkles } from 'lucide-react';

export default function ArticleFeed({ posts = [], loading = false, onReadPost, onOpenEditor }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('ALL');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'alphabetical'

  // Extract unique authors
  const authors = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.author) set.add(p.author);
    });
    return Array.from(set);
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        // Author filter
        if (selectedAuthor !== 'ALL' && post.author !== selectedAuthor) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const titleMatch = post.title?.toLowerCase().includes(q);
          const contentMatch = post.content?.toLowerCase().includes(q);
          const authorMatch = post.author?.toLowerCase().includes(q);
          return titleMatch || contentMatch || authorMatch;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
        if (sortBy === 'oldest') return (a.id || 0) - (b.id || 0);
        if (sortBy === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
        return 0;
      });
  }, [posts, searchQuery, selectedAuthor, sortBy]);

  return (
    <section style={{ marginBottom: '64px' }}>
      
      {/* Feed Masthead & Control Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--border-hairline)',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-neutral font-mono">ARCHIVE</span>
              <h2
                className="font-serif"
                style={{
                  fontSize: '32px',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink-primary)'
                }}
              >
                All Dispatches
              </h2>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--ink-secondary)' }}>
              Showing {filteredPosts.length} of {posts.length} published stories
            </p>
          </div>

          {/* Search Input & Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 12px',
                width: '260px'
              }}
            >
              <Search size={15} color="var(--ink-tertiary)" style={{ marginRight: '8px' }} />
              <input
                type="text"
                placeholder="Search dispatches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  padding: '10px 0',
                  fontSize: '13px',
                  width: '100%',
                  color: 'var(--ink-primary)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--ink-tertiary)',
                    padding: '2px',
                    display: 'flex'
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 12px'
              }}
            >
              <SlidersHorizontal size={14} color="var(--ink-tertiary)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  padding: '10px 0',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--ink-primary)',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Title (A–Z)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Author Filter Pills */}
        {authors.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', color: 'var(--ink-tertiary)', marginRight: '4px' }} className="font-mono">
              FILTER BY AUTHOR:
            </span>
            <button
              onClick={() => setSelectedAuthor('ALL')}
              className={`badge ${selectedAuthor === 'ALL' ? 'badge-cobalt' : 'badge-neutral'}`}
              style={{ cursor: 'pointer', border: 'none', padding: '6px 12px' }}
            >
              All Authors ({posts.length})
            </button>
            {authors.map((author) => (
              <button
                key={author}
                onClick={() => setSelectedAuthor(author)}
                className={`badge ${selectedAuthor === author ? 'badge-cobalt' : 'badge-neutral'}`}
                style={{ cursor: 'pointer', border: 'none', padding: '6px 12px' }}
              >
                {author}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                height: '240px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: 0.6
              }}
            >
              <div style={{ width: '40px', height: '18px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px' }} />
              <div style={{ width: '80%', height: '24px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', margin: '14px 0' }} />
              <div style={{ width: '100%', height: '40px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px' }} />
              <div style={{ width: '120px', height: '16px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', marginTop: '16px' }} />
            </div>
          ))}
        </div>
      )}

      {/* Empty State / No Search Matches */}
      {!loading && filteredPosts.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '64px 24px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px dashed var(--border-dashed)',
            borderRadius: 'var(--radius-lg)'
          }}
          className="animate-fade-in"
        >
          <Layers size={36} color="var(--ink-tertiary)" style={{ margin: '0 auto 16px' }} />
          <h3 className="font-serif" style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--ink-primary)' }}>
            No dispatches found
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
            {searchQuery || selectedAuthor !== 'ALL'
              ? 'Try adjusting your search terms or filter settings to find what you are looking for.'
              : 'There are no articles in the archive yet. Start by writing and publishing the first story!'}
          </p>
          {(searchQuery || selectedAuthor !== 'ALL') ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedAuthor('ALL');
              }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          ) : (
            <button onClick={onOpenEditor} className="btn btn-accent">
              <Sparkles size={15} />
              <span>Write First Story</span>
            </button>
          )}
        </div>
      )}

      {/* Article Grid */}
      {!loading && filteredPosts.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredPosts.map((post, idx) => (
            <ArticleCard
              key={post.id || idx}
              post={post}
              index={idx}
              onReadPost={onReadPost}
            />
          ))}
        </div>
      )}

    </section>
  );
}
