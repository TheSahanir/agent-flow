import { supabase } from '@/lib/supabase';
import { ChatMessage } from '@/types';

export class ChatService {
  static async getChatHistory(userId: string, agentId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async sendMessage(userId: string, agentId: string, message: string): Promise<ChatMessage> {
    // Check user credits
    const { data: userCredits } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    if (!userCredits || userCredits.credits < 1) {
      throw new Error('Créditos insuficientes');
    }

    // Get agent details
    const { data: agent } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (!agent) {
      throw new Error('Agente não encontrado');
    }

    // Get agent products and FAQs
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('agent_id', agentId);

    const { data: faqs } = await supabase
      .from('faqs')
      .select('*')
      .eq('agent_id', agentId);

    // Create chat message record
    const { data: chatMessage, error: chatError } = await supabase
      .from('chat_messages')
      .insert({
        user_id: userId,
        agent_id: agentId,
        message,
        credits_used: 1,
      })
      .select()
      .single();

    if (chatError) throw chatError;

    // Deduct credits
    const { error: creditError } = await supabase.rpc('deduct_user_credits', {
      user_uuid: userId,
      credits_to_deduct: 1
    });

    if (creditError) throw creditError;

    // Record transaction
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        credits: -1,
        type: 'usage',
        description: `Mensagem para agente ${agent.name}`,
        agent_id: agentId,
      });

    return chatMessage;
  }

  static async updateMessageResponse(messageId: string, response: string): Promise<void> {
    const { error } = await supabase
      .from('chat_messages')
      .update({ response })
      .eq('id', messageId);

    if (error) throw error;
  }

  static async getUserCredits(userId: string): Promise<number> {
    const { data } = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', userId)
      .single();

    return data?.credits || 0;
  }
}
