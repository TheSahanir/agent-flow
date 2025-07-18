'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Bot, Building2, Package, MessageSquare, Sparkles } from 'lucide-react';
import { AgentFormData } from '@/types';

interface AgentFormProps {
  onComplete: (data: AgentFormData) => void;
}

const steps = [
  { id: 1, title: 'Informações Básicas', description: 'Nome do agente e empresa', icon: Bot },
  { id: 2, title: 'Produtos/Serviços', description: 'O que você oferece', icon: Package },
  { id: 3, title: 'Perguntas Frequentes', description: 'FAQ do seu negócio', icon: MessageSquare },
  { id: 4, title: 'Personalidade', description: 'Como seu agente deve se comportar', icon: Sparkles },
];

export function AgentForm({ onComplete }: AgentFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AgentFormData>({
    name: '',
    company_name: '',
    products: [],
    faqs: [],
    personality: '',
    response_style: 'friendly',
    creativity_level: 70,
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.company_name.trim();
      case 2:
        return formData.products.length > 0;
      case 3:
        return formData.faqs.length > 0;
      case 4:
        return formData.personality.trim();
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep > step.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : currentStep === step.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-100 text-gray-500 border border-gray-300'
                  }`}
                  animate={{
                    scale: currentStep === step.id ? 1.1 : 1,
                  }}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </motion.div>
                <div className="mt-3 text-center">
                  <p className={`text-sm font-medium transition-colors ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>{step.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-full h-0.5 mx-4 transition-all duration-500 ${
                    currentStep > step.id ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <Step1BasicInfo
                data={formData}
                onChange={setFormData}
              />
            )}
            {currentStep === 2 && (
              <Step2Products
                data={formData}
                onChange={setFormData}
              />
            )}
            {currentStep === 3 && (
              <Step3FAQs
                data={formData}
                onChange={setFormData}
              />
            )}
            {currentStep === 4 && (
              <Step4Personality
                data={formData}
                onChange={setFormData}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </motion.button>

          {currentStep < steps.length ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Próximo
              <ChevronRight className="w-5 h-5 ml-2" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-green-500/25"
            >
              Criar Agente
              <Check className="w-5 h-5 ml-2" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: Basic Info
function Step1BasicInfo({ data, onChange }: { data: AgentFormData; onChange: (data: AgentFormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Informações Básicas</h2>
        <p className="text-gray-600">Comece dando um nome ao seu agente e identificando sua empresa</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Nome do seu agente
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Ex: Clara, Assistente Virtual"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
          />
          <p className="text-sm text-gray-600 mt-1">Este será o nome que seus clientes verão</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Nome da sua empresa
          </label>
          <input
            type="text"
            value={data.company_name}
            onChange={(e) => onChange({ ...data, company_name: e.target.value })}
            placeholder="Ex: Tech Solutions Ltda"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}

// Step 2: Products
function Step2Products({ data, onChange }: { data: AgentFormData; onChange: (data: AgentFormData) => void }) {
  const [productsText, setProductsText] = useState(
    data.products.map(p => `${p.name}: ${p.description}${p.price ? ` - R$ ${p.price}` : ''}`).join('\n')
  );

  const handleProductsChange = (text: string) => {
    setProductsText(text);
    const lines = text.split('\n').filter(line => line.trim());
    const products = lines.map(line => {
      const parts = line.split(':');
      const name = parts[0]?.trim() || '';
      const rest = parts.slice(1).join(':').trim();
      
      // Try to extract price from the end
      const priceMatch = rest.match(/-?\s*R?\$?\s*(\d+(?:\.\d{2})?)$/);
      let description = rest;
      let price = 0;
      
      if (priceMatch) {
        description = rest.replace(priceMatch[0], '').trim();
        price = parseFloat(priceMatch[1]);
      }
      
      return { name, description, price };
    });
    
    onChange({ ...data, products });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Produtos e Serviços</h2>
        <p className="text-gray-600">Descreva seus produtos e serviços. Seu agente usará essas informações para responder perguntas.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Descrição dos produtos e serviços
          </label>
          <textarea
            value={productsText}
            onChange={(e) => handleProductsChange(e.target.value)}
            placeholder="Exemplo:
Produto A: Descrição detalhada do produto A - R$ 99.90
Serviço B: Descrição do serviço B - R$ 150.00
Produto C: Descrição do produto C"
            rows={8}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
          />
          <p className="text-sm text-gray-600 mt-1">
            Digite cada produto/serviço em uma linha separada. Use o formato: Nome: Descrição - Preço (opcional)
          </p>
        </div>
      </div>
    </div>
  );
}

// Step 3: FAQs
function Step3FAQs({ data, onChange }: { data: AgentFormData; onChange: (data: AgentFormData) => void }) {
  const [faqText, setFaqText] = useState(
    data.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
  );

  const handleFaqChange = (text: string) => {
    setFaqText(text);
    
    // Parse Q&A format
    const faqBlocks = text.split(/\n\n+/);
    const faqs = faqBlocks
      .filter(block => block.trim())
      .map(block => {
        const lines = block.split('\n').filter(line => line.trim());
        let question = '';
        let answer = '';
        
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.toLowerCase().startsWith('q:') || line.toLowerCase().startsWith('pergunta:')) {
            question = line.substring(2).trim();
            // Collect remaining lines as answer
            answer = lines.slice(i + 1)
              .map(l => l.replace(/^a:\s*/i, '').replace(/^resposta:\s*/i, ''))
              .join(' ')
              .trim();
            break;
          } else if (line.includes('?') && !question) {
            // If line has a question mark, treat as question
            question = line;
            answer = lines.slice(i + 1).join(' ').trim();
            break;
          }
        }
        
        // If no question found, treat first line as question, rest as answer
        if (!question && lines.length > 0) {
          question = lines[0];
          answer = lines.slice(1).join(' ').trim();
        }
        
        return { question, answer, keywords: [] };
      })
      .filter(f => f.question && f.answer);
    
    onChange({ ...data, faqs });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Perguntas Frequentes</h2>
        <p className="text-gray-600">Liste as perguntas frequentes e respostas que seu agente deve conhecer</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Perguntas e Respostas
          </label>
          <textarea
            value={faqText}
            onChange={(e) => handleFaqChange(e.target.value)}
            placeholder="Exemplo:
Q: Qual é o horário de atendimento?
A: Nosso horário de atendimento é de segunda a sexta, das 9h às 18h.

Q: Como faço para rastrear meu pedido?
A: Você pode rastrear seu pedido através do número de rastreamento enviado por email.

Pergunta: Vocês entregam para todo o Brasil?
Resposta: Sim, fazemos entrega para todo o território nacional."
            rows={10}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
          />
          <p className="text-sm text-gray-600 mt-1">
            Digite as perguntas e respostas. Use o formato Q: para perguntas e A: para respostas, ou escreva naturalmente.
          </p>
        </div>
      </div>
    </div>
  );
}

// Step 4: Personality
function Step4Personality({ data, onChange }: { data: AgentFormData; onChange: (data: AgentFormData) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personalidade do Agente</h2>
        <p className="text-gray-600">Defina como seu agente deve se comportar</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Descrição da personalidade
          </label>
          <textarea
            value={data.personality}
            onChange={(e) => onChange({ ...data, personality: e.target.value })}
            placeholder="Ex: Sempre simpática e prestativa, usa linguagem simples e direta..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Estilo de resposta
          </label>
          <select
            value={data.response_style}
            onChange={(e) => onChange({ ...data, response_style: e.target.value as 'formal' | 'friendly' | 'casual' })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
          >
            <option value="formal">Formal e profissional</option>
            <option value="friendly">Amigável e prestativo</option>
            <option value="casual">Descontraído e informal</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Nível de criatividade: {data.creativity_level}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={data.creativity_level}
            onChange={(e) => onChange({ ...data, creativity_level: Number(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${data.creativity_level}%, #e5e7eb ${data.creativity_level}%, #e5e7eb 100%)`
            }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Conservador</span>
            <span>Criativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
