import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    try {
      // Simple redirect to handle auth on the client side
      return NextResponse.redirect(`${origin}${next}?auth_code=${code}`)
    } catch (error) {
      console.error('Auth callback error:', error)
    }
  }

  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
