import React from 'react';
import { cn } from '../../lib/utils';

export interface ArchitecturalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark-outline' | 'minimal-arrow' | 'bronze';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  arrow?: boolean;
}

export const ArchitecturalButton: React.FC<ArchitecturalButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  arrow = false,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4 text-xs tracking-[0.2em]',
  };

  const baseClasses = 'inline-flex items-center justify-center font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer sharp rounded-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantClasses = {
    primary: 'bg-[#121314] text-white hover:bg-[#2c2d30] border border-[#121314]',
    secondary: 'bg-transparent text-[#121314] border border-[#121314] hover:border-[#9e876b] hover:text-[#9e876b]',
    'dark-outline': 'bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/5',
    'minimal-arrow': 'bg-transparent text-[#121314] hover:text-[#9e876b] p-0 tracking-[0.18em] border-none group',
    bronze: 'bg-[#9e876b] text-white hover:bg-[#8c775d] border border-[#9e876b]',
  };

  return (
    <button
      className={cn(baseClasses, variant !== 'minimal-arrow' && sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      {arrow && (
        <span className="ml-2 transform group-hover:translate-x-1 transition-transform inline-block">
          &rarr;
        </span>
      )}
    </button>
  );
};
