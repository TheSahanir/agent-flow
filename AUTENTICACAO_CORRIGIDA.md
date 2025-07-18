# ✅ **CORREÇÃO DE AUTENTICAÇÃO - INSTRUÇÕES URGENTES**

## 🚨 **Problema Identificado e Corrigido**
O erro "Safari can't find the server" foi causado por um **URL incorreto** no arquivo `.env.local`. O URL estava com letras trocadas.

## 🔧 **Ação Necessária - ATUALIZE AGORA**

### **1. Atualizar .env.local (Manual)**
Abra o arquivo `agentflow/.env.local` e **substitua** a linha:

```bash
# ❌ INCORRETO (com letras trocadas)
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeeisqiiipjckeb.supabase.co

# ✅ CORRETO
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
```

### **2. Configurar no Cloudflare Pages (IMPORTANTE)**
Como o .env.local não é enviado ao Git, você precisa configurar as variáveis no Cloudflare:

1. Acesse: https://dash.cloudflare.com
2. Vá para: Pages > agentflow > Settings > Environment variables
3. Adicione estas variáveis:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
NEXT_PUBLIC_APP_URL=https://agentflow.pages.dev
```

### **3. Configurar URLs no Supabase (OBRIGATÓRIO)**
1. Acesse: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
2. Authentication > URL Configuration
3. Adicione estas URLs em "Site URL" e "Redirect URLs":
   - `https://agentflow.pages.dev`
   - `https://agentflow.pages.dev/auth/callback`
   - `https://agentflow.pages.dev/api/auth/callback`

### **4. Reiniciar Deploy**
Após configurar as variáveis no Cloudflare:
1. Vá para Cloudflare Pages > agentflow
2. Clique em "Deploys" > "Trigger deploy" para forçar novo deploy

## 🎯 **Testar Após Correção**
- **Criar conta**: https://agentflow.pages.dev/auth/signup
- **Fazer login**: https://agentflow.pages.dev/auth/login
- **Google OAuth**: Botão "Entrar com Google" deve funcionar

## 📋 **URLs Corretas**
- **Supabase**: https://dhjllodeisqiiipjckeb.supabase.co
- **Site**: https://agentflow.pages.dev
- **Projeto**: HelloAgentes (ID: dhjllodeisqiiipjckeb)

**⚠️ IMPORTANTE: Execute os passos 1, 2 e 3 acima para que a autenticação funcione corretamente!**
