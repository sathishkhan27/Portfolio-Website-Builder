import React, { useState } from 'react';
import { PortfolioData } from '../../types/portfolio';
import { ThemeConfig } from '../../types/theme';
import { Mail, MapPin, Calendar, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ModernContactProps {
  data: PortfolioData;
  theme: ThemeConfig;
}

export const ModernContact: React.FC<ModernContactProps> = ({ data, theme }) => {
  const { contact, personal } = data;
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${theme.colors.primary}15`,
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}30`
            }}
          >
            Initiate Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Let's Build Something Extraordinary
          </h2>
          <p className="text-slate-400 text-base">
            {contact.socialMessage || 'Open to technical leadership, architectural advisory, and high-impact engineering opportunities.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-md flex items-start gap-4 transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${theme.colors.primary}20`,
                  color: theme.colors.primary
                }}
              >
                <Mail size={20} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Direct Email
                </div>
                <a
                  href={`mailto:${contact.email || personal.email}`}
                  className="text-sm sm:text-base font-bold text-white hover:underline transition-all block break-all"
                  style={{ color: theme.colors.secondary }}
                >
                  {contact.email || personal.email}
                </a>
              </div>
            </div>

            {/* Location & Timezone Card */}
            <div
              className="p-6 rounded-2xl border backdrop-blur-md flex items-start gap-4 transition-all hover:border-slate-700"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${theme.colors.secondary}20`,
                  color: theme.colors.secondary
                }}
              >
                <MapPin size={20} />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Base Location
                </div>
                <div className="text-sm font-bold text-white">
                  {contact.location || personal.location}
                </div>
                {contact.officeHours && (
                  <div className="text-xs text-slate-400 flex items-center gap-1 pt-1">
                    <Clock size={12} />
                    <span>{contact.officeHours}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Calendly Booking Card */}
            {contact.calendarUrl && (
              <div
                className="p-6 rounded-2xl border backdrop-blur-md flex items-start gap-4 transition-all hover:border-slate-700"
                style={{
                  backgroundColor: 'var(--theme-card)',
                  borderColor: 'var(--theme-border)'
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-amber-400 bg-amber-400/10"
                >
                  <Calendar size={20} />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Schedule a Consultation
                  </div>
                  <div className="text-xs text-slate-300">
                    Book a 30-minute sync directly on my calendar.
                  </div>
                  <a
                    href={contact.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block pt-1 text-xs font-bold hover:underline"
                    style={{ color: theme.colors.primary }}
                  >
                    Open Calendar Booking →
                  </a>
                </div>
              </div>
            )}

          </div>

          {/* Right: Direct Interactive Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 rounded-2xl border backdrop-blur-md relative"
              style={{
                backgroundColor: 'var(--theme-card)',
                borderColor: 'var(--theme-border)'
              }}
            >
              {submitted ? (
                <div className="py-12 text-center space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Transmitted</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out! I typically reply within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 text-white font-bold text-base">
                    <MessageSquare size={18} style={{ color: theme.colors.primary }} />
                    <span>Send a Direct Message</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-300">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Subject / Topic</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="High-Scale Cloud Architecture Advisory"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi, I saw your work on distributed systems and would love to connect..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-indigo-500 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl font-semibold text-sm text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                      boxShadow: `0 8px 25px -4px ${theme.colors.primary}40`
                    }}
                  >
                    <Send size={16} />
                    <span>Transmit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
