import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Menu, X, FileText, Mail, ArrowUpRight } from 'lucide-react';

interface ModernNavbarProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernNavbar: React.FC<ModernNavbarProps> = ({ data, theme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { personal, sections, resume } = data;

  const activeNavItems = sections
    .filter((s) => s.enabled && s.key !== 'hero')
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300"
      style={{
        backgroundColor: theme.mode === 'dark' ? 'rgba(7, 10, 19, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderColor: 'var(--theme-border)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-lg transition-transform group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                color: '#ffffff'
              }}
            >
              {personal.avatarFallback || getInitials(personal.fullName)}
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                {personal.fullName}
              </div>
              <div className="text-[11px] text-slate-400 font-mono line-clamp-1 max-w-[180px]">
                {personal.headline.split('|')[0] || personal.headline}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            {activeNavItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className="hover:text-white transition-colors capitalize tracking-wide hover:underline decoration-2 underline-offset-8"
                style={{ textDecorationColor: theme.colors.primary }}
              >
                {item.label.split('&')[0].trim()}
              </a>
            ))}
          </div>

          {/* Desktop Actions: Resume & Socials */}
          <div className="hidden md:flex items-center gap-3">
            {resume.downloadUrl && (
              <a
                href={resume.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white transition-all shadow-sm hover:scale-105"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
              >
                <FileText size={13} />
                <span>Resume</span>
              </a>
            )}
            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg border text-slate-200 hover:text-white transition-colors"
              style={{ borderColor: theme.colors.border }}
            >
              <span>Connect</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-slate-950/95 border-b border-slate-800 animate-fadeIn">
          {activeNavItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg capitalize"
            >
              {item.label}
            </a>
          ))}
          {resume.downloadUrl && (
            <a
              href={resume.downloadUrl}
              className="block w-full text-center px-4 py-2 text-xs font-medium text-white rounded-lg"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Download Resume
            </a>
          )}
        </div>
      )}
    </nav>
  );
};
