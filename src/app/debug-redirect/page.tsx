'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function DebugRedirectPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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
        email: 'admin@hello.com',
        password: 'admin123',
      })
      
      if (error) {
        console.error('Erro no login:', error)
        alert(`Erro: ${error.message}`)
      } else {
        console.log('Login bem-sucedido:', data)
        alert('Login realizado! Redirecionando...')
        
        // Testar redirecionamento
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao fazer login')
    }
  }

  const handleForceRedirect = () => {
    console.log('Forçando redirecionamento...')
    window.location.href = '/dashboard'
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debug Redirecionamento</h1>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Status:</h2>
        <p className={user ? 'text-green-600' : 'text-red-600'}>
          {user ? `Logado como: ${user.email}` : 'Não logado'}
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleTestLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Testar Login e Redirecionamento
        </button>
        
        <button
          onClick={handleForceRedirect}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Forçar Redirecionamento
        </button>
        
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Router Push Dashboard
        </button>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>URL Atual: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
        <p>Origin: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</p>
      </div>
    </div>
  )
}
