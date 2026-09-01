import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';

export default function AuthModal({
  isOpen,
  initialMode = 'login', // 'login' | 'signup'
  onClose,
  onAuthSuccess
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode, isOpen]);

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

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError('Please provide all required fields.');
      return;
    }

    if (mode === 'signup' && !username.trim()) {
      setError('Please choose a username for your author profile.');
      return;
    }

    try {
      setLoading(true);

      if (mode === 'signup') {
        // 1. Sign up on FastAPI
        await api.signup({
          username: username.trim(),
          email: email.trim(),
          password: password.trim()
        });

        // 2. Auto-login right after signup
        const loginRes = await api.login({
          email: email.trim(),
          password: password.trim()
        });

        onAuthSuccess(loginRes.user, 'Account created and signed in successfully!');
      } else {
        // Sign in on FastAPI
        const loginRes = await api.login({
          email: email.trim(),
          password: password.trim()
        });

        onAuthSuccess(loginRes.user, `Welcome back, ${loginRes.user?.username || 'Writer'}!`);
      }

      onClose();
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
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
          maxWidth: '440px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-hairline)',
          boxShadow: 'var(--shadow-float)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Bar */}
        <div
          style={{
            padding: '24px 28px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-cobalt">
              <Sparkles size={12} />
              <span>JOURNAL PASS</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost"
            style={{ padding: '6px', borderRadius: 'var(--radius-full)' }}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ padding: '20px 28px 0' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              backgroundColor: 'var(--bg-subtle)',
              padding: '4px',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              style={{
                border: 'none',
                background: mode === 'login' ? 'var(--bg-surface)' : 'transparent',
                color: mode === 'login' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                fontWeight: mode === 'login' ? 600 : 500,
                fontSize: '13.5px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              Sign In
            </button>

            <button
              onClick={() => {
                setMode('signup');
                setError(null);
              }}
              style={{
                border: 'none',
                background: mode === 'signup' ? 'var(--bg-surface)' : 'transparent',
                color: mode === 'signup' ? 'var(--ink-primary)' : 'var(--ink-secondary)',
                fontWeight: mode === 'signup' ? 600 : 500,
                fontSize: '13.5px',
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                cursor: 'pointer',
                boxShadow: mode === 'signup' ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              Register
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px 32px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h2
              className="font-serif"
              style={{
                fontSize: '28px',
                fontWeight: 500,
                color: 'var(--ink-primary)',
                marginBottom: '6px',
                letterSpacing: '-0.02em'
              }}
            >
              {mode === 'login' ? 'Welcome back to the studio' : 'Join the writers collective'}
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--ink-secondary)' }}>
              {mode === 'login'
                ? 'Enter your credentials to publish and manage your dispatches.'
                : 'Create your account to start writing and sharing ideas.'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                padding: '12px 14px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 'var(--radius-sm)',
                color: '#991B1B',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px'
              }}
            >
              <AlertCircle size={16} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Username field (Signup only) */}
          {mode === 'signup' && (
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--ink-secondary)',
                  marginBottom: '6px'
                }}
                className="font-mono"
              >
                USERNAME
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0 12px'
                }}
              >
                <User size={15} color="var(--ink-tertiary)" style={{ marginRight: '8px' }} />
                <input
                  type="text"
                  placeholder="e.g. emily_dickinson"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    color: 'var(--ink-primary)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div style={{ marginBottom: '16px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink-secondary)',
                marginBottom: '6px'
              }}
              className="font-mono"
            >
              EMAIL ADDRESS
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 12px'
              }}
            >
              <Mail size={15} color="var(--ink-tertiary)" style={{ marginRight: '8px' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 0',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                  color: 'var(--ink-primary)'
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '24px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--ink-secondary)',
                marginBottom: '6px'
              }}
              className="font-mono"
            >
              PASSWORD
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-hairline)',
                borderRadius: 'var(--radius-sm)',
                padding: '0 12px'
              }}
            >
              <Lock size={15} color="var(--ink-tertiary)" style={{ marginRight: '8px' }} />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 0',
                  border: 'none',
                  outline: 'none',
                  background: 'transparent',
                  fontSize: '14px',
                  color: 'var(--ink-primary)'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14.5px',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span>Authenticating with server...</span>
            ) : (
              <>
                <span>{mode === 'login' ? 'Sign In to Studio' : 'Create Account'}</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {/* Mode Switch Footnote */}
          <div style={{ marginTop: '18px', textAlign: 'center', fontSize: '13px', color: 'var(--ink-secondary)' }}>
            {mode === 'login' ? (
              <span>
                New writer?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cobalt)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-cobalt)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign in
                </button>
              </span>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
