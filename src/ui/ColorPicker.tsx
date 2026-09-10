import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  presetSwatches?: string[];
}

const defaultSwatches = [
  '#6366f1', // Indigo
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#f43f5e', // Rose
  '#14b8a6', // Teal
  '#0f172a', // Slate 900
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presetSwatches = defaultSwatches,
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-700 shrink-0 shadow-inner">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-2 w-14 h-14 cursor-pointer opacity-0"
          />
          <div
            className="w-full h-full rounded-lg transition-colors pointer-events-none"
            style={{ backgroundColor: value }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#ffffff"
          className="w-28 px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500"
        />
        <div className="flex flex-wrap gap-1.5 flex-1">
          {presetSwatches.slice(0, 6).map((swatch) => (
            <button
              key={swatch}
              type="button"
              onClick={() => onChange(swatch)}
              className={`w-6 h-6 rounded-md border transition-transform hover:scale-110 cursor-pointer ${
                value.toLowerCase() === swatch.toLowerCase()
                  ? 'border-white ring-2 ring-indigo-500/50 scale-105'
                  : 'border-slate-700/60'
              }`}
              style={{ backgroundColor: swatch }}
              title={swatch}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
