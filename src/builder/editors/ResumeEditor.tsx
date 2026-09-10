import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { FileText, Download, ExternalLink } from 'lucide-react';

export const ResumeEditor: React.FC = () => {
  const { portfolio, updateResume } = usePortfolioStore();
  const { resume } = portfolio;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileText className="text-indigo-400" size={20} />
          <span>Curriculum Vitae / Resume</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Links for visitors to download or view your PDF resume.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Resume File Name"
          value={resume.fileName}
          onChange={(e) => updateResume({ fileName: e.target.value })}
          placeholder="John_Doe_Senior_Engineer_Resume.pdf"
        />

        <Input
          label="Download URL (Direct link to hosted PDF)"
          value={resume.downloadUrl || ''}
          onChange={(e) => updateResume({ downloadUrl: e.target.value })}
          icon={<Download size={14} />}
          placeholder="https://your-domain.com/resume.pdf"
          helperText="Direct download link triggered by the resume button in the header"
        />

        <Input
          label="View URL (Optional preview link)"
          value={resume.viewUrl || ''}
          onChange={(e) => updateResume({ viewUrl: e.target.value })}
          icon={<ExternalLink size={14} />}
          placeholder="https://drive.google.com/..."
        />

        <Input
          label="Last Updated Notice"
          value={resume.lastUpdated || ''}
          onChange={(e) => updateResume({ lastUpdated: e.target.value })}
          placeholder="Updated September 2026"
        />
      </div>
    </div>
  );
};
