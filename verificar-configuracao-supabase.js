#!/usr/bin/env node

// Script para verificar e corrigir configurações do Supabase Auth
const https = require('https');

const SUPABASE_URL = 'https://dhjllodeisqiiipjckeb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw';

const REQUIRED_REDIRECT_URLS = [
  'https://agentflow.pages.dev/**',
  'https://agentflow.pages.dev/auth/callback',
  'http://localhost:3000/**',
  'http://localhost:3000/auth/callback'
];

async function checkSupabaseConfig() {
  console.log('🔍 Verificando configurações do Supabase...');
  
  try {
    // Verificar se o serviço está respondendo
    const response = await fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    if (response.ok) {
      console.log('✅ Supabase Auth está respondendo');
      
      // Verificar configurações de autenticação
      const settings = await response.json();
      console.log('📊 Configurações atuais:', {
        external: settings.external || {},
        disableSignup: settings.disable_signup,
        mailerAutoconfirm: settings.mailer_autoconfirm
      });
      
      console.log('\n🎯 URLs de redirecionamento necessárias:');
      REQUIRED_REDIRECT_URLS.forEach(url => {
        console.log(`   - ${url}`);
      });
      
      console.log('\n🔗 Acesse para configurar:');
      console.log(`   ${SUPABASE_URL.replace('.supabase.co', '.supabase.co/auth/url-configuration')}`);
      
    } else {
      console.error('❌ Erro ao verificar configurações:', response.status);
    }
    
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
  }
}

// Executar verificação
checkSupabaseConfig();

// Exportar para uso em outros scripts
module.exports = {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  REQUIRED_REDIRECT_URLS,
  checkSupabaseConfig
};
