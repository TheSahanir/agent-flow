# 🔍 **VERIFICAR CHAVE SUPABASE - PASSO A PASSO**

## 🚨 **Ação Imediata - Copiar Chave Correta**

### **Passo 1: Pegar Chave Correta do Supabase**
1. Acesse: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
2. Clique em: **Settings** (no menu lateral)
3. Clique em: **API**
4. Na seção **Project API keys**, copie a **anon public** key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
   ```

### **Passo 2: Atualizar Cloudflare Pages (OBRIGATÓRIO)**
1. Acesse: https://dash.cloudflare.com
2. **Pages > agentflow > Settings > Environment variables**
3. **Edite ou adicione**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[COPIE A CHAVE DO PASSO 1]
   ```

### **Passo 3: Testar Chave**
```bash
# Teste no navegador:
https://dhjllodeisqiiipjckeb.supabase.co/rest/v1/?apikey=[SUA_CHAVE_AQUI]
```

## ✅ **Configuração Mínima para Funcionar**

### **1. Variáveis Obrigatórias no Cloudflare**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
```

### **2. URLs no Supabase**
1. **Authentication > URL Configuration**
2. **Site URL**: `https://agentflow.pages.dev`
3. **Redirect URLs**: `https://agentflow.pages.dev/auth/callback`

## 🎯 **Teste Final**
1. **Criar conta**: https://agentflow.pages.dev/auth/signup
2. **Fazer login**: https://agentflow.pages.dev/auth/login

## ⚠️ **Importante**
- **Nunca use a chave de service role** (é para backend apenas)
- **Use sempre a chave anon** para frontend
- **Configure no Cloudflare Pages** (não no .env.local local)
