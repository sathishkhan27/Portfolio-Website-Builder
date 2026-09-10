import React from 'react';
import { TemplateMetadata, TemplateProps } from '../types/template';
import { ModernDeveloperTemplate } from '../templates/modern-developer';
import { MinimalCleanTemplate } from '../templates/minimal-clean';
import { CleanCreatorTemplate } from '../templates/clean-creator';
import { StygarStudioTemplate } from '../templates/stygar-studio';
import { SleekNoirTemplate } from '../templates/sleek-noir';
import { CyberMatrixTemplate } from '../templates/cyber-matrix';
import { CobaltCreativeTemplate } from '../templates/cobalt-creative';
import { TerracottaAvatarTemplate } from '../templates/terracotta-avatar';
import { NeonPurpleCreatorTemplate } from '../templates/neon-purple-creator';

export const templateRegistry: Record<string, {
  metadata: TemplateMetadata;
  component: React.FC<TemplateProps>;
}> = {
  'clean-creator': {
    metadata: {
      id: 'clean-creator',
      name: 'Clean Designer & Creator',
      tagline: 'Light aesthetic, floating tool badges & narrative journey timeline',
      description: 'Inspired by modern product designer & creator portfolios. Features floating interactive badges, a 2-column narrative timeline, and a Design & Dev Toolbox grid.',
      category: 'Designer',
      badge: 'Popular',
      author: 'Solo Portfolio Design',
      supportedSections: ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'contact'],
      defaultThemeId: 'nordic-frost',
      features: [
        'Floating interactive tool badges on hero',
        'Asymmetric 2-column narrative timeline',
        'Design & Development Toolbox showcase',
        'Clean device mockup portfolio cards',
        'Let\'s Stay Connected footer card'
      ]
    },
    component: CleanCreatorTemplate
  },
  'cobalt-creative': {
    metadata: {
      id: 'cobalt-creative',
      name: 'Cobalt Creative World',
      tagline: 'Massive typography, floating Pantone swatches & stacked case study deck',
      description: 'High-fashion creative director portfolio featuring stark monochrome with electric cobalt Klein blue, Pantone swatches, organic pill cloud, and layered project cards.',
      category: 'Creative',
      badge: 'Editorial',
      author: 'Solo Portfolio Avant',
      supportedSections: ['hero', 'skills', 'projects', 'about', 'contact'],
      defaultThemeId: 'cyberpunk',
      features: [
        'Massive "CREATIVE WORLD" headline typography',
        'Floating physical Pantone color swatch cards',
        'Organic pill badge cloud in cobalt blue',
        'Stacked overlapping case study deck',
        'Visual symphony creative mosaic'
      ]
    },
    component: CobaltCreativeTemplate
  },
  'neon-purple-creator': {
    metadata: {
      id: 'neon-purple-creator',
      name: 'Neon Purple Creator',
      tagline: 'Glowing neon ring portrait, gold stat counters & dark glassmorphism',
      description: 'Electric dark theme featuring a vibrant purple/magenta neon halo portrait, gold metrics ribbon (325+ Clients, 25M+ Revenue), and stacked horizontal case study cards.',
      category: 'Designer',
      badge: 'Neon Glow',
      author: 'Solo Portfolio Neon',
      supportedSections: ['hero', 'services', 'projects', 'about', 'contact'],
      defaultThemeId: 'cyberpunk',
      features: [
        'Vibrant glowing purple/magenta neon ring portrait',
        'Gold stat ribbon (Clients, Experience, Revenue)',
        'Dark glassmorphic service cards with corner arrows',
        'Horizontal stacked project showcases',
        'Neon gradient call-to-action banner'
      ]
    },
    component: NeonPurpleCreatorTemplate
  },
  'terracotta-avatar': {
    metadata: {
      id: 'terracotta-avatar',
      name: 'Terracotta 3D Avatar',
      tagline: 'Warm terracotta clay, stylized 3D character & numbered service badges',
      description: 'Distinctive warm clay aesthetic featuring stylized 3D avatars with speech bubbles ("Want to know about me?"), numbered service cards (01 UX Strategy...), and a 6-step process flow.',
      category: 'Creative',
      badge: 'Character',
      author: 'Solo Portfolio Clay',
      supportedSections: ['hero', 'about', 'services', 'projects', 'contact'],
      defaultThemeId: 'obsidian-gold',
      features: [
        'Warm terracotta clay header banner (#8e3838)',
        'Stylized 3D character avatars with speech bubbles',
        'Numbered service badges (01 UX Strategy, 02 Wireframing)',
        '6-step horizontal work process flow pills',
        'Terracotta 4-grid project showcase'
      ]
    },
    component: TerracottaAvatarTemplate
  },
  'stygar-studio': {
    metadata: {
      id: 'stygar-studio',
      name: 'Stygar 3D Creative Studio',
      tagline: 'Deep dark wine aesthetic, crimson highlights & high-impact stats',
      description: 'Bold agency & studio template featuring fiery crimson accents, giant typography with highlighted keywords, 4-stat metrics counter with dot matrices, and glassmorphic showcases.',
      category: 'Creative',
      badge: 'High Impact',
      author: 'Solo Portfolio Creative',
      supportedSections: ['hero', 'services', 'projects', 'about', 'experience', 'contact'],
      defaultThemeId: 'cyberpunk',
      features: [
        'Crimson dark wine aesthetic (#0c0306)',
        'Accented boxed typography in hero headline',
        '4-metric high-impact stats counter with dot matrix',
        'Dark glassmorphic project cards with hover glows',
        'End-to-End Execution services bento'
      ]
    },
    component: StygarStudioTemplate
  },
  'sleek-noir': {
    metadata: {
      id: 'sleek-noir',
      name: 'Sleek Noir Developer',
      tagline: 'Pitch black monolith, glowing monochrome portrait & framed skill badges',
      description: 'High-contrast pitch black (#000000) developer portfolio. Highlights a floating pill navbar, monochrome circular portrait, framed technology brand badges, and categorized project tabs.',
      category: 'Developer',
      badge: 'Minimal Noir',
      author: 'Solo Portfolio Dark',
      supportedSections: ['hero', 'about', 'education', 'certifications', 'skills', 'projects', 'contact'],
      defaultThemeId: 'obsidian-gold',
      features: [
        'Floating pill navigation bar with direct resume download',
        'Circular glowing monochrome portrait hero',
        'Framed brand badges for skills & technologies',
        'Side-by-side Education & Certifications cards',
        'One-click copyable email contact card'
      ]
    },
    component: SleekNoirTemplate
  },
  'cyber-matrix': {
    metadata: {
      id: 'cyber-matrix',
      name: 'Cyber Matrix & Journal',
      tagline: 'Dark tech grid, neon cyan/teal accents & bento developer journal',
      description: 'Futuristic technical portfolio featuring subtle matrix grid lines, live "available for work" status pill, bento project showcase, milestone achievements, and technical reflections.',
      category: 'Developer',
      badge: 'Futuristic',
      author: 'Solo Portfolio Cyber',
      supportedSections: ['hero', 'projects', 'achievements', 'about', 'skills', 'contact'],
      defaultThemeId: 'cyberpunk',
      features: [
        'Subtle cyan matrix background grid',
        'Live "Available for Work" status indicator',
        'Bento device showcase cards with external links',
        'Accolades & Milestones awards section',
        'From Code to Clarity developer journal cards'
      ]
    },
    component: CyberMatrixTemplate
  },
  'modern-developer': {
    metadata: {
      id: 'modern-developer',
      name: 'Modern Lead Developer',
      tagline: 'Dark glassmorphism, glowing accents & interactive engineering terminal',
      description: 'Engineered specifically for Senior Developers, Staff Engineers, Tech Leads, and AI Architects. Includes code snippets, system metric badges, and interactive project previews.',
      category: 'Developer',
      badge: 'Flagship',
      author: 'Solo Portfolio Core',
      supportedSections: ['hero', 'about', 'skills', 'experience', 'projects', 'services', 'education', 'certifications', 'achievements', 'contact'],
      defaultThemeId: 'cyberpunk',
      features: [
        'Interactive Developer Terminal Teaser',
        'System Metrics & RPS Counters',
        'Vertical Experience Timeline',
        'Categorized Skill Progress Bars',
        'Featured Project Gallery with Badges',
        'Direct Messaging & Calendly Booking'
      ]
    },
    component: ModernDeveloperTemplate
  },
  'minimal-clean': {
    metadata: {
      id: 'minimal-clean',
      name: 'Minimalist Editorial',
      tagline: 'High-contrast monochrome, elegant typography & concise reading flow',
      description: 'A focused, distraction-free typographic template inspired by modern engineering publications and clean portfolios.',
      category: 'Minimalist',
      author: 'Solo Portfolio Core',
      supportedSections: ['hero', 'about', 'skills', 'experience', 'projects', 'contact'],
      defaultThemeId: 'obsidian-gold',
      features: [
        'Clean Typographic Hierarchy',
        'Fast Lightweight Layout',
        'Direct Monospace Accents',
        'High-Contrast Accessibility'
      ]
    },
    component: MinimalCleanTemplate
  }
};

export function getTemplateMetadataList(): TemplateMetadata[] {
  return Object.values(templateRegistry).map((entry) => entry.metadata);
}

export function getTemplateComponent(templateId: string): React.FC<TemplateProps> {
  return templateRegistry[templateId]?.component || templateRegistry['modern-developer'].component;
}
