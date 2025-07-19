const { createClient } = require('@supabase/supabase-js')

// Configuração
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dhjllodeisqiiipjckeb.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoamxsb2RlaXNxaWlpcGpja2ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODk1NzIsImV4cCI6MjA2ODM2NTU3Mn0.1n9JVWIPcfjRjh3N47x1U4lfUukFcV7hqr7H6bh37iw'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verificarConfiguracao() {
  console.log('=== VERIFICAÇÃO DE CONFIGURAÇÃO SUPABASE ===\n')
  
  console.log('URL:', supabaseUrl)
  console.log('Anon Key:', supabaseAnonKey.substring(0, 20) + '...')
  
  try {
    // Testar conexão
    console.log('\n1. Testando conexão...')
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('❌ Erro de conexão:', error.message)
    } else {
      console.log('✅ Conexão estabelecida com sucesso')
      console.log('Sessão atual:', data.session ? 'Ativa' : 'Inativa')
    }
    
    // Testar autenticação anônima
    console.log('\n2. Testando autenticação...')
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError) {
      console.error('❌ Erro ao verificar usuário:', authError.message)
    } else {
      console.log('✅ Autenticação funcionando')
      console.log('Usuário atual:', authData.user ? authData.user.email : 'Nenhum')
    }
    
    // Listar URLs necessárias
    console.log('\n3. URLs necessárias no Supabase:')
    console.log('   - Site URL: https://agentflow.pages.dev')
    console.log('   - Redirect URLs:')
    console.log('     * https://agentflow.pages.dev/auth/callback')
    console.log('     * https://agentflow.pages.dev/dashboard')
    console.log('     * https://agentflow.pages.dev/auth/login')
    console.log('     * https://agentflow.pages.dev/auth/signup')
    
    // Testar com um login básico
    console.log('\n4. Teste de login (use suas credenciais):')
    console.log('   Acesse: https://agentflow.pages.dev/debug-login')
    
  } catch (error) {
    console.error('❌ Erro crítico:', error.message)
  }
}

// Executar verificação
verificarConfiguracao()
