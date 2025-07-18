# 🔑 **QUAL CHAVE USAR NO SUPABASE - RESPOSTA CLARA**

## ✅ **Use SEMPRE a "ANON PUBLIC"**

### **No Supabase Dashboard, você verá:**
- **📋 Project URL**: `https://dhjllodeisqiiipjckeb.supabase.co`
- **🔑 ANON PUBLIC**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ✅ **USE ESTA**
- **🔒 SERVICE ROLE**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ❌ **NÃO USE**

## 🎯 **Configuração Exata**

### **1. No Cloudflare Pages (OBRIGATÓRIO)**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2Rpc3FpaWlwamNrZWIiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1Mjc4OTU3MiwiZXhwIjoyMDY4MzY1NTcyfQ.MGtlhHYZDJ-cgWMgA6Jwa9b7wZHWThBS6P44KA4B76g
```

### **2. Onde encontrar no Supabase**
1. Acesse: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
2. **Settings > API**
3. **Copie a chave que está em "ANON PUBLIC"** (a primeira da lista)

## 📋 **Diferença entre as chaves**

| Chave | Para que serve | Use no frontend? |
|-------|----------------|------------------|
| **ANON PUBLIC** | Autenticação de usuários | ✅ **SIM** |
| **SERVICE ROLE** | Admin/banco de dados | ❌ **NÃO** |

## 🚨 **Se estiver errada**
1. Vá no Cloudflare Pages
2. **Settings > Environment variables**
3. **Edite** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Cole a chave ANON PUBLIC exatamente como está no Supabase**

## ✅ **Teste Rápido**
Após configurar corretamente:
- **Criar conta**: https://agentflow.pages.dev/auth/signup
- **Fazer login**: https://agentflow.pages.dev/auth/login

**💡 DICA: A chave ANON PUBLIC começa com "eyJ" e é bem longa!**
