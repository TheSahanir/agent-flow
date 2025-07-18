import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') || 'signup'
  const next = searchParams.get('next') ?? '/dashboard'

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
              response.headers.append('Set-Cookie', `${name}=${value}; ${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('; ')}`)
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

      return response
    } catch (error) {
      console.error('Email confirmation error:', error)
      return NextResponse.redirect(`${origin}/auth/login?error=confirmation_error`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=missing_token`)
}
