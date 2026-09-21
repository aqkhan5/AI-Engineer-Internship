import React from 'react';
import { cn } from '../../lib/utils';

export interface TaxonomyBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'bronze' | 'dark' | 'alert' | 'success';
  size?: 'sm' | 'md';
}

export const TaxonomyBadge: React.FC<TaxonomyBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-[11px]',
  };

  const variantClasses = {
    neutral: 'bg-transparent text-[#54524f] border border-[#d3cfca]',
    bronze: 'bg-[#f7dbbb]/40 text-[#6f5b42] border border-[#9e876b]/40',
    dark: 'bg-[#121314] text-white border border-[#121314]',
    alert: 'bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/30',
    success: 'bg-[#e5ece9] text-[#1e3c31] border border-[#2e5d4b]/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase tracking-[0.2em] sharp rounded-none whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
