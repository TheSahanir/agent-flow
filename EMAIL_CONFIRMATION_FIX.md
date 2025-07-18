# Fix: "No API key found in request" ao Confirmar Email

## 🚨 Problema Identificado
O erro "No API key found in request" ocorre porque o link de confirmação de email não está incluindo a API key necessária.

## ✅ Solução Completa

### 1. Configuração Correta no Painel do Supabase

**Acesse**: https://supabase.com/dashboard → Seu projeto → Authentication → Email Templates

### 2. Atualizar Template de Confirmação de Email

**Template: Confirm Signup**

Substitua o template atual por:

```html
<h2>Confirme seu email</h2>
<p>Clique no link abaixo para confirmar seu email e acessar sua conta:</p>
<p><a href="{{ .SiteURL }}/auth/callback?type=signup&token_hash={{ .TokenHash }}&apikey={{ .APIKey }}">Confirmar Email</a></p>
```

### 3. URLs de Redirecionamento Corretas

**Authentication → URL Configuration**

**Site URL**: 
```
https://agentflow.pages.dev
```

**Redirect URLs**:
```
https://agentflow.pages.dev/auth/callback
http://localhost:3000/auth/callback
```

### 4. Verificar Configuração de Email

Execute este comando para verificar as configurações:

```bash
# Verificar configurações de email
curl -X GET 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/settings' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw'
```

### 5. Testar Link de Confirmação Manualmente

Se o erro persistir, teste manualmente:

```bash
# Testar confirmação manual
curl -X POST 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/verify' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
-H 'Content-Type: application/json' \
-d '{
  "type": "signup",
  "token_hash": "seu_token_aqui"
}'
```

### 6. Configuração Alternativa via SQL

Se necessário, configure via SQL:

```sql
-- Atualizar configuração de email
UPDATE auth.config 
SET 
  site_url = 'https://agentflow.pages.dev',
  mailer_authtype = 'smtp',
  mailer_host = 'smtp.gmail.com',
  mailer_port = 587,
  mailer_user = 'seu-email@gmail.com',
  mailer_pass = 'sua-senha-app'
WHERE id = 1;
```

### 7. Verificar Middleware

Certifique-se de que o middleware está configurado corretamente:

```typescript
// middleware.ts - verificar se está incluindo auth/callback
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### 8. Solução Rápida: Desabilitar Verificação Temporariamente

Para teste, desabilite a verificação de email:

```sql
-- Desabilitar verificação de email (apenas para teste)
UPDATE auth.config 
SET email_confirm_required = false 
WHERE id = 1;
```

### 9. Configuração de Ambiente Completa

Verifique seu `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://agentflow.pages.dev
```

### 10. Teste Final

1. Registre um novo usuário
2. Verifique o email recebido
3. Copie o link de confirmação
4. Adicione manualmente `&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` ao final do link
5. Acesse o link modificado

## 🎯 URLs Corretas para Email

**Template de Email**:
```
{{ .SiteURL }}/auth/callback?type=signup&token_hash={{ .TokenHash }}&next=/dashboard
```

**Site URL**: `https://agentflow.pages.dev`
**API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
