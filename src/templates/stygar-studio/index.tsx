import React, { useState } from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowRight, ArrowUpRight, Mail, Sparkles, CheckCircle2,
  ExternalLink, Layers, Terminal, Send, Phone, MapPin, Globe
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

const DotMatrix = () => (
  <div className="inline-grid grid-cols-3 gap-1 w-4 h-4 text-rose-500">
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
    <span className="w-1 h-1 rounded-full bg-rose-500" />
  </div>
);

export const StygarStudioTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, services, contact, sections, socials } = data;
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;
  const filteredProjects = activeFilter === 'featured' ? projects.filter((p) => p.featured) : projects;

  return (
    <div
      className="min-h-screen font-sans bg-[#0c0306] text-slate-100 selection:bg-rose-900 selection:text-rose-200 transition-colors relative overflow-hidden"
      style={{
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Ambient Crimson Background Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-rose-900/20 via-rose-950/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[40%] left-[-100px] w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#0c0306]/85 backdrop-blur-md border-b border-rose-950/40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white font-black text-base shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              ✦
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">
              {personal.fullName.split(' ')[0]}<span className="text-rose-500">.studio</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase">
            <a href="#hero" className="text-rose-400 hover:text-white transition-colors">
              Home
            </a>
            {isEnabled('services') && (
              <a href="#services" className="text-slate-400 hover:text-white transition-colors">
                Services
              </a>
            )}
            {isEnabled('projects') && (
              <a href="#projects" className="text-slate-400 hover:text-white transition-colors">
                Portfolio
              </a>
            )}
            {isEnabled('about') && (
              <a href="#about" className="text-slate-400 hover:text-white transition-colors">
                About
              </a>
            )}
            {isEnabled('contact') && (
              <a href="#contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </a>
            )}
          </nav>

          <a
            href={`mailto:${contact.email || personal.email}`}
            className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      {isEnabled('hero') && (
        <section id="hero" className="relative pt-12 pb-20 px-6 max-w-6xl mx-auto">
          {/* Subtle typography watermark */}
          <div className="absolute right-0 top-12 text-[140px] md:text-[220px] font-black text-rose-950/15 select-none pointer-events-none tracking-tighter leading-none -z-10">
            CREATIVE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-7">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                Turning{' '}
                <span className="border-2 border-rose-500 text-rose-500 px-3 py-0.5 rounded-2xl inline-block shadow-lg shadow-rose-950/50">
                  Ideas
                </span>{' '}
                Into
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-rose-300">
                  Digital Reality
                </span>
              </h1>

              <p className="text-sm md:text-base text-slate-400 max-w-xl leading-relaxed">
                {personal.tagline || personal.headline}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold tracking-wide transition-all shadow-xl shadow-rose-600/30 hover:shadow-rose-600/50 hover:-translate-y-0.5"
                >
                  Start a Project
                </a>

                {isEnabled('projects') && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
                  >
                    <span>See Our Work</span>
                    <ArrowRight size={16} className="text-rose-500 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Hero Visual / 3D Character or Render */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-3xl bg-gradient-to-b from-rose-900/30 via-slate-900/50 to-slate-950/80 p-2 border border-rose-900/30 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden group">
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-2xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-rose-600/40">
                      🚀
                    </div>
                    <div className="text-xl font-bold text-white">{personal.fullName}</div>
                    <div className="text-xs text-rose-400 font-mono tracking-wider">{personal.headline}</div>
                  </div>
                )}

                {/* Floating Studio Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#14060b]/90 border border-rose-800/40 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-200">
                      Available for Q3/Q4 Projects
                    </span>
                  </div>
                  <Sparkles size={14} className="text-rose-400" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Stats Counter Row with Dot Matrix Decorator */}
          <div className="mt-16 pt-10 border-t border-rose-950/60 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DotMatrix />
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  150+
                </span>
              </div>
              <p className="text-xs font-medium text-slate-400">Projects Completed</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                98%
              </div>
              <p className="text-xs font-medium text-slate-400">Client Satisfaction</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {personal.yearsOfExperience}+
              </div>
              <p className="text-xs font-medium text-slate-400">Years of Experience</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  24/7
                </span>
                <DotMatrix />
              </div>
              <p className="text-xs font-medium text-slate-400">Support & Delivery</p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Projects Showcase Section */}
      {isEnabled('projects') && projects.length > 0 && (
        <section id="projects" className="py-20 px-6 max-w-6xl mx-auto border-t border-rose-950/60">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  Our Projects
                </h2>
                <DotMatrix />
              </div>
              <p className="text-xs md:text-sm text-slate-400 max-w-md">
                Award-winning digital experiences, platforms, and interactive interfaces built with surgical precision.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-rose-950/40 text-slate-400 hover:text-white border border-rose-900/40'
                }`}
              >
                Show All
              </button>
              <button
                onClick={() => setActiveFilter('featured')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'featured'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-rose-950/40 text-slate-400 hover:text-white border border-rose-900/40'
                }`}
              >
                Featured Only
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl bg-gradient-to-b from-[#18080f]/90 to-[#100408]/95 border border-rose-900/30 hover:border-rose-500/60 transition-all p-4 flex flex-col group shadow-xl hover:shadow-2xl hover:shadow-rose-950/40"
              >
                {/* Visual Canvas */}
                <div className="h-64 rounded-2xl bg-gradient-to-tr from-slate-950 via-[#1c0812] to-rose-950/40 p-4 relative overflow-hidden flex items-center justify-center border border-rose-950/40">
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="text-3xl">🔮</div>
                      <div className="text-base font-bold text-white tracking-wide">{proj.title}</div>
                      <div className="text-xs text-rose-400 font-mono">{proj.role || 'Design & Engineering'}</div>
                    </div>
                  )}

                  {proj.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-rose-600 text-[10px] font-bold tracking-wider uppercase text-white shadow-md shadow-rose-900/60">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 hover:text-white hover:bg-rose-600 transition-all"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {proj.shortDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-rose-950/40">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-950/60 text-rose-300 border border-rose-900/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Services & Capabilities */}
      {isEnabled('services') && services && services.length > 0 && (
        <section id="services" className="py-20 px-6 max-w-6xl mx-auto border-t border-rose-950/60">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
              End-to-End Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#18080f]/80 to-[#0e0307] border border-rose-900/30 hover:border-rose-500/50 transition-all space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-950/60 border border-rose-800/40 text-rose-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  ✦
                </div>
                <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {srv.tags.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#200a14] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. About & Experience */}
      {isEnabled('about') && (
        <section id="about" className="py-20 px-6 max-w-6xl mx-auto border-t border-rose-950/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">The Studio</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Designed for Impact. Built to Scale.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                {about.summary}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {experience.slice(0, 3).map((exp) => (
                <div key={exp.id} className="p-5 rounded-2xl bg-[#14060b]/70 border border-rose-950/60 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <span className="text-xs font-mono text-rose-400">{exp.startDate} - {exp.current ? 'Now' : exp.endDate}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-300">{exp.company}</div>
                  <p className="text-xs text-slate-400">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Contact / Get In Touch Banner */}
      {isEnabled('contact') && (
        <section id="contact" className="py-20 px-6 max-w-6xl mx-auto border-t border-rose-950/60">
          <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-[#1c0712] to-slate-950 p-10 md:p-16 border border-rose-800/40 text-center relative overflow-hidden shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ready to create something iconic?
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto mb-8">
              Let's talk about your vision, upcoming milestone, or engineering challenges.
            </p>

            <a
              href={`mailto:${contact.email || personal.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold tracking-wider uppercase transition-all shadow-xl shadow-rose-600/40 hover:scale-105"
            >
              <Mail size={16} />
              <span>Contact Our Team</span>
            </a>

            {socials && socials.length > 0 && (
              <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-rose-900/30">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-rose-950/60 hover:bg-rose-600 text-rose-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    {s.platform === 'github' ? <GithubIcon size={16} /> : <LinkedinIcon size={16} />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-10 border-t border-rose-950/40 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {personal.fullName}. Crafted with Stygar Studio Template.</p>
      </footer>
    </div>
  );
};
