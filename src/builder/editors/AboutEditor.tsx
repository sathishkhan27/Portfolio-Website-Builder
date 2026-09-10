import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, Trash2, BookOpen, BarChart3, CheckCircle } from 'lucide-react';

export const AboutEditor: React.FC = () => {
  const { portfolio, updateAbout } = usePortfolioStore();
  const { about } = portfolio;

  const handleAddParagraph = () => {
    updateAbout({
      storyParagraphs: [...about.storyParagraphs, 'New narrative paragraph describing your engineering journey.']
    });
  };

  const handleUpdateParagraph = (index: number, text: string) => {
    const updated = [...about.storyParagraphs];
    updated[index] = text;
    updateAbout({ storyParagraphs: updated });
  };

  const handleDeleteParagraph = (index: number) => {
    updateAbout({
      storyParagraphs: about.storyParagraphs.filter((_, i) => i !== index)
    });
  };

  const handleAddHighlight = () => {
    updateAbout({
      highlights: [...about.highlights, 'Key engineering achievement or milestone.']
    });
  };

  const handleUpdateHighlight = (index: number, text: string) => {
    const updated = [...about.highlights];
    updated[index] = text;
    updateAbout({ highlights: updated });
  };

  const handleDeleteHighlight = (index: number) => {
    updateAbout({
      highlights: about.highlights.filter((_, i) => i !== index)
    });
  };

  const handleAddMetric = () => {
    const newMetric = {
      id: `m-${Date.now()}`,
      label: 'New Metric',
      value: '100+',
      description: 'Short explanation'
    };
    updateAbout({
      metrics: [...(about.metrics || []), newMetric]
    });
  };

  const handleUpdateMetric = (index: number, field: string, value: string) => {
    const updated = [...(about.metrics || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateAbout({ metrics: updated });
  };

  const handleDeleteMetric = (index: number) => {
    updateAbout({
      metrics: (about.metrics || []).filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <BookOpen className="text-indigo-400" size={20} />
          <span>About Me & Executive Narrative</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Detailed technical background, philosophy, key metrics, and milestone achievements.
        </p>
      </div>

      <Textarea
        label="Executive Summary"
        value={about.summary}
        onChange={(e) => updateAbout({ summary: e.target.value })}
        rows={3}
        placeholder="High-level engineering background..."
      />

      {/* Metrics Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 size={16} className="text-cyan-400" />
            <span className="text-sm font-semibold text-white">System & Career Metrics</span>
          </div>
          <Button size="sm" variant="outline" icon={<Plus size={13} />} onClick={handleAddMetric}>
            Add Metric
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(about.metrics || []).map((m, idx) => (
            <div key={m.id || idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Input
                  label="Value"
                  value={m.value}
                  onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                  placeholder="e.g. 50K+"
                  className="font-mono"
                />
                <Input
                  label="Label"
                  value={m.label}
                  onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                  placeholder="e.g. RPS Sustained"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteMetric(idx)}
                  className="p-2 mt-5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <Input
                label="Description (Optional)"
                value={m.description || ''}
                onChange={(e) => handleUpdateMetric(idx, 'description', e.target.value)}
                placeholder="P99 latency under 40ms"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Paragraphs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white">Story & Engineering Philosophy</span>
          <Button size="sm" variant="outline" icon={<Plus size={13} />} onClick={handleAddParagraph}>
            Add Paragraph
          </Button>
        </div>

        <div className="space-y-3">
          {about.storyParagraphs.map((para, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-slate-500 mt-2 shrink-0">#{idx + 1}</span>
              <Textarea
                value={para}
                onChange={(e) => handleUpdateParagraph(idx, e.target.value)}
                rows={2}
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleDeleteParagraph(idx)}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer mt-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Highlights */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold text-white">Milestones & Career Highlights</span>
          </div>
          <Button size="sm" variant="outline" icon={<Plus size={13} />} onClick={handleAddHighlight}>
            Add Highlight
          </Button>
        </div>

        <div className="space-y-2">
          {about.highlights.map((h, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
              <Input
                value={h}
                onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                placeholder="Key bullet point..."
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => handleDeleteHighlight(idx)}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
