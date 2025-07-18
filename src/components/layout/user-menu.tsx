'use client';

import { useState, useEffect } from 'react';
import { User, CreditCard, Settings, LogOut, ChevronDown } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserMenuProps {
  user: any;
  credits?: number;
}

export function UserMenu({ user, credits = 0 }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userCredits, setUserCredits] = useState(credits);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      fetchUserCredits();
    }
  }, [user]);

  const fetchUserCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('user_credits')
        .select('balance')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setUserCredits(data.balance);
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{user.email}</p>
            <p className="text-xs text-blue-600">{userCredits} créditos</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
          <div className="p-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              href="/credits"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <CreditCard className="w-4 h-4" />
              <span>Comprar Créditos</span>
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </Link>
            
            <div className="border-t border-gray-200 my-2"></div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
