'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DebugLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [config, setConfig] = useState<any>(null)

  useEffect(() => {
    // Verificar configuração do Supabase
    setConfig({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20) + '...',
      origin: typeof window !== 'undefined' ? window.location.origin : 'N/A',
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'N/A'
    })

    // Verificar usuário atual
    checkCurrentUser()
  }, [])

  const checkCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (err: any) {
      setError('Erro ao verificar usuário: ' + err.message)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      console.log('=== TESTE DE LOGIN ===')
      console.log('Email:', email)
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Origin:', window.location.origin)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('Resposta:', { data, error })

      if (error) {
        setError(error.message)
      } else if (data.user) {
        setSuccess(`Login bem-sucedido! Usuário: ${data.user.email}`)
        setUser(data.user)
        
        // Testar redirecionamento após 2 segundos
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 2000)
      }
    } catch (err: any) {
      setError('Erro catastrófico: ' + err.message)
      console.error('Erro completo:', err)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      console.log('Sessão atual:', { data, error })
      
      if (error) {
        setError('Erro de conexão: ' + error.message)
      } else {
        setSuccess('Conexão bem-sucedida!')
      }
    } catch (err: any) {
      setError('Erro de conexão: ' + err.message)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSuccess('Logout realizado')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Debug de Login</h1>
        
        {/* Status Atual */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status Atual</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Usuário:</strong> {user ? user.email : 'Não logado'}</p>
            <p><strong>Supabase URL:</strong> {config?.url}</p>
            <p><strong>Origin:</strong> {config?.origin}</p>
            <p><strong>Path:</strong> {config?.pathname}</p>
          </div>
        </div>

        {/* Mensagens */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-800">Erro:</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-green-800">Sucesso:</h3>
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* Formulário de Teste */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testar Login</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="sua senha"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={testLogin}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              >
                {loading ? 'Testando...' : 'Testar Login'}
              </button>
              
              <button
                onClick={testConnection}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Testar Conexão
              </button>
              
              {user && (
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Sair
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Instruções de Debug</h2>
          <ul className="text-sm space-y-1">
            <li>1. Abra o console (F12) para ver logs detalhados</li>
            <li>2. Teste o login com suas credenciais</li>
            <li>3. Verifique se há erros no console</li>
            <li>4. Teste a conexão com o Supabase</li>
            <li>5. Verifique as configurações de URL no painel do Supabase</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
