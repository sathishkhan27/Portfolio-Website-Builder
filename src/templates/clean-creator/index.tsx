import React from 'react';
import { TemplateProps } from '../../types/template';
import {
  ArrowUpRight, Mail, MapPin, Briefcase, GraduationCap,
  ExternalLink, Layers, Sparkles, Send, Globe, ChevronRight,
  Code2, Palette, Cpu, Smartphone, Compass
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

export const CleanCreatorTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, education, contact, sections, socials } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return <GithubIcon size={16} />;
      case 'linkedin': return <LinkedinIcon size={16} />;
      case 'twitter': return <TwitterIcon size={16} />;
      default: return <Globe size={16} />;
    }
  };

  const toolboxItems = [
    { name: 'Figma', category: 'Interface Design', color: 'from-purple-500 to-pink-500', icon: '🎨' },
    { name: 'Framer', category: 'Prototyping', color: 'from-blue-600 to-cyan-500', icon: '⚡' },
    { name: 'Webflow', category: 'Visual Dev', color: 'from-blue-500 to-indigo-600', icon: '🌐' },
    { name: 'React', category: 'Frontend Engine', color: 'from-cyan-400 to-blue-500', icon: '⚛️' },
    { name: 'Tailwind CSS', category: 'Styling Architecture', color: 'from-teal-400 to-cyan-500', icon: '🌊' },
    { name: 'Notion', category: 'Product Knowledge', color: 'from-slate-700 to-slate-900', icon: '📝' },
    { name: 'Shopify', category: 'Commerce Engine', color: 'from-emerald-500 to-green-600', icon: '🛍️' },
    { name: 'Illustrator', category: 'Vector Assets', color: 'from-amber-600 to-orange-600', icon: '✒️' },
    { name: 'Photoshop', category: 'Visual Imaging', color: 'from-blue-700 to-indigo-800', icon: '🖼️' },
    { name: 'After Effects', category: 'Motion Design', color: 'from-indigo-600 to-purple-700', icon: '🎬' }
  ];

  return (
    <div
      className="min-h-screen font-sans bg-[#fafafa] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 transition-colors"
      style={{
        fontFamily: theme.typography.bodyFont || "'Plus Jakarta Sans', sans-serif"
      }}
    >
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight group-hover:scale-105 transition-transform">
              {personal.fullName.charAt(0)}
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-base">
              {personal.fullName.split(' ')[0]}<span className="text-indigo-600">.</span>
            </span>
          </a>

          {/* Centered Navigation Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-xs">
            <a href="#hero" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all">
              Home
            </a>
            {isEnabled('projects') && (
              <a href="#portfolio" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all">
                Portfolio
              </a>
            )}
            {isEnabled('about') && (
              <a href="#journey" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all">
                Journey
              </a>
            )}
            {isEnabled('contact') && (
              <a href="#contact" className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-white transition-all">
                Contact
              </a>
            )}
          </nav>

          {/* Right Action */}
          <a
            href={`mailto:${contact.email || personal.email}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-indigo-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Mail size={13} />
            <span>Get in Touch</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Section with Floating Tool Badges & Center Profile */}
      {isEnabled('hero') && (
        <section id="hero" className="pt-16 pb-20 px-6 max-w-5xl mx-auto text-center relative overflow-hidden">
          {/* Ambient soft glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Center Avatar with Interactive Floating Tags */}
          <div className="relative inline-block mb-10">
            <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full p-1.5 bg-gradient-to-tr from-indigo-500/20 via-slate-200 to-indigo-500/40 shadow-xl">
              {personal.avatarUrl ? (
                <img
                  src={personal.avatarUrl}
                  alt={personal.fullName}
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-400">
                  {personal.fullName.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            {/* Floating Badge Left */}
            <div className="hidden sm:flex absolute -left-16 top-8 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 border border-slate-200/80 shadow-lg shadow-slate-200/50 backdrop-blur-sm animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold text-slate-800">
                {personal.availabilityStatus === 'available' ? 'Available' : 'Open to offers'}
              </span>
            </div>

            {/* Floating Badge Right */}
            <div className="hidden sm:flex absolute -right-16 top-16 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 border border-slate-200/80 shadow-lg shadow-slate-200/50 backdrop-blur-sm">
              <span className="text-sm">✨</span>
              <span className="text-xs font-semibold text-slate-800">
                {personal.yearsOfExperience}+ Yrs Exp
              </span>
            </div>
          </div>

          {/* Tagline chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60">
              Product Design
            </span>
            <span className="px-3.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium border border-indigo-100">
              UI/UX Engineering
            </span>
            <span className="px-3.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/60">
              Full Stack Solutions
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-3xl mx-auto leading-tight">
            Hello, I'm{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-900 to-indigo-600">
              {personal.fullName}
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {personal.tagline || personal.headline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${contact.email || personal.email}`}
              className="px-7 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Mail size={15} />
              <span>Contact Me</span>
            </a>
            {isEnabled('projects') && (
              <a
                href="#portfolio"
                className="px-7 py-3.5 rounded-full bg-white text-slate-800 text-sm font-semibold border border-slate-200 hover:bg-slate-50 transition-all shadow-xs flex items-center gap-2"
              >
                <span>View Portfolio</span>
                <ChevronRight size={15} />
              </a>
            )}
          </div>
        </section>
      )}

      {/* Main 2-Column Split Content Layout */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-24">

        {/* 3. My Journey (About) */}
        {isEnabled('about') && (
          <section id="journey" className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200/70">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Background</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  My <span className="text-indigo-600">Journey</span>
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-3">
                  <MapPin size={13} className="text-slate-400" />
                  <span>{personal.location}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-slate-600 text-base leading-relaxed">
              <p className="text-lg font-medium text-slate-800 leading-snug">
                {about.summary}
              </p>
              {about.storyParagraphs && about.storyParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
              
              {/* Highlights cards */}
              {about.highlights && about.highlights.length > 0 && (
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {about.highlights.map((h, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-xs flex items-start gap-2.5">
                      <Sparkles size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. Work History */}
        {isEnabled('experience') && experience.length > 0 && (
          <section id="experience" className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200/70">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Career</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Work <span className="text-indigo-600">History</span>
                </h2>
                <p className="text-xs text-slate-500 mt-2">
                  Proven leadership and execution across high-growth products.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                      <div className="text-sm font-semibold text-indigo-600">{exp.company}</div>
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                      {exp.achievements.map((ach, ai) => (
                        <li key={ai} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    {exp.type && (
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {exp.type}
                      </span>
                    )}
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Education & Courses */}
        {isEnabled('education') && education.length > 0 && (
          <section id="education" className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200/70">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Academics</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Education & <span className="text-indigo-600">Courses</span>
                </h2>
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-base font-bold text-slate-900">{edu.institution}</h3>
                      <span className="text-xs font-medium text-slate-500">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700">{edu.degree} in {edu.fieldOfStudy}</div>
                    {edu.activities && (
                      <p className="text-xs text-slate-500 mt-1">{edu.activities}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Skill Set */}
        {isEnabled('skills') && skills.length > 0 && (
          <section id="skills" className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-slate-200/70">
            <div className="md:col-span-4">
              <div className="sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Competencies</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                  Skill <span className="text-indigo-600">Set</span>
                </h2>
                <p className="text-xs text-slate-500 mt-2">
                  Specialized methodologies, tools, and technical proficiency.
                </p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-6">
              {skills.map((cat) => (
                <div key={cat.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {cat.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-3.5 py-1.5 rounded-full bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 text-xs font-semibold text-slate-700 hover:text-indigo-700 transition-colors"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Design & Development Toolbox */}
        <section className="pt-16 pb-10 text-center border-t border-slate-200/70">
          <div className="max-w-xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Design & Development Toolbox
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              A curated suite of modern technologies and workflows leveraged to craft high-converting, resilient digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {toolboxItems.map((tool) => (
              <div
                key={tool.name}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <div className="text-sm font-bold text-slate-900">{tool.name}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{tool.category}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Portfolio (Projects) */}
        {isEnabled('projects') && projects.length > 0 && (
          <section id="portfolio" className="pt-8 border-t border-slate-200/70 space-y-10">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Featured Work</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mt-1">Portfolio</h2>
              <p className="text-sm text-slate-500 mt-2">
                Selected client solutions, web applications, and digital platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all overflow-hidden flex flex-col group"
                >
                  {/* Mockup Preview Area */}
                  <div className="h-60 bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-50/30 p-6 flex items-center justify-center relative overflow-hidden border-b border-slate-100">
                    {proj.imageUrl ? (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Realistic Device Frame Mockup */
                      <div className="w-48 h-full rounded-2xl bg-slate-900 p-2 shadow-2xl border-2 border-slate-800 flex flex-col transform group-hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-2" />
                        <div className="flex-1 bg-gradient-to-br from-indigo-900 to-slate-950 rounded-xl p-3 text-white flex flex-col justify-end">
                          <div className="text-[11px] font-bold truncate">{proj.title}</div>
                          <div className="text-[9px] text-slate-400 truncate">{proj.role || 'Application'}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {proj.title}
                        </h3>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                          >
                            <ArrowUpRight size={18} />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                          >
                            <span>Visit Project</span>
                            <ArrowUpRight size={13} />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                          >
                            <GithubIcon size={13} />
                            <span>Source</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Let's Stay Connected Footer Card */}
        {isEnabled('contact') && (
          <section id="contact" className="pt-12">
            <div className="rounded-3xl bg-white border border-slate-200/90 p-10 md:p-14 text-center shadow-lg relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
                <Send size={20} />
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                Let's Stay Connected
              </h2>

              <p className="text-sm text-slate-600 max-w-lg mx-auto mb-8 leading-relaxed">
                {contact.socialMessage || "Interested in starting a project or sharing ideas? Drop me an email or find me across the web."}
              </p>

              <a
                href={`mailto:${contact.email || personal.email}`}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Mail size={16} />
                <span>{contact.email || personal.email}</span>
              </a>

              {/* Social Links Row */}
              {socials && socials.length > 0 && (
                <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-slate-100">
                  {socials.map((s) => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 flex items-center justify-center transition-colors"
                      title={s.label}
                    >
                      {getSocialIcon(s.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </div>

      {/* Subtle Copyright Footer */}
      <footer className="py-10 border-t border-slate-200/60 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} {personal.fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
};
