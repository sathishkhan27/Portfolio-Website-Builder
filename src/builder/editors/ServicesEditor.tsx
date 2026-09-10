import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Plus, Trash2, Zap } from 'lucide-react';
import { ServiceItem } from '../../types/portfolio';

export const ServicesEditor: React.FC = () => {
  const { portfolio, updateServices } = usePortfolioStore();
  const { services } = portfolio;

  const handleAdd = () => {
    const newItem: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Consulting & Architecture',
      description: 'End-to-end modern software engineering and systems design.',
      iconName: 'Code',
      tags: ['React', 'Architecture']
    };
    updateServices([...services, newItem]);
  };

  const handleUpdate = (index: number, fields: Partial<ServiceItem>) => {
    const updated = [...services];
    updated[index] = { ...updated[index], ...fields };
    updateServices(updated);
  };

  const handleDelete = (index: number) => {
    updateServices(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="text-indigo-400" size={20} />
            <span>Services & Advisory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Offerings, consulting specializations, and client service models.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAdd}>
          Add Service
        </Button>
      </div>

      <div className="space-y-4">
        {services.map((srv, idx) => (
          <div key={srv.id || idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Service #{idx + 1}</span>
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <Input
              label="Service Title"
              value={srv.title}
              onChange={(e) => handleUpdate(idx, { title: e.target.value })}
              placeholder="e.g. Enterprise AI Integration"
            />

            <Textarea
              label="Description"
              value={srv.description}
              onChange={(e) => handleUpdate(idx, { description: e.target.value })}
              rows={2}
            />

            <Input
              label="Tags (Comma-separated)"
              value={srv.tags.join(', ')}
              onChange={(e) =>
                handleUpdate(idx, {
                  tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                })
              }
              placeholder="TypeScript, AWS, Architecture"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
