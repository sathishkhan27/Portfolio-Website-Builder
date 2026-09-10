import React, { createContext, useContext, useMemo } from 'react';
import { ThemeConfig, BorderRadiusOption } from '../types/theme';

interface ThemeContextType {
  theme: ThemeConfig;
  cssVariables: React.CSSProperties;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const radiusMap: Record<BorderRadiusOption, string> = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  full: '9999px'
};

export function getThemeVariables(theme: ThemeConfig): React.CSSProperties {
  const { colors, typography, borderRadius } = theme;
  
  return {
    '--theme-primary': colors.primary,
    '--theme-primary-hover': colors.primaryHover,
    '--theme-secondary': colors.secondary,
    '--theme-accent': colors.accent,
    '--theme-bg': colors.background,
    '--theme-surface': colors.surface,
    '--theme-card': colors.card,
    '--theme-border': colors.border,
    '--theme-text': colors.text,
    '--theme-text-muted': colors.textMuted,
    '--theme-radius': radiusMap[borderRadius] || '12px',
    '--theme-font-heading': typography.headingFont,
    '--theme-font-body': typography.bodyFont,
    '--theme-font-mono': typography.monoFont,
  } as React.CSSProperties;
}

export const ThemeProvider: React.FC<{
  theme: ThemeConfig;
  children: React.ReactNode;
  className?: string;
}> = ({ theme, children, className = '' }) => {
  const cssVariables = useMemo(() => getThemeVariables(theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, cssVariables }}>
      <div
        className={`portfolio-theme-root ${theme.mode === 'dark' ? 'dark' : ''} ${className}`}
        style={cssVariables}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const usePortfolioTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePortfolioTheme must be used within a ThemeProvider');
  }
  return context;
};
