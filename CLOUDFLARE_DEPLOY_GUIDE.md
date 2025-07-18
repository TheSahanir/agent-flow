# Guia Completo: Deploy no Cloudflare Pages com Domínio Customizado

## 🚀 Solução para seu erro no Vercel

O erro `supabaseUrl is required` ocorre porque as variáveis de ambiente não estão configuradas. A melhor solução é usar **Cloudflare Pages** com seu domínio.

## 📋 Pré-requisitos

1. Conta no Cloudflare
2. Domínio configurado no Cloudflare
3. Repositório no GitHub com seu código

## 🔧 Passo 1: Configurar Variáveis de Ambiente

Primeiro, você precisa ter as variáveis configuradas. Copie seu arquivo `.env.local.example` para `.env.local` e preencha com seus valores:

```bash
cp .env.local.example .env.local
```

Edite o arquivo `.env.local` com suas chaves:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave anônima do Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chave service role do Supabase
- `AI_API_KEY`: Sua chave da DeepSeek
- As demais chaves conforme necessário

## 🎯 Passo 2: Deploy no Cloudflare Pages

### Opção A: Interface Web (Recomendado)

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Clique em "Pages" no menu lateral
3. Clique em "Create a project"
4. Conecte sua conta do GitHub
5. Selecione o repositório do AgentFlow

**Configurações do Build:**
- **Project name:** agentflow (ou nome desejado)
- **Production branch:** main
- **Framework preset:** Next.js
- **Build command:** `npm run build:cloudflare`
- **Build output directory:** `.vercel/output/static`
- **Root directory:** `./`

### Opção B: CLI (Alternativa)

```bash
# Instalar o Cloudflare CLI
npm install -g wrangler

# Fazer login
wrangler login

# Deploy
wrangler pages deploy .vercel/output/static --project-name=agentflow
```

## 🔐 Passo 3: Configurar Variáveis de Ambiente no Cloudflare

1. No dashboard do Cloudflare Pages, vá para seu projeto
2. Clique em "Settings" → "Environment variables"
3. Adicione todas as variáveis do seu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` (seu domínio final)

## 🌐 Passo 4: Configurar Domínio Customizado

1. No dashboard do Cloudflare Pages:
   - Vá para "Custom domains"
   - Clique em "Set up a custom domain"
   - Digite seu domínio (ex: `seuapp.com`)

2. Configurar DNS:
   - O Cloudflare fornecerá registros CNAME
   - Adicione esses registros no painel DNS do seu domínio
   - Aguarde a propagação (pode levar até 24h, geralmente 5-10 minutos)

## 🧪 Passo 5: Testar o Deploy

1. Faça um push para a branch main
2. O Cloudflare fará o deploy automaticamente
3. Acesse seu domínio para verificar se está funcionando

## 🔄 Deploy Automático

O Cloudflare Pages está configurado para:
- Fazer deploy automático quando você fizer push para main
- Fazer preview de PRs automaticamente
- Notificar sobre falhas no deploy

## 🛠️ Solução de Problemas

### Se o erro persistir:

1. **Verificar variáveis de ambiente:**
   ```bash
   # Testar build local
   npm run build:cloudflare
   ```

2. **Verificar logs no Cloudflare:**
   - Dashboard → Pages → Seu projeto → Deployments
   - Clique no deploy com erro para ver logs detalhados

3. **Limpar cache e re-deploy:**
   - No Cloudflare: Settings → Builds & deployments → Clear cache

## 📱 Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build para Cloudflare
npm run build:cloudflare

# Preview local
npm run preview

# Deploy manual (se necessário)
wrangler pages deploy .vercel/output/static
```

## ✅ Checklist Final

- [ ] Variáveis de ambiente configuradas no Cloudflare
- [ ] Domínio customizado configurado
- [ ] DNS propagado
- [ ] Build funcionando
- [ ] Site acessível no domínio

Se precisar de ajuda com algum passo específico, posso te orientar!
