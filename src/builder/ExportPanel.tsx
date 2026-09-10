import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { validatePortfolio } from '../schema/validation';
import { exportPortfolioAsZip } from '../export-engine/zipExporter';
import { generateStandaloneProject } from '../export-engine/projectGenerator';
import { Button } from '../ui/Button';
import {
  Download,
  AlertCircle,
  CheckCircle2,
  FileCode,
  FolderArchive,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ExportPanel: React.FC = () => {
  const { portfolio, theme, selectedTemplateId } = usePortfolioStore();
  const [exporting, setExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState('package.json');

  const validation = validatePortfolio(portfolio);
  const generatedFiles = generateStandaloneProject(portfolio, theme, selectedTemplateId);
  const fileKeys = Object.keys(generatedFiles);

  const handleDownloadZip = async () => {
    if (!validation.isValid) return;
    setExporting(true);
    try {
      await exportPortfolioAsZip(portfolio, theme, selectedTemplateId);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 5000);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(portfolio, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <FolderArchive className="text-indigo-400" size={20} />
          <span>Static Website Export Engine</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Package your portfolio into a complete standalone React + TypeScript + Vite + Tailwind CSS project with zero dependencies on Solo Portfolio.
        </p>
      </div>

      {/* Validation Status Box */}
      <div
        className={`p-5 rounded-2xl border ${
          validation.isValid
            ? 'bg-emerald-950/20 border-emerald-800/40'
            : 'bg-rose-950/20 border-rose-800/40'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-2">
          {validation.isValid ? (
            <>
              <CheckCircle2 size={18} className="text-emerald-400" />
              <span className="text-sm font-bold text-emerald-300">
                Portfolio Configuration Validated & Ready for Production
              </span>
            </>
          ) : (
            <>
              <AlertCircle size={18} className="text-rose-400" />
              <span className="text-sm font-bold text-rose-300">
                Validation Errors Detected ({validation.errors.length})
              </span>
            </>
          )}
        </div>

        {!validation.isValid && (
          <div className="space-y-1.5 pt-2">
            <p className="text-xs text-slate-300">
              Please fix the following required fields before generating the standalone project:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-rose-300">
              {validation.errors.map((err, i) => (
                <li key={i}>
                  <strong>{err.section}:</strong> {err.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {validation.warnings.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-400">
            <span className="text-amber-400 font-semibold">Recommendations: </span>
            {validation.warnings.map((w) => w.message).join(' ')}
          </div>
        )}
      </div>

      {/* Export Action Card */}
      <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Export Standalone Vite Project (.ZIP)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Includes full source code, components, theme CSS, Vite configuration, package.json, and data schema.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={copiedJson ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              onClick={handleCopyJson}
            >
              {copiedJson ? 'JSON Copied' : 'Copy JSON'}
            </Button>

            <Button
              variant="gradient"
              size="md"
              disabled={!validation.isValid || exporting}
              icon={<Download size={16} />}
              onClick={handleDownloadZip}
            >
              {exporting ? 'Generating ZIP...' : 'Download Source Code (.ZIP)'}
            </Button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Standalone portfolio project archive downloaded! Follow the terminal instructions below to run locally.</span>
          </div>
        )}

        {/* Local Run Instructions */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
          <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5">
              <Terminal size={12} /> Local Development Workflow
            </span>
            <span className="text-[10px]">Vite + React 19 + Tailwind v4</span>
          </div>
          <div className="text-slate-400"># 1. Extract ZIP and navigate to project</div>
          <div className="text-indigo-300">cd my-portfolio-website</div>
          <div className="text-slate-400"># 2. Install dependencies</div>
          <div className="text-cyan-300">npm install</div>
          <div className="text-slate-400"># 3. Launch local dev server</div>
          <div className="text-emerald-300">npm run dev</div>
          <div className="text-slate-400"># 4. Build optimized static output for hosting</div>
          <div className="text-purple-300">npm run build</div>
        </div>
      </div>

      {/* Generated Files Preview Inspector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            <FileCode size={16} className="text-indigo-400" />
            <span>Generated File Structure ({fileKeys.length} Files)</span>
          </div>
          <span className="text-xs font-mono text-slate-500">Standalone Bundle</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 rounded-2xl border border-slate-800 p-4">
          {/* File Tree */}
          <div className="md:col-span-4 space-y-1 border-r border-slate-800/80 pr-3">
            {fileKeys.map((path) => (
              <button
                key={path}
                type="button"
                onClick={() => setSelectedPreviewFile(path)}
                className={`w-full text-left px-3 py-1.5 rounded-lg font-mono text-xs transition-colors cursor-pointer truncate ${
                  selectedPreviewFile === path
                    ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                📄 {path}
              </button>
            ))}
          </div>

          {/* File Content Preview */}
          <div className="md:col-span-8 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 font-mono text-xs text-slate-400">
              <span>{selectedPreviewFile}</span>
              <span className="text-[10px] text-slate-500">
                {generatedFiles[selectedPreviewFile]?.length || 0} bytes
              </span>
            </div>
            <pre className="p-3 bg-slate-900/90 rounded-xl text-xs font-mono text-slate-300 overflow-x-auto max-h-72 leading-relaxed">
              <code>{generatedFiles[selectedPreviewFile]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
