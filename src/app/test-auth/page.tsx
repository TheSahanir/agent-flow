'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestAuthPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      console.log('Usuário atual:', user)
    } catch (error) {
      console.error('Erro ao verificar usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || 'test@example.com',
        password: password || 'test123',
      })
      
      if (error) {
        console.error('Erro no login:', error)
        alert(`Erro: ${error.message}`)
      } else {
        console.log('Login bem-sucedido:', data)
        alert('Login realizado com sucesso!')
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao fazer login')
    }
  }

  const handleTestSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email || 'test@example.com',
        password: password || 'test123',
      })
      
      if (error) {
        console.error('Erro no registro:', error)
        alert(`Erro: ${error.message}`)
      } else {
        console.log('Registro bem-sucedido:', data)
        alert('Registro realizado! Verifique seu email.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao registrar')
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    alert('Logout realizado')
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teste de Autenticação</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className={user ? 'text-green-600' : 'text-red-600'}>
          {user ? `Logado como: ${user.email}` : 'Não logado'}
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <button
          onClick={handleTestLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Testar Login
        </button>
        
        <button
          onClick={handleTestSignUp}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Testar Registro
        </button>
        
        {user && (
          <button
            onClick={handleSignOut}
            className="w-full bg-red-500 text-white p-2 rounded"
          >
            Sair
          </button>
        )}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
        <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10)}...</p>
      </div>
    </div>
  )
}
