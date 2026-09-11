import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { themePresets } from '../theme-engine/themePresets';
import { ColorPicker } from '../ui/ColorPicker';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Palette, Moon, Sun, Sparkles, Sliders, Type } from 'lucide-react';
import { BorderRadiusOption, ButtonStyle } from '../types/theme';

export const ThemeCustomizer: React.FC = () => {
  const { theme, setTheme, toggleThemeMode, updateThemeColor, updateThemeProperty } = usePortfolioStore();

  const handleApplyPreset = (presetKey: string) => {
    const selectedPreset = themePresets[presetKey];
    if (selectedPreset) {
      setTheme(JSON.parse(JSON.stringify(selectedPreset)));
    }
  };

  const borderRadiusOptions: { value: BorderRadiusOption; label: string }[] = [
    { value: 'none', label: 'Square (0px)' },
    { value: 'sm', label: 'Subtle (4px)' },
    { value: 'md', label: 'Standard (8px)' },
    { value: 'lg', label: 'Modern Rounded (16px)' },
    { value: 'full', label: 'Pill (9999px)' },
  ];

  const buttonStyleOptions: { value: ButtonStyle; label: string }[] = [
    { value: 'glow', label: 'Neon Glow (Modern Tech)' },
    { value: 'gradient', label: 'Vibrant Gradient' },
    { value: 'solid', label: 'Flat Solid' },
    { value: 'outline', label: 'Border Outline' },
  ];

  const headingFontOptions = [
    { value: "'Plus Jakarta Sans', sans-serif", label: 'Plus Jakarta Sans (Modern Tech)' },
    { value: "'Space Grotesk', sans-serif", label: 'Space Grotesk (Futuristic/Code)' },
    { value: "'Inter', sans-serif", label: 'Inter (Clean & Professional)' },
    { value: "'Fira Code', monospace", label: 'Fira Code (Developer Monospace)' },
  ];

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Palette className="text-indigo-400" size={20} />
          <span>Theme & Visual Styling Engine</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize design tokens, primary brand colors, background hues, typography, and card glass effects in real time.
        </p>
      </div>

      {/* Curated Presets Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Sparkles size={16} className="text-indigo-400" />
          <span>Curated Theme Presets</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(themePresets).map(([key, preset]) => {
            const isActive = theme.id === preset.id;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleApplyPreset(key)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-4 h-4 rounded-full shadow-sm"
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full shadow-sm -ml-2"
                    style={{ backgroundColor: preset.colors.secondary }}
                  />
                  <div
                    className="w-4 h-4 rounded-full shadow-sm -ml-2 border border-slate-900"
                    style={{ backgroundColor: preset.colors.background }}
                  />
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">
                  {preset.mode} mode
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme.mode === 'dark' ? (
            <Moon size={18} className="text-indigo-400" />
          ) : (
            <Sun size={18} className="text-amber-400" />
          )}
          <div>
            <div className="text-sm font-semibold text-white">Dark / Light Mode</div>
            <div className="text-xs text-slate-400">Toggle dark backdrop or crisp daylight theme</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleThemeMode()}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-white hover:bg-slate-700 cursor-pointer transition-colors"
        >
          Switch to {theme.mode === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Palette Customizer */}
      <div className="space-y-4">
        <div className="text-sm font-semibold text-white flex items-center gap-2">
          <Sliders size={16} className="text-indigo-400" />
          <span>Color Palette Tokens</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ColorPicker
            label="Primary Brand Color"
            value={theme.colors.primary}
            onChange={(val) => updateThemeColor('primary', val)}
          />

          <ColorPicker
            label="Secondary Accent Color"
            value={theme.colors.secondary}
            onChange={(val) => updateThemeColor('secondary', val)}
          />

          <ColorPicker
            label="Canvas Background Color"
            value={theme.colors.background}
            onChange={(val) => updateThemeColor('background', val)}
          />

          <ColorPicker
            label="Surface / Card Base Color"
            value={theme.colors.surface}
            onChange={(val) => updateThemeColor('surface', val)}
          />
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div className="text-sm font-semibold text-white flex items-center gap-2">
          <Type size={16} className="text-indigo-400" />
          <span>Typography & Geometry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Heading Font Family"
            value={theme.typography.headingFont}
            onChange={(e) =>
              updateThemeProperty('typography', {
                ...theme.typography,
                headingFont: e.target.value
              })
            }
            options={headingFontOptions}
          />

          <Select
            label="Border Radius"
            value={theme.borderRadius}
            onChange={(e) => updateThemeProperty('borderRadius', e.target.value as any)}
            options={borderRadiusOptions}
          />

          <Select
            label="Button Visual Style"
            value={theme.buttonStyle}
            onChange={(e) => updateThemeProperty('buttonStyle', e.target.value as any)}
            options={buttonStyleOptions}
          />

          <div className="pt-6">
            <Switch
              label="Glassmorphism Blurs"
              description="Enable frosted glass cards & navbars"
              checked={theme.glassmorphism.enabled}
              onChange={(checked) =>
                updateThemeProperty('glassmorphism', {
                  ...theme.glassmorphism,
                  enabled: checked
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
