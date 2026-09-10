import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Button } from '../../ui/Button';
import { Plus, Trash2, Share2, Mail } from 'lucide-react';
import { SocialLink } from '../../types/portfolio';

export const SocialLinksEditor: React.FC = () => {
  const { portfolio, updateSocials } = usePortfolioStore();
  const { socials } = portfolio;

  const handleAdd = () => {
    const newSocial: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/'
    };
    updateSocials([...socials, newSocial]);
  };

  const handleUpdate = (index: number, fields: Partial<SocialLink>) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], ...fields };
    updateSocials(updated);
  };

  const handleDelete = (index: number) => {
    updateSocials(socials.filter((_, i) => i !== index));
  };

  const platformOptions = [
    { value: 'github', label: 'GitHub' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'twitter', label: 'X (Twitter)' },
    { value: 'email', label: 'Email Address' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'medium', label: 'Medium' },
    { value: 'discord', label: 'Discord' },
    { value: 'website', label: 'Personal Website' },
    { value: 'other', label: 'Other Link' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Share2 className="text-indigo-400" size={20} />
            <span>Social & Online Profiles</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Links to GitHub, LinkedIn, X, personal tech blogs, and developer hubs.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAdd}>
          Add Social Link
        </Button>
      </div>

      <div className="space-y-3">
        {socials.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
          >
            <div className="sm:col-span-3">
              <Select
                label="Platform"
                value={item.platform}
                onChange={(e) => {
                  const plat = e.target.value as any;
                  const label = platformOptions.find((o) => o.value === plat)?.label || plat;
                  handleUpdate(idx, { platform: plat, label });
                }}
                options={platformOptions}
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Label Display"
                value={item.label}
                onChange={(e) => handleUpdate(idx, { label: e.target.value })}
                placeholder="GitHub"
              />
            </div>

            <div className="sm:col-span-4">
              <Input
                label="Target URL"
                value={item.url}
                onChange={(e) => handleUpdate(idx, { url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="sm:col-span-1 flex justify-end pt-5">
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="p-2 text-slate-400 hover:text-rose-400 cursor-pointer"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
