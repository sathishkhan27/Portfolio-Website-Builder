import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { ExternalLink, Sparkles, Star, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../../ui/SocialIcons';

interface ModernProjectsProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernProjects: React.FC<ModernProjectsProps> = ({ data, theme }) => {
  const { projects } = data;
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  if (!projects || projects.length === 0) return null;

  const displayedProjects =
    filter === 'featured' ? projects.filter((p) => p.featured) : projects;

  return (
    <section id="projects" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{
                backgroundColor: `${theme.colors.primary}15`,
                color: theme.colors.primary,
                border: `1px solid ${theme.colors.primary}30`
              }}
            >
              Selected Work & Open Source
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-slate-400 text-base max-w-xl">
              Production architectures, developer infrastructure, and open-source packages engineered for scale.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                filter === 'featured'
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Featured ({projects.filter((p) => p.featured).length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all hover:border-slate-700 hover:-translate-y-1 group"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div>
                {/* Thumbnail Image / Visual Header */}
                {project.imageUrl ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    {project.featured && (
                      <span
                        className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-lg flex items-center gap-1"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <Star size={11} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>
                ) : (
                  <div
                    className="h-32 w-full p-4 flex flex-col justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary}15)`
                    }}
                  >
                    {project.featured && (
                      <span
                        className="self-end px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm flex items-center gap-1"
                        style={{ backgroundColor: theme.colors.primary }}
                      >
                        <Star size={11} fill="currentColor" />
                        Featured
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white"
                          title="Open Live App"
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                    {project.role && (
                      <div className="text-xs font-mono text-slate-400">
                        {project.role}
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                    {project.shortDescription}
                  </p>

                  {/* Impact Metric Callout */}
                  {project.impact && (
                    <div
                      className="p-2.5 rounded-lg text-xs font-medium border"
                      style={{
                        backgroundColor: `${theme.colors.primary}08`,
                        borderColor: `${theme.colors.primary}20`,
                        color: theme.colors.secondary
                      }}
                    >
                      ⚡ {project.impact}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <GithubIcon size={14} />
                    <span>Source Code</span>
                  </a>
                ) : <span />}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                    style={{ color: theme.colors.primary }}
                  >
                    <span>Live Preview</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
