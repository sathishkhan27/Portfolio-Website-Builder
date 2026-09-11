import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Pipette, Check, Copy, X, SlidersHorizontal } from 'lucide-react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  presetSwatches?: string[];
}

export const defaultSwatches = [
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
  '#ffffff', // White
  '#64748b', // Slate 500
];

// Helper to normalize any color format (3-char hex, rgba, rgb) to valid 6-char hex
export function normalizeToHex6(color: string, fallback = '#6366f1'): string {
  if (!color || typeof color !== 'string') return fallback;
  const trimmed = color.trim().toLowerCase();

  if (/^#[0-9a-f]{6}$/i.test(trimmed)) return trimmed;
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    const r = trimmed[1];
    const g = trimmed[2];
    const b = trimmed[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (/^#[0-9a-f]{8}$/i.test(trimmed)) {
    return trimmed.slice(0, 7);
  }

  // Parse rgb / rgba
  const rgbMatch = trimmed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgbMatch) {
    const r = Math.min(255, parseInt(rgbMatch[1], 10)).toString(16).padStart(2, '0');
    const g = Math.min(255, parseInt(rgbMatch[2], 10)).toString(16).padStart(2, '0');
    const b = Math.min(255, parseInt(rgbMatch[3], 10)).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  return fallback;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presetSwatches = defaultSwatches,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [localInput, setLocalInput] = useState(value);
  const popoverRef = useRef<HTMLDivElement>(null);

  const safeHex = normalizeToHex6(value);

  // Sync local text input when prop value changes
  useEffect(() => {
    setLocalInput(value);
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalInput(newVal);
    // If valid hex, trigger onChange
    if (/^#?[0-9a-fA-F]{6}$/.test(newVal)) {
      const formatted = newVal.startsWith('#') ? newVal : `#${newVal}`;
      onChange(formatted);
    }
  };

  const handleTextBlur = () => {
    // On blur, format cleanly
    let formatted = localInput.trim();
    if (!formatted.startsWith('#') && /^[0-9a-fA-F]{3,6}$/.test(formatted)) {
      formatted = `#${formatted}`;
    }
    if (/^#[0-9a-fA-F]{6}$/i.test(formatted) || /^#[0-9a-fA-F]{3}$/i.test(formatted)) {
      const hex6 = normalizeToHex6(formatted);
      setLocalInput(hex6);
      onChange(hex6);
    } else {
      // Revert to valid value
      setLocalInput(value);
    }
  };

  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  const handleEyeDropper = async () => {
    if (!hasEyeDropper) return;
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      if (result?.sRGBHex) {
        onChange(result.sRGBHex);
      }
    } catch {
      // Canceled by user
    }
  };

  return (
    <div className="space-y-2 relative" ref={popoverRef}>
      {label && <label className="block text-xs font-medium text-slate-300">{label}</label>}

      <div className="flex items-center gap-2.5">
        {/* Visual Swatch Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-10 h-10 rounded-xl overflow-hidden border transition-all cursor-pointer shrink-0 shadow-md group flex items-center justify-center ${
            isOpen
              ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105'
              : 'border-slate-700 hover:border-slate-500 hover:scale-105'
          }`}
          style={{ backgroundColor: safeHex }}
          title="Click to open color picker"
          aria-label={label || 'Color picker'}
          aria-expanded={isOpen}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <SlidersHorizontal
              size={14}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md"
            />
          </div>
        </button>

        {/* Quick Hex Text Input */}
        <div className="relative">
          <input
            type="text"
            value={localInput}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            placeholder="#6366f1"
            className="w-24 px-2.5 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Quick Swatches (Top 5) */}
        <div className="flex flex-wrap gap-1.5 flex-1 items-center">
          {presetSwatches.slice(0, 5).map((swatch) => (
            <button
              key={swatch}
              type="button"
              onClick={() => onChange(swatch)}
              className={`w-6 h-6 rounded-md border transition-transform hover:scale-110 cursor-pointer ${
                safeHex.toLowerCase() === swatch.toLowerCase()
                  ? 'border-white ring-2 ring-indigo-500/50 scale-105'
                  : 'border-slate-700/60'
              }`}
              style={{ backgroundColor: swatch }}
              title={swatch}
            />
          ))}
        </div>
      </div>

      {/* Floating Interactive In-App Color Picker Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 w-72 p-4 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/90 rounded-2xl shadow-2xl shadow-black/80 space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
          {/* Popover Header */}
          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: safeHex }} />
              <span>{label || 'Color Engine'}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close picker"
            >
              <X size={14} />
            </button>
          </div>

          {/* Interactive 2D Color Spectrum Canvas + Hue Slider */}
          <div className="w-full">
            <HexColorPicker
              color={safeHex}
              onChange={(newColor) => {
                setLocalInput(newColor);
                onChange(newColor);
              }}
            />
          </div>

          {/* Value Preview & Controls Row */}
          <div className="flex items-center gap-2 pt-1">
            {/* Live Color Swatch */}
            <div
              className="w-9 h-9 rounded-lg border border-slate-700 shrink-0 shadow-inner"
              style={{ backgroundColor: safeHex }}
            />

            {/* Editable Hex Field */}
            <div className="relative flex-1">
              <input
                type="text"
                value={localInput}
                onChange={handleTextChange}
                onBlur={handleTextBlur}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg bg-slate-950 border border-slate-700 text-slate-100 uppercase focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Eyedropper Button (if supported) */}
            {hasEyeDropper && (
              <button
                type="button"
                onClick={handleEyeDropper}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Pick color from screen"
              >
                <Pipette size={14} />
              </button>
            )}

            {/* Copy Hex Code Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={copied ? 'Copied!' : 'Copy Hex code'}
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Curated Swatch Palette Grid */}
          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 mb-2">
              Preset Palette
            </div>
            <div className="grid grid-cols-6 gap-2">
              {presetSwatches.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => {
                    setLocalInput(swatch);
                    onChange(swatch);
                  }}
                  className={`w-full aspect-square rounded-lg border transition-transform hover:scale-115 cursor-pointer shadow-sm ${
                    safeHex.toLowerCase() === swatch.toLowerCase()
                      ? 'border-white ring-2 ring-indigo-500 scale-110'
                      : 'border-slate-700/70 hover:border-slate-500'
                  }`}
                  style={{ backgroundColor: swatch }}
                  title={swatch}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
