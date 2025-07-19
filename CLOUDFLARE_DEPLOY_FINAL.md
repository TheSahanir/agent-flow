# 🚀 Deploy no Cloudflare Pages - Guia Completo

## ✅ Status: Build Funcionando!

O projeto está configurado e pronto para deploy no Cloudflare Pages com todas as funcionalidades implementadas.

## 📋 Pré-requisitos

1. **Cloudflare Account**: Crie uma conta em https://dash.cloudflare.com
2. **GitHub Repository**: Seu código deve estar em um repositório GitHub
3. **Cloudflare CLI**: Instale com `npm install -g wrangler`

## 🔧 Configuração de Variáveis de Ambiente

Crie um arquivo `.env.local` com as seguintes variáveis:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=seu_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_sua_chave_stripe
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publica

# AI Platform (DeepSeek)
NEXT_PUBLIC_AI_API_KEY=sua_chave_deepseek
NEXT_PUBLIC_AI_BASE_URL=https://api.deepseek.com
NEXT_PUBLIC_AI_MODEL=deepseek-chat

# Facebook/Meta
FACEBOOK_APP_ID=seu_facebook_app_id
FACEBOOK_APP_SECRET=seu_facebook_app_secret

# WhatsApp Cloud API
WHATSAPP_ACCESS_TOKEN=seu_token_whatsapp
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_business_account_id

# App Configuration
NEXT_PUBLIC_APP_URL=https://seuapp.pages.dev
```

## 🚀 Deploy Automático via GitHub

### Opção 1: GitHub Integration (Recomendado)

1. Acesse https://dash.cloudflare.com
2. Vá para **Pages** → **Create a project**
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`
5. Adicione as variáveis de ambiente no painel do Cloudflare
6. Clique em **Deploy**

### Opção 2: Deploy Manual via CLI

```bash
# Instalar Wrangler CLI
npm install -g wrangler

# Fazer login no Cloudflare
wrangler login

# Deploy
./deploy-cloudflare-pages.sh
```

## 📁 Estrutura de Arquivos para Deploy

```
agentflow/
├── .next/                    # Diretório de build
├── src/
│   ├── app/                  # App Router do Next.js
│   ├── components/           # Componentes React
│   ├── services/             # Serviços de API
│   └── lib/                  # Configurações
├── next.config.js           # Configuração do Next.js
├── wrangler.toml            # Configuração do Cloudflare
├── _routes.json             # Rotas do Cloudflare
└── deploy-cloudflare-pages.sh # Script de deploy
```

## 🔍 Verificação Pós-Deploy

Após o deploy, teste as seguintes funcionalidades:

1. **Autenticação**: Teste login/cadastro
2. **Criação de Agentes**: Crie um novo agente
3. **Compra de Créditos**: Teste o fluxo de pagamento (use modo teste do Stripe)
4. **Integrações Sociais**: Conecte uma conta Facebook/Instagram

## 🌐 URLs Importantes

- **App Principal**: `https://seuapp.pages.dev`
- **Dashboard**: `https://seuapp.pages.dev/dashboard`
- **Criação de Agentes**: `https://seuapp.pages.dev/create-agent`
- **Compra de Créditos**: `https://seuapp.pages.dev/credits`

## 🛠️ Configuração de Webhooks

### Stripe Webhook
Configure no Stripe Dashboard:
- **Endpoint URL**: `https://seuapp.pages.dev/api/webhooks/stripe`
- **Events**: `checkout.session.completed`

### Facebook OAuth
Configure no Facebook Developers:
- **Valid OAuth Redirect URIs**: `https://seuapp.pages.dev/api/social/facebook/callback`

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Cloudflare Dashboard
2. Confirme todas as variáveis de ambiente
3. Teste localmente com `npm run dev`
4. Verifique as configurações no Supabase

## ✅ Funcionalidades Implementadas

- ✅ Sistema de autenticação completo
- ✅ Integração Stripe para pagamentos
- ✅ Criação de agentes com DeepSeek
- ✅ Integração OAuth para redes sociais
- ✅ Dashboard com gestão de agentes
- ✅ Sistema de créditos por usuário
- ✅ Integração com Supabase
- ✅ Deploy no Cloudflare Pages

## 🎯 Próximos Passos

1. Configure as variáveis de ambiente no Cloudflare
2. Configure os webhooks no Stripe
3. Configure o app no Facebook Developers
4. Teste todas as funcionalidades
5. Monitore os logs e métricas

Seu app está pronto para produção! 🎉
