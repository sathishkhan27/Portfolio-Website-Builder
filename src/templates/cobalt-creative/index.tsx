import React from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowUpRight, Mail, Sparkles, Layers, Play,
  Send, Globe, ArrowRight, CheckCircle2
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

export const CobaltCreativeTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, contact, sections, socials } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;
  const allSkillsList = skills.flatMap((c) => c.skills);

  return (
    <div
      className="min-h-screen font-sans bg-[#08080a] text-white selection:bg-blue-600 selection:text-white transition-colors relative overflow-hidden"
      style={{
        fontFamily: theme.typography.bodyFont || "'Space Grotesk', sans-serif"
      }}
    >
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#08080a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="font-extrabold text-xl tracking-tighter flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-600 rounded-sm inline-block" />
            <span className="uppercase">{personal.fullName.split(' ')[0]}</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <a href="#hero" className="hover:text-blue-500 transition-colors">Home</a>
            {isEnabled('projects') && <a href="#works" className="hover:text-blue-500 transition-colors">Works</a>}
            {isEnabled('about') && <a href="#journey" className="hover:text-blue-500 transition-colors">Story</a>}
            {isEnabled('contact') && <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>}
          </nav>

          <a
            href={`mailto:${contact.email || personal.email}`}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            Let's Talk
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 space-y-28">

        {/* 2. Hero Section: "CREATIVE WORLD" with Floating Pantone Swatches */}
        {isEnabled('hero') && (
          <section id="hero" className="relative pt-8 space-y-12">
            {/* Massive Typographic Display */}
            <div className="relative">
              <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-[0.88] text-white select-none">
                CREATIVE
                <br />
                WORLD
              </h1>

              {/* Floating Pantone Swatch Card 1 */}
              <div className="hidden sm:block absolute top-2 left-[48%] -translate-x-1/2 w-40 p-2.5 rounded-xl bg-white text-black shadow-2xl rotate-[-12deg] hover:rotate-0 transition-transform duration-300 border border-slate-200">
                <div className="h-28 rounded-lg bg-blue-600 mb-2" />
                <div className="text-[10px] font-bold tracking-tight uppercase">PANTONE®</div>
                <div className="text-[9px] text-slate-600 font-mono">19-4052 Classic Blue</div>
              </div>

              {/* Floating Pantone Swatch Card 2 */}
              <div className="hidden md:block absolute top-10 left-[70%] w-40 p-2.5 rounded-xl bg-white text-black shadow-2xl rotate-[8deg] hover:rotate-0 transition-transform duration-300 border border-slate-200">
                <div className="h-28 rounded-lg bg-blue-700 mb-2" />
                <div className="text-[10px] font-bold tracking-tight uppercase">PANTONE®</div>
                <div className="text-[9px] text-slate-600 font-mono">286 C Electric Blue</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-widest pt-4 border-t border-white/10">
              <span>// {personal.headline || 'Visual Architecture & Creative Engineering'}</span>
              <span>{personal.location}</span>
            </div>

            {/* Video / Featured Card Preview */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-4">
              <div className="md:col-span-6 rounded-3xl bg-slate-900/80 border border-white/10 p-8 h-80 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-900 to-black" />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                    Creative Vision
                  </span>
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={14} className="fill-white ml-0.5" />
                  </div>
                </div>

                <div className="relative z-10 space-y-1">
                  <div className="text-lg font-bold text-white uppercase">{personal.fullName}</div>
                  <p className="text-xs text-slate-300 line-clamp-2">{personal.tagline}</p>
                </div>
              </div>

              <div className="md:col-span-6 space-y-6">
                <blockquote className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  "Design is not just what it looks like and feels like. Design is how it works."
                </blockquote>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {about.summary}
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${contact.email || personal.email}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300"
                  >
                    <span>Start a Conversation</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. Organic Pill Badge Cloud */}
        {isEnabled('skills') && (
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              I transform ideas into compelling visuals that leave a lasting impact.
            </h2>

            <div className="p-8 sm:p-10 rounded-3xl bg-blue-600 text-white shadow-2xl relative overflow-hidden">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-200 mb-6">
                // Creative Expertise & Systems
              </div>

              <div className="flex flex-wrap gap-2.5 items-center">
                {allSkillsList.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 hover:scale-105 transition-all shadow-md"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Overlapping Stacked Projects Deck */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="works" className="space-y-10">
            <div className="flex items-end justify-between">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                My most impactful and innovative works
              </h2>
            </div>

            <div className="space-y-8">
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  className={`rounded-3xl p-8 sm:p-10 transition-all border ${
                    idx === 0
                      ? 'bg-blue-600 text-white border-blue-500 shadow-2xl'
                      : 'bg-white text-slate-900 border-slate-200 shadow-xl'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider mb-6 opacity-75">
                    <span>Case Study #{idx + 1}</span>
                    <span>{proj.role || 'Design & Engineering'}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
                        {proj.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${idx === 0 ? 'text-blue-100' : 'text-slate-600'}`}>
                        {proj.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className={`text-[11px] font-mono px-3 py-1 rounded-full ${
                              idx === 0 ? 'bg-blue-700/80 text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>

                      {proj.liveUrl && (
                        <div className="pt-4">
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                              idx === 0
                                ? 'bg-white text-blue-600 hover:bg-slate-100'
                                : 'bg-slate-900 text-white hover:bg-blue-600'
                            }`}
                          >
                            <span>Explore Project</span>
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-black/10">
                      {proj.imageUrl ? (
                        <img
                          src={proj.imageUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-5xl font-black uppercase opacity-20">
                          {proj.title.slice(0, 4)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. "Every masterpiece begins with a single step" (Narrative / Experience) */}
        {isEnabled('about') && (
          <section id="journey" className="space-y-8 pt-8 border-t border-white/10">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Every masterpiece begins with a single step
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-5 h-72 rounded-3xl bg-blue-600 p-8 flex flex-col justify-end text-white shadow-2xl">
                <div className="text-3xl font-black uppercase">Execution & Precision</div>
                <p className="text-xs text-blue-100 mt-2">Iterative methodologies built for visionary brands.</p>
              </div>

              <div className="md:col-span-7 space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-blue-400">01 // DISCOVERY & STRATEGY</div>
                  <h4 className="text-base font-bold text-white">Deep Research & Framing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Understanding the core audience, market differentiators, and system requirements.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-blue-400">02 // ARCHITECTURE & PROTOTYPING</div>
                  <h4 className="text-base font-bold text-white">High-Fidelity Engineering</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Translating strategic insights into resilient code, design tokens, and modular components.</p>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                  <div className="text-xs font-mono text-blue-400">03 // SCALE & IMPACT</div>
                  <h4 className="text-base font-bold text-white">Continuous Delivery & Polishing</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Measuring performance, validating accessibility, and deploying seamless digital solutions.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. Footer Call-to-Action: "I'D LOVE TO HEAR FROM YOU!" */}
        {isEnabled('contact') && (
          <section id="contact" className="pt-8">
            <div className="rounded-3xl bg-gradient-to-b from-blue-600 to-blue-700 p-10 sm:p-14 text-white shadow-2xl space-y-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-center">
                I'D LOVE TO HEAR FROM YOU!
              </h2>

              <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold uppercase">Let's Stay Connected</h3>
                  <p className="text-xs text-blue-100 mt-1">{contact.socialMessage || "Reach out for new projects, partnerships, or creative collaborations."}</p>
                </div>

                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-8 py-3.5 rounded-full bg-white text-blue-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shadow-lg text-center"
                >
                  {contact.email || personal.email}
                </a>
              </div>

              {socials && socials.length > 0 && (
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-blue-600 text-white flex items-center justify-center transition-colors"
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

      <footer className="py-10 border-t border-white/5 text-center text-xs text-slate-500 uppercase tracking-widest font-mono">
        <p>© {new Date().getFullYear()} {personal.fullName} • Cobalt Creative System</p>
      </footer>
    </div>
  );
};
