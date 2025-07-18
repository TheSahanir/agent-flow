# AgentFlow - Plataforma de Agentes Inteligentes

Uma plataforma white-label para criar e gerenciar agentes de IA personalizados para WhatsApp, Facebook e Instagram.

## 🚀 Funcionalidades

- **Criação de Agentes Inteligentes**: Configure agentes com personalidade única
- **Integração Multi-plataforma**: WhatsApp, Facebook e Instagram
- **Gestão de Produtos/Serviços**: Cadastre produtos para o agente conhecer
- **FAQ Inteligente**: Configure perguntas frequentes
- **Personalização de Personalidade**: Escolha o estilo de resposta do agente
- **Dashboard Completo**: Gerencie todos os seus agentes em um lugar

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (BaaS)
- **IA**: DeepSeek API (white-label)
- **Autenticação**: Supabase Auth
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Chave de API DeepSeek
- Conta Stripe (para pagamentos)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agentflow.git
cd agentflow
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

4. Preencha as variáveis no `.env.local`:
```env
# AI Platform (DeepSeek)
AI_API_KEY=your-deepseek-api-key
AI_BASE_URL=https://api.deepseek.com/v1
AI_MODEL=deepseek-chat

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Meta (Facebook/Instagram/WhatsApp)
META_APP_ID=your-meta-app-id
META_APP_SECRET=your-meta-app-secret
WHATSAPP_ACCESS_TOKEN=your-whatsapp-token
META_VERIFY_TOKEN=your-verify-token

# App Config
NEXT_PUBLIC_APP_NAME="AgentFlow"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## 🗄️ Estrutura do Banco de Dados

### Tabelas Principais

- **agents**: Informações dos agentes criados
- **products**: Produtos/serviços dos agentes
- **faqs**: Perguntas frequentes
- **conversations**: Histórico de conversas
- **messages**: Mensagens individuais
- **user_credits**: Créditos dos usuários
- **transactions**: Transações de pagamento

### SQL para criar as tabelas

```sql
-- Tabela de agentes
CREATE TABLE agents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  personality TEXT NOT NULL,
  response_style TEXT CHECK (response_style IN ('formal', 'friendly', 'casual')),
  creativity_level INTEGER CHECK (creativity_level >= 0 AND creativity_level <= 100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de FAQs
CREATE TABLE faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_agents_user_id ON agents(user_id);
CREATE INDEX idx_products_agent_id ON products(agent_id);
CREATE INDEX idx_faqs_agent_id ON faqs(agent_id);
```

## 🎯 Como Usar

1. **Criar uma conta**: Faça cadastro na plataforma
2. **Criar agente**: Vá para `/create-agent` e siga os 4 passos
3. **Configurar integrações**: Conecte WhatsApp, Facebook ou Instagram
4. **Testar**: Use o dashboard para testar seu agente
5. **Ativar**: Coloque seu agente para funcionar

## 📱 Integrações

### WhatsApp Business API
- Configure o webhook no Meta Business Manager
- Use o token de acesso fornecido
- Configure o verify token no ambiente

### Facebook/Instagram
- Configure o app no Meta for Developers
- Solicite permissões necessárias
- Configure webhooks para mensagens

## 💰 Sistema de Créditos

- Cada mensagem processada consome créditos
- Planos disponíveis via Stripe
- Monitoramento de uso em tempo real

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel --prod
```

### Outros provedores
- Netlify
- Railway
- Digital Ocean

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

- Documentação: [docs.agentflow.com](https://docs.agentflow.com)
- Discord: [discord.gg/agentflow](https://discord.gg/agentflow)
- Email: suporte@agentflow.com
