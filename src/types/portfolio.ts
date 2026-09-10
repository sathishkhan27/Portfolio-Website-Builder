export interface PersonalInfo {
  fullName: string;
  headline: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  avatarUrl?: string;
  avatarFallback?: string;
  availabilityStatus: 'available' | 'open_to_offers' | 'not_available';
  availabilityText?: string;
  yearsOfExperience: number;
}

export interface AboutMetric {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface AboutSectionData {
  summary: string;
  storyParagraphs: string[];
  highlights: string[];
  metrics: AboutMetric[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1 to 100
  category: string;
  icon?: string;
  years?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  type?: 'Full-time' | 'Contract' | 'Part-time' | 'Freelance' | 'Remote';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade?: string;
  activities?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  imageUrl?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  role?: string;
  impact?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  badgeUrl?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  tags: string[];
}

export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'youtube' | 'medium' | 'website' | 'email' | 'discord' | 'other';
  url: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  officeHours?: string;
  calendarUrl?: string;
  socialMessage?: string;
}

export interface ResumeInfo {
  fileName: string;
  downloadUrl?: string;
  viewUrl?: string;
  lastUpdated?: string;
}

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  author: string;
}

export type SectionKey =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'services'
  | 'contact';

export interface SectionConfig {
  key: SectionKey;
  label: string;
  enabled: boolean;
  order: number;
}

export interface PortfolioData {
  id: string;
  version: string;
  lastModified: string;
  personal: PersonalInfo;
  about: AboutSectionData;
  skills: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  services: ServiceItem[];
  socials: SocialLink[];
  contact: ContactInfo;
  resume: ResumeInfo;
  seo: SeoMetadata;
  sections: SectionConfig[];
}
