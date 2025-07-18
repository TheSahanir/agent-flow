# Configuração do Supabase - HelloAgentes

## Passo 1: Acessar o Dashboard do Supabase
1. Acesse: https://supabase.com/dashboard
2. Faça login com sua conta
3. Selecione o projeto "HelloAgentes" (ID: dhjllodeisqiiipjckeb)

## Passo 2: Configurar URLs de Redirecionamento
1. Vá para: Authentication > URL Configuration
2. Adicione estas URLs em "Redirect URLs":
   - `https://agentflow.pages.dev/auth/callback`
   - `https://agentflow.pages.dev/api/auth/callback`
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/api/auth/callback`

## Passo 3: Executar SQL no Dashboard
1. Vá para: SQL Editor
2. Cole e execute o SQL abaixo:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (simplified for auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Insert user on signup (trigger)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO users (id, email, name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## Passo 4: Verificar Configurações de Auth
1. Vá para: Authentication > Providers
2. Certifique-se de que "Email" está habilitado
3. Verifique se "Confirm email" está desabilitado (para facilitar testes)

## Passo 5: Testar Autenticação
1. Execute: `npm run dev`
2. Acesse: http://localhost:3000/auth/signup
3. Teste criar uma conta
4. Teste fazer login

## URLs Importantes
- Site: https://agentflow.pages.dev
- Supabase: https://supabase.com/dashboard/project/dhjllodeisqiiipjckeb
