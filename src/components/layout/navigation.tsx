'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, PlusCircle, BarChart3, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserMenu } from './user-menu';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigationItems = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Teste Auth', href: '/test-auth', icon: null },
    { name: 'Debug Login', href: '/debug-redirect', icon: null },
    ...(user ? [
      { name: 'Criar Agente', href: '/create-agent', icon: PlusCircle },
      { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    ] : []),
  ];

  const authItems = user ? [] : [
    { name: 'Entrar', href: '/auth/login', icon: null },
    { name: 'Cadastrar', href: '/auth/signup', icon: null },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo_hello_branco.png"
              alt="Hello Logo"
              width={100}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={() => router.push(item.href)}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span className="text-sm font-medium">{item.name}</span>
              </motion.button>
            ))}
            
            {authItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={() => router.push(item.href)}
              >
                <span className="text-sm font-medium">{item.name}</span>
              </motion.button>
            ))}
            
            {user && <UserMenu user={user} />}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-100"
      >
        <div className="px-4 py-4 space-y-2">
          {navigationItems.map((item) => (
            <motion.button
              key={item.name}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              onClick={() => {
                router.push(item.href);
                setIsMenuOpen(false);
              }}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
          
          {authItems.map((item) => (
            <motion.button
              key={item.name}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              onClick={() => {
                router.push(item.href);
                setIsMenuOpen(false);
              }}
            >
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
          
          {user && (
            <div className="border-t border-gray-200 pt-2">
              <UserMenu user={user} />
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
