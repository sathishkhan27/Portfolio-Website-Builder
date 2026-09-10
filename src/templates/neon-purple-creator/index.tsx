import React from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowUpRight, Mail, Download, Sparkles, Star,
  CheckCircle2, ArrowRight, ExternalLink, Globe, Layers, Laptop
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

export const NeonPurpleCreatorTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, services, contact, sections, socials, resume } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  return (
    <div
      className="min-h-screen font-sans bg-[#08080c] text-slate-100 selection:bg-purple-900 selection:text-purple-200 transition-colors relative overflow-hidden"
      style={{
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* Ambient Neon Purple Gradient Halo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-purple-900/25 via-fuchsia-950/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#08080c]/85 backdrop-blur-md border-b border-purple-950/40">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-amber-400 p-0.5">
              <div className="w-full h-full bg-[#08080c] rounded-full flex items-center justify-center text-xs font-black text-white">
                {personal.fullName.charAt(0)}
              </div>
            </div>
            <span className="font-extrabold text-base tracking-tight uppercase text-white">
              {personal.fullName.split(' ')[0]}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-400">
            <a href="#hero" className="hover:text-purple-400 transition-colors">Home</a>
            {isEnabled('services') && <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>}
            {isEnabled('projects') && <a href="#works" className="hover:text-purple-400 transition-colors">Works</a>}
            {isEnabled('contact') && <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>}
          </nav>

          {resume.downloadUrl || resume.viewUrl ? (
            <a
              href={resume.downloadUrl || resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
            >
              Download CV
            </a>
          ) : (
            <a
              href={`mailto:${contact.email || personal.email}`}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold transition-all shadow-lg shadow-purple-600/30 hover:scale-105"
            >
              Contact Me
            </a>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 space-y-24">

        {/* 2. Hero: "HELLO FOLKS!" + Glowing Purple Ring Portrait */}
        {isEnabled('hero') && (
          <section id="hero" className="text-center pt-6 space-y-8 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-extrabold tracking-wider uppercase shadow-inner">
              HELLO FOLKS! 👋
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
              I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
                {personal.fullName}
              </span>
              .<br />
              Let's make something meaningful together.
            </h1>

            {/* Glowing Neon Ring Portrait */}
            <div className="relative inline-block my-4">
              <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-pink-500 shadow-2xl shadow-purple-600/50 relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full blur-xl bg-purple-500/40 -z-10 animate-pulse" />
                
                {personal.avatarUrl ? (
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-full h-full rounded-full object-cover shadow-inner"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#12121c] flex items-center justify-center text-5xl font-black text-purple-400">
                    {personal.fullName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
              {personal.tagline || personal.headline}
            </p>

            {/* 3. Stats Ribbon */}
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="p-5 rounded-2xl bg-[#12121a]/80 border border-purple-900/30 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">325+</div>
                <div className="text-xs text-slate-400 font-medium">Happy Clients</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12121a]/80 border border-purple-900/30 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{personal.yearsOfExperience}+</div>
                <div className="text-xs text-slate-400 font-medium">Years Exp.</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12121a]/80 border border-purple-900/30 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{projects.length * 10 || 100}+</div>
                <div className="text-xs text-slate-400 font-medium">Completed Projects</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12121a]/80 border border-purple-900/30 text-center space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">25M+</div>
                <div className="text-xs text-slate-400 font-medium">Projected Revenue</div>
              </div>
            </div>
          </section>
        )}

        {/* 4. My Services Grid with Corner Arrow */}
        {isEnabled('services') && (
          <section id="services" className="space-y-8 pt-8 border-t border-purple-950/40">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  My Services
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md">
                  I help businesses and individuals bring their ideas to life through thoughtful, high-converting digital products.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { title: 'UI/UX DESIGN', desc: 'Crafting user-centric workflows and high-fidelity interface prototypes.' },
                { title: 'WEB DESIGN', desc: 'Modern responsive web systems built for speed and visual storytelling.' },
                { title: 'LANDING PAGE', desc: 'High-conversion sales funnels and promotional experiences.' },
              ].map((s) => (
                <div
                  key={s.title}
                  className="p-6 rounded-3xl bg-gradient-to-b from-[#141422]/90 to-[#0c0c16] border border-purple-900/40 hover:border-purple-500/60 transition-all space-y-4 group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-purple-300">
                      {s.title}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-purple-950/60 text-purple-400 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <div className="h-28 rounded-2xl bg-gradient-to-tr from-purple-950/30 via-slate-900 to-black p-4 flex items-center justify-center text-3xl">
                    ✨
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. My Works (Horizontal Stacked Cards) */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="works" className="space-y-8 pt-8 border-t border-purple-950/40">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              My Works
            </h2>

            <div className="space-y-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 sm:p-8 rounded-3xl bg-[#11111a]/80 border border-purple-900/30 hover:border-purple-500/50 transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center group"
                >
                  <div className="md:col-span-5 h-48 rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-purple-950/50">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-3xl">📱</div>
                    )}
                  </div>

                  <div className="md:col-span-7 space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {proj.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {proj.tags.map((t) => (
                        <span key={t} className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-purple-950/60 text-purple-300 border border-purple-900/40">
                          {t}
                        </span>
                      ))}
                    </div>

                    {proj.liveUrl && (
                      <div className="pt-2">
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300"
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight size={14} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Footer Call-to-Action */}
        {isEnabled('contact') && (
          <section id="contact" className="pt-8">
            <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-[#181126] to-slate-950 p-10 sm:p-14 border border-purple-800/40 text-center space-y-6 shadow-2xl">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Let's Build Something
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Every great product starts with great design. Find the right path to turn your idea into something legendary.
              </p>

              <div>
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-purple-600/40 hover:scale-105"
                >
                  <Mail size={15} />
                  <span>Get In Touch</span>
                </a>
              </div>
            </div>
          </section>
        )}

      </main>

      <footer className="py-12 border-t border-purple-950/40 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {personal.fullName}. Crafted with Neon Purple Creator Template.</p>
      </footer>
    </div>
  );
};
