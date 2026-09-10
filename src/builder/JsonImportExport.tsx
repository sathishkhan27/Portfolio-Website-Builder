import React, { useRef, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Button } from '../ui/Button';
import { Download, Upload, RotateCcw, Check, FileJson, AlertCircle } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';

export const JsonImportExport: React.FC = () => {
  const { portfolio, loadPortfolio, resetToDefault } = usePortfolioStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(portfolio, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${portfolio.personal.fullName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-portfolio.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed: PortfolioData = JSON.parse(content);
        if (!parsed.personal || !parsed.sections) {
          throw new Error('Invalid portfolio schema format.');
        }
        loadPortfolio(parsed);
        setImportStatus('success');
        setTimeout(() => setImportStatus('idle'), 4000);
      } catch (err: any) {
        setImportStatus('error');
        setErrorMessage(err.message || 'Could not parse JSON file.');
        setTimeout(() => setImportStatus('idle'), 4000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FileJson className="text-indigo-400" size={20} />
          <span>JSON Schema Data Sync & Backup</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Back up your full portfolio configuration or migrate data from previous builds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Export JSON */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Download JSON Backup</h3>
            <p className="text-xs text-slate-400">
              Save your entire portfolio data schema as a lightweight JSON file.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Download size={14} />}
            onClick={handleExportJson}
          >
            Export JSON File
          </Button>
        </div>

        {/* Import JSON */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Import Portfolio JSON</h3>
            <p className="text-xs text-slate-400">
              Load an existing schema to populate all sections automatically.
            </p>
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="secondary"
              size="sm"
              icon={<Upload size={14} />}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload JSON
            </Button>
          </div>
        </div>

        {/* Reset Default */}
        <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Reset to Default Data</h3>
            <p className="text-xs text-slate-400">
              Restore the original comprehensive Senior Architect dataset.
            </p>
          </div>
          <Button
            variant="danger"
            size="sm"
            icon={<RotateCcw size={14} />}
            onClick={() => {
              if (window.confirm('Reset all portfolio data and themes to default demo values?')) {
                resetToDefault();
              }
            }}
          >
            Reset to Sample
          </Button>
        </div>
      </div>

      {importStatus === 'success' && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <Check size={16} />
          <span>Portfolio configuration successfully imported and loaded!</span>
        </div>
      )}

      {importStatus === 'error' && (
        <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle size={16} />
          <span>Import Failed: {errorMessage}</span>
        </div>
      )}
    </div>
  );
};
