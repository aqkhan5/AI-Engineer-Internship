import React from 'react';
import { PenSquare, LogIn, UserPlus, LogOut, User, Activity, BookOpen } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header({
  apiOnline,
  user,
  onOpenAuth,
  onOpenEditor,
  onLogout,
  postCount = 0,
  currentTheme,
  onThemeChange
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'var(--bg-header)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-hairline)',
        height: 'var(--header-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color var(--transition-fast), border-color var(--transition-fast)'
      }}
    >
      <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Brand & Masthead Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a
            href="/"
            style={{
              textDecoration: 'none',
              color: 'var(--ink-primary)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '8px'
            }}
          >
            <span
              className="font-serif"
              style={{
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1
              }}
            >
              INK & SIGNAL
            </span>
            <span
              className="badge badge-neutral"
              style={{ fontSize: '10px', padding: '2px 7px' }}
            >
              JOURNAL
            </span>
          </a>

          {/* Live API Health Badge */}
          <div
            className={`badge ${apiOnline ? 'badge-emerald' : 'badge-neutral'}`}
            title={apiOnline ? "Connected to FastAPI backend on port 8000" : "Cannot reach FastAPI backend (uvicorn)"}
            style={{ cursor: 'default' }}
          >
            <span className={`pulse-dot ${apiOnline ? '' : 'offline'}`} />
            <span>{apiOnline ? 'API 8000' : 'Offline'}</span>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Post count metric */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: 'var(--ink-secondary)',
              marginRight: '4px'
            }}
            className="font-mono"
          >
            <BookOpen size={15} color="var(--ink-tertiary)" />
            <span>{postCount} {postCount === 1 ? 'Dispatch' : 'Dispatches'}</span>
          </div>

          {/* Theme Mode Switcher (Light / Dark / System) */}
          <ThemeToggle
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
          />

          {/* Write / New Post CTA */}
          <button
            onClick={onOpenEditor}
            className="btn btn-primary"
            style={{ padding: '8px 14px', fontSize: '13px' }}
          >
            <PenSquare size={14} />
            <span>Write Story</span>
          </button>

          {/* Auth State Management */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 12px',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink-primary)'
                }}
              >
                <div className="author-avatar avatar-xs">
                  {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>{user.username}</span>
              </div>

              <button
                onClick={onLogout}
                className="btn btn-ghost"
                style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onOpenAuth('login')}
                className="btn btn-secondary"
                style={{ padding: '8px 12px', fontSize: '13px' }}
              >
                <LogIn size={14} />
                <span>Sign in</span>
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="btn btn-accent"
                style={{ padding: '8px 12px', fontSize: '13px' }}
              >
                <UserPlus size={14} />
                <span>Register</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
