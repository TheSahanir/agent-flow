#!/bin/bash

# Script de deploy para Cloudflare Pages
echo "🚀 Iniciando deploy no Cloudflare Pages..."

# Limpar cache anterior
echo "🧹 Limpando cache..."
rm -rf .vercel
rm -rf .next

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Build para Cloudflare Pages
echo "🔨 Fazendo build para Cloudflare Pages..."
npm run build:cloudflare

# Verificar se o build foi bem-sucedido
if [ -d ".vercel/output/static" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos gerados em: .vercel/output/static"
    
    # Se wrangler estiver disponível, fazer deploy
    if command -v wrangler &> /dev/null; then
        echo "🌐 Fazendo deploy com wrangler..."
        wrangler pages deploy .vercel/output/static --project-name=agentflow
    else
        echo "🌐 Fazendo deploy com npx..."
        npx wrangler pages deploy .vercel/output/static --project-name=agentflow
    fi
else
    echo "❌ Erro: Build não gerou a pasta .vercel/output/static"
    exit 1
fi
