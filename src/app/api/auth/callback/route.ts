import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Garantir redirecionamento absoluto
      const redirectUrl = new URL(next, origin)
      return NextResponse.redirect(redirectUrl.toString())
    }
  }

  return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin))
}
