import React from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowUpRight, Mail, Phone, MapPin, Sparkles,
  CheckCircle2, ArrowRight, MessageCircle, Star, Globe
} from 'lucide-react';

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const TerracottaAvatarTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, services, contact, sections, socials } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  const processSteps = [
    { num: '01', title: 'Brief' },
    { num: '02', title: 'Research' },
    { num: '03', title: 'Wireframe' },
    { num: '04', title: 'Design' },
    { num: '05', title: 'Develop' },
    { num: '06', title: 'Launch' },
  ];

  return (
    <div
      className="min-h-screen font-sans transition-colors"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* 1. Header & Hero Clay Banner */}
      {isEnabled('hero') && (
        <section
          className="text-white pt-8 pb-16 px-6 relative overflow-hidden shadow-xl"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-8 border-b border-white/20">
              <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                {personal.headline || 'Product Designer & Full Stack Developer'}
              </span>
              <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-wider">
                <a href="#about" className="hover:text-white/80 transition-colors">About</a>
                <a href="#services" className="hover:text-white/80 transition-colors">Services</a>
                <a href="#process" className="hover:text-white/80 transition-colors">Process</a>
                <a href="#projects" className="hover:text-white/80 transition-colors">Projects</a>
                <a href="#contact" className="hover:text-white/80 transition-colors">Contact</a>
              </nav>
            </div>

            {/* Hero Main */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-10">
              <div className="md:col-span-7 space-y-4">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight leading-[0.9]">
                  {personal.fullName}
                </h1>
                <p className="text-sm md:text-base text-white/90 max-w-lg leading-relaxed pt-2">
                  {personal.tagline || about.summary}
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={`mailto:${contact.email || personal.email}`}
                    className="px-7 py-3 rounded-full bg-white font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                    style={{ color: theme.colors.primary }}
                  >
                    Hire Me
                  </a>
                  {socials && socials.length > 0 && (
                    <div className="flex items-center gap-3 text-white/80">
                      {socials.map((s) => (
                        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          {s.platform === 'github' ? <GithubIcon size={16} /> : <LinkedinIcon size={16} />}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Center / Right 3D Character Container */}
              <div className="md:col-span-5 flex justify-center">
                <div
                  className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl p-3 shadow-2xl border border-white/20 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  }}
                >
                  {personal.avatarUrl ? (
                    <img
                      src={personal.avatarUrl}
                      alt={personal.fullName}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="text-6xl">🎨</div>
                      <div className="font-bold text-lg uppercase">{personal.fullName}</div>
                      <div className="text-xs text-white/80 font-mono">{personal.location}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24">

        {/* 2. About Me Section with Speech Bubble */}
        {isEnabled('about') && (
          <section id="about" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: theme.colors.primary }}>
                About Me
              </h2>
              <div
                className="px-4 py-1.5 rounded-full text-xs font-bold font-mono"
                style={{ backgroundColor: `${theme.colors.primary}18`, color: theme.colors.primary }}
              >
                "Want to know about me?" 💬
              </div>
            </div>

            <div
              className="p-8 sm:p-10 rounded-3xl text-white shadow-xl space-y-6"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <p className="text-base sm:text-lg font-medium leading-relaxed">
                {about.summary}
              </p>

              {about.storyParagraphs && (
                <div className="space-y-3 text-sm text-white/80 leading-relaxed border-t border-white/20 pt-4">
                  {about.storyParagraphs.map((p, i) => (
                    <p key={i}>• {p}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. Numbered Services Grid with Speech Bubble */}
        {isEnabled('services') && (
          <section id="services" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: theme.colors.primary }}>
                  Services
                </h2>
                <p className="text-xs opacity-70 mt-1">
                  End-to-end design & technical execution.
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-2xl text-xs font-bold shadow-xs border"
                style={{
                  backgroundColor: `${theme.colors.secondary || theme.colors.primary}15`,
                  borderColor: `${theme.colors.secondary || theme.colors.primary}40`,
                  color: theme.colors.text
                }}
              >
                "Just give me the idea! I will blow your mind." 💡
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { num: '01', title: 'UX STRATEGY' },
                { num: '02', title: 'WIREFRAMING' },
                { num: '03', title: 'UI DESIGN' },
                { num: '04', title: 'WORDPRESS' },
                { num: '05', title: 'DEVELOPMENT' },
                { num: '06', title: 'PROTOTYPE' },
              ].map((s) => (
                <div
                  key={s.num}
                  className="p-6 rounded-2xl text-white shadow-md hover:scale-105 transition-all flex flex-col justify-between h-36"
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  <span className="text-2xl font-black text-white/80">{s.num}</span>
                  <span className="text-sm font-extrabold uppercase tracking-wide">{s.title}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Work Process Flow */}
        <section id="process" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: theme.colors.primary }}>
              Work Process
            </h2>
            <div className="text-xs font-mono font-bold opacity-60">
              My Proven 6-Step Strategy
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-full border-2 text-center hover:text-white transition-all group cursor-pointer"
                style={{
                  borderColor: theme.colors.primary,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div
                  className="text-xs font-mono font-bold group-hover:text-white mb-0.5"
                  style={{ color: theme.colors.primary }}
                >
                  {step.num}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider">{step.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Projects Showcase */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="projects" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight" style={{ color: theme.colors.primary }}>
                Projects
              </h2>
              <span className="text-xs font-mono opacity-60">Curated Design & Code</span>
            </div>

            <div
              className="p-8 rounded-3xl shadow-2xl"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-2xl p-5 text-white border border-white/10 flex flex-col justify-between space-y-4 hover:scale-[1.02] transition-transform"
                    style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
                  >
                    <div className="h-44 rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center">
                      {proj.imageUrl ? (
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl">💻</span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold uppercase">{proj.title}</h3>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white"
                            style={{ color: theme.colors.secondary || theme.colors.accent || '#fff' }}
                          >
                            <ArrowUpRight size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-2">{proj.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 6. Footer Signature */}
      <footer
        id="contact"
        className="border-t py-14 px-6"
        style={{
          backgroundColor: theme.colors.surface || '#ffffff',
          borderColor: theme.colors.border || 'rgba(0,0,0,0.1)'
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-start justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black uppercase" style={{ color: theme.colors.primary }}>
              {personal.fullName}
            </h3>
            <p className="text-xs opacity-70 mt-1 max-w-sm">{personal.tagline}</p>
            <div className="text-xs font-mono opacity-50 mt-6">
              © {new Date().getFullYear()} All Rights Reserved.
            </div>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="opacity-60 uppercase">Contact Direct</div>
            <a
              href={`mailto:${contact.email || personal.email}`}
              className="block font-bold text-sm hover:underline"
              style={{ color: theme.colors.primary }}
            >
              {contact.email || personal.email}
            </a>
            <div className="opacity-60">{personal.location}</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
