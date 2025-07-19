-- Tabela de usuários (já existe via auth.users)
-- Vamos criar uma tabela de perfil e sistema de créditos

-- Tabela de perfil de usuário
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    credits INTEGER DEFAULT 0,
    total_credits_purchased INTEGER DEFAULT 0,
    total_credits_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de transações de créditos
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_payment_intent_id TEXT,
    amount INTEGER NOT NULL, -- em centavos
    credits INTEGER NOT NULL,
    type TEXT CHECK (type IN ('purchase', 'usage', 'refund')),
    description TEXT,
    status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de conexões sociais
CREATE TABLE IF NOT EXISTS public.social_connections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    platform TEXT CHECK (platform IN ('facebook', 'instagram', 'whatsapp')),
    access_token TEXT NOT NULL,
    refresh_token TEXT,
    page_id TEXT,
    page_name TEXT,
    phone_number_id TEXT,
    phone_number TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, platform, page_id)
);

-- Tabela de conversas
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
    platform TEXT CHECK (platform IN ('facebook', 'instagram', 'whatsapp')),
    external_user_id TEXT NOT NULL,
    external_user_name TEXT,
    status TEXT CHECK (status IN ('active', 'ended', 'blocked')) DEFAULT 'active',
    credits_used INTEGER DEFAULT 0,
    last_message_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender TEXT CHECK (sender IN ('user', 'agent', 'system')),
    content TEXT NOT NULL,
    message_type TEXT CHECK (message_type IN ('text', 'image', 'audio', 'video', 'file')) DEFAULT 'text',
    metadata JSONB,
    tokens_used INTEGER,
    cost DECIMAL(10,6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para adicionar créditos ao usuário
CREATE OR REPLACE FUNCTION public.add_user_credits(
    user_id UUID,
    credits_to_add INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET 
        credits = credits + credits_to_add,
        total_credits_purchased = total_credits_purchased + credits_to_add,
        updated_at = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para usar créditos
CREATE OR REPLACE FUNCTION public.use_user_credits(
    user_id UUID,
    credits_to_use INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
    current_credits INTEGER;
BEGIN
    SELECT credits INTO current_credits
    FROM public.profiles
    WHERE id = user_id;
    
    IF current_credits >= credits_to_use THEN
        UPDATE public.profiles
        SET 
            credits = credits - credits_to_use,
            total_credits_used = total_credits_used + credits_to_use,
            updated_at = NOW()
        WHERE id = user_id;
        
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_social_connections_user_id ON public.social_connections(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_agent_id ON public.conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);

-- RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own transactions" ON public.transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own social connections" ON public.social_connections
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own social connections" ON public.social_connections
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own conversations" ON public.conversations
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own conversations" ON public.conversations
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages from own conversations" ON public.messages
    FOR SELECT USING (
        conversation_id IN (
            SELECT id FROM public.conversations WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can add messages to own conversations" ON public.messages
    FOR INSERT WITH CHECK (
        conversation_id IN (
            SELECT id FROM public.conversations WHERE user_id = auth.uid()
        )
    );
