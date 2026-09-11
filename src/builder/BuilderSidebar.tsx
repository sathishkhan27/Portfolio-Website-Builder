import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import {
  User,
  BookOpen,
  Layers,
  Briefcase,
  FolderGit2,
  Zap,
  GraduationCap,
  Award,
  Trophy,
  Share2,
  Mail,
  FileText,
  Search,
  LayoutTemplate,
  Palette,
  Sliders,
  FileJson,
  Download,
  Sparkles
} from 'lucide-react';
import { MembershipBadge } from './MembershipBadge';

export const BuilderSidebar: React.FC = () => {
  const { activeTab, setActiveTab, portfolio } = usePortfolioStore();

  const dataSections = [
    { id: 'personal', label: 'Personal Info', icon: <User size={15} /> },
    { id: 'about', label: 'About & Metrics', icon: <BookOpen size={15} /> },
    { id: 'skills', label: 'Skills & Stack', icon: <Layers size={15} />, badge: portfolio.skills.reduce((acc, cat) => acc + cat.skills.length, 0) },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={15} />, badge: portfolio.experience.length },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 size={15} />, badge: portfolio.projects.length },
    { id: 'services', label: 'Services', icon: <Zap size={15} />, badge: portfolio.services.length },
    { id: 'education', label: 'Education', icon: <GraduationCap size={15} />, badge: portfolio.education.length },
    { id: 'certifications', label: 'Certifications', icon: <Award size={15} />, badge: portfolio.certifications.length },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={15} />, badge: portfolio.achievements.length },
    { id: 'socials', label: 'Social Links', icon: <Share2 size={15} />, badge: portfolio.socials.length },
    { id: 'contact', label: 'Contact Details', icon: <Mail size={15} /> },
    { id: 'resume', label: 'Resume / CV', icon: <FileText size={15} /> },
    { id: 'seo', label: 'SEO & Metadata', icon: <Search size={15} /> },
  ];

  const designSections = [
    { id: 'sections', label: 'Section Manager', icon: <Sliders size={15} /> },
    { id: 'templates', label: 'Template Gallery', icon: <LayoutTemplate size={15} /> },
    { id: 'themes', label: 'Theme & Styling', icon: <Palette size={15} /> },
    { id: 'backup', label: 'JSON Data Backup', icon: <FileJson size={15} /> },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col h-full shrink-0 select-none">
      
      {/* Platform Branding Header with Membership Status */}
      <div className="h-16 px-4 border-b border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-lg shadow-indigo-500/10 shrink-0">
            <img src="/logo.png" alt="WB Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-sm font-extrabold text-white tracking-tight flex items-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 font-black">WB</span>
              <span>Builder</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Portfolio Studio</div>
          </div>
        </div>

        <MembershipBadge compact />
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        
        {/* Data Sections */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Portfolio Content
          </div>
          {dataSections.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-indigo-700 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Design & Engine Controls */}
        <div className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
            Design & Engine
          </div>
          {designSections.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Export Button Callout at Bottom */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <button
          type="button"
          onClick={() => setActiveTab('export')}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
            activeTab === 'export'
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white ring-2 ring-indigo-400'
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:opacity-95 shadow-indigo-500/20'
          }`}
        >
          <Download size={15} />
          <span>Export Source Code</span>
        </button>
      </div>

    </aside>
  );
};
