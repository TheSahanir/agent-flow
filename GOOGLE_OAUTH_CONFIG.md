# 🔧 **CONFIGURAÇÃO GOOGLE OAUTH - SUPABASE**

## 📋 **O que preencher no Supabase Dashboard**

### **1. Enable Sign in with Google**
✅ **Marque esta opção** para ativar

### **2. Client IDs**
**Deixe vazio por enquanto** - vamos configurar isso depois

### **3. Client Secret (for OAuth)**
**Deixe vazio por enquanto**

### **4. Skip nonce checks**
✅ **Marque esta opção** para facilitar a configuração inicial

## 🎯 **Configuração Completa do Google OAuth**

### **Passo 1: Configurar no Supabase**
1. Acesse: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
2. Vá para: **Authentication > Providers**
3. Clique em **Google**
4. Configure assim:

```
Enable Google Provider: ✅ ON
Client ID: (deixe vazio por agora)
Client Secret: (deixe vazio por agora)
Skip nonce checks: ✅ ON
```

### **Passo 2: URLs de Redirecionamento (Mais Importante)**
1. Ainda em **Authentication > URL Configuration**
2. **Site URL**: `https://agentflow.pages.dev`
3. **Redirect URLs** adicione:
   - `https://agentflow.pages.dev`
   - `https://agentflow.pages.dev/auth/callback`
   - `https://agentflow.pages.dev/api/auth/callback`

### **Passo 3: Testar Primeiro com Email**
**Recomendação**: Teste primeiro criar conta com email/senha para garantir que está funcionando, depois configuramos o Google OAuth.

## ✅ **Configuração Mínima para Funcionar**
Para autenticação funcionar **imediatamente**, você só precisa:

1. **Corrigir o .env.local** (URL do Supabase)
2. **Configurar URLs no Supabase** (Passo 2 acima)
3. **Configurar variáveis no Cloudflare Pages**

O Google OAuth pode ser configurado depois que email/senha estiver funcionando.

## 🚀 **Prioridade de Configuração**
1. **Corrigir URL no .env.local** (URGENTE)
2. **URLs de redirecionamento no Supabase** (OBRIGATÓRIO)
3. **Variáveis no Cloudflare** (OBRIGATÓRIO)
4. **Google OAuth** (opcional, pode ser depois)
