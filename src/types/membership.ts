export type MembershipPlanId = 'free' | 'pro_single' | 'lifetime';

export interface MembershipPlan {
  id: MembershipPlanId;
  name: string;
  tagline: string;
  price: number; // in INR (Rupees)
  originalPrice?: number;
  badge?: string;
  popular?: boolean;
  features: string[];
}

export interface PaymentRecord {
  paymentId: string;
  orderId?: string;
  planId: MembershipPlanId;
  planName: string;
  amount: number; // in INR
  currency: string;
  date: string;
  customerName: string;
  customerEmail: string;
}

export interface MembershipState {
  isMember: boolean;
  planId: MembershipPlanId;
  paymentRecord: PaymentRecord | null;
  razorpayKeyId: string;
  useTestMode: boolean;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'pro_single',
    name: 'Pro Single Export',
    tagline: 'Ideal for launching a single personal portfolio',
    price: 299,
    originalPrice: 799,
    badge: 'Standard',
    popular: false,
    features: [
      'Full Source Code Download (.ZIP)',
      'Clean React 19 + TypeScript + Vite project',
      'Tailwind CSS v4 styling & animations',
      'Production-ready build configuration',
      'Commercial & Personal Use License',
      'No watermarks or vendor lock-in'
    ]
  },
  {
    id: 'lifetime',
    name: 'Lifetime VIP All-Access',
    tagline: 'For developers, freelancers & power creators',
    price: 799,
    originalPrice: 1999,
    badge: 'Best Value',
    popular: true,
    features: [
      'Unlimited Source Code Exports (.ZIP)',
      'Access to ALL 6+ current & upcoming templates',
      'All color themes & typography engines',
      'Clean React 19 + TypeScript + Vite project',
      'Priority customer support & template updates',
      'Lifetime updates & new feature access',
      'Commercial & Client Use License'
    ]
  }
];
