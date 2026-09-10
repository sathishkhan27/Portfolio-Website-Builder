import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { GraduationCap, Calendar, Award } from 'lucide-react';

interface ModernEducationProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernEducation: React.FC<ModernEducationProps> = ({ data, theme }) => {
  const { education } = data;

  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}30`
            }}
          >
            Academic Foundation
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Education
          </h2>
        </div>

        {/* Education List */}
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-6 rounded-2xl border backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    backgroundColor: `${theme.colors.primary}15`,
                    color: theme.colors.primary
                  }}
                >
                  <GraduationCap size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {edu.degree} · {edu.fieldOfStudy}
                  </h3>
                  <div className="text-sm text-slate-300 font-medium">
                    {edu.institution}
                  </div>
                  {edu.activities && (
                    <div className="text-xs text-slate-400">
                      {edu.activities}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-slate-400 shrink-0">
                <span className="inline-flex items-center gap-1 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                  <Calendar size={12} />
                  {edu.startDate} – {edu.endDate}
                </span>
                {edu.grade && (
                  <span className="text-emerald-400 font-medium">
                    {edu.grade}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
