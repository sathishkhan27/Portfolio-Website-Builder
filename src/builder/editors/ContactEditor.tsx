import React from 'react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Mail, Calendar, Clock, MapPin } from 'lucide-react';

export const ContactEditor: React.FC = () => {
  const { portfolio, updateContact } = usePortfolioStore();
  const { contact } = portfolio;

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Mail className="text-indigo-400" size={20} />
          <span>Contact Information & Inquiries</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Direct email, timezone/office hours, and meeting calendar booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Contact Email"
          type="email"
          value={contact.email}
          onChange={(e) => updateContact({ email: e.target.value })}
          placeholder="alex@example.com"
          icon={<Mail size={14} />}
        />

        <Input
          label="Location / Base"
          value={contact.location}
          onChange={(e) => updateContact({ location: e.target.value })}
          placeholder="San Francisco, CA"
          icon={<MapPin size={14} />}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Office Hours / Response Time"
          value={contact.officeHours || ''}
          onChange={(e) => updateContact({ officeHours: e.target.value })}
          placeholder="Mon - Fri: 9:00 AM - 6:00 PM PST"
          icon={<Clock size={14} />}
        />

        <Input
          label="Calendly / Calendar Booking URL"
          value={contact.calendarUrl || ''}
          onChange={(e) => updateContact({ calendarUrl: e.target.value })}
          placeholder="https://calendly.com/your-username"
          icon={<Calendar size={14} />}
        />
      </div>

      <Textarea
        label="Invitation / Collaboration Pitch"
        value={contact.socialMessage || ''}
        onChange={(e) => updateContact({ socialMessage: e.target.value })}
        rows={3}
        placeholder="Custom note displayed above the contact form..."
      />
    </div>
  );
};
