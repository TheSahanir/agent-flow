# Diagnóstico do Problema de API Key do Supabase

## ✅ Status Atual
- **Conexão com Supabase**: FUNCIONANDO ✓
- **Chave API**: VÁLIDA ✓
- **URL do projeto**: CORRETA ✓

## 🔍 Possíveis Causas do Erro "Invalid API Key"

### 1. Cache do Navegador
**Solução**: Limpar cache e cookies do navegador
- Pressione `Ctrl+Shift+Delete` (Windows) ou `Cmd+Shift+Delete` (Mac)
- Selecione "Cookies e outros dados de sites" e "Imagens e arquivos em cache"
- Recarregue a página com `Ctrl+F5` ou `Cmd+Shift+R`

### 2. URLs de Redirecionamento no Supabase
**Verificar no painel do Supabase**:
1. Acesse: https://supabase.com/dashboard
2. Vá para seu projeto → Authentication → URL Configuration
3. Verifique as URLs configuradas:

**URLs que devem estar configuradas**:
```
http://localhost:3000/auth/callback
https://agentflow.pages.dev/auth/callback
```

### 3. Variáveis de Ambiente no Deploy
**Para deploy em produção**, certifique-se de configurar as variáveis no provedor:

#### Cloudflare Pages:
- Vá para Cloudflare Dashboard → Pages → Seu projeto → Settings → Environment variables
- Adicione:
  - `NEXT_PUBLIC_SUPABASE_URL`: https://dhjllodeisqiiipjckeb.supabase.co
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

#### Vercel:
- Vá para Vercel Dashboard → Seu projeto → Settings → Environment Variables
- Adicione as mesmas variáveis

### 4. Teste Local
Para testar localmente:
```bash
cd agentflow
npm run dev
```
Acesse: http://localhost:3000/auth/signup

### 5. Verificação de CORS
No painel do Supabase:
1. Authentication → Providers → Auth Providers
2. Verifique se "Enable Signup" está ativado
3. Verifique as configurações de CORS

## 🚀 Próximos Passos
1. Limpe o cache do navegador
2. Verifique as URLs de redirecionamento no Supabase
3. Teste em uma janela anônima/incógnito
4. Verifique o console do navegador (F12) para erros detalhados

## 📋 Comandos Úteis
```bash
# Limpar cache e reiniciar
npm run dev -- --force

# Build de produção local
npm run build
npm start
