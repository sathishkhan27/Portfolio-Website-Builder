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

  return (
    <div
      className="min-h-screen font-sans bg-[#07090e] text-slate-100 selection:bg-cyan-900 selection:text-cyan-200 transition-colors relative"
      style={{
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Subtle Matrix Grid Lines Background */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090e]/80 backdrop-blur-md border-b border-cyan-950/40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <span className="text-cyan-400 font-mono font-bold text-lg">&lt;</span>
            <span className="font-extrabold text-white tracking-tight text-lg">
              {personal.fullName.split(' ')[0]}
            </span>
            <span className="text-cyan-400 font-mono font-bold text-lg">/&gt;</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-slate-400">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">/root</a>
            {isEnabled('projects') && <a href="#projects" className="hover:text-cyan-400 transition-colors">/projects</a>}
            {isEnabled('achievements') && <a href="#achievements" className="hover:text-cyan-400 transition-colors">/achievements</a>}
            {isEnabled('about') && <a href="#journal" className="hover:text-cyan-400 transition-colors">/journal</a>}
          </nav>

          <a
            href={`mailto:${contact.email || personal.email}`}
            className="px-5 py-2 rounded-full bg-cyan-950/60 hover:bg-cyan-500 hover:text-black border border-cyan-500/40 text-cyan-400 text-xs font-mono font-semibold transition-all shadow-sm"
          >
            init_contact()
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-24">

        {/* 2. Hero Section with Live Indicator & Wireframe Graphic */}
        {isEnabled('hero') && (
          <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-6">
            <div className="lg:col-span-7 space-y-6">
              {/* Status pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Available for work</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Ready for hire</span>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-mono text-slate-400">
                  Hi there 👋 I'm {personal.fullName} from {personal.location}
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  I build accessible, pixel-perfect{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    digital experiences
                  </span>{' '}
                  for the web.
                </h1>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Frontend Engineering Architect</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Interactive Scalable Systems</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                {personal.tagline || personal.headline}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20"
                >
                  Start Collaboration
                </a>
                {isEnabled('projects') && (
                  <a
                    href="#projects"
                    className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-all flex items-center gap-2"
                  >
                    <span>Inspect Repos</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Right: 3D Wireframe Mesh Graphic or Avatar */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-slate-900/60 to-black p-4 border border-cyan-900/40 shadow-2xl flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-radial-at-c from-cyan-500/10 via-transparent to-transparent opacity-60 group-hover:scale-110 transition-transform duration-700" />
                
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full object-cover rounded-2xl filter brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-cyan-400/60 flex items-center justify-center text-5xl animate-spin-slow">
                      🌐
                    </div>
                    <div className="font-mono text-xs text-cyan-400">SYS_ONLINE // ARCHITECT</div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 3. "Dream Big with Start Small" Bento Projects Showcase */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="projects" className="space-y-8 pt-10 border-t border-cyan-950/50">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                // Selected Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Dream Big with <span className="text-cyan-400">Start Small</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Resilient applications and user interfaces crafted with obsessive attention to performance and scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#0c0f17] border border-cyan-950/70 hover:border-cyan-500/50 transition-all p-5 flex flex-col justify-between group shadow-xl"
                >
                  {/* Mockup Canvas */}
                  <div className="h-56 rounded-xl bg-gradient-to-tr from-slate-950 via-[#0b121e] to-cyan-950/30 p-4 relative overflow-hidden flex items-center justify-center border border-cyan-950/40">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center gap-4">
                        <div className="w-40 h-28 rounded-lg bg-slate-900 border border-cyan-900/50 p-2 flex flex-col justify-between shadow-lg">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                          <div className="text-[10px] font-mono text-cyan-400 truncate">{proj.title}</div>
                        </div>
                      </div>
                    )}

                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {proj.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-900">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-900/40">
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

        {/* 4. "A glimpse into the moments that Shaped My Path" (Accolades & Achievements) */}
        {isEnabled('achievements') && achievements && achievements.length > 0 && (
          <section id="achievements" className="space-y-8 pt-10 border-t border-cyan-950/50">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                // Milestones
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                A glimpse into moments that <span className="text-cyan-400">Shaped My Path</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-6 rounded-2xl bg-[#0c0f17] border border-cyan-950/70 space-y-4 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 flex items-center justify-center">
                    <Trophy size={22} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{ach.title}</h3>
                    <div className="text-xs font-mono text-cyan-400">{ach.issuer}</div>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">{ach.description}</p>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900">
                    {ach.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. "From Code to Clarity : Developer's Journal" (About / Story / Career) */}
        {isEnabled('about') && (
          <section id="journal" className="space-y-8 pt-10 border-t border-cyan-950/50">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                // Technical Writing & Reflections
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight">
                From Code to Clarity : <span className="text-cyan-400">Developer's Journal</span>
              </h2>
              <p className="text-xs text-slate-400">
                Stories, architectural insights, and lessons learned from shipping production software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0c0f17] border border-cyan-950/70 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Engineering Architecture & Philosophy</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{about.summary}</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c0f17] border border-cyan-950/70 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Continuous Innovation & Delivery</h3>
                <div className="space-y-2 text-xs text-slate-400 leading-relaxed">
                  {about.storyParagraphs && about.storyParagraphs.slice(0, 2).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Footer CTA Banner: "Let's Build Something Great Together!" */}
        {isEnabled('contact') && (
          <section id="contact" className="pt-8">
            <div className="rounded-3xl bg-gradient-to-r from-cyan-950/70 via-[#0b1322] to-slate-950 p-10 md:p-14 border border-cyan-800/40 text-center relative overflow-hidden shadow-2xl space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Let's Build <span className="text-cyan-400">Something Great</span> Together!
              </h2>

              <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                {contact.socialMessage || "Have an exciting project or want to scale your digital presence? Send a ping and let's get building."}
              </p>

              <div className="pt-2">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-xl shadow-cyan-500/20 hover:scale-105"
                >
                  <Mail size={15} />
                  <span>Initiate Discussion</span>
                </a>
              </div>

              {socials && socials.length > 0 && (
                <div className="flex items-center justify-center gap-4 pt-6 border-t border-cyan-950/80">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-cyan-950/40 hover:bg-cyan-500 hover:text-black text-cyan-400 flex items-center justify-center transition-colors"
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

      <footer className="py-12 border-t border-cyan-950/40 text-center text-xs font-mono text-slate-500 mt-20">
        <p>© {new Date().getFullYear()} {personal.fullName} // ALL SYSTEMS OPERATIONAL</p>
      </footer>
    </div>
  );
};
