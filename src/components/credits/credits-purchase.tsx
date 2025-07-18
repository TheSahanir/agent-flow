'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const creditPackages = [
  { id: 'basic', name: 'Pacote Básico', credits: 100, price: 1000, priceLabel: 'R$ 10,00' },
  { id: 'standard', name: 'Pacote Padrão', credits: 500, price: 4500, priceLabel: 'R$ 45,00' },
  { id: 'premium', name: 'Pacote Premium', credits: 1000, price: 8000, priceLabel: 'R$ 80,00' },
];

export default function CreditsPurchase() {
  const [loading, setLoading] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setLoading(packageId);
    
    try {
      const selectedPackage = creditPackages.find(p => p.id === packageId);
      if (!selectedPackage) return;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPackage.price,
          credits: selectedPackage.credits,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {creditPackages.map((pkg) => (
        <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">{pkg.credits}</div>
          <p className="text-gray-600 mb-4">créditos</p>
          <div className="text-2xl font-bold text-gray-900 mb-4">{pkg.priceLabel}</div>
          <button
            onClick={() => handlePurchase(pkg.id)}
            disabled={loading === pkg.id}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === pkg.id ? (
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
