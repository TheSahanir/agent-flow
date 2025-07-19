import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export class ProductService {
  static async getProductsByAgent(agentId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  static async createProduct(agentId: string, product: Omit<Product, 'id' | 'created_at' | 'agent_id'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        agent_id: agentId,
        name: product.name,
        description: product.description,
        price: product.price || null,
        category: product.category || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteProduct(productId: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) throw error;
  }
}
