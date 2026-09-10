import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Sparkles } from 'lucide-react';
import { templateRegistry } from '../template-engine/registry';

export const LivePreviewBar: React.FC = () => {
  const {
    previewDevice,
    setPreviewDevice,
    previewScale,
    setPreviewScale,
    selectedTemplateId,
    theme,
    setActiveTab,
  } = usePortfolioStore();

  const templateName = templateRegistry[selectedTemplateId]?.metadata.name || 'Modern Developer';

  return (
    <div className="h-12 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 select-none shrink-0">
      
      {/* Left: Current Template & Theme badges */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('templates')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <Sparkles size={12} className="text-indigo-400" />
          <span className="font-medium truncate max-w-[130px]">{templateName}</span>
        </button>

        <button
          onClick={() => setActiveTab('themes')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <span className="font-medium truncate max-w-[100px]">{theme.name}</span>
        </button>
      </div>

      {/* Middle: Device Viewport Switcher */}
      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => setPreviewDevice('desktop')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            previewDevice === 'desktop'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Desktop View (100%)"
        >
          <Monitor size={15} />
        </button>
        <button
          onClick={() => setPreviewDevice('tablet')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            previewDevice === 'tablet'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Tablet View (768px)"
        >
          <Tablet size={15} />
        </button>
        <button
          onClick={() => setPreviewDevice('mobile')}
          className={`p-1.5 rounded-md transition-all cursor-pointer ${
            previewDevice === 'mobile'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
          title="Mobile View (375px)"
        >
          <Smartphone size={15} />
        </button>
      </div>

      {/* Right: Scale & Reset */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1 text-slate-400 text-xs">
          <button
            onClick={() => setPreviewScale(Math.max(0.6, previewScale - 0.1))}
            className="p-1 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="font-mono text-[11px] w-10 text-center">
            {Math.round(previewScale * 100)}%
          </span>
          <button
            onClick={() => setPreviewScale(Math.min(1.2, previewScale + 0.1))}
            className="p-1 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          {previewScale !== 1 && (
            <button
              onClick={() => setPreviewScale(1)}
              className="p-1 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw size={12} />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
