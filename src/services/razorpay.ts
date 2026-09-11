import { MembershipPlan, PaymentRecord } from '../types/membership';

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

/**
 * Dynamically loads the official Razorpay Checkout JavaScript SDK
 */
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface InitiatePaymentParams {
  plan: MembershipPlan;
  keyId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  useTestMode?: boolean;
  onSuccess: (record: PaymentRecord) => void;
  onError: (errorMsg: string) => void;
  onDismiss?: () => void;
}

/**
 * Initiates Razorpay payment flow or simulates in test mode if selected
 */
export const initiateRazorpayPayment = async ({
  plan,
  keyId,
  customerName,
  customerEmail,
  customerPhone = '9999999999',
  useTestMode = false,
  onSuccess,
  onError,
  onDismiss,
}: InitiatePaymentParams): Promise<void> => {
  // If test mode is explicitly enabled and no valid Razorpay key is configured, simulate instant sandbox approval
  const effectiveKey = keyId.trim() || (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined)?.trim();

  if (useTestMode && (!effectiveKey || effectiveKey === 'rzp_test_demo')) {
    // Simulated instant sandbox checkout for testing/evaluation
    const simulatedPaymentId = `pay_sim_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const record: PaymentRecord = {
      paymentId: simulatedPaymentId,
      orderId: `order_sim_${Date.now()}`,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      currency: 'INR',
      date: new Date().toISOString(),
      customerName: customerName || 'Solo Creator',
      customerEmail: customerEmail || 'creator@example.com',
    };
    onSuccess(record);
    return;
  }

  if (!effectiveKey) {
    onError('Please provide a valid Razorpay Key ID (rzp_test_... or rzp_live_...) or enable Test Simulator mode.');
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    onError('Failed to load Razorpay Payment Gateway SDK. Please check your internet connection and try again.');
    return;
  }

  try {
    const options: RazorpayOptions = {
      key: effectiveKey,
      amount: plan.price * 100, // Razorpay expects amount in smallest currency unit (paise)
      currency: 'INR',
      name: 'WB Portfolio Builder',
      description: `${plan.name} - Full Source Code Access`,
      image: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png',
      handler: (response) => {
        const record: PaymentRecord = {
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          planId: plan.id,
          planName: plan.name,
          amount: plan.price,
          currency: 'INR',
          date: new Date().toISOString(),
          customerName: customerName || 'Solo Creator',
          customerEmail: customerEmail || 'creator@example.com',
        };
        onSuccess(record);
      },
      prefill: {
        name: customerName,
        email: customerEmail,
        contact: customerPhone,
      },
      notes: {
        plan_id: plan.id,
        plan_name: plan.name,
        service: 'WB Portfolio Source Code License',
      },
      theme: {
        color: '#4f46e5', // Indigo 600
        backdrop_color: 'rgba(15, 23, 42, 0.85)',
      },
      modal: {
        ondismiss: () => {
          if (onDismiss) onDismiss();
        },
        escape: true,
        confirm_close: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Razorpay initialization failed:', err);
    onError(err instanceof Error ? err.message : 'Payment initialization failed');
  }
};
