import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { Layers, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';
import { SectionConfig, SectionKey } from '../types/portfolio';

export const SectionManager: React.FC = () => {
  const { portfolio, toggleSectionVisibility, reorderSections } = usePortfolioStore();
  const { sections } = portfolio;

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // update order numbers
    const reordered = updated.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    reorderSections(reordered);
  };

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} />
            <span>Section Architecture & Ordering</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Toggle visibility to display or hide sections, and reorder their presentation order.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
          {enabledCount} of {sections.length} Visible
        </div>
      </div>

      <div className="space-y-2.5">
        {sections.map((section, idx) => (
          <div
            key={section.key}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
              section.enabled
                ? 'bg-slate-900/90 border-slate-800'
                : 'bg-slate-950/60 border-slate-900 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-500 w-6">#{idx + 1}</span>
              <div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <span>{section.label}</span>
                  {section.key === 'hero' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                      Landing Hero
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  ID: #{section.key}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Reorder Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-20 disabled:hover:text-slate-400 cursor-pointer"
                  title="Move section up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-white disabled:opacity-20 disabled:hover:text-slate-400 cursor-pointer"
                  title="Move section down"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Toggle Switch */}
              <Switch
                checked={section.enabled}
                onChange={() => toggleSectionVisibility(section.key)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
