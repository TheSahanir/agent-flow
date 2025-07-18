# Configuração de Email e Redirecionamento do Supabase

## 🚨 Problemas Resolvidos

### 1. **Email de Confirmação com Link Quebrado**
### 2. **Redirecionamento após Login não Funciona**

## ✅ Solução Completa

### Configuração no Painel do Supabase

#### 1. Acesse o Painel do Supabase
- Vá para: https://supabase.com/dashboard
- Selecione seu projeto: **HelloAgentes**

#### 2. Configure as URLs de Redirecionamento
**Authentication → URL Configuration**

**Site URL (Principal):**
```
https://agentflow.pages.dev
```

**URLs de Redirecionamento Adicionais:**
```
http://localhost:3000/auth/callback
https://agentflow.pages.dev/auth/callback
http://localhost:3000
https://agentflow.pages.dev
```

#### 3. Configure o Email de Confirmação
**Authentication → Email Templates → Confirm Signup**

**Template de Email Atualizado:**
```html
<h2>Confirme seu email</h2>
<p>Clique no link abaixo para confirmar seu email e acessar sua conta:</p>
<p><a href="{{ .ConfirmationURL }}">Confirmar Email</a></p>
```

**URL de Confirmação:**
```
https://agentflow.pages.dev/auth/callback?type=signup&token_hash={{ .TokenHash }}
```

### 4. Configuração de Ambiente

Atualize seu `.env.local` com as URLs corretas:

```bash
# URLs de Redirecionamento
NEXT_PUBLIC_APP_URL=https://agentflow.pages.dev
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Teste de Configuração

#### Teste de Registro:
1. Acesse: `https://agentflow.pages.dev/auth/signup`
2. Registre um novo email
3. Verifique o email de confirmação
4. Clique no link de confirmação
5. Deve redirecionar para: `/dashboard`

#### Teste de Login:
1. Acesse: `https://agentflow.pages.dev/auth/login`
2. Faça login com credenciais válidas
3. Deve redirecionar automaticamente para: `/dashboard`

### 6. URLs de Teste Locais

Para desenvolvimento local, use:
- **Site URL**: `http://localhost:3000`
- **Callback URL**: `http://localhost:3000/auth/callback`

### 7. Verificação de Configuração

Execute este comando para verificar as configurações atuais:

```bash
# Verificar configurações de email
curl -X GET 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/settings' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 8. Solução de Problemas Comuns

#### Link de Confirmação Quebrado:
- **Causa**: URL incorreta no painel do Supabase
- **Solução**: Atualizar Site URL para `https://agentflow.pages.dev`

#### Redirecionamento não Funciona:
- **Causa**: Callback URL não configurada
- **Solução**: Adicionar `/auth/callback` nas URLs permitidas

#### Loop de Redirecionamento:
- **Causa**: Middleware configurado incorretamente
- **Solução**: Verificar configuração do middleware.ts

### 9. Configuração de Email SMTP (Opcional)

Para emails mais confiáveis, configure SMTP:
- **SMTP Host**: smtp.gmail.com
- **Port**: 587
- **Security**: STARTTLS

### 10. Teste Final

Após configurar:
1. Registre um novo usuário
2. Verifique o email de confirmação
3. Clique no link de confirmação
4. Verifique se redireciona corretamente para o dashboard
5. Faça logout e login novamente para testar

## 🎯 URLs Corretas para Configurar

**Site URL**: `https://agentflow.pages.dev`
**Callback URLs**:
- `https://agentflow.pages.dev/auth/callback`
- `http://localhost:3000/auth/callback` (para desenvolvimento)
- `https://agentflow.pages.dev/dashboard`

**Email Redirect To**: `https://agentflow.pages.dev/auth/callback`
