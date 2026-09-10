export type ThemeMode = 'dark' | 'light';

export type BorderRadiusOption = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type SpacingDensity = 'compact' | 'comfortable' | 'spacious';
export type ButtonStyle = 'solid' | 'gradient' | 'outline' | 'glow';
export type BackgroundPattern = 'none' | 'grid' | 'dots' | 'radial-glow' | 'mesh';

export interface ColorScheme {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textMuted: string;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  monoFont: string;
  fontSizeScale: 'sm' | 'md' | 'lg';
}

export interface GlassmorphismConfig {
  enabled: boolean;
  blur: 'none' | 'sm' | 'md' | 'lg';
  opacity: number; // 0.1 to 1.0
}

export interface ThemeConfig {
  id: string;
  name: string;
  mode: ThemeMode;
  colors: ColorScheme;
  typography: TypographyConfig;
  borderRadius: BorderRadiusOption;
  spacing: SpacingDensity;
  glassmorphism: GlassmorphismConfig;
  buttonStyle: ButtonStyle;
  backgroundPattern: BackgroundPattern;
}
