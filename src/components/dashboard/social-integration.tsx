'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MessageCircle, Check, X, ExternalLink } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SocialConnection {
  id: string;
  platform: 'facebook' | 'instagram' | 'whatsapp';
  page_name?: string;
  phone_number?: string;
  connected_at: string;
}

interface SocialIntegrationProps {
  userId: string;
}

export function SocialIntegration({ userId }: SocialIntegrationProps) {
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadConnections();
  }, [userId]);

  const loadConnections = async () => {
    try {
      const { data } = await supabase
        .from('social_connections')
        .select('*')
        .eq('user_id', userId);

      setConnections(data || []);
    } catch (error) {
      console.error('Error loading connections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (platform: 'facebook' | 'instagram' | 'whatsapp') => {
    const authUrl = `/api/social/${platform}/auth?user_id=${userId}`;
    window.location.href = authUrl;
  };

  const handleDisconnect = async (connectionId: string) => {
    if (confirm('Tem certeza que deseja desconectar esta conta?')) {
      try {
        await supabase
          .from('social_connections')
          .delete()
          .eq('id', connectionId);

        setConnections(connections.filter(c => c.id !== connectionId));
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    }
  };

  const platformConfig = {
    facebook: {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Conecte sua página do Facebook',
    },
    instagram: {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-600',
      description: 'Conecte sua conta do Instagram',
    },
    whatsapp: {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600',
      description: 'Conecte seu número do WhatsApp',
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrações Sociais</h3>
        <p className="text-sm text-gray-600 mb-6">
          Conecte suas contas sociais para que seu agente possa responder mensagens automaticamente
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(platformConfig).map(([platform, config]) => {
          const Icon = config.icon;
          const connection = connections.find(c => c.platform === platform);
          const isConnected = !!connection;

          return (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${config.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{config.name}</h4>
                    <p className="text-sm text-gray-600">{config.description}</p>
                  </div>
                </div>
                {isConnected && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>

              {isConnected ? (
                <div className="space-y-2">
                  <div className="text-sm">
                    <p className="text-gray-600">
                      {connection.page_name || connection.phone_number || 'Conectado'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Desde {new Date(connection.connected_at).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDisconnect(connection.id)}
                    className="w-full text-sm text-red-600 hover:text-red-700 border border-red-300 rounded-md py-2 px-3 hover:bg-red-50 transition-colors"
                  >
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleConnect(platform as 'facebook' | 'instagram' | 'whatsapp')}
                  className={`w-full ${config.color} text-white rounded-md py-2 px-3 hover:opacity-90 transition-opacity`}
                >
                  Conectar {config.name}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {connections.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Status das Integrações</h4>
          <div className="space-y-2">
            {connections.map(connection => (
              <div key={connection.id} className="flex items-center justify-between text-sm">
                <span className="text-green-700">
                  {platformConfig[connection.platform].name} - 
                  {connection.page_name || connection.phone_number || 'Conectado'}
                </span>
                <span className="text-green-600">Ativo</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
