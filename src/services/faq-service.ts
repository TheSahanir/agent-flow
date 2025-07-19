import { supabase } from '@/lib/supabase';
import { FAQ } from '@/types';

export class FAQService {
  static async getFAQsByAgent(agentId: string): Promise<FAQ[]> {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async createFAQ(agentId: string, faq: Omit<FAQ, 'id' | 'created_at' | 'agent_id'>): Promise<FAQ> {
    const { data, error } = await supabase
      .from('faqs')
      .insert({
        agent_id: agentId,
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords || [],
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateFAQ(faqId: string, updates: Partial<FAQ>): Promise<FAQ> {
    const { data, error } = await supabase
      .from('faqs')
      .update(updates)
      .eq('id', faqId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteFAQ(faqId: string): Promise<void> {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', faqId);

    if (error) throw error;
  }
}
