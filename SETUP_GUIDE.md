# HelloAgentes Setup Guide

## ✅ Completed Steps

### 1. Supabase Connection
- **Project**: HelloAgentes (ID: dhjllodeisqiiipjckeb)
- **URL**: https://dhjllodeisqiiipjckeb.supabase.co
- **Region**: São Paulo (sa-east-1)
- **Status**: Active and Healthy

### 2. DeepSeek API Integration
- **API Key**: ✅ Configured in .env.local
- **Base URL**: https://api.deepseek.com/v1
- **Model**: deepseek-chat

### 3. Environment Variables Updated
Your `.env.local` file has been updated with:
- `AI_API_KEY=sk-4b7f1bd6704948b488d54c71187e7273`
- `NEXT_PUBLIC_SUPABASE_URL=https://dhjllodeisqiiipjckeb.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw`

## 🔄 Next Steps Required

### 1. Set Up Database Schema
1. Go to your Supabase project: https://app.supabase.com/project/dhjllodeisqiiipjckeb
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase_schema.sql`
4. Click **Run** to execute the SQL

### 2. Get Service Role Key
1. In your Supabase project dashboard
2. Go to **Settings** → **API**
3. Find the **service_role** key
4. Copy it and update your `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

### 3. Enable Authentication
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure any additional providers you want (Google, GitHub, etc.)

### 4. Install Dependencies & Run
```bash
cd agentflow
npm install
npm run dev
```

## 📊 Database Schema Overview

The schema includes:
- **Users**: User management
- **Agents**: AI agent configurations
- **Products**: Product/service catalogs
- **FAQs**: Frequently asked questions
- **Conversations**: Chat history
- **Messages**: Individual messages
- **Credits**: Usage tracking and billing
- **Social Connections**: Platform integrations

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Policies** configured for user isolation
- **Indexes** for performance optimization
- **Triggers** for automatic timestamp updates

## 🚀 Ready to Use

Once you complete the database setup, your application will be fully connected to:
- ✅ Supabase HelloAgentes project
- ✅ DeepSeek AI API
- ✅ Complete database schema
- ✅ Security policies

Your webapp is now ready for development and deployment!
