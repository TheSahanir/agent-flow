# Correção de Autenticação Supabase - Instruções

## Problema Identificado
O sistema de login não estava redirecionando corretamente para o dashboard após autenticação bem-sucedida.

## Solução Aplicada

### 1. Configurações do Supabase
- **URL do Projeto**: https://dhjllodeisqiiipjckeb.supabase.co
- **Região**: sa-east-1 (São Paulo)
- **Status**: ACTIVE_HEALTHY

### 2. URLs de Redirecionamento Configuradas
As seguintes URLs devem estar configuradas no painel do Supabase:

#### URLs de Redirecionamento Permitidas:
```
https://agentflow.pages.dev/auth/callback
https://agentflow.pages.dev/dashboard
https://agentflow.pages.dev/
```

#### URLs de Site Permitidas:
```
https://agentflow.pages.dev
```

### 3. Arquivos Corrigidos

#### ✅ Login Page (`src/app/auth/login/page.tsx`)
- Corrigido redirecionamento após login bem-sucedido
- Adicionada verificação de usuário autenticado
- Usando `window.location.href` para garantir redirecionamento completo

#### ✅ Auth Callback (`src/app/api/auth/callback/route.ts`)
- Melhorado tratamento de cookies para Cloudflare
- Adicionado logging para debug
- Corrigido configuração de cookies seguros

#### ✅ Middleware (`src/middleware.ts`)
- Proteção de rotas `/dashboard` e `/credits`
- Redirecionamento automático para login quando não autenticado

#### ✅ Cloudflare Pages Config (`_redirects`)
- Adicionado arquivo de redirecionamento para SPA
- Configurado tratamento de rotas API
- Garantido funcionamento do auth callback

### 4. Variáveis de Ambiente Verificadas
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://agentflow.pages.dev
```

### 5. Testar Login
1. Acesse: https://agentflow.pages.dev/auth/login
2. Faça login com suas credenciais
3. Você deve ser redirecionado automaticamente para /dashboard

### 6. Se ainda não funcionar
Verifique no painel do Supabase:
1. Vá para Authentication > URL Configuration
2. Confirme que as URLs estão corretas
3. Teste com Google OAuth se configurado

## Comandos para Deploy
```bash
npm run build
npm run deploy
