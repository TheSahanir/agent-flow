import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Configuração para Cloudflare Pages - exportação estática
export const dynamic = 'force-static'
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  console.log('Auth callback received:', { code, next, error, origin })

  // Handle error cases
  if (error) {
    console.error('Auth error:', error, error_description)
    return NextResponse.redirect(`${origin}/auth/login?error=${error}`)
  }

  if (code) {
    try {
      const response = NextResponse.redirect(`${origin}${next}`)
      
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              const cookie = request.headers.get('cookie')
              if (!cookie) return null
              const match = cookie.match(new RegExp(`${name}=([^;]+)`))
              return match ? match[1] : null
            },
            set(name: string, value: string, options: any) {
              const cookieOptions = {
                ...options,
                secure: true,
                sameSite: 'lax',
                path: '/'
              }
              response.headers.append('Set-Cookie', `${name}=${value}; ${Object.entries(cookieOptions).map(([k, v]) => `${k}=${v}`).join('; ')}`)
            },
            remove(name: string, options: any) {
              response.headers.append('Set-Cookie', `${name}=; Max-Age=0; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`)
            },
          },
        }
      )

      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (sessionError) {
        console.error('Session exchange error:', sessionError)
        return NextResponse.redirect(`${origin}/auth/login?error=session_exchange_failed`)
      }

      console.log('Session created successfully:', data.user?.email)
      return response
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=missing_code`)
}
