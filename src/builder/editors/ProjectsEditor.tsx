import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Switch } from '../../ui/Switch';
import { Plus, Trash2, FolderGit2, Star, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

export const ProjectsEditor: React.FC = () => {
  const { portfolio, updateProjects } = usePortfolioStore();
  const { projects } = portfolio;

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New High-Impact Project',
      shortDescription: 'High performance web platform built with modern architecture.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      featured: true,
      role: 'Lead Architect',
      impact: '10K+ Monthly Active Users'
    };
    updateProjects([newProj, ...projects]);
  };

  const handleUpdate = (index: number, fields: Partial<ProjectItem>) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], ...fields };
    updateProjects(updated);
  };

  const handleDelete = (index: number) => {
    updateProjects(projects.filter((_, i) => i !== index));
  };

  const handleTagStringChange = (index: number, text: string) => {
    const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
    handleUpdate(index, { tags });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FolderGit2 className="text-indigo-400" size={20} />
            <span>Featured Projects</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Display applications, tools, libraries, and client systems you have designed or built.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAddProject}>
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {projects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Project #{idx + 1}
                </span>
                {proj.featured && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Remove project"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Project Title *"
                  value={proj.title}
                  onChange={(e) => handleUpdate(idx, { title: e.target.value })}
                  placeholder="e.g. HyperScale AI"
                />
              </div>
              <div className="pt-5">
                <Switch
                  label="Featured on Homepage"
                  checked={proj.featured}
                  onChange={(checked) => handleUpdate(idx, { featured: checked })}
                />
              </div>
            </div>

            <Textarea
              label="Short Pitch / Summary *"
              value={proj.shortDescription}
              onChange={(e) => handleUpdate(idx, { shortDescription: e.target.value })}
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Role / Contribution"
                value={proj.role || ''}
                onChange={(e) => handleUpdate(idx, { role: e.target.value })}
                placeholder="e.g. Creator & Lead Architect"
              />
              <Input
                label="Key Impact Metric"
                value={proj.impact || ''}
                onChange={(e) => handleUpdate(idx, { impact: e.target.value })}
                placeholder="e.g. 5,000+ GitHub Stars, 40% latency reduction"
              />
            </div>

            <Input
              label="Image / Cover URL"
              value={proj.imageUrl || ''}
              onChange={(e) => handleUpdate(idx, { imageUrl: e.target.value })}
              placeholder="https://..."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Live Application URL"
                value={proj.liveUrl || ''}
                onChange={(e) => handleUpdate(idx, { liveUrl: e.target.value })}
                icon={<ExternalLink size={14} />}
                placeholder="https://myproject.com"
              />
              <Input
                label="GitHub / Source Code URL"
                value={proj.githubUrl || ''}
                onChange={(e) => handleUpdate(idx, { githubUrl: e.target.value })}
                icon={<FolderGit2 size={14} />}
                placeholder="https://github.com/..."
              />
            </div>

            <Input
              label="Tech Stack Tags (Comma-separated)"
              value={proj.tags.join(', ')}
              onChange={(e) => handleTagStringChange(idx, e.target.value)}
              placeholder="React, TypeScript, Go, Tailwind CSS"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
