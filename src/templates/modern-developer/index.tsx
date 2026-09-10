import React from 'react';
import { TemplateProps } from '../../types/template';
import { ModernNavbar } from './ModernNavbar';
import { ModernHero } from './ModernHero';
import { ModernAbout } from './ModernAbout';
import { ModernSkills } from './ModernSkills';
import { ModernExperience } from './ModernExperience';
import { ModernProjects } from './ModernProjects';
import { ModernServices } from './ModernServices';
import { ModernEducation } from './ModernEducation';
import { ModernCertifications } from './ModernCertifications';
import { ModernAchievements } from './ModernAchievements';
import { ModernContact } from './ModernContact';
import { ModernFooter } from './ModernFooter';

export const ModernDeveloperTemplate: React.FC<TemplateProps> = ({ data, theme, previewMode = false }) => {
  const { sections } = data;

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <ModernHero key="hero" data={data} theme={theme} />,
    about: <ModernAbout key="about" data={data} theme={theme} />,
    skills: <ModernSkills key="skills" data={data} theme={theme} />,
    experience: <ModernExperience key="experience" data={data} theme={theme} />,
    projects: <ModernProjects key="projects" data={data} theme={theme} />,
    services: <ModernServices key="services" data={data} theme={theme} />,
    education: <ModernEducation key="education" data={data} theme={theme} />,
    certifications: <ModernCertifications key="certifications" data={data} theme={theme} />,
    achievements: <ModernAchievements key="achievements" data={data} theme={theme} />,
    contact: <ModernContact key="contact" data={data} theme={theme} />,
  };

  const enabledSections = sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme.mode === 'dark' ? 'text-slate-100 bg-[#070a13]' : 'text-slate-900 bg-slate-50'
      }`}
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: 'var(--theme-font-body)'
      }}
    >
      <ModernNavbar data={data} theme={theme} />
      
      <main>
        {enabledSections.map((sec) => sectionMap[sec.key] || null)}
      </main>

      <ModernFooter data={data} theme={theme} />
    </div>
  );
};
