# Template de Email de Confirmação - Supabase

## ✅ Template Corrigido para Email de Confirmação

### Configuração no Painel do Supabase

**Acesse**: https://supabase.com/dashboard → Seu projeto → Authentication → Email Templates → Confirm Signup

### Template Atualizado

**Subject**: Confirme seu cadastro no AgentFlow

**HTML Content**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Confirme seu email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Bem-vindo ao AgentFlow! 🚀</h2>
        
        <p>Olá,</p>
        
        <p>Obrigado por se cadastrar no AgentFlow! Para completar seu registro e começar a criar seus agentes de IA, por favor confirme seu email clicando no botão abaixo:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard" 
               style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Confirmar Email
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
            <code style="background-color: #f3f4f6; padding: 2px 4px; border-radius: 3px;">
                {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
            </code>
        </p>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px;">
            Este link expira em 24 horas. Se você não solicitou este email, por favor ignore.
        </p>
    </div>
</body>
</html>
```

### Configuração de URLs

**Authentication → URL Configuration**

**Site URL**: 
```
https://agentflow.pages.dev
```

**Redirect URLs**:
```
https://agentflow.pages.dev/auth/confirm
https://agentflow.pages.dev/auth/callback
http://localhost:3000/auth/confirm
http://localhost:3000/auth/callback
```

### Template de Email de Recuperação de Senha

**Template: Reset Password**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redefinir senha</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb;">Redefinir Senha</h2>
        
        <p>Olá,</p>
        
        <p>Você solicitou a redefinição de senha para sua conta no AgentFlow. Clique no botão abaixo para criar uma nova senha:</p>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/login" 
               style="background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Redefinir Senha
            </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
            Se o botão não funcionar, copie e cole este link no seu navegador:<br>
            <code style="background-color: #f3f4f6; padding: 2px 4px; border-radius: 3px;">
                {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/login
            </code>
        </p>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px;">
            Este link expira em 1 hora. Se você não solicitou este email, por favor ignore.
        </p>
    </div>
</body>
</html>
```

### Configuração de Email SMTP (Opcional)

Para melhor entrega de emails, configure SMTP:

**Authentication → Providers → SMTP**

- **Host**: smtp.gmail.com
- **Port**: 587
- **User**: seu-email@gmail.com
- **Password**: sua-senha-de-app
- **Security**: STARTTLS

### Teste de Configuração

1. **Registre um novo usuário**
2. **Verifique o email recebido**
3. **Clique no link de confirmação**
4. **Verifique se redireciona para `/dashboard`**

### URLs de Teste

**Produção**:
- Site URL: `https://agentflow.pages.dev`
- Email URL: `https://agentflow.pages.dev/auth/confirm`

**Desenvolvimento**:
- Site URL: `http://localhost:3000`
- Email URL: `http://localhost:3000/auth/confirm`

### Solução de Problemas

Se o erro "No API key found" persistir:

1. **Verifique se o middleware está configurado corretamente**
2. **Confirme que as URLs estão corretas no painel do Supabase**
3. **Teste com um novo registro após aplicar as configurações**
4. **Verifique os logs de erro no console do navegador**

### Comandos de Teste

```bash
# Testar configuração de email
curl -X GET 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/settings' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
