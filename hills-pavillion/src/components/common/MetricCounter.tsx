import React from 'react';
import { cn } from '../../lib/utils';

export interface MetricCounterProps {
  value: string | number;
  label: string;
  sublabel?: string;
  theme?: 'light' | 'dark';
  borderRight?: boolean;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  label,
  sublabel,
  theme = 'light',
  borderRight = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-4 space-y-1',
        borderRight && (theme === 'light' ? 'border-r border-[#e5e2dc]' : 'border-r border-white/10'),
        className
      )}
    >
      <div
        className={cn(
          'font-sans text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight',
          theme === 'light' ? 'text-[#121314]' : 'text-white'
        )}
      >
        {value}
      </div>
      <div
        className={cn(
          'text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em]',
          theme === 'light' ? 'text-[#54524f]' : 'text-stone-400'
        )}
      >
        {label}
      </div>
      {sublabel && (
        <div className="text-[10px] text-[#9e876b] tracking-wider">
          {sublabel}
        </div>
      )}
    </div>
  );
};
