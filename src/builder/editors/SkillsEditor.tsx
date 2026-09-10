import React, { useState } from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2, Layers, Cpu, GripVertical } from 'lucide-react';
import { SkillCategory, SkillItem } from '../../types/portfolio';

export const SkillsEditor: React.FC = () => {
  const { portfolio, updateSkills } = usePortfolioStore();
  const { skills } = portfolio;
  const [activeCatIndex, setActiveCatIndex] = useState(0);

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: 'New Competency Group',
      skills: []
    };
    updateSkills([...skills, newCat]);
    setActiveCatIndex(skills.length);
  };

  const handleRemoveCategory = (index: number) => {
    if (skills.length <= 1) return;
    const updated = skills.filter((_, i) => i !== index);
    updateSkills(updated);
    setActiveCatIndex(Math.max(0, index - 1));
  };

  const handleUpdateCategoryName = (index: number, name: string) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], name };
    updateSkills(updated);
  };

  const handleAddSkill = (catIndex: number) => {
    const newSkill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: 'New Technology',
      level: 85,
      category: skills[catIndex].id,
      years: 3
    };
    const updated = [...skills];
    updated[catIndex].skills.push(newSkill);
    updateSkills(updated);
  };

  const handleUpdateSkill = (catIndex: number, skillIndex: number, fields: Partial<SkillItem>) => {
    const updated = [...skills];
    updated[catIndex].skills[skillIndex] = {
      ...updated[catIndex].skills[skillIndex],
      ...fields
    };
    updateSkills(updated);
  };

  const handleRemoveSkill = (catIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[catIndex].skills = updated[catIndex].skills.filter((_, i) => i !== skillIndex);
    updateSkills(updated);
  };

  const currentCat = skills[activeCatIndex] || skills[0];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Layers className="text-indigo-400" size={20} />
          <span>Skills & Technical Stack</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Organize languages, frameworks, cloud services, and AI architectures by discipline.
        </p>
      </div>

      {/* Category Tabs & Add */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        {skills.map((cat, idx) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCatIndex(idx)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeCatIndex === idx
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.name} ({cat.skills.length})
          </button>
        ))}

        <Button size="sm" variant="outline" icon={<Plus size={13} />} onClick={handleAddCategory}>
          New Category
        </Button>
      </div>

      {currentCat && (
        <div className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <div className="flex-1 max-w-sm">
              <Input
                label="Category Name"
                value={currentCat.name}
                onChange={(e) => handleUpdateCategoryName(activeCatIndex, e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <Button
                size="sm"
                variant="primary"
                icon={<Plus size={13} />}
                onClick={() => handleAddSkill(activeCatIndex)}
              >
                Add Skill
              </Button>
              {skills.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(activeCatIndex)}
                  className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer rounded-lg hover:bg-slate-800 transition-colors"
                  title="Delete category"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Skill Items List */}
          <div className="space-y-3">
            {currentCat.skills.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500">
                No skills in this category yet. Click "Add Skill" above.
              </div>
            ) : (
              currentCat.skills.map((skill, sIdx) => (
                <div
                  key={skill.id}
                  className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-4">
                    <Input
                      label="Skill Name"
                      value={skill.name}
                      onChange={(e) => handleUpdateSkill(activeCatIndex, sIdx, { name: e.target.value })}
                      placeholder="e.g. React 19"
                    />
                  </div>

                  <div className="sm:col-span-4 space-y-1">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Proficiency</span>
                      <span className="font-mono text-indigo-400 font-bold">{skill.level}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={skill.level}
                      onChange={(e) =>
                        handleUpdateSkill(activeCatIndex, sIdx, { level: parseInt(e.target.value) })
                      }
                      className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      label="Experience (Yrs)"
                      type="number"
                      min={0}
                      max={30}
                      value={skill.years || 0}
                      onChange={(e) =>
                        handleUpdateSkill(activeCatIndex, sIdx, { years: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end pt-5">
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(activeCatIndex, sIdx)}
                      className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer transition-colors"
                      title="Remove skill"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
