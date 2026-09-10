import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { EducationItem } from '../../types/portfolio';

export const EducationEditor: React.FC = () => {
  const { portfolio, updateEducation } = usePortfolioStore();
  const { education } = portfolio;

  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'State University',
      degree: 'Bachelor of Science (B.S.)',
      fieldOfStudy: 'Computer Science',
      startDate: '2016',
      endDate: '2020',
      grade: '3.8 GPA',
      activities: 'Dean\'s List, Hackathon Lead'
    };
    updateEducation([...education, newItem]);
  };

  const handleUpdate = (index: number, fields: Partial<EducationItem>) => {
    const updated = [...education];
    updated[index] = { ...updated[index], ...fields };
    updateEducation(updated);
  };

  const handleDelete = (index: number) => {
    updateEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <GraduationCap className="text-indigo-400" size={20} />
            <span>Academic Education</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Degrees, academic background, universities, and student achievements.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAdd}>
          Add Degree
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu, idx) => (
          <div key={edu.id || idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Entry #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Institution / University"
                value={edu.institution}
                onChange={(e) => handleUpdate(idx, { institution: e.target.value })}
                placeholder="University of California, Berkeley"
              />
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => handleUpdate(idx, { degree: e.target.value })}
                placeholder="Master of Science (M.S.)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Field of Study"
                value={edu.fieldOfStudy}
                onChange={(e) => handleUpdate(idx, { fieldOfStudy: e.target.value })}
                placeholder="Computer Science"
              />
              <Input
                label="Start Year"
                value={edu.startDate}
                onChange={(e) => handleUpdate(idx, { startDate: e.target.value })}
                placeholder="2014"
              />
              <Input
                label="End Year"
                value={edu.endDate}
                onChange={(e) => handleUpdate(idx, { endDate: e.target.value })}
                placeholder="2016"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Grade / Honors"
                value={edu.grade || ''}
                onChange={(e) => handleUpdate(idx, { grade: e.target.value })}
                placeholder="3.9 GPA, Magna Cum Laude"
              />
              <Input
                label="Activities & Societies"
                value={edu.activities || ''}
                onChange={(e) => handleUpdate(idx, { activities: e.target.value })}
                placeholder="ACM President, Research Assistant"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
