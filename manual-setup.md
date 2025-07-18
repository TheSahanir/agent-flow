# Configuração Manual do GitHub

## Passos para criar o repositório e fazer o deploy:

### 1. Criar repositório no GitHub
1. Acesse https://github.com/new
2. Crie um repositório chamado `agentflow`
3. Deixe como público
4. Não inicialize com README (já temos)

### 2. Fazer o push dos arquivos
```bash
# Verificar status
git status

# Adicionar todos os arquivos
git add .
git commit -m "feat: AgentFlow com formulário simplificado e configuração GitHub Pages"

# Push para o GitHub
git push -u origin main
```

### 3. Ativar GitHub Pages
1. Vá para Settings → Pages no seu repositório
2. Em "Source", selecione "GitHub Actions"
3. O deploy será iniciado automaticamente

### 4. Verificar o deploy
- O site estará disponível em: `https://thesahanir.github.io/agentflow/`
- O status do build pode ser visto em Actions → Deploy to GitHub Pages

## Se o push falhar:
```bash
# Forçar push (se necessário)
git push -f origin main
