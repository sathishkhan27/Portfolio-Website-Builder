import { ThemeConfig } from '../types/theme';

export const themePresets: Record<string, ThemeConfig> = {
  'cyberpunk': {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    mode: 'dark',
    colors: {
      primary: '#6366f1', // Indigo
      primaryHover: '#4f46e5',
      secondary: '#06b6d4', // Cyan
      accent: '#ec4899', // Pink
      background: '#070a13',
      surface: '#0d1322',
      card: 'rgba(15, 23, 42, 0.75)',
      border: 'rgba(99, 102, 241, 0.2)',
      text: '#f8fafc',
      textMuted: '#94a3b8'
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'lg',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: true,
      blur: 'md',
      opacity: 0.8
    },
    buttonStyle: 'glow',
    backgroundPattern: 'radial-glow'
  },
  'emerald-matrix': {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    mode: 'dark',
    colors: {
      primary: '#10b981', // Emerald
      primaryHover: '#059669',
      secondary: '#14b8a6', // Teal
      accent: '#84cc16', // Lime
      background: '#04100c',
      surface: '#081f18',
      card: 'rgba(6, 31, 24, 0.8)',
      border: 'rgba(16, 185, 129, 0.25)',
      text: '#f0fdf4',
      textMuted: '#86efac'
    },
    typography: {
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'md',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: true,
      blur: 'md',
      opacity: 0.85
    },
    buttonStyle: 'glow',
    backgroundPattern: 'grid'
  },
  'obsidian-gold': {
    id: 'obsidian-gold',
    name: 'Obsidian & Gold',
    mode: 'dark',
    colors: {
      primary: '#f59e0b', // Amber Gold
      primaryHover: '#d97706',
      secondary: '#fbbf24',
      accent: '#e11d48', // Rose
      background: '#0c0a09',
      surface: '#1c1917',
      card: 'rgba(28, 25, 23, 0.85)',
      border: 'rgba(245, 158, 11, 0.2)',
      text: '#fafaf9',
      textMuted: '#a8a29e'
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'md',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: true,
      blur: 'lg',
      opacity: 0.75
    },
    buttonStyle: 'solid',
    backgroundPattern: 'mesh'
  },
  'oceanic-azure': {
    id: 'oceanic-azure',
    name: 'Oceanic Azure',
    mode: 'dark',
    colors: {
      primary: '#0ea5e9', // Sky
      primaryHover: '#0284c7',
      secondary: '#38bdf8',
      accent: '#818cf8',
      background: '#070e1b',
      surface: '#0d1d36',
      card: 'rgba(13, 29, 54, 0.8)',
      border: 'rgba(14, 165, 233, 0.25)',
      text: '#f0f9ff',
      textMuted: '#7dd3fc'
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'lg',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: true,
      blur: 'md',
      opacity: 0.8
    },
    buttonStyle: 'gradient',
    backgroundPattern: 'radial-glow'
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Violet',
    mode: 'dark',
    colors: {
      primary: '#a855f7', // Purple
      primaryHover: '#9333ea',
      secondary: '#f43f5e', // Rose
      accent: '#38bdf8',
      background: '#0a0614',
      surface: '#150c29',
      card: 'rgba(21, 12, 41, 0.8)',
      border: 'rgba(168, 85, 247, 0.25)',
      text: '#faf5ff',
      textMuted: '#c084fc'
    },
    typography: {
      headingFont: "'Space Grotesk', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'lg',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: true,
      blur: 'md',
      opacity: 0.8
    },
    buttonStyle: 'glow',
    backgroundPattern: 'radial-glow'
  },
  'clean-daylight': {
    id: 'clean-daylight',
    name: 'Daylight Minimal (Light)',
    mode: 'light',
    colors: {
      primary: '#4f46e5', // Deep Indigo
      primaryHover: '#4338ca',
      secondary: '#0284c7', // Slate Blue
      accent: '#db2777',
      background: '#f8fafc',
      surface: '#ffffff',
      card: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(226, 232, 240, 0.9)',
      text: '#0f172a',
      textMuted: '#64748b'
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'lg',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: false,
      blur: 'none',
      opacity: 1
    },
    buttonStyle: 'solid',
    backgroundPattern: 'none'
  },
  'nordic-frost': {
    id: 'nordic-frost',
    name: 'Nordic Frost (Light)',
    mode: 'light',
    colors: {
      primary: '#3b82f6', // Clean Blue
      primaryHover: '#2563eb',
      secondary: '#06b6d4', // Cyan
      accent: '#8b5cf6', // Violet
      background: '#f8fafc',
      surface: '#ffffff',
      card: 'rgba(255, 255, 255, 0.95)',
      border: 'rgba(226, 232, 240, 0.9)',
      text: '#0f172a',
      textMuted: '#64748b'
    },
    typography: {
      headingFont: "'Plus Jakarta Sans', sans-serif",
      bodyFont: "'Inter', sans-serif",
      monoFont: "'Fira Code', monospace",
      fontSizeScale: 'md'
    },
    borderRadius: 'lg',
    spacing: 'comfortable',
    glassmorphism: {
      enabled: false,
      blur: 'none',
      opacity: 1
    },
    buttonStyle: 'solid',
    backgroundPattern: 'none'
  }
};
