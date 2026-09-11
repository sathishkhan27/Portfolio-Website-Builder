import React, { useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { MEMBERSHIP_PLANS, MembershipPlanId, PaymentRecord } from '../types/membership';
import { initiateRazorpayPayment } from '../services/razorpay';
import { Button } from '../ui/Button';
import {
  X,
  Crown,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
  Download,
  CreditCard,
  Settings,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Receipt
} from 'lucide-react';

interface MembershipModalProps {
  onSuccessDownload?: () => void;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({ onSuccessDownload }) => {
  const {
    isMembershipModalOpen,
    closeMembershipModal,
    isMember,
    membershipPlanId,
    paymentRecord,
    razorpayKeyId,
    useTestMode,
    unlockMembership,
    resetMembership,
    setRazorpayKeyId,
    setUseTestMode,
    pendingDownloadAfterPayment,
    portfolio,
  } = usePortfolioStore();

  const [selectedPlanId, setSelectedPlanId] = useState<MembershipPlanId>('lifetime');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justCompletedPayment, setJustCompletedPayment] = useState<PaymentRecord | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState(razorpayKeyId);

  if (!isMembershipModalOpen) return null;

  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];

  const handlePayNow = async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    const customerName = portfolio.personal.fullName || 'Solo Creator';
    const customerEmail = portfolio.personal.email || 'creator@example.com';
    const customerPhone = portfolio.personal.phone || '9999999999';

    await initiateRazorpayPayment({
      plan: selectedPlan,
      keyId: customKeyInput || razorpayKeyId,
      customerName,
      customerEmail,
      customerPhone,
      useTestMode,
      onSuccess: (record) => {
        setIsProcessing(false);
        unlockMembership(record);
        setJustCompletedPayment(record);

        // If user came directly from "Download Source Code" button, trigger download
        if (pendingDownloadAfterPayment && onSuccessDownload) {
          setTimeout(() => {
            onSuccessDownload();
          }, 600);
        }
      },
      onError: (err) => {
        setIsProcessing(false);
        setErrorMessage(err);
      },
      onDismiss: () => {
        setIsProcessing(false);
      },
    });
  };

  const handleSaveKey = () => {
    setRazorpayKeyId(customKeyInput.trim());
    setShowSettings(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-slate-100 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={closeMembershipModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          <X size={18} />
        </button>

        {/* View: Already Member / Just Paid */}
        {(isMember || justCompletedPayment) ? (
          <div className="p-8 sm:p-10 space-y-6 text-center">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-center shadow-xl shadow-amber-500/20">
                <img src="/logo.png" alt="WB Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-md">
                <Crown size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <CheckCircle2 size={13} /> Active Membership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {justCompletedPayment
                  ? 'Welcome to the PRO Club!'
                  : 'You Have Full PRO Access!'}
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Your Razorpay transaction was verified. You have lifetime rights to download, customize, and deploy your complete standalone source code.
              </p>
            </div>

            {/* Payment Details Card */}
            {paymentRecord && (
              <div className="max-w-md mx-auto p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <Receipt size={14} className="text-indigo-400" /> Transaction Receipt
                  </span>
                  <span className="text-emerald-400 font-bold">PAID</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Payment ID:</span>
                  <span className="text-indigo-300 truncate max-w-[200px]">{paymentRecord.paymentId}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Plan:</span>
                  <span>{paymentRecord.planName}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Amount:</span>
                  <span className="text-white font-bold">₹{paymentRecord.amount} {paymentRecord.currency}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Date:</span>
                  <span>{new Date(paymentRecord.date).toLocaleDateString()}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onSuccessDownload && (
                <Button
                  variant="gradient"
                  size="lg"
                  icon={<Download size={18} />}
                  onClick={() => {
                    onSuccessDownload();
                    closeMembershipModal();
                  }}
                >
                  Download Source Code (.ZIP)
                </Button>
              )}

              <Button
                variant="outline"
                size="md"
                onClick={closeMembershipModal}
              >
                Close & Return to Builder
              </Button>
            </div>

            {/* Reset for testing */}
            <div className="pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={resetMembership}
                className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
              >
                [Developer Sandbox: Reset Membership to Free Tier]
              </button>
            </div>
          </div>
        ) : (
          /* View: Pricing & Razorpay Paywall */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shadow-xl shadow-indigo-500/10">
                <img src="/logo.png" alt="WB Logo" className="w-full h-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
                <Sparkles size={13} />
                <span>Instant Source Code Download</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Unlock Complete Source Code
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                Export clean, production-ready React 19 + Vite + Tailwind CSS v4 code. Deploy anywhere with zero watermarks and 100% full ownership.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Pricing Options Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MEMBERSHIP_PLANS.map((plan) => {
                const isSelected = selectedPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-800/90 border-indigo-500 shadow-xl shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-amber-500 to-yellow-300 text-slate-950 shadow-md">
                        {plan.badge || 'Most Popular'}
                      </div>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-white text-base">{plan.name}</div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'bg-indigo-600 border-indigo-500 text-white'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">{plan.tagline}</p>

                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-2xl sm:text-3xl font-black text-white">₹{plan.price}</span>
                        {plan.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">₹{plan.originalPrice}</span>
                        )}
                        <span className="text-[11px] text-indigo-400 font-medium">One-time payment</span>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <Check size={14} className="text-emerald-400 shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Razorpay Gateway Checkout CTA */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <CreditCard size={14} className="text-indigo-400" />
                    <span>Secure Razorpay Checkout</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Supports UPI (GPay, PhonePe, Paytm), All Debit/Credit Cards & NetBanking
                  </div>
                </div>

                {/* Settings toggle for API Key & Sandbox */}
                <button
                  type="button"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Settings size={13} />
                  <span>{showSettings ? 'Hide Gateway Config' : 'Razorpay Config'}</span>
                </button>
              </div>

              {/* Gateway Configuration Drawer */}
              {showSettings && (
                <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-3 animate-fadeIn text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">
                      Razorpay Key ID (rzp_test_... or rzp_live_...)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. rzp_test_xxxxxxxxxxxx"
                        value={customKeyInput}
                        onChange={(e) => setCustomKeyInput(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleSaveKey}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-xs cursor-pointer"
                      >
                        Save Key
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Can also be configured via <code className="text-slate-400">VITE_RAZORPAY_KEY_ID</code> in Render environment variables.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <div className="font-medium text-slate-300">Sandbox Test Mode Simulator</div>
                      <div className="text-[10px] text-slate-500">
                        Enables instant sandbox authorization without requiring real card/UPI testing
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={useTestMode}
                      onChange={(e) => setUseTestMode(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting to Razorpay...</span>
                  </>
                ) : (
                  <>
                    <Lock size={15} />
                    <span>
                      Pay ₹{selectedPlan.price} with Razorpay & Download Code
                    </span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" /> 256-bit Encrypted
                </span>
                <span>•</span>
                <span>Instant Automatic ZIP Download</span>
                <span>•</span>
                <span>Lifetime Commercial Rights</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
