import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Crown,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { MembershipBadge } from './MembershipBadge';

export const ExportPanel: React.FC = () => {
  const {
    portfolio,
    theme,
    selectedTemplateId,
    isMember,
    paymentRecord,
    openMembershipModal,
    pendingDownloadAfterPayment,
    setPendingDownloadAfterPayment,
  } = usePortfolioStore();

  const [exporting, setExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [selectedPreviewFile, setSelectedPreviewFile] = useState('package.json');

  const validation = validatePortfolio(portfolio);
  const generatedFiles = generateStandaloneProject(portfolio, theme, selectedTemplateId);
  const fileKeys = Object.keys(generatedFiles);

  const handleDownloadZip = async () => {
    if (!validation.isValid) return;

    // Gate: Check membership
    if (!isMember) {
      openMembershipModal(true);
      return;
    }

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

  // Auto-trigger download once payment is unlocked
  useEffect(() => {
    if (isMember && pendingDownloadAfterPayment) {
      setPendingDownloadAfterPayment(false);
      handleDownloadZip();
    }
  }, [isMember, pendingDownloadAfterPayment]);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(portfolio, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center shadow-md shrink-0">
            <img src="/logo.png" alt="WB Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Static Website Export Engine</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Package your portfolio into a complete standalone React + TypeScript + Vite + Tailwind CSS project with zero dependencies on WB Builder.
            </p>
          </div>
        </div>
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
        
        {/* Membership Status Bar */}
        <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          isMember
            ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
            : 'bg-indigo-950/20 border-indigo-500/30 text-indigo-300'
        }`}>
          <div className="flex items-center gap-3">
            {isMember ? (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-bold">
                <Crown size={18} />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Lock size={16} />
              </div>
            )}
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5 text-white">
                <span>{isMember ? 'PRO Membership Active' : 'Membership Required to Download Source Code'}</span>
                {isMember && <CheckCircle2 size={13} className="text-emerald-400" />}
              </div>
              <div className="text-[11px] text-slate-400">
                {isMember
                  ? paymentRecord?.paymentId
                    ? `Verified Razorpay Payment: ${paymentRecord.paymentId} (${paymentRecord.planName})`
                    : 'Unlimited source code exports unlocked'
                  : 'Upgrade via Razorpay (UPI, Cards, NetBanking) starting at ₹299 to unlock standalone ZIP exports.'}
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <MembershipBadge />
          </div>
        </div>

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
              icon={isMember ? <Download size={16} /> : <Lock size={16} />}
              onClick={handleDownloadZip}
            >
              {exporting
                ? 'Generating ZIP...'
                : isMember
                ? 'Download Source Code (.ZIP)'
                : 'Unlock & Download Source (.ZIP)'}
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
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
          <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-800">
            <span className="flex items-center gap-1.5 font-sans font-bold text-white">
              <Terminal size={13} className="text-indigo-400" /> Two Ways to Open Your Portfolio
            </span>
            <span className="text-[10px]">Instant HTML + Full Vite React</span>
          </div>

          {/* Option A: Zero setup */}
          <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 font-sans text-xs flex items-start gap-2.5">
            <span className="text-base leading-none">👉</span>
            <div>
              <div className="font-bold text-white">Option A: Instant Offline View (No Terminal or Node.js Needed!)</div>
              <div className="text-[11px] text-slate-300 mt-0.5">
                Simply double-click the <strong className="text-cyan-300 font-mono">standalone-preview.html</strong> file in the downloaded ZIP. It opens directly in Chrome, Safari, or Edge without any CORS errors!
              </div>
            </div>
          </div>

          {/* Option B: Terminal */}
          <div className="space-y-1.5 pt-1">
            <div className="font-sans font-bold text-slate-200 text-xs">💻 Option B: React + Vite Development Workflow</div>
            <div className="text-slate-400"># 1. Open terminal and navigate into the unzipped folder</div>
            <div className="text-indigo-300">cd my-portfolio-website</div>
            <div className="text-slate-400"># 2. Mandatory: Install packages (resolves @vitejs/plugin-react)</div>
            <div className="text-cyan-300 font-bold bg-cyan-950/40 p-1.5 rounded border border-cyan-800/40">npm install</div>
            <div className="text-slate-400"># 3. Start local live server</div>
            <div className="text-emerald-300 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40">npm run dev</div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-amber-400/90 font-sans">
            💡 <strong>Why does opening index.html directly show a CORS error?</strong> Browser security policies block raw TypeScript (<code className="font-mono text-white">.tsx</code>) files over <code className="font-mono text-white">file://</code> URLs. For direct double-clicking, use <strong className="text-white">standalone-preview.html</strong>!
          </div>
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
