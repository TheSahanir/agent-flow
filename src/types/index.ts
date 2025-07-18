// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Agent types
export interface Agent {
  id: string;
  user_id: string;
  name: string;
  company_name: string;
  personality: string;
  is_active: boolean;
  creativity_level: number;
  response_style: 'formal' | 'friendly' | 'casual';
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product {
  id: string;
  agent_id: string;
  name: string;
  description: string;
  price?: number;
  category?: string;
  created_at: string;
}

// FAQ types
export interface FAQ {
  id: string;
  agent_id: string;
  question: string;
  answer: string;
  keywords: string[];
  created_at: string;
}

// Credit types
export interface CreditPlan {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  stripe_price_id: string;
  features: string[];
}

export interface UserCredits {
  user_id: string;
  balance: number;
  total_used: number;
  last_updated: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  stripe_payment_intent_id: string;
  amount: number;
  credits: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// Usage types
export interface UsageMetrics {
  messages_today: number;
  credits_used_today: number;
  average_response_time: string;
  quality_score: number;
  total_conversations: number;
}

export interface TokenUsage {
  id: string;
  user_id: string;
  agent_id: string;
  conversation_id: string;
  input_tokens: number;
  output_tokens: number;
  total_cost: number;
  operation_type: 'message' | 'setup' | 'test';
  timestamp: string;
}

// Conversation types
export interface Conversation {
  id: string;
  agent_id: string;
  platform: 'whatsapp' | 'facebook' | 'instagram';
  external_user_id: string;
  status: 'active' | 'ended';
  credits_used: number;
  started_at: string;
  ended_at?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: string;
  tokens_used?: number;
}

// Social platform types
export interface SocialConnection {
  id: string;
  user_id: string;
  platform: 'facebook' | 'instagram' | 'whatsapp';
  access_token: string;
  refresh_token?: string;
  expires_at?: string;
  connected_at: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form types
export interface AgentFormData {
  name: string;
  company_name: string;
  products: Omit<Product, 'id' | 'agent_id' | 'created_at'>[];
  faqs: Omit<FAQ, 'id' | 'agent_id' | 'created_at'>[];
  personality: string;
  response_style: 'formal' | 'friendly' | 'casual';
  creativity_level: number;
}

// AI Platform types (white-label)
export interface AIResponse {
  response: string;
  confidence: number;
  response_time: number;
  tokens_used: number;
  cost: number;
}

export interface AIConfig {
  creativity: number;
  style: 'formal' | 'friendly' | 'casual';
  max_tokens: number;
}
