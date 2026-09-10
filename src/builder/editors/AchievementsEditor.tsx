import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, Trash2, Trophy } from 'lucide-react';
import { AchievementItem } from '../../types/portfolio';

export const AchievementsEditor: React.FC = () => {
  const { portfolio, updateAchievements } = usePortfolioStore();
  const { achievements } = portfolio;

  const handleAdd = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      title: 'Hackathon Grand Prize Winner',
      issuer: 'Global Developer Summit',
      date: '2024-05',
      description: 'Built an open-source real-time collaboration plugin.',
      url: 'https://example.com'
    };
    updateAchievements([...achievements, newItem]);
  };

  const handleUpdate = (index: number, fields: Partial<AchievementItem>) => {
    const updated = [...achievements];
    updated[index] = { ...updated[index], ...fields };
    updateAchievements(updated);
  };

  const handleDelete = (index: number) => {
    updateAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="text-indigo-400" size={20} />
            <span>Achievements, Awards & Talks</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Competition awards, conference keynotes, publications, and patents.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAdd}>
          Add Recognition
        </Button>
      </div>

      <div className="space-y-4">
        {achievements.map((item, idx) => (
          <div key={item.id || idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Award #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Title / Honor"
                  value={item.title}
                  onChange={(e) => handleUpdate(idx, { title: e.target.value })}
                  placeholder="Global Hackathon Winner"
                />
              </div>
              <Input
                label="Date"
                value={item.date}
                onChange={(e) => handleUpdate(idx, { date: e.target.value })}
                placeholder="2023-09"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Issuer / Organization"
                value={item.issuer}
                onChange={(e) => handleUpdate(idx, { issuer: e.target.value })}
                placeholder="TechCrunch Disrupt"
              />
              <Input
                label="Verification / Reference URL"
                value={item.url || ''}
                onChange={(e) => handleUpdate(idx, { url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <Textarea
              label="Description"
              value={item.description}
              onChange={(e) => handleUpdate(idx, { description: e.target.value })}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
