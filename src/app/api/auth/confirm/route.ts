import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })
    
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  return NextResponse.redirect(new URL('/auth/login?error=auth_failed', request.url))
}
