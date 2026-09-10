import { ReactNode } from 'react';
import { PortfolioData, SectionKey } from './portfolio';
import { ThemeConfig } from './theme';

export interface TemplateMetadata {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'Developer' | 'Minimalist' | 'Executive' | 'Creative' | 'Designer';
  badge?: string;
  author: string;
  supportedSections: SectionKey[];
  defaultThemeId: string;
  features: string[];
}

export interface TemplateProps {
  data: PortfolioData;
  theme: ThemeConfig;
  previewMode?: boolean;
}

export interface TemplateSectionProps {
  data: PortfolioData;
  theme: ThemeConfig;
}
