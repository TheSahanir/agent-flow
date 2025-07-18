'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { CreditCard, Package, Zap, Check } from 'lucide-react';
import { CreditButton } from '@/components/credits/credit-button';

export default function CreditsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userCredits, setUserCredits] = useState(0);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUser(user);
      fetchUserCredits(user.id);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCredits = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('balance')
        .eq('user_id', userId)
        .single();

      if (data) {
        setUserCredits(data.balance);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comprar Créditos
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Você tem <span className="text-blue-600 font-bold">{userCredits}</span> créditos disponíveis
          </p>
          <p className="text-gray-500">
            Escolha um plano para continuar criando agentes incríveis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-4">Para começar</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                R$ 19,90
              </div>
              <p className="text-gray-600 mb-6">100 créditos</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>100 créditos de uso</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Suporte básico</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Sem expiração</span>
                </li>
              </ul>
              <CreditButton
                priceId="price_starter"
                credits={100}
                price={19.90}
                userId={user.id}
                userEmail={user.email}
              >
                Comprar Starter
              </CreditButton>
            </div>
          </div>

          {/* Professional Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Mais Popular
              </span>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-4">Para profissionais</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                R$ 49,90
              </div>
              <p className="text-gray-600 mb-6">500 créditos</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>500 créditos de uso</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Suporte prioritário</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Sem expiração</span>
                </li>
              </ul>
              <CreditButton
                priceId="price_professional"
                credits={500}
                price={49.90}
                userId={user.id}
                userEmail={user.email}
              >
                Comprar Professional
              </CreditButton>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-4">Para empresas</p>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                R$ 99,90
              </div>
              <p className="text-gray-600 mb-6">1200 créditos</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>1200 créditos de uso</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Suporte VIP</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Sem expiração</span>
                </li>
              </ul>
              <CreditButton
                priceId="price_enterprise"
                credits={1200}
                price={99.90}
                userId={user.id}
                userEmail={user.email}
              >
                Comprar Enterprise
              </CreditButton>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Precisa de mais créditos?{' '}
            <a href="mailto:suporte@helloagentes.com" className="text-blue-600 hover:underline">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
