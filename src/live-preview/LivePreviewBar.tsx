import React, { useState, useRef, useEffect } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import {
  Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, RotateCcw,
  Sparkles, Sun, Moon, Palette, ChevronDown, Check,
  Maximize2, Minimize2
} from 'lucide-react';
import { templateRegistry } from '../template-engine/registry';
import { themePresets } from '../theme-engine/themePresets';

export interface LivePreviewBarProps {
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onSwitchToEditor?: () => void;
}

export const LivePreviewBar: React.FC<LivePreviewBarProps> = ({
  isFullscreen = false,
  onToggleFullscreen,
  onSwitchToEditor
}) => {
  const {
    previewDevice,
    setPreviewDevice,
    previewScale,
    setPreviewScale,
    selectedTemplateId,
    setTemplate,
    theme,
    setTheme,
    updateThemeColor,
    toggleThemeMode,
    setActiveTab,
  } = usePortfolioStore();

  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isTemplateMenuOpen, setIsTemplateMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const templateMenuRef = useRef<HTMLDivElement>(null);

  const templateName = templateRegistry[selectedTemplateId]?.metadata.name || 'Modern Developer';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setIsThemeMenuOpen(false);
      }
      if (templateMenuRef.current && !templateMenuRef.current.contains(event.target as Node)) {
        setIsTemplateMenuOpen(false);
      }
    };
    if (isThemeMenuOpen || isTemplateMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isThemeMenuOpen, isTemplateMenuOpen]);

  const handleSelectPreset = (presetKey: string) => {
    const preset = themePresets[presetKey];
    if (preset) {
      setTheme(JSON.parse(JSON.stringify(preset)));
    }
    setIsThemeMenuOpen(false);
  };

  const quickColors = [
    '#6366f1', // Indigo
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#3b82f6', // Blue
    '#f43f5e', // Rose
    '#14b8a6', // Teal
    '#e11d48', // Crimson
    '#ffffff', // White
    '#0f172a', // Slate
  ];

  return (
    <div className="h-12 bg-slate-900 border-b border-slate-800 px-3 sm:px-4 flex items-center justify-between gap-2 select-none shrink-0 relative z-30 w-full overflow-visible">
      
      {/* Left: Template & Theme Quick Selectors */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="hidden 2xl:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs mr-1">
          <img src="/logo.png" alt="WB" className="w-4 h-4 object-contain" />
          <span className="font-bold text-[11px] text-slate-300">WB Studio</span>
        </div>

        {/* Quick Template Selector Dropdown */}
        <div className="relative" ref={templateMenuRef}>
          <button
            onClick={() => {
              setIsTemplateMenuOpen(!isTemplateMenuOpen);
              setIsThemeMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Switch Template"
          >
            <Sparkles size={13} className="text-indigo-400 shrink-0" />
            <span className="font-medium truncate max-w-[85px] sm:max-w-[120px]">{templateName}</span>
            <ChevronDown size={11} className={`text-slate-400 transition-transform ${isTemplateMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isTemplateMenuOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1">
              <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800 mb-1">
                <span>Select Template</span>
                <span className="text-indigo-400 font-semibold">{Object.keys(templateRegistry).length} available</span>
              </div>
              <div className="max-h-60 overflow-y-auto space-y-1">
                {Object.entries(templateRegistry).map(([id, tpl]) => {
                  const isCurrent = selectedTemplateId === id;
                  return (
                    <button
                      key={id}
                      onClick={() => {
                        setTemplate(id);
                        setIsTemplateMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all text-left cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="truncate">
                        <div className="font-medium truncate">{tpl.metadata.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{tpl.metadata.category}</div>
                      </div>
                      {isCurrent && <Check size={13} className="text-indigo-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Quick Theme & Color Dropdown */}
        <div className="relative" ref={themeMenuRef}>
          <button
            onClick={() => {
              setIsThemeMenuOpen(!isThemeMenuOpen);
              setIsTemplateMenuOpen(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Switch Theme & Colors"
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 border border-slate-900 shadow-sm"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span className="font-medium truncate max-w-[75px] sm:max-w-[100px]">{theme.name}</span>
            <ChevronDown size={11} className={`text-slate-400 transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isThemeMenuOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-72 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2.5">
              
              {/* Header */}
              <div className="px-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span>Theme & Colors</span>
                <span className="text-indigo-400 font-semibold capitalize">{theme.mode} mode</span>
              </div>

              {/* Quick Brand Color Swatches */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-300 px-1">
                  <span className="font-medium">Primary Brand Color</span>
                  <span className="font-mono text-[10px] text-indigo-400">{theme.colors.primary}</span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {quickColors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateThemeColor('primary', c)}
                      className={`h-6 rounded-md border transition-transform hover:scale-115 cursor-pointer ${
                        theme.colors.primary.toLowerCase() === c.toLowerCase()
                          ? 'border-white ring-2 ring-indigo-500/50 scale-105'
                          : 'border-slate-700/60 hover:border-slate-500'
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
              </div>

              {/* Theme Presets */}
              <div className="space-y-1 pt-1 border-t border-slate-800">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-1 mb-1">
                  Theme Presets
                </div>
                <div className="max-h-48 overflow-y-auto space-y-0.5 pr-0.5">
                  {Object.entries(themePresets).map(([key, preset]) => {
                    const isCurrent = theme.id === preset.id;
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectPreset(key)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-all text-left cursor-pointer ${
                          isCurrent
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-medium'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <div className="flex items-center shrink-0">
                            <span
                              className="w-3 h-3 rounded-full border border-slate-900"
                              style={{ backgroundColor: preset.colors.primary }}
                            />
                            <span
                              className="w-3 h-3 rounded-full border border-slate-900 -ml-1"
                              style={{ backgroundColor: preset.colors.secondary }}
                            />
                          </div>
                          <span className="truncate font-medium">{preset.name}</span>
                        </div>
                        {isCurrent && <Check size={12} className="text-indigo-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Link to Full Theme Customizer */}
              <div className="border-t border-slate-800 pt-1.5">
                <button
                  onClick={() => {
                    setIsThemeMenuOpen(false);
                    setActiveTab('themes');
                    onSwitchToEditor?.();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/40 border border-indigo-500/20 transition-colors cursor-pointer font-medium"
                >
                  <Palette size={13} />
                  <span>Open Full Color & Style Studio</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Device Viewport Switcher & Dark/Light Mode Switch */}
      <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 shrink-0">
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

        <div className="h-4 w-px bg-slate-800 mx-0.5" />

        {/* Quick Dark / Light Switch */}
        <button
          onClick={toggleThemeMode}
          className="p-1.5 rounded-md transition-all cursor-pointer text-slate-400 hover:text-white hover:bg-slate-800"
          title={`Switch to ${theme.mode === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme.mode === 'dark' ? (
            <Sun size={15} className="text-amber-400" />
          ) : (
            <Moon size={15} className="text-indigo-400" />
          )}
        </button>
      </div>

      {/* Right: Scale Controls & Full View Button */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-1 text-slate-400 text-xs">
          <button
            onClick={() => setPreviewScale(Math.max(0.6, previewScale - 0.1))}
            className="p-1 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <span className="font-mono text-[11px] w-9 text-center">
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

        {/* Full View / Fullscreen Toggle Button - Prominently Aligned */}
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border shrink-0 ${
              isFullscreen
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
            }`}
            title={isFullscreen ? 'Exit Full View (Esc)' : 'Enter Full View'}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{isFullscreen ? 'Exit View' : 'Full View'}</span>
          </button>
        )}
      </div>

    </div>
  );
};
