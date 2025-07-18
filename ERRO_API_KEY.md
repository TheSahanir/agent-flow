# 🚨 **ERRO "INVALID API KEY" - SOLUÇÃO COMPLETA**

## 📋 **Verificação da Chave**

### **Chave Atual (Correta)**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
```

### **Verificação no Supabase**
1. Acesse: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
2. Vá para: **Settings > API**
3. Copie a **anon public key** exatamente como está

## 🔧 **Solução Passo a Passo**

### **PASSO 1: Verificar Variáveis no Cloudflare (URGENTE)**
1. Acesse: https://dash.cloudflare.com
2. **Pages > agentflow > Settings > Environment variables**
3. **Verifique se estas variáveis estão configuradas EXATAMENTE assim:**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
```

### **PASSO 2: Verificar .env.local Local**
```bash
# No arquivo agentflow/.env.local, deve estar EXATAMENTE:
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
```

### **PASSO 3: Testar Diretamente**
```bash
# Teste no navegador:
https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/authorize?provider=google&redirect_to=https://agentflow.pages.dev/auth/callback
```

### **PASSO 4: Reiniciar Deploy**
1. Cloudflare Pages > agentflow > Deploys
2. **Trigger deploy** para aplicar mudanças

## ✅ **Verificação Final**
- **URL**: https://dhjllodeisqiiipjckeb.supabase.co ✅
- **Chave**: Copiada diretamente do dashboard ✅
- **Variáveis**: Configuradas no Cloudflare ✅

## 🎯 **Teste Rápido**
1. **Criar conta**: https://agentflow.pages.dev/auth/signup
2. **Fazer login**: https://agentflow.pages.dev/auth/login

**⚠️ Se continuar dando erro, copie a chave ANON novamente do dashboard do Supabase!**
