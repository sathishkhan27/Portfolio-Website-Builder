import React from 'react';
import { TemplateProps } from '../../types/template';
import { ExternalLink, ArrowUpRight, Mail } from 'lucide-react';

export const MinimalCleanTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personal, about, skills, experience, projects, education, certifications, contact, sections, socials } = data;

  const isEnabled = (key: string) => sections.find((s) => s.key === key)?.enabled !== false;

  return (
    <div
      className="min-h-screen font-sans selection:bg-slate-200 selection:text-slate-900 transition-colors duration-300"
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24 space-y-20">
        
        {/* Minimal Header / Intro */}
        {isEnabled('hero') && (
          <header className="space-y-6 border-b pb-12" style={{ borderColor: theme.colors.border }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                {personal.availabilityStatus === 'available' ? '● Available for hire' : '● Engaged'}
              </span>
              <span className="text-xs font-mono text-slate-400">{personal.location}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                {personal.fullName}
              </h1>
              <p className="text-lg text-slate-300">
                {personal.headline}
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
              {personal.tagline}
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs font-mono">
              <a
                href={`mailto:${personal.email}`}
                className="underline underline-offset-4 hover:text-white transition-colors"
                style={{ color: theme.colors.primary }}
              >
                {personal.email}
              </a>
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </header>
        )}

        {/* Minimal About */}
        {isEnabled('about') && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">About</h2>
            <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
              <p>{about.summary}</p>
              {about.storyParagraphs.slice(0, 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Minimal Projects */}
        {isEnabled('projects') && projects.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id} className="group border-b pb-6" style={{ borderColor: theme.colors.border }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {proj.title}
                    </h3>
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1">
                        Live <ArrowUpRight size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-2 leading-relaxed">{proj.shortDescription}</p>
                  <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-500">
                    {proj.tags.map((t) => (
                      <span key={t}>#{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Minimal Experience */}
        {isEnabled('experience') && experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <div className="font-semibold text-sm text-white">
                      {exp.role} <span className="text-slate-400 font-normal">at {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Minimal Contact */}
        {isEnabled('contact') && (
          <section className="space-y-4 border-t pt-10" style={{ borderColor: theme.colors.border }}>
            <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400">Contact</h2>
            <p className="text-sm text-slate-300">
              Reach out via email at{' '}
              <a href={`mailto:${contact.email || personal.email}`} className="font-semibold underline underline-offset-4" style={{ color: theme.colors.primary }}>
                {contact.email || personal.email}
              </a>
            </p>
          </section>
        )}

      </div>
    </div>
  );
};
