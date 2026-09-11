import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { getTemplateMetadataList, getTemplateComponent } from '../template-engine/registry';
import { LayoutTemplate, Check, Sparkles, Filter, Eye, X, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeProvider } from '../theme-engine/ThemeProvider';
import { themePresets } from '../theme-engine/themePresets';

export const TemplateSelector: React.FC = () => {
  const { selectedTemplateId, setTemplate, setTheme, portfolio, theme } = usePortfolioStore();
  const templates = getTemplateMetadataList();
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [modalPreviewId, setModalPreviewId] = useState<string | null>(null);

  const categories = ['All', 'Developer', 'Designer', 'Creative', 'Minimalist'];

  const filteredTemplates = categoryFilter === 'All'
    ? templates
    : templates.filter((t) => t.category === categoryFilter);

  // Render a high-fidelity miniature visual mockup for each template card
  const renderTemplateCardVisual = (templateId: string) => {
    switch (templateId) {
      case 'clean-creator':
        return (
          <div className="h-44 w-full rounded-xl bg-[#fafafa] border border-slate-200/80 p-3 flex flex-col justify-between text-slate-800 relative overflow-hidden select-none">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                <span className="text-[10px] font-bold">Studio.</span>
              </div>
              <div className="flex gap-1">
                <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-[8px] font-medium">Home</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-200/80 text-[8px] font-medium">Work</span>
              </div>
            </div>
            {/* Hero with circle avatar and floating tags */}
            <div className="text-center py-2 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500/30 via-slate-200 to-indigo-500/20 mx-auto p-0.5 shadow-sm relative">
                <div className="w-full h-full rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-bold">
                  {portfolio.personal.fullName.slice(0, 1)}
                </div>
                <span className="absolute -left-6 top-1 text-[7px] bg-white border border-slate-200 rounded-full px-1.5 py-0.2 shadow-xs text-emerald-600 font-bold">
                  ● Available
                </span>
                <span className="absolute -right-6 top-3 text-[7px] bg-white border border-slate-200 rounded-full px-1.5 py-0.2 shadow-xs text-indigo-600 font-bold">
                  ✨ Designer
                </span>
              </div>
              <div className="text-[11px] font-extrabold mt-1 text-slate-900">{portfolio.personal.fullName}</div>
              <div className="text-[8px] text-slate-500 line-clamp-1 max-w-[180px] mx-auto">Product Designer & Developer</div>
            </div>
            {/* Toolbox row */}
            <div className="flex justify-center gap-1.5 pt-1 border-t border-slate-200/60">
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[8px]">🎨 Figma</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[8px]">⚡ Framer</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[8px]">⚛️ React</span>
            </div>
          </div>
        );

      case 'cobalt-creative':
        return (
          <div className="h-44 w-full rounded-xl bg-[#08080a] border border-blue-900/40 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="text-[9px] font-black tracking-tighter uppercase flex items-center gap-1">
                <span className="w-2 h-2 bg-blue-600 rounded-xs" />
                <span>CREATIVE WORLD</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-[8px] font-bold uppercase">PANTONE</span>
            </div>
            <div className="py-2 flex items-center justify-between">
              <div>
                <div className="text-xl font-black tracking-tighter leading-none">
                  CREATIVE<br />WORLD
                </div>
                <div className="text-[8px] text-blue-400 font-mono mt-1">// ART DIRECTION & CODE</div>
              </div>
              {/* Mini Pantone card */}
              <div className="w-14 p-1 rounded bg-white text-black text-center shadow-md rotate-6">
                <div className="h-8 bg-blue-600 rounded-xs mb-0.5" />
                <div className="text-[6px] font-bold uppercase">PANTONE®</div>
                <div className="text-[5px] text-slate-600">Cobalt 286 C</div>
              </div>
            </div>
            {/* Stacked cards deck preview */}
            <div className="p-1.5 rounded-lg bg-blue-600 text-white flex items-center justify-between text-[8px] font-bold uppercase">
              <span>DATA // Branding Solutions</span>
              <span className="text-[7px] bg-white/20 px-1 py-0.2 rounded">Case Study</span>
            </div>
          </div>
        );

      case 'neon-purple-creator':
        return (
          <div className="h-44 w-full rounded-xl bg-[#08080c] border border-purple-900/40 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-20 bg-purple-600/30 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-purple-950/60 pb-1.5 relative z-10">
              <span className="text-[9px] font-black uppercase text-purple-300">DH DHAIVE</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[7px] font-bold">Download CV</span>
            </div>
            <div className="text-center py-1 relative z-10">
              <span className="px-2 py-0.2 rounded-full bg-purple-950 border border-purple-500/40 text-[7px] text-purple-300 font-bold uppercase">
                HELLO FOLKS! 👋
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-amber-400 p-0.5 mx-auto my-1 shadow-lg shadow-purple-600/50">
                <div className="w-full h-full rounded-full bg-[#08080c] flex items-center justify-center text-[10px] font-bold">
                  {portfolio.personal.fullName.slice(0, 1)}
                </div>
              </div>
              <div className="text-[9px] font-extrabold text-white">Let's make something meaningful</div>
            </div>
            {/* Gold stats ribbon */}
            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-purple-950/60 text-center relative z-10">
              <div className="bg-[#12121c] p-1 rounded"><span className="text-amber-400 font-bold text-[8px]">325+</span> <span className="text-slate-400 text-[6px]">Clients</span></div>
              <div className="bg-[#12121c] p-1 rounded"><span className="text-amber-400 font-bold text-[8px]">5+</span> <span className="text-slate-400 text-[6px]">Years</span></div>
              <div className="bg-[#12121c] p-1 rounded"><span className="text-amber-400 font-bold text-[8px]">25M+</span> <span className="text-slate-400 text-[6px]">Rev</span></div>
            </div>
          </div>
        );

      case 'terracotta-avatar':
        return (
          <div className="h-44 w-full rounded-xl bg-[#fbf9f8] border border-amber-900/20 p-2.5 flex flex-col justify-between text-slate-900 relative overflow-hidden select-none">
            {/* Top terracotta banner */}
            <div className="rounded-lg bg-[#8e3838] p-2 text-white flex items-center justify-between">
              <div>
                <div className="text-[11px] font-black uppercase leading-tight">{portfolio.personal.fullName}</div>
                <div className="text-[7px] text-rose-200">Product Designer</div>
              </div>
              <div className="w-9 h-9 rounded-xl bg-[#6f2525] border border-white/20 flex items-center justify-center text-xs">
                🎨
              </div>
            </div>
            {/* Speech bubble & badges */}
            <div className="py-1 px-1">
              <div className="text-[8px] font-bold text-[#8e3838] bg-rose-50 border border-rose-200 rounded-md p-1 inline-block">
                💬 "Want to know about me?"
              </div>
              <div className="grid grid-cols-3 gap-1 mt-1.5">
                <span className="p-1 rounded bg-[#8e3838] text-white text-[7px] font-bold text-center">01 UX STRATEGY</span>
                <span className="p-1 rounded bg-[#8e3838] text-white text-[7px] font-bold text-center">02 WIREFRAME</span>
                <span className="p-1 rounded bg-[#8e3838] text-white text-[7px] font-bold text-center">03 UI DESIGN</span>
              </div>
            </div>
            {/* 6-step process pills */}
            <div className="flex justify-between gap-0.5 pt-1 border-t border-slate-200 text-[6px] font-bold uppercase text-[#8e3838]">
              <span className="px-1 py-0.2 border border-[#8e3838] rounded-full">Brief</span>
              <span className="px-1 py-0.2 border border-[#8e3838] rounded-full">Research</span>
              <span className="px-1 py-0.2 border border-[#8e3838] rounded-full">Design</span>
              <span className="px-1 py-0.2 border border-[#8e3838] rounded-full">Launch</span>
            </div>
          </div>
        );

      case 'stygar-studio':
        return (
          <div className="h-44 w-full rounded-xl bg-[#0c0306] border border-rose-950/60 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-rose-950/60 pb-1.5">
              <span className="font-extrabold text-[10px] text-white">✦ STYGAR<span className="text-rose-500">.studio</span></span>
              <span className="px-2 py-0.5 rounded-full bg-rose-600 text-[7px] font-bold">Get In Touch</span>
            </div>
            <div className="py-1">
              <div className="text-sm sm:text-base font-extrabold leading-tight">
                Turning <span className="border border-rose-500 text-rose-500 px-1 py-0.2 rounded text-[10px]">Ideas</span> Into
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-rose-300">Digital Reality</span>
              </div>
            </div>
            {/* 4 Stats counter */}
            <div className="grid grid-cols-4 gap-1 pt-1 border-t border-rose-950/60 text-center">
              <div><div className="text-rose-400 font-bold text-[8px]">150+</div><div className="text-[6px] text-slate-500">Projects</div></div>
              <div><div className="text-white font-bold text-[8px]">98%</div><div className="text-[6px] text-slate-500">Satisfied</div></div>
              <div><div className="text-white font-bold text-[8px]">5+ Yrs</div><div className="text-[6px] text-slate-500">Exp</div></div>
              <div><div className="text-rose-400 font-bold text-[8px]">24/7</div><div className="text-[6px] text-slate-500">Delivery</div></div>
            </div>
          </div>
        );

      case 'sleek-noir':
        return (
          <div className="h-44 w-full rounded-xl bg-[#000000] border border-[#222228] p-3 flex flex-col justify-between text-slate-200 relative overflow-hidden select-none">
            <div className="mx-auto px-3 py-0.5 rounded-full bg-[#121214] border border-[#25252b] flex items-center gap-2 text-[7px]">
              <span className="text-white font-bold">Resume</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Home</span>
              <span className="text-slate-400">About</span>
              <span className="text-slate-400">Work</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <div className="text-[7px] font-mono text-slate-500 uppercase">MR. ARCHITECT</div>
                <div className="text-xs font-black uppercase text-white">{portfolio.personal.fullName}</div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-white text-black font-bold text-[7px] uppercase mt-1">
                  Hire Me
                </span>
              </div>
              <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-b from-white/30 to-transparent flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#141418] flex items-center justify-center text-xs font-mono text-white grayscale">
                  {portfolio.personal.fullName.slice(0, 1)}
                </div>
              </div>
            </div>
            <div className="flex gap-1 pt-1 border-t border-[#1e1e24] justify-center">
              <span className="px-1.5 py-0.2 rounded bg-[#16161b] border border-[#2a2a32] text-[7px]">HTML5</span>
              <span className="px-1.5 py-0.2 rounded bg-[#16161b] border border-[#2a2a32] text-[7px]">React</span>
              <span className="px-1.5 py-0.2 rounded bg-[#16161b] border border-[#2a2a32] text-[7px]">Tailwind</span>
              <span className="px-1.5 py-0.2 rounded bg-[#16161b] border border-[#2a2a32] text-[7px]">Git</span>
            </div>
          </div>
        );

      case 'cyber-matrix':
        return (
          <div className="h-44 w-full rounded-xl bg-[#07090e] border border-cyan-900/40 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-cyan-950/60 pb-1.5">
              <span className="text-[9px] font-mono text-cyan-400">&lt;DEV_SYS/&gt;</span>
              <span className="px-2 py-0.2 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[6px] font-mono">
                🟢 Available for work
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <div>
                <div className="text-[10px] font-black leading-tight">
                  Pixel-perfect <span className="text-cyan-400">digital experiences</span>
                </div>
                <div className="text-[7px] font-mono text-slate-400 mt-0.5">// Frontend Engineering Architect</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-sm shadow-inner">
                🌐
              </div>
            </div>
            {/* Bento card mockup */}
            <div className="p-1.5 rounded-lg bg-[#0c0f17] border border-cyan-950/80 flex items-center justify-between text-[7px] font-mono text-slate-300">
              <span className="text-cyan-400">Dream Big with Start Small</span>
              <span>↗</span>
            </div>
          </div>
        );

      case 'modern-developer':
        return (
          <div className="h-44 w-full rounded-xl bg-[#070a13] border border-indigo-950/60 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-indigo-950/60 pb-1.5">
              <span className="text-[9px] font-mono text-indigo-400">portfolio.lead()</span>
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-[7px] font-bold">Connect</span>
            </div>
            {/* Terminal Teaser */}
            <div className="p-2 rounded-lg bg-black/60 border border-indigo-900/30 font-mono text-[7px] space-y-1">
              <div className="text-slate-500">// system.init_lead_engineer()</div>
              <div className="text-indigo-300">&gt; status: 99.99% reliability</div>
              <div className="text-emerald-400">&gt; microservices: 24 active</div>
            </div>
            <div className="flex justify-between text-[7px] font-mono text-slate-400 pt-1 border-t border-indigo-950/60">
              <span>TypeScript</span>
              <span>Go</span>
              <span>Next.js</span>
              <span>GraphQL</span>
            </div>
          </div>
        );

      case 'minimal-clean':
      default:
        return (
          <div className="h-44 w-full rounded-xl bg-[#0a0a0c] border border-slate-800 p-3 flex flex-col justify-between text-white relative overflow-hidden select-none">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 text-[8px] font-mono text-slate-400">
              <span>● AVAILABLE</span>
              <span>{portfolio.personal.location}</span>
            </div>
            <div className="py-2 space-y-1">
              <div className="text-xs font-semibold text-white tracking-tight">{portfolio.personal.fullName}</div>
              <div className="text-[8px] text-slate-400 line-clamp-2">{portfolio.personal.tagline}</div>
            </div>
            <div className="pt-1 border-t border-slate-800 text-[7px] font-mono text-slate-500 flex justify-between">
              <span>PROJECTS</span>
              <span>EXPERIENCE</span>
              <span>CONTACT</span>
            </div>
          </div>
        );
    }
  };

  const ModalComponent = modalPreviewId ? getTemplateComponent(modalPreviewId) : null;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <LayoutTemplate className="text-indigo-400" size={20} />
              <span>Template Gallery</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {templates.length} Templates
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Switch portfolio designs instantaneously. Every template features authentic visual layouts, custom animations, and responsive styling.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-2">
            <Filter size={13} />
            <span>Filter:</span>
          </div>
          {categories.map((cat) => {
            const count = cat === 'All' ? templates.length : templates.filter((t) => t.category === cat).length;
            const isActive = categoryFilter === cat;

            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-800 text-slate-400'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Templates with Visual Previews on Every Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;

          return (
            <div
              key={tpl.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                {/* Visual Mini Mockup on Every Card */}
                <div className="relative group/mockup">
                  {renderTemplateCardVisual(tpl.id)}

                  {/* Overlay Quick Preview Button on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/mockup:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 backdrop-blur-xs">
                    <button
                      onClick={() => setModalPreviewId(tpl.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                    >
                      <Eye size={13} />
                      <span>Full Preview</span>
                    </button>
                    {!isSelected && (
                      <button
                        onClick={() => setTemplate(tpl.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
                      >
                        <Check size={13} />
                        <span>Select</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Title & Metadata */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {tpl.name}
                    </h3>
                    {tpl.badge && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {tpl.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                      {tpl.category}
                    </span>
                  </div>

                  <p className="text-xs text-indigo-300 font-medium line-clamp-1 mb-1.5">
                    {tpl.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {tpl.description}
                  </p>
                </div>

                {/* Capabilities Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {tpl.features.slice(0, 3).map((feat) => (
                    <span
                      key={feat}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800/80 text-slate-400 flex items-center gap-1"
                    >
                      <Sparkles size={10} className="text-indigo-400" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={() => setModalPreviewId(tpl.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye size={13} />
                  <span>Preview</span>
                </button>

                {isSelected ? (
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-lg bg-indigo-600 text-white shadow-md">
                    <Check size={14} />
                    <span>Active</span>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTemplate(tpl.id);
                      if (tpl.defaultThemeId && themePresets[tpl.defaultThemeId]) {
                        setTheme({ ...themePresets[tpl.defaultThemeId] });
                      }
                    }}
                  >
                    Use This Template
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Preview Modal Dialog */}
      {modalPreviewId && ModalComponent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-5xl h-[88vh] bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
              <div className="flex items-center gap-3">
                <LayoutTemplate className="text-indigo-400" size={18} />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {templates.find((t) => t.id === modalPreviewId)?.name}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {templates.find((t) => t.id === modalPreviewId)?.tagline}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setTemplate(modalPreviewId);
                    const selectedTpl = templates.find((t) => t.id === modalPreviewId);
                    if (selectedTpl?.defaultThemeId && themePresets[selectedTpl.defaultThemeId]) {
                      setTheme({ ...themePresets[selectedTpl.defaultThemeId] });
                    }
                    setModalPreviewId(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Check size={14} />
                  <span>Select & Apply</span>
                </button>
                <button
                  onClick={() => setModalPreviewId(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Content / Full Template Scrollable Preview */}
            <div className="flex-1 overflow-y-auto">
              <ThemeProvider theme={theme}>
                <ModalComponent
                  data={portfolio}
                  theme={theme}
                  previewMode={true}
                />
              </ThemeProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
