'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CreditButtonProps {
  priceId: string;
  credits: number;
  price: number;
  userId: string;
  userEmail: string;
  children: React.ReactNode;
}

export function CreditButton({ priceId, credits, price, userId, userEmail, children }: CreditButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          credits,
          price,
          userId,
          userEmail,
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error('Stripe error:', error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Processando...
        </div>
      ) : (
        children
      )}
    </button>
  );
}
