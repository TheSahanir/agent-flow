'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { AgentService } from '@/services/agent-service';
import { ChatService } from '@/services/chat-service';
import { Send, Bot, User, Loader2, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Agent, ChatMessage } from '@/types';

export default function ChatPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userCredits, setUserCredits] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkUser();
    loadAgent();
    loadMessages();
    loadUserCredits();
  }, [agentId]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '/auth/login';
    } else {
      setUser(user);
    }
  };

  const loadAgent = async () => {
    try {
      const agentData = await AgentService.getAgent(agentId);
      setAgent(agentData);
    } catch (error) {
      console.error('Error loading agent:', error);
    }
  };

  const loadMessages = async () => {
    if (!user) return;
    
    try {
      const chatHistory = await ChatService.getChatHistory(user.id, agentId);
      setMessages(chatHistory);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadUserCredits = async () => {
    if (!user) return;
    
    try {
      const credits = await ChatService.getUserCredits(user.id);
      setUserCredits(credits);
    } catch (error) {
      console.error('Error loading credits:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || !agent) return;

    if (userCredits < 1) {
      alert('Você não tem créditos suficientes. Por favor, compre mais créditos.');
      return;
    }

    setIsLoading(true);

    try {
      // Send message and get response
      const chatMessage = await ChatService.sendMessage(user.id, agentId, inputMessage);
      
      // Simulate AI response (in real implementation, this would come from AI service)
      const aiResponse = `Olá! Recebi sua mensagem: "${inputMessage}". Como posso ajudar você melhor?`;
      
      // Update message with response
      await ChatService.updateMessageResponse(chatMessage.id, aiResponse);
      
      // Reload messages
      await loadMessages();
      await loadUserCredits();
      
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!agent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{agent.name}</h1>
                <p className="text-sm text-gray-600">{agent.company_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{userCredits} créditos</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bem-vindo ao chat!</h3>
              <p className="text-gray-600">Comece uma conversa com {agent.name}</p>
            </div>
          )}
          
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex mb-4 ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.user_id === user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.user_id === user?.id ? 'ml-2 bg-purple-600' : 'mr-2 bg-gray-300'}`}>
                  {message.user_id === user?.id ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg ${message.user_id === user?.id ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                  <p className="text-sm">{message.message}</p>
                  {message.response && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-sm">{message.response}</p>
                    </div>
                  )}
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(message.created_at).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-6 py-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              disabled={isLoading}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
