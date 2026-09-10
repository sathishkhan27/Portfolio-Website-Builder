import React, { useState } from 'react';
import { TemplateProps } from '../../types/template';
import {
  Download, Mail, ArrowUpRight, GraduationCap, Award,
  ExternalLink, Check, Copy, Sparkles, Send, Globe
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

const TwitterIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const SleekNoirTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, education, certifications, contact, sections, socials, resume } = data;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [projectTab, setProjectTab] = useState<'all' | 'dev' | 'design'>('all');

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email || personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const allSkillsList = skills.flatMap((c) => c.skills);

  return (
    <div
      className="min-h-screen font-sans bg-[#000000] text-slate-200 selection:bg-slate-800 selection:text-white transition-colors pb-16"
      style={{
        fontFamily: theme.typography.bodyFont || "'Inter', sans-serif"
      }}
    >
      {/* 1. Floating Pill Navigation Bar */}
      <div className="pt-6 px-4 max-w-4xl mx-auto sticky top-4 z-50">
        <header className="bg-[#121214]/90 backdrop-blur-md border border-[#25252b] rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl">
          {resume.downloadUrl || resume.viewUrl ? (
            <a
              href={resume.downloadUrl || resume.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1c1c22] hover:bg-[#282832] text-white text-xs font-semibold border border-[#30303a] transition-all"
            >
              <Download size={13} />
              <span>Download Resume</span>
            </a>
          ) : (
            <a
              href={`mailto:${contact.email || personal.email}`}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1c1c22] hover:bg-[#282832] text-white text-xs font-semibold border border-[#30303a] transition-all"
            >
              <Mail size={13} />
              <span>Hire Me</span>
            </a>
          )}

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            {isEnabled('about') && <a href="#about" className="hover:text-white transition-colors">About</a>}
            {isEnabled('projects') && <a href="#projects" className="hover:text-white transition-colors">Projects</a>}
            {isEnabled('contact') && <a href="#contact" className="hover:text-white transition-colors">Contact</a>}
          </nav>
        </header>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-16">

        {/* 2. Hero Section: Split with Glowing Circular Portrait */}
        {isEnabled('hero') && (
          <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center pt-8">
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  {personal.headline || 'Full Stack Engineer & Designer'}
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                  <span className="text-slate-400 font-bold">MR. </span>
                  {personal.fullName}
                </h1>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                {personal.tagline || about.summary}
              </p>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="px-7 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-md"
                >
                  Hire Me
                </a>
              </div>

              {/* Social Icons Row */}
              {socials && socials.length > 0 && (
                <div className="flex items-center gap-4 pt-2 text-slate-400">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-1"
                      title={s.label}
                    >
                      {s.platform === 'github' && <GithubIcon size={17} />}
                      {s.platform === 'linkedin' && <LinkedinIcon size={17} />}
                      {s.platform === 'twitter' && <TwitterIcon size={17} />}
                      {s.platform !== 'github' && s.platform !== 'linkedin' && s.platform !== 'twitter' && <Globe size={17} />}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Circular Monochrome Portrait with Glow */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative">
                {/* Radial monochrome backlight */}
                <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl transform scale-110 -z-10" />
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full p-1 bg-gradient-to-b from-white/30 via-slate-800 to-transparent shadow-2xl">
                  {personal.avatarUrl ? (
                    <img
                      src={personal.avatarUrl}
                      alt={personal.fullName}
                      className="w-full h-full rounded-full object-cover grayscale contrast-125 brightness-95"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#121214] flex items-center justify-center text-4xl font-mono text-slate-400">
                      {personal.fullName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. About Me Full Card */}
        {isEnabled('about') && (
          <section id="about">
            <div className="p-8 rounded-3xl bg-[#0f0f12] border border-[#222227] space-y-4 shadow-xl">
              <h2 className="text-xl font-bold text-white tracking-tight">About Me</h2>
              <div className="text-sm text-slate-400 leading-relaxed space-y-3">
                <p>{about.summary}</p>
                {about.storyParagraphs && about.storyParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Education & Certifications Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEnabled('education') && (
            <div className="p-7 rounded-3xl bg-[#0f0f12] border border-[#222227] space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <GraduationCap size={18} className="text-slate-400" />
                <span>Education</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 text-xs">
                    <div className="text-white font-semibold">{edu.degree} in {edu.fieldOfStudy}</div>
                    <div className="text-slate-400">{edu.institution}</div>
                    <div className="text-slate-500 font-mono">{edu.startDate} – {edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEnabled('certifications') && (
            <div className="p-7 rounded-3xl bg-[#0f0f12] border border-[#222227] space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Award size={18} className="text-slate-400" />
                <span>Certifications & Courses</span>
              </h2>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="space-y-1 text-xs">
                    <div className="text-white font-semibold">{cert.name}</div>
                    <div className="text-slate-400">{cert.issuer} ({cert.issueDate})</div>
                  </div>
                ))}
                {certifications.length === 0 && (
                  <div className="text-xs text-slate-500 italic">Continuous learning in modern cloud and web engineering.</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 5. Skills & Technologies Grid */}
        {isEnabled('skills') && (
          <section id="skills" className="p-8 rounded-3xl bg-[#0f0f12] border border-[#222227] space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white tracking-tight">Skills & Technologies</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {allSkillsList.map((skill) => (
                <div
                  key={skill.id}
                  className="p-3 rounded-2xl bg-[#16161b] border border-[#2a2a32] flex flex-col items-center justify-center text-center hover:border-slate-400 transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white mb-2 group-hover:bg-white group-hover:text-black transition-colors">
                    {skill.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white truncate max-w-full">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. My Projects Section */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white tracking-tight">My Projects</h2>
              <div className="flex items-center gap-1.5 bg-[#121215] p-1 rounded-full border border-[#222227]">
                <button
                  onClick={() => setProjectTab('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    projectTab === 'all' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setProjectTab('dev')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    projectTab === 'dev' ? 'bg-white text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Featured
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {(projectTab === 'dev' ? projects.filter((p) => p.featured) : projects).map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#0f0f12] border border-[#222227] hover:border-[#383842] overflow-hidden flex flex-col group transition-all"
                >
                  <div className="h-44 bg-[#16161b] relative overflow-hidden flex items-center justify-center">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-500 text-xs font-mono">
                        🖥️ {proj.title}
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-200 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {proj.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1e1e24] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {proj.tags[0] ? `#${proj.tags[0]}` : ''}
                      </span>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>View</span>
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Contact Me Footer Bar */}
        {isEnabled('contact') && (
          <section id="contact" className="space-y-4 pt-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Contact Me</h2>
            <div className="p-6 rounded-3xl bg-[#0f0f12] border border-[#222227] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#16161b] hover:bg-[#202026] border border-[#2a2a32] text-xs font-mono text-white transition-all text-left"
              >
                <Mail size={15} className="text-slate-400" />
                <span>{contact.email || personal.email}</span>
                {copiedEmail ? <Check size={14} className="text-emerald-400 ml-2" /> : <Copy size={13} className="text-slate-500 ml-2" />}
              </button>

              {socials && socials.length > 0 && (
                <div className="flex items-center gap-3 text-slate-400">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-2xl bg-[#16161b] hover:bg-white hover:text-black flex items-center justify-center transition-colors"
                      title={s.label}
                    >
                      {s.platform === 'github' && <GithubIcon size={16} />}
                      {s.platform === 'linkedin' && <LinkedinIcon size={16} />}
                      {s.platform === 'twitter' && <TwitterIcon size={16} />}
                      {s.platform !== 'github' && s.platform !== 'linkedin' && s.platform !== 'twitter' && <Globe size={16} />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </main>

      <footer className="max-w-4xl mx-auto px-6 pt-12 text-xs text-slate-600 flex items-center justify-between border-t border-[#18181d] mt-16">
        <span>© {new Date().getFullYear()} All Rights Reserved</span>
        <span>Developed by {personal.fullName}</span>
      </footer>
    </div>
  );
};
