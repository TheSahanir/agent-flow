# Guia Passo a Passo - GitHub Pages Gratuito

## 📋 **Passos para ativar o GitHub Pages:**

### **1. Acesse seu repositório**
- URL: https://github.com/TheSahanir/agent-flow

### **2. Ative o GitHub Pages**
1. Clique em **Settings** (ou vá direto para: https://github.com/TheSahanir/agent-flow/settings/pages)
2. Na seção **"Build and deployment"**
3. Em **"Source"**, selecione **"GitHub Actions"**
4. Clique em **Save**

### **3. Verifique o build**
1. Vá para **Actions** no seu repositório
2. Clique em **"Deploy to GitHub Pages"**
3. Aguarde 2-5 minutos para o build completar

### **4. Acesse seu site**
- **URL**: https://thesahanir.github.io/agent-flow/

## 🔄 **Se o build falhar:**
1. Vá para **Actions** → **Deploy to GitHub Pages**
2. Clique no workflow mais recente
3. Clique em **"Re-run all jobs"**

## ✅ **Verificação final:**
Execute no terminal:
```bash
cd agentflow
git push -u origin main
```

**O site estará disponível em até 10 minutos após ativar o GitHub Pages!**
