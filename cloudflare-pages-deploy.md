# Deploy no Cloudflare Pages

## Passo 1: Preparar o projeto para Cloudflare Pages

1. Instalar o adapter do Cloudflare:
```bash
npm install --save-dev @cloudflare/next-on-pages
```

2. Atualizar o package.json:
```json
{
  "scripts": {
    "build": "next build",
    "build:cloudflare": "npm run build && npx @cloudflare/next-on-pages",
    "preview": "npm run build:cloudflare && wrangler pages dev .vercel/output/static --compatibility-date=2024-01-01"
  }
}
```

3. Criar arquivo `wrangler.toml`:
```toml
name = "agentflow"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.kv_namespaces]]
binding = "KV"
id = "your-kv-namespace-id"
```

## Passo 2: Configurar variáveis de ambiente no Cloudflare

1. Ir para [dash.cloudflare.com](https://dash.cloudflare.com)
2. Criar um novo projeto Pages
3. Conectar com seu repositório GitHub
4. Configurar as seguintes variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AI_API_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL` = seu-dominio.com

## Passo 3: Build Settings

- **Build command:** `npm run build:cloudflare`
- **Build output directory:** `.vercel/output/static`
- **Root directory:** `./`

## Passo 4: Configurar domínio customizado

1. No dashboard do Cloudflare Pages, ir para "Custom domains"
2. Adicionar seu domínio
3. Seguir as instruções para configurar os DNS

## Passo 5: Deploy automático

O Cloudflare Pages fará deploy automático sempre que você fizer push para a branch principal.
