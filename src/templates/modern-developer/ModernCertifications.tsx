import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface ModernCertificationsProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernCertifications: React.FC<ModernCertificationsProps> = ({ data, theme }) => {
  const { certifications } = data;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 border-t border-slate-800/60 relative">
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
            Verified Credentials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Certifications & Licenses
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-between gap-4 transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                  style={{
                    backgroundColor: `${theme.colors.secondary}15`,
                    color: theme.colors.secondary
                  }}
                >
                  <Award size={20} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {cert.name}
                  </h3>
                  <div className="text-xs text-slate-300">
                    Issued by <span className="font-semibold text-white">{cert.issuer}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="text-[11px] font-mono text-slate-400">
                      ID: {cert.credentialId}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono text-slate-400">
                <span>Issued: {cert.issueDate}</span>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-sans font-medium hover:text-white transition-colors"
                    style={{ color: theme.colors.primary }}
                  >
                    <span>Verify</span>
                    <ExternalLink size={11} />
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
