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

const DotMatrix = ({ color = '#e11d48' }: { color?: string }) => (
  <div className="inline-grid grid-cols-3 gap-1 w-4 h-4" style={{ color }}>
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: color }} />
  </div>
);

export const StygarStudioTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, services, contact, sections, socials } = data;
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;
  const filteredProjects = activeFilter === 'featured' ? projects.filter((p) => p.featured) : projects;

  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary || theme.colors.accent || primaryColor;
  const bgColor = theme.colors.background;
  const surfaceColor = theme.colors.surface;
  const textColor = theme.colors.text;

  return (
    <div
      className="min-h-screen font-sans transition-colors relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Ambient Lighting */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${primaryColor}25 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-[40%] left-[-100px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none -z-10"
        style={{ background: `radial-gradient(circle, ${secondaryColor}20 0%, transparent 70%)` }}
      />

      {/* 1. Header Navigation */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${bgColor}d9`,
          borderColor: `${primaryColor}25`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base shadow-lg group-hover:scale-105 transition-transform"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 4px 14px ${primaryColor}40`
              }}
            >
              ✦
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              {personal.fullName.split(' ')[0]}<span style={{ color: primaryColor }}>.studio</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide uppercase">
            <a href="#hero" className="transition-colors" style={{ color: primaryColor }}>
              Home
            </a>
            {isEnabled('services') && (
              <a href="#services" className="opacity-70 hover:opacity-100 transition-colors">
                Services
              </a>
            )}
            {isEnabled('projects') && (
              <a href="#projects" className="opacity-70 hover:opacity-100 transition-colors">
                Portfolio
              </a>
            )}
            {isEnabled('about') && (
              <a href="#about" className="opacity-70 hover:opacity-100 transition-colors">
                About
              </a>
            )}
            {isEnabled('contact') && (
              <a href="#contact" className="opacity-70 hover:opacity-100 transition-colors">
                Contact
              </a>
            )}
          </nav>

          <a
            href={`mailto:${contact.email || personal.email}`}
            className="px-6 py-2.5 rounded-full text-white text-xs font-bold tracking-wide transition-all shadow-lg hover:scale-105"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 4px 14px ${primaryColor}40`
            }}
          >
            Get in Touch
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      {isEnabled('hero') && (
        <section id="hero" className="relative pt-12 pb-20 px-6 max-w-6xl mx-auto">
          {/* Subtle typography watermark */}
          <div
            className="absolute right-0 top-12 text-[140px] md:text-[220px] font-black select-none pointer-events-none tracking-tighter leading-none -z-10"
            style={{ color: `${primaryColor}12` }}
          >
            CREATIVE
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-7">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
                Turning{' '}
                <span
                  className="border-2 px-3 py-0.5 rounded-2xl inline-block shadow-lg"
                  style={{
                    borderColor: primaryColor,
                    color: primaryColor,
                    boxShadow: `0 4px 16px ${primaryColor}25`
                  }}
                >
                  Ideas
                </span>{' '}
                Into
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${textColor}, ${secondaryColor})`
                  }}
                >
                  Digital Reality
                </span>
              </h1>

              <p className="text-sm md:text-base opacity-75 max-w-xl leading-relaxed">
                {personal.tagline || personal.headline}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-8 py-3.5 rounded-full text-white text-sm font-bold tracking-wide transition-all shadow-xl hover:-translate-y-0.5"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 6px 20px ${primaryColor}40`
                  }}
                >
                  Start a Project
                </a>

                {isEnabled('projects') && (
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-sm font-semibold opacity-80 hover:opacity-100 transition-colors group"
                  >
                    <span>See Our Work</span>
                    <ArrowRight size={16} style={{ color: primaryColor }} className="group-hover:translate-x-1.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Hero Visual / Render */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div
                className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-3xl p-2 border shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden group"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: `${primaryColor}30`
                }}
              >
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-2xl filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-center p-6 space-y-4">
                    <div
                      className="w-24 h-24 rounded-2xl mx-auto flex items-center justify-center text-4xl shadow-xl text-white"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        boxShadow: `0 8px 24px ${primaryColor}40`
                      }}
                    >
                      🚀
                    </div>
                    <div className="text-xl font-bold">{personal.fullName}</div>
                    <div className="text-xs font-mono tracking-wider" style={{ color: secondaryColor }}>{personal.headline}</div>
                  </div>
                )}

                {/* Floating Studio Badge */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-3 rounded-xl border backdrop-blur-md flex items-center justify-between"
                  style={{
                    backgroundColor: `${bgColor}eb`,
                    borderColor: `${primaryColor}40`
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full animate-ping"
                      style={{ backgroundColor: primaryColor }}
                    />
                    <span className="text-xs font-semibold">
                      Available for Projects
                    </span>
                  </div>
                  <Sparkles size={14} style={{ color: primaryColor }} />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Stats Counter Row with Dot Matrix Decorator */}
          <div
            className="mt-16 pt-10 border-t grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderColor: `${primaryColor}25` }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <DotMatrix color={primaryColor} />
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  150+
                </span>
              </div>
              <p className="text-xs font-medium opacity-70">Projects Completed</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                98%
              </div>
              <p className="text-xs font-medium opacity-70">Client Satisfaction</p>
            </div>

            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {personal.yearsOfExperience}+
              </div>
              <p className="text-xs font-medium opacity-70">Years of Experience</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  24/7
                </span>
                <DotMatrix color={primaryColor} />
              </div>
              <p className="text-xs font-medium opacity-70">Support & Delivery</p>
            </div>
          </div>
        </section>
      )}

      {/* 4. Projects Showcase Section */}
      {isEnabled('projects') && projects.length > 0 && (
        <section
          id="projects"
          className="py-20 px-6 max-w-6xl mx-auto border-t"
          style={{ borderColor: `${primaryColor}25` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                  Our Projects
                </h2>
                <DotMatrix color={primaryColor} />
              </div>
              <p className="text-xs md:text-sm opacity-75 max-w-md">
                Award-winning digital experiences, platforms, and interactive interfaces built with surgical precision.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: activeFilter === 'all' ? primaryColor : `${primaryColor}15`,
                  color: activeFilter === 'all' ? '#ffffff' : textColor,
                  border: `1px solid ${primaryColor}30`
                }}
              >
                Show All
              </button>
              <button
                onClick={() => setActiveFilter('featured')}
                className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: activeFilter === 'featured' ? primaryColor : `${primaryColor}15`,
                  color: activeFilter === 'featured' ? '#ffffff' : textColor,
                  border: `1px solid ${primaryColor}30`
                }}
              >
                Featured Only
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-3xl border transition-all p-4 flex flex-col group shadow-xl hover:shadow-2xl"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: `${primaryColor}25`
                }}
              >
                {/* Visual Canvas */}
                <div
                  className="h-64 rounded-2xl p-4 relative overflow-hidden flex items-center justify-center border"
                  style={{
                    backgroundColor: `${bgColor}80`,
                    borderColor: `${primaryColor}20`
                  }}
                >
                  {proj.imageUrl ? (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2">
                      <div className="text-3xl">🔮</div>
                      <div className="text-base font-bold tracking-wide">{proj.title}</div>
                      <div className="text-xs font-mono" style={{ color: secondaryColor }}>{proj.role || 'Design & Engineering'}</div>
                    </div>
                  )}

                  {proj.featured && (
                    <span
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-md"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold transition-colors">
                        {proj.title}
                      </h3>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg transition-all"
                          style={{
                            backgroundColor: `${primaryColor}20`,
                            color: primaryColor
                          }}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    <p className="text-xs opacity-70 leading-relaxed line-clamp-2">
                      {proj.shortDescription}
                    </p>
                  </div>

                  <div
                    className="flex flex-wrap gap-1.5 pt-2 border-t"
                    style={{ borderColor: `${primaryColor}20` }}
                  >
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: `${primaryColor}15`,
                          borderColor: `${primaryColor}30`,
                          color: textColor
                        }}
                      >
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
        <section
          id="services"
          className="py-20 px-6 max-w-6xl mx-auto border-t"
          style={{ borderColor: `${primaryColor}25` }}
        >
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-1">
              End-to-End Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl border transition-all space-y-4 group"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: `${primaryColor}25`
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl border flex items-center justify-center text-xl group-hover:scale-110 transition-all text-white"
                  style={{
                    backgroundColor: `${primaryColor}25`,
                    borderColor: `${primaryColor}40`,
                    color: primaryColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${primaryColor}25`;
                    e.currentTarget.style.color = primaryColor;
                  }}
                >
                  ✦
                </div>
                <h3 className="text-lg font-bold">{srv.title}</h3>
                <p className="text-xs opacity-75 leading-relaxed">{srv.description}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {srv.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${primaryColor}15` }}
                    >
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
        <section
          id="about"
          className="py-20 px-6 max-w-6xl mx-auto border-t"
          style={{ borderColor: `${primaryColor}25` }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>The Studio</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Designed for Impact. Built to Scale.
              </h2>
              <p className="text-sm opacity-75 leading-relaxed">
                {about.summary}
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {experience.slice(0, 3).map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: surfaceColor,
                    borderColor: `${primaryColor}20`
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold">{exp.role}</h3>
                    <span className="text-xs font-mono" style={{ color: primaryColor }}>
                      {exp.startDate} - {exp.current ? 'Now' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-semibold opacity-90">{exp.company}</div>
                  <p className="text-xs opacity-70">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Contact Banner */}
      {isEnabled('contact') && (
        <section
          id="contact"
          className="py-20 px-6 max-w-6xl mx-auto border-t"
          style={{ borderColor: `${primaryColor}25` }}
        >
          <div
            className="rounded-3xl p-10 md:p-16 border text-center relative overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${surfaceColor}, ${bgColor})`,
              borderColor: `${primaryColor}40`
            }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Ready to create something iconic?
            </h2>
            <p className="text-sm md:text-base opacity-85 max-w-xl mx-auto mb-8">
              Let's talk about your vision, upcoming milestone, or engineering challenges.
            </p>

            <a
              href={`mailto:${contact.email || personal.email}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white text-sm font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 8px 24px ${primaryColor}40`
              }}
            >
              <Mail size={16} />
              <span>Contact Our Team</span>
            </a>

            {socials && socials.length > 0 && (
              <div
                className="flex items-center justify-center gap-4 mt-8 pt-8 border-t"
                style={{ borderColor: `${primaryColor}20` }}
              >
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: `${primaryColor}20`,
                      color: primaryColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = primaryColor;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${primaryColor}20`;
                      e.currentTarget.style.color = primaryColor;
                    }}
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
      <footer
        className="py-10 border-t text-center text-xs opacity-60"
        style={{ borderColor: `${primaryColor}20` }}
      >
        <p>© {new Date().getFullYear()} {personal.fullName}. Crafted with Stygar Studio Template.</p>
      </footer>
    </div>
  );
};
