# Deploy para GitHub Pages

Este projeto está configurado para ser hospedado no GitHub Pages usando Next.js com export estático.

## Configuração do Repositório

1. Crie um novo repositório no GitHub com o nome `agentflow`
2. Faça push do código para o repositório

```bash
cd agentflow
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/agentflow.git
git push -u origin main
```

3. Ative o GitHub Pages nas configurações do repositório:
   - Vá para Settings → Pages
   - Em Source, selecione "GitHub Actions"

## Deploy Automático

O projeto está configurado com GitHub Actions para deploy automático. Sempre que você fizer push para a branch `main`, o site será automaticamente construído e publicado.

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Notas Importantes

- O projeto usa export estático do Next.js
- Imagens são desabilitadas para otimização (unoptimized: true)
- O site será hospedado em: `https://YOUR_USERNAME.github.io/agentflow/`
