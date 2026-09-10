import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  glass?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  header,
  footer,
  glass = true,
  hoverable = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border ${
        glass
          ? 'bg-slate-900/70 backdrop-blur-md border-slate-800/80 shadow-lg'
          : 'bg-slate-900 border-slate-800 shadow-md'
      } ${
        hoverable
          ? 'hover:border-slate-700 hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer'
          : ''
      } overflow-hidden ${className}`}
    >
      {header && <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/40">{header}</div>}
      <div className="p-5">{children}</div>
      {footer && <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40">{footer}</div>}
    </div>
  );
};
