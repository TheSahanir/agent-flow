import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
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
            // No-op for edge runtime - cookies will be handled by the client
          },
          remove(name: string, options: any) {
            // No-op for edge runtime
          },
        },
      }
    )
    
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const response = NextResponse.redirect(`${origin}${next}`)
      
      // Set session cookie manually
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        response.headers.set(
          'set-cookie',
          `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0]}-auth-token=${encodeURIComponent(JSON.stringify(session))}; Path=/; HttpOnly; Secure; SameSite=Lax`
        )
      }
      
      return response
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
