#!/bin/bash

echo "🚀 Iniciando deploy do AgentFlow..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto agentflow"
    exit 1
fi

# Build do projeto
echo "📦 Fazendo build do projeto..."
npm run build

# Verificar se o build foi bem-sucedido
if [ $? -ne 0 ]; then
    echo "❌ Erro no build do projeto"
    exit 1
fi

# Adicionar arquivos ao git
echo "📁 Adicionando arquivos ao git..."
git add .
git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"

# Push para o repositório
echo "📤 Fazendo push para o GitHub..."
git push origin main

echo "✅ Deploy iniciado! O site será publicado automaticamente em alguns minutos."
echo "📍 URL do site: https://YOUR_USERNAME.github.io/agentflow/"
