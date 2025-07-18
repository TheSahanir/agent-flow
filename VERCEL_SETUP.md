# 🚀 Guia Completo - Deploy com Vercel + Domínio Customizado

## 📋 Passo a Passo Detalhado:

### **1. Criar conta no Vercel**
```bash
# Acesse: https://vercel.com
# Faça login com sua conta GitHub
```

### **2. Importar projeto**
1. Clique em **"New Project"**
2. Selecione **"Import Git Repository"**
3. Escolha: **TheSahanir/agent-flow**
4. Clique **"Deploy"**

### **3. Configurar domínio customizado**
1. No dashboard do Vercel, vá para **Settings** → **Domains**
2. Adicione: **app.helloagentes.com**
3. Vercel fornecerá registros DNS

### **4. Configurar no Cloudflare**
1. Acesse seu Cloudflare
2. Vá para **DNS** → **Records**
3. Adicione:
   ```
   Type: CNAME
   Name: app
   Target: cname.vercel-dns.com
   ```

### **5. Variáveis de ambiente**
No Vercel, adicione:
```
NEXT_PUBLIC_SUPABASE_URL=seu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=seu_supabase_key
STRIPE_SECRET_KEY=seu_stripe_key
AI_API_KEY=seu_deepseek_key
```

### **6. Deploy automático**
- **Cada push** no GitHub → Deploy automático
- **SSL automático** incluído
- **Performance global** via CDN

## 🎯 **Resultado:**
- **Site**: https://app.helloagentes.com
- **Funcionalidades completas**: Auth, Supabase, API, etc.
- **Deploy automático** via GitHub
- **SSL gratuito** e performance otimizada

**Tempo total: 10 minutos!**
