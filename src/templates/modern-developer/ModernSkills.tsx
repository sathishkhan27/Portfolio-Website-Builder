import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Layers, Terminal, Sparkles, Cpu, Check } from 'lucide-react';

interface ModernSkillsProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernSkills: React.FC<ModernSkillsProps> = ({ data, theme }) => {
  const { skills } = data;
  const [activeCategory, setActiveCategory] = useState<string>(
    skills[0]?.id || 'all'
  );

  if (!skills || skills.length === 0) return null;

  const currentCategory = skills.find((c) => c.id === activeCategory) || skills[0];

  return (
    <section id="skills" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}30`
            }}
          >
            Technical Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Skills & Core Capabilities
          </h2>
          <p className="text-slate-400 text-base">
            Battle-tested technologies and architectural disciplines refined across real-world production environments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skills.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
              style={
                activeCategory === category.id
                  ? {
                      backgroundColor: theme.colors.primary,
                      boxShadow: `0 4px 20px -2px ${theme.colors.primary}40`
                    }
                  : {}
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skill Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {currentCategory?.skills.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-xl border backdrop-blur-md transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">{skill.name}</span>
                  {skill.years && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {skill.years} yrs
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
