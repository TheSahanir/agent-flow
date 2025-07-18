'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleStartNow = () => {
    router.push('/create-agent');
  };

  const handleDemo = () => {
    router.push('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Inteligência Artificial para seu negócio
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Crie seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Agente Inteligente
              </span>{' '}
              em minutos
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Conecte WhatsApp, Facebook e Instagram. Configure sua inteligência artificial 
              para atender clientes 24/7 sem complicações técnicas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleStartNow}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center">
                Começar Agora
                <motion.div
                  animate={{ x: isHovered ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.div>
              </span>
            </motion.button>

            <button 
              onClick={handleDemo}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-semibold text-lg hover:border-purple-300 hover:text-purple-600 transition-all duration-300 cursor-pointer"
            >
              Ver Demonstração
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4"
              >
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multi-plataforma
              </h3>
              <p className="text-gray-600">
                WhatsApp, Facebook e Instagram em um só lugar
              </p>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
              >
                <Zap className="w-8 h-8 text-blue-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Configuração Rápida
              </h3>
              <p className="text-gray-600">
                Configure seu agente em menos de 5 minutos
              </p>
            </div>

            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
              >
                <Sparkles className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Inteligência Avançada
              </h3>
              <p className="text-gray-600">
                Respostas naturais e personalizadas para seu negócio
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
