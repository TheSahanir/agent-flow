# 🚨 Debug Login - Solução Definitiva

## 🔍 Problema: Login não redireciona

### ✅ Passo 1: Verificar Configuração do Supabase

**Acesse seu projeto Supabase:**
1. Vá para: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá para: **Authentication → URL Configuration**

**Configure exatamente assim:**
```
Site URL: http://localhost:3000
Redirect URLs: 
  - http://localhost:3000/auth/callback
  - http://localhost:3000/auth/confirm
  - http://localhost:3000/dashboard
```

### ✅ Passo 2: Verificar .env.local

**Conteúdo correto do .env.local:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw
```

### ✅ Passo 3: Testar Conexão

**Acesse: http://localhost:3000/test-auth**

**Use estes dados de teste:**
- Email: `test@example.com`
- Senha: `test123`

### ✅ Passo 4: Verificar Erros no Console

**Abra o console do navegador (F12):**
- Veja mensagens como "Tentando login..."
- Veja "Login bem-sucedido"
- Veja "Redirecionando para dashboard..."

### ✅ Passo 5: Verificar Usuários no Supabase

**No Supabase Dashboard:**
1. **Authentication → Users**
2. Verifique se há usuários criados
3. Crie um usuário manualmente se necessário

### 🎯 Solução Rápida

**Se nada funcionar, use este comando para criar um usuário diretamente:**

```sql
-- No Supabase SQL Editor:
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@hello.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW()
);
```

### 🚀 Teste Final

**Após configurar tudo:**
1. **Acesse**: http://localhost:3000/auth/login
2. **Email**: admin@hello.com
3. **Senha**: admin123
4. **Resultado**: Redirecionamento automático para dashboard

### 📞 Suporte

**Se ainda não funcionar:**
1. Verifique o console do navegador
2. Verifique os logs do Supabase
3. Use a página `/test-auth` para debug
4. Entre em contato com suporte@helloagentes.com

## 🎯 Configuração Obrigatória

**NÃO ESQUEÇA de configurar no Supabase:**
- **Site URL**: `http://localhost:3000` (dev) ou `https://agentflow.pages.dev` (prod)
- **Redirect URLs**: `http://localhost:3000/auth/callback`
