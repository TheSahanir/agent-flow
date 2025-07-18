# Solução para Erro de Database ao Criar Novo Usuário

## ✅ Status Atual do Banco de Dados

### Tabelas Verificadas:
- ✅ **users** - Tabela de usuários criada corretamente
- ✅ **user_credits** - Tabela de créditos criada corretamente
- ✅ **RLS Policies** - Todas as políticas de segurança configuradas
- ✅ **Trigger Function** - `handle_new_user()` está funcionando

### 🔍 Possíveis Causas do Erro "Database error saving new user"

## 1. **Problema com Trigger Function**
A trigger function está tentando inserir na tabela `users` com `new.id`, mas pode haver um conflito.

## 2. **Solução: Atualizar a Trigger Function**

Execute este comando no SQL Editor do Supabase:

```sql
-- Atualizar a trigger function para ser mais robusta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se o usuário já existe
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = NEW.id) THEN
        -- Inserir novo usuário
        INSERT INTO public.users (id, email, name)
        VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'));
        
        -- Inserir créditos iniciais
        INSERT INTO public.user_credits (user_id, balance, total_used)
        VALUES (NEW.id, 100, 0);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 3. **Verificar Logs de Erro**

Para ver o erro específico, execute:

```sql
-- Verificar logs recentes
SELECT * FROM auth.audit_log_entries 
ORDER BY created_at DESC 
LIMIT 10;
```

## 4. **Testar Registro Manual**

Teste o registro manualmente via SQL:

```sql
-- Testar inserção direta (substitua com seus dados)
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES (
    'teste@email.com', 
    crypt('senha123', gen_salt('bf')), 
    NOW(),
    '{"full_name": "Teste Usuario"}'::jsonb
);
```

## 5. **Verificar Permissões**

Certifique-se de que as políticas estão ativas:

```sql
-- Verificar se RLS está ativado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('users', 'user_credits');
```

## 6. **Solução Alternativa: Desabilitar RLS Temporariamente**

Se necessário, desabilite RLS temporariamente para teste:

```sql
-- Desabilitar RLS (não recomendado para produção)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits DISABLE ROW LEVEL SECURITY;
```

## 7. **Verificar no Console do Supabase**

1. Acesse: https://supabase.com/dashboard
2. Vá para seu projeto → SQL Editor
3. Execute: `SELECT * FROM auth.users ORDER BY created_at DESC LIMIT 5;`
4. Verifique se há erros nos logs: Settings → Logs → Auth Logs

## 8. **Teste de Registro via API**

Teste o registro via API REST:

```bash
curl -X POST 'https://dhjllodeisqiiipjckeb.supabase.co/auth/v1/signup' \
-H 'apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
-H 'Content-Type: application/json' \
-d '{
  "email": "teste@email.com",
  "password": "senha123",
  "data": {"full_name": "Teste Usuario"}
}'
```

## 🚀 Próximos Passos

1. **Execute a atualização da trigger function** (item 2)
2. **Teste o registro novamente** no seu aplicativo
3. **Verifique os logs** se o erro persistir
4. **Use o teste manual** para identificar o erro específico

## 📋 Comandos Úteis para Debug

```bash
# Verificar se o registro foi criado
SELECT * FROM auth.users WHERE email = 'seu@email.com';

# Verificar se os créditos foram criados
SELECT * FROM user_credits WHERE user_id = 'uuid-do-usuario';
```

O sistema está configurado corretamente, mas pode haver um pequeno ajuste necessário na trigger function ou nas políticas de segurança.
