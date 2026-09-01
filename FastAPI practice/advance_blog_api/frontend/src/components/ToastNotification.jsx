import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  if (!toast) return null;

  const isError = toast.type === 'error';
  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 18px',
        backgroundColor: isError ? '#FEF2F2' : isSuccess ? '#F0FDF4' : '#FFFFFF',
        color: isError ? '#991B1B' : isSuccess ? '#166534' : 'var(--ink-primary)',
        border: `1px solid ${isError ? '#FCA5A5' : isSuccess ? '#86EFAC' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '420px',
        animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {isSuccess && <CheckCircle2 size={18} color="#16A34A" style={{ flexShrink: 0 }} />}
      {isError && <AlertCircle size={18} color="#DC2626" style={{ flexShrink: 0 }} />}
      {!isSuccess && !isError && <Info size={18} color="var(--accent-cobalt)" style={{ flexShrink: 0 }} />}

      <div style={{ flex: 1, fontSize: '13.5px', fontWeight: 500, lineHeight: 1.4 }}>
        {toast.message}
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          color: 'inherit',
          opacity: 0.6,
        }}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}
