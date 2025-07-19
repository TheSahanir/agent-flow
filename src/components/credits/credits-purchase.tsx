'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  stripe_price_id: string;
}

export default function CreditsPurchase() {
  const [loading, setLoading] = useState<string | null>(null);
  const [creditPlans, setCreditPlans] = useState<CreditPlan[]>([]);

  useEffect(() => {
    loadCreditPlans();
  }, []);

  const loadCreditPlans = async () => {
    try {
      const { data } = await supabase
        .from('credit_plans')
        .select('*')
        .order('credits', { ascending: true });

      setCreditPlans(data || []);
    } catch (error) {
      console.error('Error loading credit plans:', error);
    }
  };

  const handlePurchase = async (planId: string) => {
    setLoading(planId);
    
    try {
      const selectedPlan = creditPlans.find(p => p.id === planId);
      if (!selectedPlan) return;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPlan.stripe_price_id,
          credits: selectedPlan.credits,
          planId: selectedPlan.id,
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
      setLoading(null);
    }
  };

  if (creditPlans.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Carregando planos de créditos...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {creditPlans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">{plan.credits}</div>
          <p className="text-gray-600 mb-4">créditos</p>
          <div className="text-2xl font-bold text-gray-900 mb-4">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: plan.currency || 'BRL'
            }).format(Number(plan.price))}
          </div>
          <button
            onClick={() => handlePurchase(plan.id)}
            disabled={loading === plan.id || !plan.stripe_price_id}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === plan.id ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              'Comprar'
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
