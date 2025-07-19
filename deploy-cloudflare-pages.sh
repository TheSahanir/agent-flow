#!/bin/bash

echo "🚀 Iniciando deploy para Cloudflare Pages..."

# Verificar se as variáveis de ambiente estão configuradas
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ CLOUDFLARE_API_TOKEN não está configurado"
    echo "Configure com: export CLOUDFLARE_API_TOKEN=seu_token"
    exit 1
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Build do projeto
echo "🔨 Fazendo build do projeto..."
npm run build

# Deploy para Cloudflare Pages
echo "☁️ Fazendo deploy para Cloudflare Pages..."
npx wrangler pages deploy .next --project-name=agentflow

echo "✅ Deploy concluído!"
echo "🌐 Seu app está disponível em: https://agentflow.pages.dev"
