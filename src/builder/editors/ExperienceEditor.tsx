import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Switch } from '../../ui/Switch';
import { Plus, Trash2, Briefcase, Calendar, Building } from 'lucide-react';
import { ExperienceItem } from '../../types/portfolio';

export const ExperienceEditor: React.FC = () => {
  const { portfolio, updateExperience } = usePortfolioStore();
  const { experience } = portfolio;

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      companyUrl: 'https://example.com',
      location: 'San Francisco, CA',
      type: 'Full-time',
      startDate: '2023-01',
      endDate: '',
      current: true,
      description: 'Led development of distributed platform microservices.',
      achievements: ['Increased system throughput by 40%', 'Mentored junior developers'],
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
    };
    updateExperience([newItem, ...experience]);
  };

  const handleUpdate = (index: number, fields: Partial<ExperienceItem>) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], ...fields };
    updateExperience(updated);
  };

  const handleDelete = (index: number) => {
    updateExperience(experience.filter((_, i) => i !== index));
  };

  const handleAddAchievement = (expIndex: number) => {
    const updated = [...experience];
    updated[expIndex].achievements.push('New key milestone or metric delivered.');
    updateExperience(updated);
  };

  const handleUpdateAchievement = (expIndex: number, achIndex: number, text: string) => {
    const updated = [...experience];
    updated[expIndex].achievements[achIndex] = text;
    updateExperience(updated);
  };

  const handleDeleteAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...experience];
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_, i) => i !== achIndex);
    updateExperience(updated);
  };

  const handleTechStringChange = (expIndex: number, text: string) => {
    const tags = text.split(',').map((t) => t.trim()).filter(Boolean);
    handleUpdate(expIndex, { technologies: tags });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Briefcase className="text-indigo-400" size={20} />
            <span>Work Experience & Roles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Showcase your leadership, engineering milestones, and companies you've scaled.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAddExperience}>
          Add Position
        </Button>
      </div>

      <div className="space-y-6">
        {experience.map((exp, idx) => (
          <div
            key={exp.id || idx}
            className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4 relative group"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Position #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Remove experience"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Role / Title *"
                value={exp.role}
                onChange={(e) => handleUpdate(idx, { role: e.target.value })}
                placeholder="Staff Engineer"
              />
              <Input
                label="Company Name *"
                value={exp.company}
                onChange={(e) => handleUpdate(idx, { company: e.target.value })}
                placeholder="Stripe, Inc."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Company Website"
                value={exp.companyUrl || ''}
                onChange={(e) => handleUpdate(idx, { companyUrl: e.target.value })}
                placeholder="https://..."
              />
              <Input
                label="Location"
                value={exp.location || ''}
                onChange={(e) => handleUpdate(idx, { location: e.target.value })}
                placeholder="San Francisco, CA"
              />
              <Input
                label="Employment Type"
                value={exp.type || 'Full-time'}
                onChange={(e) => handleUpdate(idx, { type: e.target.value as any })}
                placeholder="Full-time, Contract..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <Input
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => handleUpdate(idx, { startDate: e.target.value })}
                placeholder="2022-04"
              />
              <Input
                label="End Date"
                disabled={exp.current}
                value={exp.current ? 'Present' : exp.endDate || ''}
                onChange={(e) => handleUpdate(idx, { endDate: e.target.value })}
                placeholder="2024-06"
              />
              <div className="pt-5">
                <Switch
                  label="Currently Working Here"
                  checked={exp.current}
                  onChange={(checked) => handleUpdate(idx, { current: checked })}
                />
              </div>
            </div>

            <Textarea
              label="Role Overview & Scope"
              value={exp.description}
              onChange={(e) => handleUpdate(idx, { description: e.target.value })}
              rows={2}
            />

            {/* Achievements */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Key Achievements & Impact</span>
                <Button size="sm" variant="ghost" icon={<Plus size={12} />} onClick={() => handleAddAchievement(idx)}>
                  Add Bullet
                </Button>
              </div>
              {exp.achievements.map((ach, aIdx) => (
                <div key={aIdx} className="flex items-center gap-2">
                  <Input
                    value={ach}
                    onChange={(e) => handleUpdateAchievement(idx, aIdx, e.target.value)}
                    placeholder="Impact bullet point..."
                    className="flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteAchievement(idx, aIdx)}
                    className="p-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <Input
              label="Technologies Used (Comma-separated)"
              value={exp.technologies.join(', ')}
              onChange={(e) => handleTechStringChange(idx, e.target.value)}
              placeholder="TypeScript, Next.js, Go, PostgreSQL"
              helperText="Separate multiple tags with commas"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
