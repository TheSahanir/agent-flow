'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AgentService } from '@/services/agent-service';
import { Agent } from '@/types';
import { motion } from 'framer-motion';
import { Plus, Settings, Play, Trash2, Bot, CreditCard, MessageCircle } from 'lucide-react';
import CreditsPurchase from '@/components/credits/credits-purchase';
import { SocialIntegration } from '@/components/dashboard/social-integration';

export default function DashboardPage() {
  const router = useRouter();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
    loadAgents();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/auth/login');
    } else {
      setUser(user);
    }
  };

  const loadAgents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const userAgents = await AgentService.getUserAgents(user.id);
        setAgents(userAgents);
      }
    } catch (error) {
      console.error('Error loading agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (confirm('Tem certeza que deseja excluir este agente?')) {
      try {
        await AgentService.deleteAgent(agentId);
        setAgents(agents.filter(agent => agent.id !== agentId));
      } catch (error) {
        console.error('Error deleting agent:', error);
      }
    }
  };

  const handleToggleAgent = async (agent: Agent) => {
    try {
      const updatedAgent = await AgentService.updateAgent(agent.id, {
        is_active: !agent.is_active
      });
      setAgents(agents.map(a => a.id === agent.id ? updatedAgent : a));
    } catch (error) {
      console.error('Error toggling agent:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meus Agentes</h1>
            <p className="text-gray-600 mt-1">Gerencie seus assistentes inteligentes</p>
          </div>
          <button
            onClick={() => router.push('/create-agent')}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Novo Agente
          </button>
        </div>

        {agents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agente criado</h3>
            <p className="text-gray-600 mb-4">Crie seu primeiro agente inteligente</p>
            <button
              onClick={() => router.push('/create-agent')}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Agente
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.company_name}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    agent.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {agent.is_active ? 'Ativo' : 'Inativo'}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Estilo:</span>
                    {agent.response_style === 'formal' ? 'Formal' : 
                     agent.response_style === 'friendly' ? 'Amigável' : 'Casual'}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Criatividade:</span>
                    {agent.creativity_level}%
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => router.push(`/dashboard/chat/${agent.id}`)}
                    className="flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Conversar
                  </button>
                  <button
                    onClick={() => handleToggleAgent(agent)}
                    className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md ${
                      agent.is_active
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push(`/agents/${agent.id}/settings`)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAgent(agent.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SocialIntegration userId={user?.id} />
          </div>
        </div>

        <div className="mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <CreditCard className="w-6 h-6 mr-2 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Comprar Créditos</h2>
            </div>
            <CreditsPurchase />
          </div>
        </div>
      </div>
    </div>
  );
}
