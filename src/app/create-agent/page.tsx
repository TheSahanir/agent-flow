'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AgentForm } from '@/components/create-agent/agent-form';
import { AgentFormData } from '@/types';
import { motion } from 'framer-motion';

export default function CreateAgentPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateAgent = async (data: AgentFormData) => {
    setIsCreating(true);
    
    // Aqui você faria a chamada para criar o agente no backend
    console.log('Criando agente com dados:', data);
    
    // Simular criação
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Crie seu Agente Inteligente
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Configure sua inteligência artificial em 4 passos simples. 
            Em menos de 5 minutos seu agente estará pronto para atender clientes.
          </p>
        </motion.div>

        <AgentForm onComplete={handleCreateAgent} />

        {isCreating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg font-medium text-gray-900">
                Criando seu agente...
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Isso pode levar alguns segundos
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
