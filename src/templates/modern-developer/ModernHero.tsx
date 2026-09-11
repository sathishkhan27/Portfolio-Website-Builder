import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { MapPin, Briefcase, Download, ArrowRight, Mail, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../ui/SocialIcons';

interface ModernHeroProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ data, theme }) => {
  const { personal, socials, resume } = data;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return <GithubIcon size={16} />;
      case 'linkedin': return <LinkedinIcon size={16} />;
      case 'twitter': return <TwitterIcon size={16} />;
      case 'email': return <Mail size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Background Accent Gradients */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Availability Status Badge */}
            {personal.availabilityStatus !== 'not_available' && (
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border bg-slate-900/60 backdrop-blur-md text-xs font-medium"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                </span>
                <span className="text-slate-300">
                  {personal.availabilityText || 'Available for New Projects & Roles'}
                </span>
              </div>
            )}

            {/* Name & Headline */}
            <div className="space-y-3">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                style={{ color: theme.colors.text }}
              >
                Hi, I'm{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`
                  }}
                >
                  {personal.fullName}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight" style={{ color: theme.colors.text }}>
                {personal.headline}
              </p>
            </div>

            {/* Tagline / Bio */}
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed opacity-80" style={{ color: theme.colors.text }}>
              {personal.tagline}
            </p>

            {/* Metadata Chips: Location & Experience */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
              >
                <MapPin size={14} style={{ color: theme.colors.primary }} />
                <span>{personal.location}</span>
              </div>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  color: theme.colors.text
                }}
              >
                <Briefcase size={14} style={{ color: theme.colors.secondary }} />
                <span>{personal.yearsOfExperience}+ Years Experience</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  boxShadow: `0 10px 25px -5px ${theme.colors.primary}40`
                }}
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:text-white transition-all active:scale-95"
              >
                <span>Get In Touch</span>
              </a>

              {resume.downloadUrl && (
                <a
                  href={resume.downloadUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </a>
              )}
            </div>

            {/* Social Links Row */}
            {socials && socials.length > 0 && (
              <div className="pt-4 flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">Connect:</span>
                <div className="flex items-center gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all hover:-translate-y-0.5"
                      title={social.label}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Hero Column: Terminal / Interactive Tech Card */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl border p-5 shadow-2xl backdrop-blur-xl"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">architect.ts</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <Terminal size={12} />
                  <span>zsh</span>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="pt-4 space-y-2 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                <div className="text-slate-500">// Welcome to my engineering portfolio</div>
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-cyan-300">architect</span> = {'{'}
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300">'{personal.fullName}'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-emerald-300">'{personal.headline.split('·')[0].trim()}'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">experience:</span>{' '}
                  <span className="text-amber-300">{personal.yearsOfExperience}</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">status:</span>{' '}
                  <span className="text-indigo-400">'{personal.availabilityStatus}'</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">superpowers:</span> [
                  <span className="text-rose-300">'High-Scale Distributed Systems'</span>,{' '}
                  <span className="text-rose-300">'AI Agents'</span>,{' '}
                  <span className="text-rose-300">'UX Velocity'</span>
                  ]
                </div>
                <div>{'}'};</div>
                
                <div className="pt-2 text-slate-500">// Run healthcheck:</div>
                <div className="text-cyan-400 flex items-center gap-1">
                  <span>➜</span>
                  <span className="text-slate-200">architect.executeSystemTest();</span>
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px]">
                  ✓ 100% test coverage · P99 &lt; 40ms · 99.99% uptime
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
