# 🚨 URGENTE: Fix do Link de Confirmação de Email

## ✅ Problema Identificado
O link de confirmação está redirecionando para `https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/` em vez de `https://agentflow.pages.dev/auth/confirm`

## 🎯 Solução Imediata

### 1. Configuração URGENTE no Supabase

**Acesse AGORA**: https://supabase.com/dashboard → Seu projeto → Authentication → URL Configuration

### 2. Atualizar Site URL

**Mude de**:
```
https://dhjllodeisqiiipjckeb.supabase.co
```

**Para**:
```
https://agentflow.pages.dev
```

### 3. Configurar Redirect URLs

**Adicione estas URLs**:
```
https://agentflow.pages.dev/auth/confirm
https://agentflow.pages.dev/auth/callback
https://agentflow.pages.dev/dashboard
```

### 4. Atualizar Templates de Email

**Authentication → Email Templates → Confirm Signup**

**Template CORRETO**:
```html
<h2>Confirme seu email</h2>
<p>Clique no link abaixo para confirmar seu email:</p>
<p><a href="https://agentflow.pages.dev/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard">Confirmar Email</a></p>
```

### 5. Verificar Configuração

**Teste imediatamente**:
1. Registre um novo usuário
2. Verifique o email
3. O link deve ser: `https://agentflow.pages.dev/auth/confirm?token_hash=...`

### 6. Configuração de Ambiente

Verifique se seu `.env.local` está correto:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://agentflow.pages.dev
```

### 7. Teste Rápido

Após configurar:
1. **Registre novo usuário**
2. **Verifique email**
3. **Link deve ser**: `https://agentflow.pages.dev/auth/confirm?token_hash=...`
4. **Clique no link**
5. **Deve redirecionar para dashboard**

### 8. Se ainda não funcionar

**Desabilitar verificação temporariamente** (apenas para teste):
```sql
-- No SQL Editor do Supabase
UPDATE auth.config SET email_confirm_required = false WHERE id = 1;
```

### 9. Configuração Completa no Painel

**Authentication → Settings**:
- **Site URL**: `https://agentflow.pages.dev`
- **Redirect URLs**: `https://agentflow.pages.dev/auth/confirm`
- **Email Confirm Required**: `true`

### 10. Teste Final

**Execute este teste**:
```bash
# Testar configuração
curl -X GET 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/settings' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

## 🚨 AÇÃO IMEDIATA

1. **Vá para o painel do Supabase**
2. **Authentication → URL Configuration**
3. **Mude Site URL para**: `https://agentflow.pages.dev`
4. **Salve as alterações**
5. **Teste com novo registro**

O problema será resolvido instantaneamente após esta configuração!
