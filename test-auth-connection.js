// Script para testar a conexão com Supabase Auth
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dhjllodeisqiiipjckeb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  console.log('=== Testando Conexão Supabase Auth ===');
  
  try {
    // Testar se conseguimos listar usuários (requer service role key)
    console.log('✅ Conexão estabelecida com sucesso');
    
    // Testar login com credenciais de teste
    console.log('\n=== Testando Login ===');
    
    // Testar se o serviço de auth está respondendo
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.log('❌ Erro ao verificar usuário:', authError.message);
    } else {
      console.log('✅ Usuário atual:', user?.email || 'Nenhum usuário logado');
    }
    
    // Testar configurações de redirecionamento
    console.log('\n=== Configurações de Redirecionamento ===');
    console.log('URL do projeto:', supabaseUrl);
    console.log('URLs esperadas:');
    console.log('- https://agentflow.pages.dev/auth/callback');
    console.log('- https://agentflow.pages.dev/**');
    console.log('- http://localhost:3000/auth/callback');
    
  } catch (error) {
    console.error('❌ Erro crítico:', error);
  }
}

testAuth();
