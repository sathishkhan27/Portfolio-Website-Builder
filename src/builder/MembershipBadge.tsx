import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { Crown, Sparkles, ShieldCheck } from 'lucide-react';

interface MembershipBadgeProps {
  compact?: boolean;
}

export const MembershipBadge: React.FC<MembershipBadgeProps> = ({ compact = false }) => {
  const { isMember, membershipPlanId, openMembershipModal } = usePortfolioStore();

  if (isMember) {
    const isLifetime = membershipPlanId === 'lifetime';
    return (
      <button
        onClick={() => openMembershipModal(false)}
        className={`flex items-center gap-1.5 rounded-xl font-bold tracking-tight transition-all cursor-pointer shadow-lg ${
          isLifetime
            ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 shadow-amber-500/20 hover:shadow-amber-500/30'
            : 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-indigo-500/25 hover:shadow-indigo-500/35'
        } ${compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}`}
        title="View Active Membership & License"
      >
        <Crown size={compact ? 13 : 15} className="fill-current" />
        <span>{isLifetime ? 'VIP LIFETIME' : 'PRO MEMBER'}</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => openMembershipModal(false)}
      className={`flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 hover:bg-indigo-900/50 hover:border-indigo-400/50 transition-all cursor-pointer ${
        compact ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
      }`}
      title="Unlock Source Code Download & Pro Features"
    >
      <Sparkles size={compact ? 12 : 14} className="text-indigo-400 animate-pulse" />
      <span className="font-semibold">Upgrade to PRO</span>
    </button>
  );
};
