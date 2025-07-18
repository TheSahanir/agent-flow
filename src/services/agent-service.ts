import { supabase } from '@/lib/supabase';
import { Agent, Product, FAQ, AgentFormData } from '@/types';

export class AgentService {
  static async createAgent(userId: string, formData: AgentFormData): Promise<Agent> {
    try {
      // Create the agent
      const { data: agent, error: agentError } = await supabase
        .from('agents')
        .insert({
          user_id: userId,
          name: formData.name,
          company_name: formData.company_name,
          personality: formData.personality,
          response_style: formData.response_style,
          creativity_level: formData.creativity_level,
          is_active: true,
        })
        .select()
        .single();

      if (agentError) throw agentError;

      // Create products
      if (formData.products.length > 0) {
        const productsToInsert = formData.products.map(product => ({
          agent_id: agent.id,
          name: product.name,
          description: product.description,
          price: product.price || null,
        }));

        const { error: productsError } = await supabase
          .from('products')
          .insert(productsToInsert);

        if (productsError) throw productsError;
      }

      // Create FAQs
      if (formData.faqs.length > 0) {
        const faqsToInsert = formData.faqs.map(faq => ({
          agent_id: agent.id,
          question: faq.question,
          answer: faq.answer,
          keywords: faq.keywords || [],
        }));

        const { error: faqsError } = await supabase
          .from('faqs')
          .insert(faqsToInsert);

        if (faqsError) throw faqsError;
      }

      return agent;
    } catch (error) {
      console.error('Error creating agent:', error);
      throw error;
    }
  }

  static async getUserAgents(userId: string): Promise<Agent[]> {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  static async getAgentWithData(agentId: string) {
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('*')
      .eq('id', agentId)
      .single();

    if (agentError) throw agentError;

    const { data: products } = await supabase
      .from('products')
      .select('*')
      .eq('agent_id', agentId);

    const { data: faqs } = await supabase
      .from('faqs')
      .select('*')
      .eq('agent_id', agentId);

    return {
      ...agent,
      products: products || [],
      faqs: faqs || [],
    };
  }

  static async updateAgent(agentId: string, updates: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', agentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteAgent(agentId: string) {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId);

    if (error) throw error;
  }
}
