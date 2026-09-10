import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Select } from '../../ui/Select';
import { Card } from '../../ui/Card';
import { User, Mail, MapPin, Phone, Briefcase, Sparkles } from 'lucide-react';

export const PersonalInfoEditor: React.FC = () => {
  const { portfolio, updatePersonal } = usePortfolioStore();
  const { personal } = portfolio;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <User className="text-indigo-400" size={20} />
          <span>Personal Information</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Core identity, professional title, availability status, and contact handles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          value={personal.fullName}
          onChange={(e) => updatePersonal({ fullName: e.target.value })}
          placeholder="e.g. Alex Mercer"
          error={!personal.fullName ? 'Full name is required' : undefined}
        />

        <Input
          label="Professional Headline *"
          value={personal.headline}
          onChange={(e) => updatePersonal({ headline: e.target.value })}
          placeholder="e.g. Principal Software Architect & AI Engineer"
          error={!personal.headline ? 'Headline is required' : undefined}
        />
      </div>

      <Textarea
        label="Elevator Tagline / Mission"
        value={personal.tagline}
        onChange={(e) => updatePersonal({ tagline: e.target.value })}
        rows={2}
        placeholder="Brief one-sentence pitch of your technical impact"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Primary Email *"
          type="email"
          value={personal.email}
          onChange={(e) => updatePersonal({ email: e.target.value })}
          icon={<Mail size={14} />}
          placeholder="alex@example.com"
        />

        <Input
          label="Phone Number"
          value={personal.phone || ''}
          onChange={(e) => updatePersonal({ phone: e.target.value })}
          icon={<Phone size={14} />}
          placeholder="+1 (555) 000-0000"
        />

        <Input
          label="Location"
          value={personal.location}
          onChange={(e) => updatePersonal({ location: e.target.value })}
          icon={<MapPin size={14} />}
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Years of Experience"
          type="number"
          min={0}
          max={60}
          value={personal.yearsOfExperience}
          onChange={(e) => updatePersonal({ yearsOfExperience: parseInt(e.target.value) || 0 })}
          icon={<Briefcase size={14} />}
        />

        <Select
          label="Availability Status"
          value={personal.availabilityStatus}
          onChange={(e) => updatePersonal({ availabilityStatus: e.target.value as any })}
          options={[
            { value: 'available', label: 'Available (Actively Looking)' },
            { value: 'open_to_offers', label: 'Open to High-Impact Offers' },
            { value: 'not_available', label: 'Not Available' },
          ]}
        />

        <Input
          label="Status Badge Note"
          value={personal.availabilityText || ''}
          onChange={(e) => updatePersonal({ availabilityText: e.target.value })}
          placeholder="Available for Staff/Lead Roles"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Avatar / Headshot URL"
          value={personal.avatarUrl || ''}
          onChange={(e) => updatePersonal({ avatarUrl: e.target.value })}
          placeholder="https://..."
          helperText="Direct image URL for your profile avatar"
        />

        <Input
          label="Avatar Initials Fallback"
          value={personal.avatarFallback || ''}
          onChange={(e) => updatePersonal({ avatarFallback: e.target.value.toUpperCase().slice(0, 3) })}
          placeholder="AM"
          helperText="Monogram displayed in navbar and badges"
        />
      </div>
    </div>
  );
};
