# 🚀 Cloudflare Pages - Configuração Direta do Painel

## ✅ Passos Simples para Deploy no Cloudflare Pages

### 1. Configuração no Painel Cloudflare
1. **Acesse**: https://dash.cloudflare.com → Pages → Create a Project
2. **Conecte seu GitHub**
3. **Selecione o repositório**: agentflow
4. **Configure o Build**:

### 2. Configuração de Build (IMPORTANTE)
- **Framework preset**: Next.js
- **Build command**: `npm run build:cloudflare`
- **Build output directory**: `.vercel/output/static`
- **Root directory**: `./`

### 3. Variáveis de Ambiente (Adicionar no Cloudflare)
Vá para Settings → Environment variables e adicione:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-key-aqui
AI_API_KEY=sua-chave-deepseek-aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_sua-chave-aqui
STRIPE_SECRET_KEY=sk_test_sua-chave-aqui
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
```

### 4. Pronto! 
O Cloudflare Pages irá:
- Detectar automaticamente o projeto Next.js
- Usar `npm run build:cloudflare` para build
- Fazer deploy automático a cada push para `main`

## 🎯 Nenhum arquivo extra necessário!
Agora seu projeto está limpo e pronto para o deploy direto pelo painel Cloudflare Pages.

## 📋 Checklist Final
- [ ] Repositório no GitHub com código atualizado
- [ ] Variáveis de ambiente configuradas no Cloudflare
- [ ] Build command: `npm run build:cloudflare`
- [ ] Build output: `.vercel/output/static`
- [ ] Deploy automático ativado
