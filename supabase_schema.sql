-- Users table (managed by Supabase Auth)
-- Agents table
CREATE TABLE IF NOT EXISTS agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    personality TEXT,
    response_style VARCHAR(50) CHECK (response_style IN ('formal', 'friendly', 'casual')),
    creativity_level INTEGER CHECK (creativity_level >= 0 AND creativity_level <= 100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAQs table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User credits table
CREATE TABLE IF NOT EXISTS user_credits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Credit plans table
CREATE TABLE IF NOT EXISTS credit_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    credits INTEGER NOT NULL,
    price INTEGER NOT NULL, -- Price in cents
    currency VARCHAR(3) DEFAULT 'BRL',
    stripe_price_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Credit transactions table
CREATE TABLE IF NOT EXISTS credit_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    credits INTEGER NOT NULL,
    type VARCHAR(50) CHECK (type IN ('purchase', 'usage', 'refund')),
    description TEXT,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    credits_used INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample credit plans
INSERT INTO credit_plans (name, credits, price, currency, stripe_price_id) VALUES
    ('Pacote Básico', 100, 1000, 'BRL', 'price_basic_100'),
    ('Pacote Padrão', 500, 4500, 'BRL', 'price_standard_500'),
    ('Pacote Premium', 1000, 8000, 'BRL', 'price_premium_1000')
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_products_agent_id ON products(agent_id);
CREATE INDEX IF NOT EXISTS idx_faqs_agent_id ON faqs(agent_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_agent_id ON chat_messages(agent_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_credits_updated_at BEFORE UPDATE ON user_credits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to add credits to user after successful payment
CREATE OR REPLACE FUNCTION add_user_credits(user_uuid UUID, credits_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
    INSERT INTO user_credits (user_id, credits)
    VALUES (user_uuid, credits_to_add)
    ON CONFLICT (user_id)
    DO UPDATE SET
        credits = user_credits.credits + credits_to_add,
        updated_at = NOW();
END;
$$ language 'plpgsql';

-- Create function to deduct credits from user
CREATE OR REPLACE FUNCTION deduct_user_credits(user_uuid UUID, credits_to_deduct INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    current_credits INTEGER;
BEGIN
    SELECT credits INTO current_credits FROM user_credits WHERE user_id = user_uuid;
    
    IF current_credits IS NULL OR current_credits < credits_to_deduct THEN
        RETURN FALSE;
    END IF;
    
    UPDATE user_credits
    SET credits = credits - credits_to_deduct,
        updated_at = NOW()
    WHERE user_id = user_uuid;
    
    RETURN TRUE;
END;
$$ language 'plpgsql';

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own agents" ON agents
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own agents" ON agents
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own agents" ON agents
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own agents" ON agents
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view products of their agents" ON products
    FOR SELECT USING (
        agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can manage products of their agents" ON products
    FOR ALL USING (
        agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view FAQs of their agents" ON faqs
    FOR SELECT USING (
        agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can manage FAQs of their agents" ON faqs
    FOR ALL USING (
        agent_id IN (SELECT id FROM agents WHERE user_id = auth.uid())
    );

CREATE POLICY "Users can view their own credits" ON user_credits
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own credit transactions" ON credit_transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own chat messages" ON chat_messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);
