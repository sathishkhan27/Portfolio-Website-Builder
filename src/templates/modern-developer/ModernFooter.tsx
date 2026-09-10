import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { ArrowUp, Heart } from 'lucide-react';

interface ModernFooterProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernFooter: React.FC<ModernFooterProps> = ({ data, theme }) => {
  const { personal, socials } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="border-t py-12 transition-colors duration-300"
      style={{
        backgroundColor: theme.mode === 'dark' ? '#040711' : '#f1f5f9',
        borderColor: 'var(--theme-border)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Copyright & Brand */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-sm font-bold text-white tracking-tight">
              {personal.fullName}
            </div>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} All rights reserved. Crafted with clean architecture & modern web performance.
            </div>
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title={soc.label}
                >
                  <span className="text-xs font-mono">{soc.label[0]}</span>
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
