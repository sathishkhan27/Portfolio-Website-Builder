import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Calendar, MapPin, Building2, ExternalLink, ArrowRight } from 'lucide-react';

interface ModernExperienceProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernExperience: React.FC<ModernExperienceProps> = ({ data, theme }) => {
  const { experience } = data;

  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}30`
            }}
          >
            Career Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Work Experience
          </h2>
          <p className="text-slate-400 text-base">
            Track record of driving technical impact, team scaling, and system reliability across startups and enterprises.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10 space-y-12 before:absolute before:left-2 md:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {experience.map((item, index) => (
            <div key={item.id} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div
                className="absolute -left-[27px] md:-left-[35px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 transition-transform group-hover:scale-125"
                style={{
                  backgroundColor: item.current ? theme.colors.primary : theme.colors.secondary,
                  boxShadow: item.current ? `0 0 12px ${theme.colors.primary}` : 'none'
                }}
              />

              {/* Experience Card */}
              <div
                className="p-6 md:p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-all hover:border-slate-700"
                style={{
                  backgroundColor: 'var(--theme-card)',
                  borderColor: 'var(--theme-border)'
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                      <Building2 size={14} style={{ color: theme.colors.primary }} />
                      <span>{item.company}</span>
                      {item.companyUrl && (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-500 hover:text-white"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="inline-flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
                      <Calendar size={12} />
                      {item.startDate} — {item.current ? 'Present' : item.endDate}
                    </span>
                    {item.location && (
                      <span className="inline-flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-md border border-slate-800">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    )}
                    {item.current && (
                      <span
                        className="px-2.5 py-0.5 rounded-full font-sans font-bold text-[11px] text-white"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                </div>

                {/* Role Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {item.achievements.map((ach, achIdx) => (
                      <div key={achIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <ArrowRight
                          size={14}
                          className="shrink-0 mt-0.5 text-slate-500"
                          style={{ color: theme.colors.primary }}
                        />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Badges */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
