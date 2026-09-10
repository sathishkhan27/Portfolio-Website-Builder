import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Code, Cpu, Zap, Layers, Server, Shield } from 'lucide-react';

interface ModernServicesProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernServices: React.FC<ModernServicesProps> = ({ data, theme }) => {
  const { services } = data;

  if (!services || services.length === 0) return null;

  const getServiceIcon = (name?: string) => {
    switch (name) {
      case 'Cpu': return <Cpu size={22} />;
      case 'Zap': return <Zap size={22} />;
      case 'Server': return <Server size={22} />;
      case 'Shield': return <Shield size={22} />;
      default: return <Code size={22} />;
    }
  };

  return (
    <section id="services" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
            Capabilities & Engagements
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Services & Technical Advisory
          </h2>
          <p className="text-slate-400 text-base">
            How I collaborate with high-growth companies, venture-backed startups, and product organizations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl border backdrop-blur-md space-y-4 transition-all hover:border-slate-700 hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: `${theme.colors.primary}20`,
                  color: theme.colors.primary,
                  border: `1px solid ${theme.colors.primary}40`
                }}
              >
                {getServiceIcon(service.iconName)}
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight">
                {service.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {service.description}
              </p>

              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
