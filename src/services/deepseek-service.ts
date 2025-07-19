import { Agent, Product, FAQ } from '@/types';

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

export class DeepSeekService {
  private static readonly API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY!;
  private static readonly BASE_URL = process.env.NEXT_PUBLIC_AI_BASE_URL!;
  private static readonly MODEL = process.env.NEXT_PUBLIC_AI_MODEL!;

  static async createAgentSystemPrompt(agent: Agent, products: Product[], faqs: FAQ[]): Promise<string> {
    const productsText = products.map(p => 
      `- ${p.name}: ${p.description}${p.price ? ` - R$ ${p.price}` : ''}`
    ).join('\n');

    const faqsText = faqs.map(f => 
      `Q: ${f.question}\nA: ${f.answer}`
    ).join('\n\n');

    const styleMap = {
      formal: 'formal e profissional',
      friendly: 'amigável e prestativo',
      casual: 'descontraído e informal'
    };

    return `Você é ${agent.name}, um assistente virtual inteligente da empresa ${agent.company_name}.

PERSONALIDADE: ${agent.personality}
ESTILO DE RESPOSTA: ${styleMap[agent.response_style]}
NÍVEL DE CRIATIVIDADE: ${agent.creativity_level}%

PRODUTOS E SERVIÇOS:
${productsText || 'Nenhum produto cadastrado.'}

PERGUNTAS FREQUENTES:
${faqsText || 'Nenhuma FAQ cadastrada.'}

INSTRUÇÕES:
1. Responda sempre em português do Brasil
2. Seja ${styleMap[agent.response_style]}
3. Use no máximo 2-3 frases por resposta
4. Se não souber algo, diga honestamente
5. Priorize informações sobre produtos/serviços da empresa
6. Seja prestativo e direto
7. Nunca invente informações sobre produtos que não existem

Contexto: Você está conversando com clientes da ${agent.company_name}.`;
  }

  static async sendMessage(
    agent: Agent,
    products: Product[],
    faqs: FAQ[],
    userMessage: string,
    conversationHistory: DeepSeekMessage[] = []
  ): Promise<{
    response: string;
    tokensUsed: number;
    cost: number;
  }> {
    try {
      const systemPrompt = await this.createAgentSystemPrompt(agent, products, faqs);

      const messages: DeepSeekMessage[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(`${this.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.MODEL,
          messages: messages,
          temperature: agent.creativity_level / 100,
          max_tokens: 500,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data: DeepSeekResponse = await response.json();
      const responseText = data.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.';

      // Calcular custo estimado (DeepSeek: $0.14/milhão de tokens)
      const tokensUsed = data.usage?.total_tokens || 0;
      const cost = (tokensUsed / 1000000) * 0.14;

      return {
        response: responseText,
        tokensUsed,
        cost,
      };
    } catch (error) {
      console.error('Error in DeepSeek service:', error);
      return {
        response: 'Desculpe, estou tendo dificuldades técnicas. Por favor, tente novamente.',
        tokensUsed: 0,
        cost: 0,
      };
    }
  }

  static async testAgent(
    agent: Agent,
    products: Product[],
    faqs: FAQ[],
    testMessage: string
  ): Promise<{
    response: string;
    tokensUsed: number;
    cost: number;
  }> {
    return this.sendMessage(agent, products, faqs, testMessage);
  }
}
