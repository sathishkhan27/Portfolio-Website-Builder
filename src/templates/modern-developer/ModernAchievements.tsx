import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Trophy, ExternalLink, Sparkles } from 'lucide-react';

interface ModernAchievementsProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernAchievements: React.FC<ModernAchievementsProps> = ({ data, theme }) => {
  const { achievements } = data;

  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 border-t border-slate-800/60 relative">
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
            Honors & Recognitions
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Key Achievements & Talks
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl border backdrop-blur-md space-y-3 transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${theme.colors.primary}20`,
                      color: theme.colors.primary
                    }}
                  >
                    <Trophy size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {item.issuer} · {item.date}
                    </div>
                  </div>
                </div>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
