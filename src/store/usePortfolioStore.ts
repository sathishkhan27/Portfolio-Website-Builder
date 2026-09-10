import { create } from 'zustand';
import {
  PortfolioData,
  PersonalInfo,
  AboutSectionData,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  AchievementItem,
  ServiceItem,
  SocialLink,
  ContactInfo,
  ResumeInfo,
  SeoMetadata,
  SectionKey,
  SectionConfig
} from '../types/portfolio';
import { ThemeConfig, ColorScheme } from '../types/theme';
import { defaultPortfolio } from '../schema/defaultPortfolio';
import { themePresets } from '../theme-engine/themePresets';

const STORAGE_KEY_DATA = 'portfolioforge_data_v1';
const STORAGE_KEY_TEMPLATE = 'portfolioforge_template_v1';
const STORAGE_KEY_THEME = 'portfolioforge_theme_v1';

function getInitialPortfolio(): PortfolioData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_DATA);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.personal && parsed.sections) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to load portfolio from localStorage', e);
  }
  return defaultPortfolio;
}

function getInitialTemplate(): string {
  try {
    return localStorage.getItem(STORAGE_KEY_TEMPLATE) || 'modern-developer';
  } catch {
    return 'modern-developer';
  }
}

function getInitialTheme(): ThemeConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // fallback
  }
  return themePresets['cyberpunk'];
}

interface PortfolioState {
  portfolio: PortfolioData;
  selectedTemplateId: string;
  theme: ThemeConfig;
  activeTab: string;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  previewScale: number;

  // Actions
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  updateAbout: (data: Partial<AboutSectionData>) => void;
  updateSkills: (skills: SkillCategory[]) => void;
  updateExperience: (experience: ExperienceItem[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateProjects: (projects: ProjectItem[]) => void;
  updateCertifications: (certs: CertificationItem[]) => void;
  updateAchievements: (achievements: AchievementItem[]) => void;
  updateServices: (services: ServiceItem[]) => void;
  updateSocials: (socials: SocialLink[]) => void;
  updateContact: (contact: Partial<ContactInfo>) => void;
  updateResume: (resume: Partial<ResumeInfo>) => void;
  updateSeo: (seo: Partial<SeoMetadata>) => void;
  toggleSectionVisibility: (key: SectionKey) => void;
  reorderSections: (sections: SectionConfig[]) => void;
  setTemplate: (templateId: string) => void;
  setTheme: (theme: ThemeConfig) => void;
  updateThemeColor: (key: keyof ColorScheme, value: string) => void;
  updateThemeProperty: <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) => void;
  setActiveTab: (tab: string) => void;
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setPreviewScale: (scale: number) => void;
  resetToDefault: () => void;
  loadPortfolio: (data: PortfolioData) => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolio: getInitialPortfolio(),
  selectedTemplateId: getInitialTemplate(),
  theme: getInitialTheme(),
  activeTab: 'personal',
  previewDevice: 'desktop',
  previewScale: 1,

  updatePersonal: (data) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        personal: { ...state.portfolio.personal, ...data }
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateAbout: (data) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        about: { ...state.portfolio.about, ...data }
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateSkills: (skills) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        skills
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateExperience: (experience) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        experience
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateEducation: (education) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        education
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateProjects: (projects) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        projects
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateCertifications: (certifications) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        certifications
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateAchievements: (achievements) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        achievements
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateServices: (services) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        services
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateSocials: (socials) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        socials
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateContact: (contact) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        contact: { ...state.portfolio.contact, ...contact }
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateResume: (resume) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        resume: { ...state.portfolio.resume, ...resume }
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  updateSeo: (seo) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        seo: { ...state.portfolio.seo, ...seo }
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  toggleSectionVisibility: (key) => {
    set((state) => {
      const updatedSections = state.portfolio.sections.map((s) =>
        s.key === key ? { ...s, enabled: !s.enabled } : s
      );
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        sections: updatedSections
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  reorderSections: (sections) => {
    set((state) => {
      const updated = {
        ...state.portfolio,
        lastModified: new Date().toISOString(),
        sections
      };
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(updated));
      return { portfolio: updated };
    });
  },

  setTemplate: (templateId) => {
    localStorage.setItem(STORAGE_KEY_TEMPLATE, templateId);
    set({ selectedTemplateId: templateId });
  },

  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(theme));
    set({ theme });
  },

  updateThemeColor: (key, value) => {
    set((state) => {
      const updatedTheme = {
        ...state.theme,
        colors: {
          ...state.theme.colors,
          [key]: value
        }
      };
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(updatedTheme));
      return { theme: updatedTheme };
    });
  },

  updateThemeProperty: (key, value) => {
    set((state) => {
      const updatedTheme = {
        ...state.theme,
        [key]: value
      };
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(updatedTheme));
      return { theme: updatedTheme };
    });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviewDevice: (previewDevice) => set({ previewDevice }),
  setPreviewScale: (previewScale) => set({ previewScale }),

  resetToDefault: () => {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(defaultPortfolio));
    localStorage.setItem(STORAGE_KEY_TEMPLATE, 'modern-developer');
    localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(themePresets['cyberpunk']));
    set({
      portfolio: defaultPortfolio,
      selectedTemplateId: 'modern-developer',
      theme: themePresets['cyberpunk']
    });
  },

  loadPortfolio: (data) => {
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
    set({ portfolio: data });
  }
}));
