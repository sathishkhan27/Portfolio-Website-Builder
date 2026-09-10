import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Search, Globe, Image } from 'lucide-react';

export const SeoEditor: React.FC = () => {
  const { portfolio, updateSeo } = usePortfolioStore();
  const { seo } = portfolio;

  const handleKeywordsChange = (text: string) => {
    const list = text.split(',').map((k) => k.trim()).filter(Boolean);
    updateSeo({ keywords: list });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Search className="text-indigo-400" size={20} />
          <span>SEO & Social Share Metadata</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Search engine tags, browser page title, and OpenGraph social preview images.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Meta Title (Browser Tab & Search Results)"
          value={seo.metaTitle}
          onChange={(e) => updateSeo({ metaTitle: e.target.value })}
          placeholder="Alex Mercer | Principal Software Architect"
          helperText="Recommended: 50-60 characters"
        />

        <Textarea
          label="Meta Description"
          value={seo.metaDescription}
          onChange={(e) => updateSeo({ metaDescription: e.target.value })}
          rows={3}
          placeholder="Portfolio of Alex Mercer, Senior Engineering Leader specializing in..."
          helperText="Recommended: 120-160 characters"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Author"
            value={seo.author}
            onChange={(e) => updateSeo({ author: e.target.value })}
            placeholder="Alex Mercer"
          />

          <Input
            label="OpenGraph Social Banner Image (OG Image)"
            value={seo.ogImage || ''}
            onChange={(e) => updateSeo({ ogImage: e.target.value })}
            placeholder="https://..."
            icon={<Image size={14} />}
            helperText="Preview image shown when sharing on Twitter, LinkedIn, etc."
          />
        </div>

        <Input
          label="Keywords (Comma-separated)"
          value={seo.keywords.join(', ')}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          placeholder="Software Architect, Full Stack Developer, React 19, TypeScript"
        />
      </div>

      {/* Google Search Card Preview */}
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
          Google Search Snippet Preview
        </div>
        <div className="text-xs text-emerald-400 font-mono truncate">
          https://yoursite.dev
        </div>
        <div className="text-base text-indigo-400 font-medium hover:underline cursor-pointer truncate">
          {seo.metaTitle || 'Your Name | Professional Portfolio'}
        </div>
        <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {seo.metaDescription || 'Add a meta description to see how your portfolio appears in Google search results.'}
        </div>
      </div>
    </div>
  );
};
