'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function DebugAuthPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testEmail, setTestEmail] = useState('')
  const [testPassword, setTestPassword] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const testLogin = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      })
      
      if (error) {
        setError(error.message)
      } else {
        setUser(data.user)
        console.log('Login bem-sucedido:', data.user)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testSignUp = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })
      
      if (error) {
        setError(error.message)
      } else {
        setUser(data.user)
        console.log('Cadastro bem-sucedido:', data.user)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) {
        setError(error.message)
      } else {
        console.log('Redirecionando para Google...')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug de Autenticação</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Status Atual:</h2>
        {user ? (
          <div>
            <p className="text-green-600">✅ Usuário logado: {user.email}</p>
            <button 
              onClick={logout}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Sair
            </button>
          </div>
        ) : (
          <p className="text-red-600">❌ Nenhum usuário logado</p>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Erro: {error}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Senha:</label>
          <input
            type="password"
            value={testPassword}
            onChange={(e) => setTestPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="sua senha"
          />
        </div>

        <div className="space-y-2">
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Testar Login
          </button>
          
          <button
            onClick={testSignUp}
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Testar Cadastro
          </button>
          
          <button
            onClick={testGoogleLogin}
            className="w-full px-4 py-2 bg-red-500 text-white rounded"
          >
            Login com Google
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">Informações de Debug:</h3>
        <ul className="text-sm space-y-1">
          <li>URL do Supabase: https://dhjllodeisqiiipjckeb.supabase.co</li>
          <li>Origem atual: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</li>
          <li>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</li>
        </ul>
      </div>
    </div>
  )
}
