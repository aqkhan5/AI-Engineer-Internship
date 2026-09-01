import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

export default function ThemeToggle({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { id: 'light', label: 'Light', icon: Sun, desc: 'Archival clean paper' },
    { id: 'dark', label: 'Dark', icon: Moon, desc: 'Midnight obsidian slate' },
    { id: 'system', label: 'System', icon: Monitor, desc: 'Match device setting' },
  ];

  const activeThemeObj = themes.find((t) => t.id === currentTheme) || themes[2];
  const ActiveIcon = activeThemeObj.icon;

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary"
        style={{
          padding: '7px 11px',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          borderRadius: 'var(--radius-sm)',
        }}
        title={`Current Theme: ${activeThemeObj.label}`}
        aria-label="Toggle visual theme"
      >
        <ActiveIcon size={15} color="var(--ink-secondary)" />
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink-primary)' }} className="font-mono">
          {activeThemeObj.label}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '210px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '6px',
            zIndex: 1100,
          }}
          className="animate-slide-down"
        >
          <div
            style={{
              padding: '6px 10px 8px',
              fontSize: '10.5px',
              fontWeight: 700,
              color: 'var(--ink-tertiary)',
              borderBottom: '1px solid var(--border-hairline)',
              marginBottom: '4px',
            }}
            className="font-mono"
          >
            APPEARANCE THEME
          </div>

          {themes.map((t) => {
            const Icon = t.icon;
            const isSelected = currentTheme === t.id;

            return (
              <button
                key={t.id}
                onClick={() => {
                  onThemeChange(t.id);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-xs)',
                  border: 'none',
                  background: isSelected ? 'var(--accent-cobalt-light)' : 'transparent',
                  color: isSelected ? 'var(--accent-cobalt)' : 'var(--ink-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--bg-subtle)';
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color={isSelected ? 'var(--accent-cobalt)' : 'var(--ink-secondary)'} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: isSelected ? 600 : 500 }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--ink-tertiary)' }}>
                      {t.desc}
                    </div>
                  </div>
                </div>

                {isSelected && <Check size={14} color="var(--accent-cobalt)" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
