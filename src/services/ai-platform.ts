import { AIResponse, AIConfig, Agent, Product, FAQ } from '@/types';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class AIPlatformService {
  private baseUrl = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1';
  private apiKey = process.env.AI_API_KEY || '';
  private model = process.env.AI_MODEL || 'deepseek-chat';

  async generateResponse(
    message: string,
    agent: Agent,
    products: Product[],
    faqs: FAQ[],
    context: string[] = []
  ): Promise<AIResponse> {
    const startTime = Date.now();
    
    try {
      const systemPrompt = this.buildSystemPrompt(agent, products, faqs);
      const messages: DeepSeekMessage[] = [
        { role: 'system', content: systemPrompt },
        ...context.map(msg => ({ role: 'user' as const, content: msg })),
        { role: 'user', content: message }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: agent.creativity_level / 100,
          max_tokens: 4000,
          top_p: 0.9,
        }),
      });

      if (!response.ok) {
        throw new Error('AI service temporarily unavailable');
      }

      const data: DeepSeekResponse = await response.json();
      const responseText = data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';
      
      const endTime = Date.now();
      const responseTime = (endTime - startTime) / 1000;
      
      // Calculate cost (hidden from users)
      const inputCost = (data.usage.prompt_tokens / 1000) * 0.0001;
      const outputCost = (data.usage.completion_tokens / 1000) * 0.0002;
      const totalCost = inputCost + outputCost;

      return {
        response: responseText.trim(),
        confidence: this.calculateConfidence(responseText),
        response_time: responseTime,
        tokens_used: data.usage.total_tokens,
        cost: totalCost,
      };
    } catch (error) {
      console.error('AI Platform Error:', error);
      
      // Return user-friendly error
      return {
        response: 'Estou processando sua solicitação. Por favor, tente novamente em alguns segundos.',
        confidence: 0,
        response_time: (Date.now() - startTime) / 1000,
        tokens_used: 0,
        cost: 0,
      };
    }
  }

  async testAgent(
    testMessage: string,
    agent: Agent,
    products: Product[],
    faqs: FAQ[]
  ): Promise<AIResponse> {
    return this.generateResponse(testMessage, agent, products, faqs);
  }

  async calculateTokens(text: string): Promise<number> {
    // Rough estimation: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }

  private buildSystemPrompt(
    agent: Agent,
    products: Product[],
    faqs: FAQ[]
  ): string {
    const personalityMap = {
      formal: 'profissional e direto',
      friendly: 'amigável e prestativo',
      casual: 'descontraído e informal'
    };

    const productsList = products
      .map(p => `- ${p.name}: ${p.description}${p.price ? ` (R$ ${p.price})` : ''}`)
      .join('\n');

    const faqList = faqs
      .map(f => `P: ${f.question}\nR: ${f.answer}`)
      .join('\n\n');

    return `Você é ${agent.name}, assistente virtual da empresa ${agent.company_name}.

Personalidade: ${personalityMap[agent.response_style]}

INSTRUÇÕES IMPORTANTES:
1. Sempre seja ${personalityMap[agent.response_style]}
2. Mantenha respostas claras e objetivas
3. Se não souber algo, diga que vai verificar
4. Use informações dos produtos e FAQs abaixo
5. Nunca revele que é uma IA - seja natural

PRODUTOS/SERVIÇOS:
${productsList || 'Nenhum produto cadastrado'}

PERGUNTAS FREQUENTES:
${faqList || 'Nenhuma FAQ cadastrada'}

RESPONDA EM PORTUGUÊS DO BRASIL`;
  }

  private calculateConfidence(response: string): number {
    // Simple confidence calculation based on response quality
    if (response.includes('não sei') || response.includes('não tenho certeza')) {
      return 0.7;
    }
    if (response.length < 10) {
      return 0.6;
    }
    return 0.95;
  }
}

export const aiPlatform = new AIPlatformService();
