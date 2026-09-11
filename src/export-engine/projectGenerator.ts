import { PortfolioData } from '../types/portfolio';
import { ThemeConfig } from '../types/theme';
import { getThemeVariables, radiusMap } from '../theme-engine/ThemeProvider';
import { generateStandaloneHtml } from './standaloneHtmlGenerator';

export interface GeneratedProjectFile {
  path: string;
  content: string;
}

export function generateStandaloneProject(
  portfolio: PortfolioData,
  theme: ThemeConfig,
  templateId: string
): Record<string, string> {
  const files: Record<string, string> = {};

  const appTitle = portfolio.seo.metaTitle || `${portfolio.personal.fullName} | Portfolio`;
  const appDesc = portfolio.seo.metaDescription || portfolio.personal.tagline || 'Professional Engineering Portfolio';

  // 1. package.json
  files['package.json'] = JSON.stringify(
    {
      name: portfolio.personal.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-portfolio',
      private: true,
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        start: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview'
      },
      dependencies: {
        'react': '^19.0.0',
        'react-dom': '^19.0.0',
        'lucide-react': '^1.44.0'
      },
      devDependencies: {
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0',
        '@vitejs/plugin-react': '^6.1.1',
        '@tailwindcss/vite': '^4.0.0',
        'tailwindcss': '^4.0.0',
        'typescript': '^5.7.0',
        'vite': '^8.2.2'
      }
    },
    null,
    2
  );

  // vite-env.d.ts
  files['src/vite-env.d.ts'] = `/// <reference types="vite/client" />\n`;

  // 2. vite.config.ts
  files['vite.config.ts'] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
});
`;

  // 3. tsconfig.json
  files['tsconfig.json'] = JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: false,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        noFallthroughCasesInSwitch: true
      },
      include: ['src']
    },
    null,
    2
  );

  // 4. index.html
  files['index.html'] = `<!doctype html>
<html lang="en" class="${theme.mode === 'dark' ? 'dark' : ''}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appTitle}</title>
    <meta name="description" content="${appDesc.replace(/"/g, '&quot;')}" />
    <meta name="author" content="${portfolio.seo.author || portfolio.personal.fullName}" />
    ${portfolio.seo.keywords.length > 0 ? `<meta name="keywords" content="${portfolio.seo.keywords.join(', ')}" />` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  </head>
  <body class="antialiased selection:bg-indigo-500/30 selection:text-indigo-300 bg-slate-950 text-slate-100">
    <!-- Fallback Notice: Shown ONLY if user double-clicks index.html via file:// instead of running a local server -->
    <div id="file-protocol-warning" style="display:none; margin: 40px auto; max-width: 620px; padding: 24px; background: #0f172a; border: 1px solid #4338ca; border-radius: 16px; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 24px;">⚡</span>
        <h2 style="margin: 0; font-size: 18px; color: #818cf8; font-weight: 700;">Direct File (file://) Opening Detected</h2>
      </div>
      <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">
        Modern React + TypeScript projects cannot execute raw <code>.tsx</code> files directly from a <code>file://</code> URL due to browser CORS security restrictions.
      </p>
      <div style="background: #020617; padding: 14px 16px; border-radius: 12px; border: 1px solid #1e293b; margin-bottom: 14px;">
        <div style="font-size: 13px; font-weight: 700; color: #38bdf8; margin-bottom: 4px;">👉 Option 1: Instant Offline View (No Terminal Needed)</div>
        <p style="font-size: 13px; color: #cbd5e1; margin: 0; line-height: 1.5;">
          Double-click the <strong style="color: #a5b4fc;">standalone-preview.html</strong> file in this folder to view your portfolio immediately in any web browser!
        </p>
      </div>
      <div style="background: #020617; padding: 14px 16px; border-radius: 12px; border: 1px solid #1e293b;">
        <div style="font-size: 13px; font-weight: 700; color: #34d399; margin-bottom: 4px;">💻 Option 2: Run Local Development Server</div>
        <div style="font-family: monospace; font-size: 12px; color: #a5f3fc; line-height: 1.6;">
          npm install<br/>
          npm run dev
        </div>
      </div>
    </div>
    <script>
      if (window.location.protocol === 'file:') {
        var warn = document.getElementById('file-protocol-warning');
        if (warn) warn.style.display = 'block';
      }
    </script>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  // 5. src/data/portfolioData.json
  files['src/data/portfolioData.json'] = JSON.stringify(portfolio, null, 2);

  // 6. src/index.css
  files['src/index.css'] = `@import "tailwindcss";

@layer base {
  :root {
    --theme-primary: ${theme.colors.primary};
    --theme-primary-hover: ${theme.colors.primaryHover};
    --theme-secondary: ${theme.colors.secondary};
    --theme-accent: ${theme.colors.accent};
    --theme-bg: ${theme.colors.background};
    --theme-surface: ${theme.colors.surface};
    --theme-card: ${theme.colors.card};
    --theme-border: ${theme.colors.border};
    --theme-text: ${theme.colors.text};
    --theme-text-muted: ${theme.colors.textMuted};
    --theme-radius: ${radiusMap[theme.borderRadius] || '12px'};
    --theme-font-heading: ${theme.typography.headingFont};
    --theme-font-body: ${theme.typography.bodyFont};
    --theme-font-mono: ${theme.typography.monoFont};
  }

  html {
    scroll-behavior: smooth;
    background-color: var(--theme-bg);
    color: var(--theme-text);
    font-family: var(--theme-font-body);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--theme-bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--theme-surface);
    border-radius: 9999px;
  }
}
`;

  // 7. src/main.tsx
  files['src/main.tsx'] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

  // 8. src/App.tsx
  files['src/App.tsx'] = `import React, { useState } from 'react';
import portfolioData from './data/portfolioData.json';
import {
  MapPin, Briefcase, Download, ArrowRight, ArrowUpRight,
  Mail, Terminal, ShieldCheck, CheckCircle2,
  Building2, ExternalLink, Calendar, Star, Award, Trophy, Clock,
  MessageSquare, Send, Menu, X, FileText, ArrowUp
} from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function App() {
  const { personal, about, skills, experience, projects, services, education, certifications, achievements, contact, socials, resume, sections } = portfolioData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState(skills[0]?.id || '');
  const [projectFilter, setProjectFilter] = useState<'all' | 'featured'>('all');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const isEnabled = (key: string) => sections.find((s: any) => s.key === key)?.enabled !== false;

  const currentCategory = skills.find((c: any) => c.id === activeSkillCategory) || skills[0];
  const displayedProjects = projectFilter === 'featured' ? projects.filter((p: any) => p.featured) : projects;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-100 bg-[#070a13]" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)' }}>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors"
        style={{ backgroundColor: 'rgba(7, 10, 19, 0.85)', borderColor: 'var(--theme-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))', color: '#ffffff' }}>
                {personal.avatarFallback || personal.fullName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight text-white">{personal.fullName}</div>
                <div className="text-[11px] text-slate-400 font-mono line-clamp-1">{personal.headline.split('|')[0]}</div>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              {sections.filter((s: any) => s.enabled && s.key !== 'hero').slice(0, 6).map((item: any) => (
                <a key={item.key} href={'#' + item.key} className="hover:text-white transition-colors capitalize hover:underline decoration-2 underline-offset-8"
                  style={{ textDecorationColor: 'var(--theme-primary)' }}>
                  {item.label.split('&')[0].trim()}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {resume.downloadUrl && (
                <a href={resume.downloadUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white shadow-sm hover:scale-105 transition-all"
                  style={{ backgroundColor: 'var(--theme-primary)' }}>
                  <FileText size={13} />
                  <span>Resume</span>
                </a>
              )}
              <a href="#contact" className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-200 hover:text-white transition-colors"
                style={{ borderColor: 'var(--theme-border)' }}>
                <span>Connect</span>
                <ArrowUpRight size={13} />
              </a>
            </div>

            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg text-slate-400 hover:text-white">
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-slate-950/95 border-b border-slate-800">
            {sections.filter((s: any) => s.enabled && s.key !== 'hero').map((item: any) => (
              <a key={item.key} href={'#' + item.key} onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg capitalize">
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {isEnabled('hero') && (
        <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                {personal.availabilityStatus !== 'not_available' && (
                  <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border bg-slate-900/60 backdrop-blur-md text-xs font-medium"
                    style={{ borderColor: 'var(--theme-border)' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--theme-primary)' }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--theme-primary)' }} />
                    </span>
                    <span className="text-slate-300">{personal.availabilityText || 'Available for roles'}</span>
                  </div>
                )}

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Hi, I'm <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)' }}>{personal.fullName}</span>
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-slate-200 tracking-tight">{personal.headline}</p>
                <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">{personal.tagline}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                    <MapPin size={14} className="text-indigo-400" />
                    <span>{personal.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                    <Briefcase size={14} className="text-cyan-400" />
                    <span>{personal.yearsOfExperience}+ Years Experience</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg hover:scale-105 transition-all"
                    style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
                    <span>Explore Projects</span>
                    <ArrowRight size={16} />
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 border border-slate-800 hover:text-white transition-all">
                    <span>Get In Touch</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border p-5 shadow-2xl backdrop-blur-xl" style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs font-mono text-slate-400">portfolio.config.ts</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                      <Terminal size={12} />
                      <span>node</span>
                    </div>
                  </div>
                  <div className="pt-4 space-y-2 font-mono text-xs text-slate-300">
                    <div className="text-slate-500">// System Initialized</div>
                    <div><span className="text-purple-400">export const</span> <span className="text-cyan-300">profile</span> = {'{'}</div>
                    <div className="pl-4">name: <span className="text-emerald-300">'{personal.fullName}'</span>,</div>
                    <div className="pl-4">experienceYears: <span className="text-amber-300">{personal.yearsOfExperience}</span>,</div>
                    <div className="pl-4">openForHire: <span className="text-indigo-400">{personal.availabilityStatus === 'available' ? 'true' : 'false'}</span></div>
                    <div>{'}'};</div>
                    <div className="p-2.5 mt-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px]">
                      ✓ High Scale Architecture · Ready for Production
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {isEnabled('about') && (
        <section id="about" className="py-20 border-t border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">About Me</h2>
              <p className="text-slate-400 text-base">{about.summary}</p>
            </div>

            {about.metrics && about.metrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                {about.metrics.map((metric: any) => (
                  <div key={metric.id} className="p-6 rounded-2xl border backdrop-blur-md"
                    style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                    <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--theme-primary)' }}>
                      {metric.value}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">{metric.label}</div>
                    {metric.description && <div className="text-xs text-slate-400">{metric.description}</div>}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {about.storyParagraphs.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="lg:col-span-5 p-6 rounded-2xl border backdrop-blur-md space-y-3"
                style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                  <ShieldCheck size={18} style={{ color: 'var(--theme-primary)' }} />
                  <span>Key Engineering Highlights</span>
                </div>
                {about.highlights.map((h: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-emerald-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {isEnabled('skills') && skills.length > 0 && (
        <section id="skills" className="py-20 border-t border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Skills & Core Capabilities</h2>
              <p className="text-slate-400 text-base">Battle-tested technologies refined across production environments.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {skills.map((category: any) => (
                <button key={category.id} onClick={() => setActiveSkillCategory(category.id)}
                  className={\`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer \${
                    (activeSkillCategory || skills[0]?.id) === category.id
                      ? 'text-white shadow-lg'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
                  }\`}
                  style={(activeSkillCategory || skills[0]?.id) === category.id ? { backgroundColor: 'var(--theme-primary)' } : {}}>
                  {category.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {currentCategory?.skills.map((skill: any) => (
                <div key={skill.id} className="p-5 rounded-xl border backdrop-blur-md"
                  style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white">{skill.name}</span>
                      {skill.years && <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{skill.years} yrs</span>}
                    </div>
                    <span className="font-mono text-xs font-bold" style={{ color: 'var(--theme-secondary)' }}>{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: \`\${skill.level}%\`, background: 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {isEnabled('experience') && experience.length > 0 && (
        <section id="experience" className="py-20 border-t border-slate-800/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Work Experience</h2>
            </div>

            <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-2 md:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
              {experience.map((item: any) => (
                <div key={item.id} className="relative">
                  <div className="absolute -left-[27px] md:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950"
                    style={{ backgroundColor: item.current ? 'var(--theme-primary)' : 'var(--theme-secondary)' }} />
                  <div className="p-6 md:p-8 rounded-2xl border backdrop-blur-md space-y-4"
                    style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{item.role}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                          <Building2 size={14} style={{ color: 'var(--theme-primary)' }} />
                          <span>{item.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">{item.startDate} — {item.current ? 'Present' : item.endDate}</span>
                        {item.current && <span className="px-2 py-0.5 rounded-full text-white text-[11px] font-bold" style={{ backgroundColor: 'var(--theme-primary)' }}>Current</span>}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
                    {item.achievements?.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {item.achievements.map((ach: string, aIdx: number) => (
                          <div key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                            <ArrowRight size={14} className="shrink-0 mt-0.5" style={{ color: 'var(--theme-primary)' }} />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                        {item.technologies.map((t: string) => (
                          <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {isEnabled('projects') && projects.length > 0 && (
        <section id="projects" className="py-20 border-t border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Featured Projects</h2>
                <p className="text-slate-400 text-base mt-2">Production architectures and open source systems.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                <button onClick={() => setProjectFilter('all')}
                  className={\`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer \${projectFilter === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'}\`}>
                  All ({projects.length})
                </button>
                <button onClick={() => setProjectFilter('featured')}
                  className={\`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer \${projectFilter === 'featured' ? 'bg-slate-800 text-white' : 'text-slate-400'}\`}>
                  Featured ({projects.filter((p: any) => p.featured).length})
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project: any) => (
                <div key={project.id} className="rounded-2xl border backdrop-blur-md overflow-hidden flex flex-col justify-between"
                  style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  <div>
                    {project.imageUrl && (
                      <div className="h-44 w-full overflow-hidden bg-slate-950 relative">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-90" />
                        {project.featured && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-md flex items-center gap-1"
                            style={{ backgroundColor: 'var(--theme-primary)' }}>
                            <Star size={10} fill="currentColor" /> Featured
                          </span>
                        )}
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{project.shortDescription}</p>
                      {project.impact && (
                        <div className="p-2 rounded text-[11px] font-medium border"
                          style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'var(--theme-border)', color: 'var(--theme-secondary)' }}>
                          ⚡ {project.impact}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1">
                        <GithubIcon size={13} /> Source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline flex items-center gap-1"
                        style={{ color: 'var(--theme-primary)' }}>
                        Preview <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {isEnabled('contact') && (
        <section id="contact" className="py-20 border-t border-slate-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Initiate Collaboration</h2>
              <p className="text-slate-400 text-base">{contact.socialMessage || 'Open to technical advisory and high-impact engineering opportunities.'}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl border backdrop-blur-md flex items-start gap-4"
                  style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: 'var(--theme-primary)' }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Direct Email</div>
                    <a href={'mailto:' + (contact.email || personal.email)} className="text-sm font-bold text-white hover:underline break-all"
                      style={{ color: 'var(--theme-secondary)' }}>
                      {contact.email || personal.email}
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-2xl border backdrop-blur-md flex items-start gap-4"
                  style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)', color: 'var(--theme-secondary)' }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase">Base Location</div>
                    <div className="text-sm font-bold text-white">{contact.location || personal.location}</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-8 rounded-2xl border backdrop-blur-md"
                  style={{ backgroundColor: 'var(--theme-card)', borderColor: 'var(--theme-border)' }}>
                  {contactSubmitted ? (
                    <div className="py-8 text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-white">Message Transmitted</h3>
                      <p className="text-xs text-slate-300">Thank you for reaching out!</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setContactSubmitted(true); setTimeout(() => setContactSubmitted(false), 4000); }} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input required placeholder="Your Name" className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none" />
                        <input required type="email" placeholder="Your Email" className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none" />
                      </div>
                      <input required placeholder="Subject / Inquiries" className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none" />
                      <textarea rows={4} required placeholder="Message details..." className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none" />
                      <button type="submit" className="w-full py-3 rounded-xl font-semibold text-sm text-white shadow-lg cursor-pointer"
                        style={{ background: 'linear-gradient(135deg, var(--theme-primary), var(--theme-secondary))' }}>
                        Transmit Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-12" style={{ backgroundColor: '#040711', borderColor: 'var(--theme-border)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-white">{personal.fullName}</div>
            <div className="text-xs text-slate-400">© {new Date().getFullYear()} All rights reserved. Generated via WB Portfolio Builder.</div>
          </div>
          <button onClick={scrollToTop} className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white cursor-pointer">
            <ArrowUp size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
`;

  // 9. README.md
  files['README.md'] = `# ${portfolio.personal.fullName} - Portfolio Website

This is a production-ready, standalone portfolio website generated by **WB Portfolio Builder**.
Built with **React.js, TypeScript, Vite, and Tailwind CSS v4**.

## Two Ways to View Your Portfolio

### 👉 Option A: Instant Offline View (No Terminal or Node.js Needed!)
Simply double-click the **\`standalone-preview.html\`** file included in this folder. It opens immediately in Chrome, Safari, Firefox, or Edge without running any commands!

---

### 💻 Option B: Full React + TypeScript Development Workflow

### 1. Install Dependencies (Mandatory First Step)
Before running the development or preview server, install the required packages:
\`\`\`bash
npm install
\`\`\`

### 2. Run Local Development Server
To start the site locally with live reload:
\`\`\`bash
npm run dev
# or: npm start
\`\`\`
Visit \`http://localhost:5173\` to view your portfolio!

### 3. Build & Preview Production Bundle
To build and test the optimized production build:
\`\`\`bash
npm run build
npm run preview
\`\`\`

> **Troubleshooting: "Cannot find package '@vitejs/plugin-react'"?**
> If you see this error when running \`npm run preview\` or \`npm run dev\`, it means you haven't run \`npm install\` yet inside the project directory. Simply run \`npm install\` first!

---

## Static Hosting Deployment

The generated \`dist/\` directory can be deployed instantly to any modern hosting platform:

- **Vercel**: Run \`npx vercel\` or connect your GitHub repository.
- **Netlify**: Drag-and-drop the \`dist/\` folder or configure \`npm run build\` with publish directory \`dist\`.
- **GitHub Pages**: Use the GitHub Pages action with Vite build artifact.
- **Cloudflare Pages**: Connect your Git repo with framework preset *Vite*.

---

## Modifying Your Portfolio Data

All portfolio content is located in:
\`src/data/portfolioData.json\`

Edit that JSON file or adjust CSS design tokens in \`src/index.css\` to customize anytime!
`;

  // 10. standalone-preview.html (Instant offline preview without terminal/server)
  files['standalone-preview.html'] = generateStandaloneHtml(portfolio, theme);

  return files;
}
