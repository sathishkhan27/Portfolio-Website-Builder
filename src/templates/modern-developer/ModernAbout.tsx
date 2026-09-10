import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { CheckCircle2, Award, Zap, Code, ShieldCheck } from 'lucide-react';

interface ModernAboutProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernAbout: React.FC<ModernAboutProps> = ({ data, theme }) => {
  const { about, personal } = data;

  return (
    <section id="about" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}30`
            }}
          >
            Engineering Leadership & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            About Me
          </h2>
          <p className="text-slate-400 text-base">
            {about.summary}
          </p>
        </div>

        {/* Metrics Grid */}
        {about.metrics && about.metrics.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {about.metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-6 rounded-2xl border backdrop-blur-md transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--theme-card)',
                  borderColor: 'var(--theme-border)'
                }}
              >
                <div
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-1"
                  style={{ color: theme.colors.primary }}
                >
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {metric.label}
                </div>
                {metric.description && (
                  <div className="text-xs text-slate-400 line-clamp-2">
                    {metric.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Story Narrative & Engineering Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Story Paragraphs */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
            {about.storyParagraphs.map((para, i) => (
              <p key={i} className="text-slate-300">
                {para}
              </p>
            ))}
          </div>

          {/* Highlights Checklist */}
          <div className="lg:col-span-5">
            <div
              className="p-6 rounded-2xl border backdrop-blur-md space-y-4"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                <ShieldCheck size={18} style={{ color: theme.colors.primary }} />
                <span>Key Milestones & Impact</span>
              </div>
              <div className="space-y-3 pt-2">
                {about.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2
                      size={16}
                      className="shrink-0 mt-0.5"
                      style={{ color: theme.colors.secondary }}
                    />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
