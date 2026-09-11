import React, { useState } from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowUpRight, Mail, Terminal, Trophy, Award, BookOpen,
  Calendar, MapPin, Sparkles, ExternalLink, Globe, Cpu, CheckCircle2
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

export const CyberMatrixTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, achievements, contact, sections, socials } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  const primaryColor = theme.colors.primary;
  const secondaryColor = theme.colors.secondary || theme.colors.accent || primaryColor;
  const bgColor = theme.colors.background || '#07090e';
  const surfaceColor = theme.colors.surface || '#0c0f17';
  const textColor = theme.colors.text || '#f1f5f9';
  const borderColor = theme.colors.border || `${primaryColor}25`;

  return (
    <div
      className="min-h-screen font-sans transition-colors relative"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Subtle Matrix Grid Lines Background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, ${primaryColor}1a 1px, transparent 1px), linear-gradient(to bottom, ${primaryColor}1a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. Header Navigation */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${bgColor}cc`,
          borderColor: `${primaryColor}20`
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg" style={{ color: primaryColor }}>&lt;</span>
            <span className="font-extrabold tracking-tight text-lg">
              {personal.fullName.split(' ')[0]}
            </span>
            <span className="font-mono font-bold text-lg" style={{ color: primaryColor }}>/&gt;</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono opacity-70">
            <a href="#hero" className="hover:opacity-100 transition-opacity">/root</a>
            {isEnabled('projects') && <a href="#projects" className="hover:opacity-100 transition-opacity">/projects</a>}
            {isEnabled('achievements') && <a href="#achievements" className="hover:opacity-100 transition-opacity">/achievements</a>}
            {isEnabled('about') && <a href="#journal" className="hover:opacity-100 transition-opacity">/journal</a>}
          </nav>

          <a
            href={`mailto:${contact.email || personal.email}`}
            className="px-5 py-2 rounded-full border text-xs font-mono font-semibold transition-all shadow-sm"
            style={{
              backgroundColor: `${primaryColor}15`,
              borderColor: `${primaryColor}40`,
              color: primaryColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${primaryColor}15`;
              e.currentTarget.style.color = primaryColor;
            }}
          >
            init_contact()
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-24">

        {/* 2. Hero Section with Live Indicator & Graphic */}
        {isEnabled('hero') && (
          <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
            <div className="lg:col-span-7 space-y-6">
              {/* Status pill */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono"
                style={{
                  backgroundColor: `${secondaryColor}15`,
                  borderColor: `${secondaryColor}40`,
                  color: secondaryColor
                }}
              >
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: secondaryColor }} />
                <span>Available for work</span>
                <span className="opacity-40">•</span>
                <span className="opacity-80">Ready for hire</span>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-mono opacity-70">
                  Hi there 👋 I'm {personal.fullName} from {personal.location}
                </div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
                  I build accessible, pixel-perfect{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
                    }}
                  >
                    digital experiences
                  </span>{' '}
                  for the web.
                </h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono opacity-80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <span>Frontend Engineering Architect</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: secondaryColor }} />
                  <span>Interactive Scalable Systems</span>
                </div>
              </div>

              <p className="text-sm opacity-75 leading-relaxed max-w-xl">
                {personal.tagline || personal.headline}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-6 py-3 rounded-xl font-bold text-xs tracking-wide transition-all shadow-lg text-black"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 4px 14px ${primaryColor}40`
                  }}
                >
                  Start Collaboration
                </a>
                {isEnabled('projects') && (
                  <a
                    href="#projects"
                    className="px-6 py-3 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2"
                    style={{
                      backgroundColor: surfaceColor,
                      borderColor: borderColor
                    }}
                  >
                    <span>Inspect Repos</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Right: Graphic or Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-4 border shadow-2xl flex items-center justify-center group overflow-hidden"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: `${primaryColor}30`
                }}
              >
                <div
                  className="absolute inset-0 opacity-60 group-hover:scale-110 transition-transform duration-700"
                  style={{ background: `radial-gradient(circle, ${primaryColor}20 0%, transparent 70%)` }}
                />

                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center space-y-4">
                    <div
                      className="w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center text-5xl animate-spin-slow"
                      style={{ borderColor: `${primaryColor}60` }}
                    >
                      🌐
                    </div>
                    <div className="font-mono text-xs" style={{ color: primaryColor }}>SYS_ONLINE // ARCHITECT</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 3. Bento Projects Showcase */}
        {isEnabled('projects') && projects.length > 0 && (
          <section
            id="projects"
            className="space-y-8 pt-10 border-t"
            style={{ borderColor: `${primaryColor}20` }}
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: primaryColor }}>
                // Selected Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Dream Big with <span style={{ color: primaryColor }}>Start Small</span>
              </h2>
              <p className="text-xs sm:text-sm opacity-75">
                Resilient applications and user interfaces crafted with obsessive attention to performance and scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl border transition-all p-5 flex flex-col justify-between group shadow-xl"
                  style={{
                    backgroundColor: surfaceColor,
                    borderColor: borderColor
                  }}
                >
                  {/* Mockup Canvas */}
                  <div
                    className="h-56 rounded-xl p-4 relative overflow-hidden flex items-center justify-center border"
                    style={{
                      backgroundColor: `${bgColor}90`,
                      borderColor: `${primaryColor}25`
                    }}
                  >
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center gap-4">
                        <div
                          className="w-40 h-28 rounded-lg border p-2 flex flex-col justify-between shadow-lg"
                          style={{
                            backgroundColor: bgColor,
                            borderColor: `${primaryColor}40`
                          }}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <div className="text-[10px] font-mono truncate" style={{ color: primaryColor }}>{proj.title}</div>
                        </div>
                      </div>
                    )}

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 w-8 h-8 rounded-lg backdrop-blur-md flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: primaryColor
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = primaryColor;
                          e.currentTarget.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)';
                          e.currentTarget.style.color = primaryColor;
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs opacity-75 line-clamp-2 mt-1">
                          {proj.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div
                      className="flex flex-wrap gap-1.5 pt-2 border-t"
                      style={{ borderColor: `${primaryColor}20` }}
                    >
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: `${primaryColor}15`,
                            borderColor: `${primaryColor}30`,
                            color: primaryColor
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Accolades & Achievements */}
        {isEnabled('achievements') && achievements && achievements.length > 0 && (
          <section
            id="achievements"
            className="space-y-8 pt-10 border-t"
            style={{ borderColor: `${primaryColor}20` }}
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: primaryColor }}>
                // Milestones
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                A glimpse into moments that <span style={{ color: primaryColor }}>Shaped My Path</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-6 rounded-2xl border space-y-4 flex flex-col justify-between"
                  style={{
                    backgroundColor: surfaceColor,
                    borderColor: borderColor
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl border flex items-center justify-center"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      borderColor: `${primaryColor}40`,
                      color: primaryColor
                    }}
                  >
                    <Trophy size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold">{ach.title}</h3>
                    <div className="text-xs font-mono" style={{ color: primaryColor }}>{ach.issuer}</div>
                    <p className="text-xs opacity-75 leading-relaxed pt-1">{ach.description}</p>
                  </div>
                  <div
                    className="text-[11px] font-mono opacity-50 pt-2 border-t"
                    style={{ borderColor: `${primaryColor}20` }}
                  >
                    {ach.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Developer's Journal */}
        {isEnabled('about') && (
          <section
            id="journal"
            className="space-y-8 pt-10 border-t"
            style={{ borderColor: `${primaryColor}20` }}
          >
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest" style={{ color: primaryColor }}>
                // Technical Writing & Reflections
              </span>
              <h2 className="text-3xl font-black tracking-tight">
                From Code to Clarity : <span style={{ color: primaryColor }}>Developer's Journal</span>
              </h2>
              <p className="text-xs opacity-75">
                Stories, architectural insights, and lessons learned from shipping production software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="p-6 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: borderColor
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor
                  }}
                >
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold">Engineering Architecture & Philosophy</h3>
                <p className="text-xs opacity-75 leading-relaxed">{about.summary}</p>
              </div>

              <div
                className="p-6 rounded-2xl border space-y-4"
                style={{
                  backgroundColor: surfaceColor,
                  borderColor: borderColor
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor
                  }}
                >
                  <Cpu size={20} />
                </div>
                <h3 className="text-lg font-bold">Continuous Innovation & Delivery</h3>
                <div className="space-y-2 text-xs opacity-75 leading-relaxed">
                  {about.storyParagraphs && about.storyParagraphs.slice(0, 2).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Footer CTA Banner */}
        {isEnabled('contact') && (
          <section id="contact" className="pt-8">
            <div
              className="rounded-3xl p-10 md:p-14 border text-center relative overflow-hidden shadow-2xl space-y-6"
              style={{
                background: `linear-gradient(135deg, ${surfaceColor}, ${bgColor})`,
                borderColor: `${primaryColor}40`
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Let's Build <span style={{ color: primaryColor }}>Something Great</span> Together!
              </h2>

              <p className="text-sm opacity-75 max-w-lg mx-auto leading-relaxed">
                {contact.socialMessage || "Have an exciting project or want to scale your digital presence? Send a ping and let's get building."}
              </p>

              <div className="pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl hover:scale-105 text-black"
                  style={{
                    backgroundColor: primaryColor,
                    boxShadow: `0 6px 20px ${primaryColor}40`
                  }}
                >
                  <Mail size={15} />
                  <span>Initiate Discussion</span>
                </a>
              </div>

              {socials && socials.length > 0 && (
                <div
                  className="flex items-center justify-center gap-4 pt-6 border-t"
                  style={{ borderColor: `${primaryColor}20` }}
                >
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor,
                        border: `1px solid ${primaryColor}30`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = primaryColor;
                        e.currentTarget.style.color = '#000000';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                        e.currentTarget.style.color = primaryColor;
                      }}
                      title={s.label}
                    >
                      {s.platform === 'github' ? <GithubIcon size={16} /> : <LinkedinIcon size={16} />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      <footer
        className="py-12 border-t text-center text-xs font-mono opacity-50 mt-20"
        style={{ borderColor: `${primaryColor}20` }}
      >
        <p>© {new Date().getFullYear()} {personal.fullName} // ALL SYSTEMS OPERATIONAL</p>
      </footer>
    </div>
  );
};
