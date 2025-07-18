// Configurações das APIs
export const API_CONFIG = {
  // DeepSeek API (white-label)
  ai: {
    baseUrl: process.env.NEXT_PUBLIC_AI_BASE_URL || 'https://api.deepseek.com/v1',
    apiKey: process.env.NEXT_PUBLIC_AI_API_KEY || '',
    model: process.env.NEXT_PUBLIC_AI_MODEL || 'deepseek-chat',
  },
  
  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  
  // Stripe
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },
  
  // WhatsApp Business API
  whatsapp: {
    phoneNumberId: process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER_ID || '',
    accessToken: process.env.NEXT_PUBLIC_WHATSAPP_ACCESS_TOKEN || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
  },
  
  // Facebook/Instagram
  meta: {
    appId: process.env.NEXT_PUBLIC_META_APP_ID || '',
    appSecret: process.env.META_APP_SECRET || '',
    pageAccessToken: process.env.NEXT_PUBLIC_META_PAGE_ACCESS_TOKEN || '',
  },
};

// Validação de configurações
export function validateConfig() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_AI_BASE_URL',
    'NEXT_PUBLIC_AI_API_KEY',
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('Variáveis de ambiente faltando:', missing);
  }
}
