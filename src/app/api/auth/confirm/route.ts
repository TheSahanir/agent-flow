import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Configuração para Cloudflare Pages - exportação estática
export const dynamic = 'force-static'
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  console.log('Email confirmation received:', { token_hash, type, next, origin })

  if (token_hash && type) {
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

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type: type as any,
      })

      if (error) {
        console.error('Email confirmation error:', error)
        return NextResponse.redirect(`${origin}/auth/login?error=confirmation_failed`)
      }

      console.log('Email confirmed successfully')
      return response
    } catch (error) {
      console.error('Email confirmation error:', error)
      return NextResponse.redirect(`${origin}/auth/login?error=confirmation_failed`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=missing_token`)
}
