# 🛠️ Guia de Correção do Problema de Login

## Problema Identificado
O login não está funcionando devido a um redirecionamento duplicado e possíveis problemas de configuração no Supabase.

## Solução Implementada

### 1. Correção do Redirecionamento ✅
- **Arquivo alterado**: `src/app/auth/login/page.tsx`
- **Problema**: Redirecionamento duplicado causando conflito
- **Solução**: Simplificado para redirecionamento direto

### 2. Páginas de Debug Criadas ✅
- **Nova página**: `/debug-login` - Teste detalhado de login
- **Script**: `verificar-supabase.js` - Verificação de configuração

### 3. Configuração Necessária no Supabase

#### URLs de Redirecionamento
No painel do Supabase (https://supabase.com/dashboard), acesse seu projeto e configure:

**Authentication > URL Configuration:**
- **Site URL**: `https://agentflow.pages.dev`
- **Redirect URLs**:
  ```
  https://agentflow.pages.dev/auth/callback
  https://agentflow.pages.dev/dashboard
  https://agentflow.pages.dev/auth/login
  https://agentflow.pages.dev/auth/signup
  https://agentflow.pages.dev/debug-login
  ```

## Como Testar

### Opção 1: Página de Debug (Recomendado)
1. Acesse: `https://agentflow.pages.dev/debug-login`
2. Abra o console (F12) para ver logs detalhados
3. Teste suas credenciais
4. Verifique os erros no console

### Opção 2: Teste Local
```bash
cd agentflow
npm run dev
# Acesse: http://localhost:3000/debug-login
```

### Opção 3: Script de Verificação
```bash
cd agentflow
node verificar-supabase.js
```

## Possíveis Erros e Soluções

### Erro: "Invalid login credentials"
- **Causa**: Email ou senha incorretos
- **Solução**: Verifique as credenciais ou use a página de cadastro

### Erro: "Network request failed"
- **Causa**: Problema de CORS ou configuração de URL
- **Solução**: Verifique as URLs no painel do Supabase

### Erro: "User not found"
- **Causa**: Usuário não existe no banco
- **Solução**: Crie uma nova conta em `/auth/signup`

## Verificação de Configuração

### 1. Variáveis de Ambiente
Verifique se o arquivo `.env.local` contém:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Configuração do Supabase Auth
No painel do Supabase:
1. Vá para **Authentication > Providers**
2. Verifique se **Email** está habilitado
3. Configure **Site URL** e **Redirect URLs** conforme acima

### 3. Teste de Conexão
Use a página `/debug-login` para testar:
- Conexão com o Supabase
- Login com credenciais
- Redirecionamento após login

## Próximos Passos

1. **Teste imediato**: Acesse `/debug-login`
2. **Verifique o console**: Olhe por erros no navegador
3. **Confirme as URLs**: No painel do Supabase
4. **Teste o fluxo completo**: Login → Dashboard

## Suporte
Se o problema persistir após estas correções:
1. Use a página `/debug-login` para capturar logs
2. Verifique o console do navegador
3. Confirme as configurações no Supabase
4. Teste com um novo usuário em `/auth/signup`
