# 🚨 Correção do Erro de Deploy

## Problema Identificado

O erro `✘ [ERROR] It looks like you've run a Workers-specific command in a Pages project` ocorre porque o comando `wrangler deploy` está sendo usado em vez de `wrangler pages deploy`.

## ✅ Solução Implementada

### 1. Configuração Correta para Cloudflare Pages

**Arquivos criados/atualizados:**

- ✅ `wrangler.jsonc` - Configuração específica para Pages
- ✅ `.github/workflows/deploy.yml` - Workflow correto para Pages
- ✅ `deploy-cloudflare.sh` - Script atualizado com comando correto

### 2. Comandos Corretos

**Antes (errado):**
```bash
npx wrangler deploy
```

**Depois (correto):**
```bash
npx wrangler pages deploy .vercel/output/static --project-name=agentflow
```

## 🚀 Como Fazer Deploy Agora

### Opção 1: GitHub Actions (Automático)
1. Configure as secrets no GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
   - Todas as variáveis de ambiente do projeto

2. Faça push para a branch `main`:
```bash
git add .
git commit -m "Fix: Configuração correta para Cloudflare Pages"
git push origin main
```

### Opção 2: Deploy Manual
```bash
# Usar o script atualizado
./deploy-cloudflare.sh

# Ou manualmente
npm run build:cloudflare
npx wrangler pages deploy .vercel/output/static --project-name=agentflow
```

### Opção 3: Interface Cloudflare
1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Vá para Pages → Create a project
3. Conecte seu repositório GitHub
4. Use as configurações:
   - **Build command:** `npm run build:cloudflare`
   - **Build output directory:** `.vercel/output/static`

## 🔧 Configuração de Variáveis de Ambiente

No Cloudflare Pages (Settings → Environment variables):

```bash
NEXT_PUBLIC_SUPABASE_URL=seu_valor_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_valor_aqui
SUPABASE_SERVICE_ROLE_KEY=seu_valor_aqui
AI_API_KEY=seu_valor_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=seu_valor_aqui
STRIPE_SECRET_KEY=seu_valor_aqui
NEXT_PUBLIC_APP_URL=https://seuapp.com
```

## 📋 Checklist de Deploy

- [ ] `wrangler.jsonc` criado com configuração correta
- [ ] `.github/workflows/deploy.yml` atualizado
- [ ] `deploy-cloudflare.sh` corrigido
- [ ] Variáveis de ambiente configuradas no Cloudflare
- [ ] Projeto criado no Cloudflare Pages
- [ ] Repositório conectado ao Cloudflare

## 🎯 Próximos Passos

1. **Configurar Cloudflare Pages:**
   - Criar projeto no Cloudflare Pages
   - Conectar repositório GitHub
   - Configurar variáveis de ambiente

2. **Testar:**
   - Fazer push para main
   - Verificar se o deploy é bem-sucedido
   - Testar o site no domínio

3. **Domínio Customizado (opcional):**
   - Configurar DNS no Cloudflare
   - Adicionar domínio customizado ao projeto

## 🆘 Se o Erro Persistir

Se você continuar vendo o erro:

1. **Verificar cache:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Limpar build:**
   ```bash
   rm -rf .vercel .next
   npm run build:cloudflare
   ```

3. **Verificar configuração:**
   - Certifique-se de que não há `wrangler.toml` (use `wrangler.jsonc`)
   - Verifique se o comando está sendo executado no diretório correto

O deploy agora deve funcionar corretamente com Cloudflare Pages!
