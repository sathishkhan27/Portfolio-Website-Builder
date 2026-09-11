import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { BuilderSidebar } from './BuilderSidebar';
import { PersonalInfoEditor } from './editors/PersonalInfoEditor';
import { AboutEditor } from './editors/AboutEditor';
import { SkillsEditor } from './editors/SkillsEditor';
import { ExperienceEditor } from './editors/ExperienceEditor';
import { ProjectsEditor } from './editors/ProjectsEditor';
import { ServicesEditor } from './editors/ServicesEditor';
import { EducationEditor } from './editors/EducationEditor';
import { CertificationsEditor } from './editors/CertificationsEditor';
import { AchievementsEditor } from './editors/AchievementsEditor';
import { SocialLinksEditor } from './editors/SocialLinksEditor';
import { ContactEditor } from './editors/ContactEditor';
import { ResumeEditor } from './editors/ResumeEditor';
import { SeoEditor } from './editors/SeoEditor';
import { SectionManager } from './SectionManager';
import { TemplateSelector } from './TemplateSelector';
import { ThemeCustomizer } from './ThemeCustomizer';
import { JsonImportExport } from './JsonImportExport';
import { ExportPanel } from './ExportPanel';
import { MembershipModal } from './MembershipModal';
import { LivePreviewBar } from '../live-preview/LivePreviewBar';
import { LivePreviewFrame } from '../live-preview/LivePreviewFrame';
import { Eye, Edit3 } from 'lucide-react';

export const BuilderLayout: React.FC = () => {
  const { activeTab } = usePortfolioStore();
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenPreview) {
        setIsFullscreenPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenPreview]);

  const renderActiveEditor = () => {
    switch (activeTab) {
      case 'personal': return <PersonalInfoEditor />;
      case 'about': return <AboutEditor />;
      case 'skills': return <SkillsEditor />;
      case 'experience': return <ExperienceEditor />;
      case 'projects': return <ProjectsEditor />;
      case 'services': return <ServicesEditor />;
      case 'education': return <EducationEditor />;
      case 'certifications': return <CertificationsEditor />;
      case 'achievements': return <AchievementsEditor />;
      case 'socials': return <SocialLinksEditor />;
      case 'contact': return <ContactEditor />;
      case 'resume': return <ResumeEditor />;
      case 'seo': return <SeoEditor />;
      case 'sections': return <SectionManager />;
      case 'templates': return <TemplateSelector />;
      case 'themes': return <ThemeCustomizer />;
      case 'backup': return <JsonImportExport />;
      case 'export': return <ExportPanel />;
      default: return <PersonalInfoEditor />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      {/* Navigation Sidebar */}
      {!isFullscreenPreview && <BuilderSidebar />}

      {/* Editor & Preview Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Mobile View Toggle Bar */}
        <div className="lg:hidden h-12 bg-slate-900 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 p-0.5 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="WB" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold text-xs text-white tracking-tight">WB</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                mobileTab === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <Edit3 size={13} />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                mobileTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'
              }`}
            >
              <Eye size={13} />
              <span>Live Preview</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid: Split Screen on Desktop */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Form Editor Column */}
          {(!isFullscreenPreview && (mobileTab === 'editor' || window.innerWidth >= 1024)) && (
            <div className="w-full lg:w-[48%] xl:w-[45%] h-full overflow-y-auto p-6 md:p-8 bg-slate-950/70 border-r border-slate-800/80">
              <div className="max-w-2xl mx-auto">
                {renderActiveEditor()}
              </div>
            </div>
          )}

          {/* Live Preview Column */}
          {(isFullscreenPreview || mobileTab === 'preview' || window.innerWidth >= 1024) && (
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950 relative">
              {/* Preview Bar with Controls */}
              <div className="relative z-30 w-full shrink-0">
                <LivePreviewBar
                  isFullscreen={isFullscreenPreview}
                  onToggleFullscreen={() => setIsFullscreenPreview(!isFullscreenPreview)}
                  onSwitchToEditor={() => setMobileTab('editor')}
                />
              </div>

              {/* Real-time Visual Canvas */}
              <div className="flex-1 h-full overflow-hidden">
                <LivePreviewFrame />
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Global Membership & Razorpay Gateway Modal */}
      <MembershipModal />
    </div>
  );
};
