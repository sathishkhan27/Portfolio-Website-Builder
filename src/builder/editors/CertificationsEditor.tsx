import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { Plus, Trash2, Award } from 'lucide-react';
import { CertificationItem } from '../../types/portfolio';

export const CertificationsEditor: React.FC = () => {
  const { portfolio, updateCertifications } = usePortfolioStore();
  const { certifications } = portfolio;

  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2024-01',
      credentialId: 'AWS-12345',
      credentialUrl: 'https://aws.amazon.com/verification'
    };
    updateCertifications([...certifications, newItem]);
  };

  const handleUpdate = (index: number, fields: Partial<CertificationItem>) => {
    const updated = [...certifications];
    updated[index] = { ...updated[index], ...fields };
    updateCertifications(updated);
  };

  const handleDelete = (index: number) => {
    updateCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="text-indigo-400" size={20} />
            <span>Certifications & Badges</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Industry credentials from AWS, Google Cloud, Microsoft, or specialized institutes.
          </p>
        </div>
        <Button icon={<Plus size={14} />} onClick={handleAdd}>
          Add Credential
        </Button>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <div key={cert.id || idx} className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Certification #{idx + 1}</span>
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
                label="Certification Name"
                value={cert.name}
                onChange={(e) => handleUpdate(idx, { name: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
              />
              <Input
                label="Issuing Authority"
                value={cert.issuer}
                onChange={(e) => handleUpdate(idx, { issuer: e.target.value })}
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Issue Date"
                value={cert.issueDate}
                onChange={(e) => handleUpdate(idx, { issueDate: e.target.value })}
                placeholder="2023-08"
              />
              <Input
                label="Credential ID"
                value={cert.credentialId || ''}
                onChange={(e) => handleUpdate(idx, { credentialId: e.target.value })}
                placeholder="AWS-PSA-8829104"
              />
              <Input
                label="Verification URL"
                value={cert.credentialUrl || ''}
                onChange={(e) => handleUpdate(idx, { credentialUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
