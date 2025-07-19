import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state') || '/dashboard'
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?error=${error}`, request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/dashboard?error=no_code', request.url)
    )
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      // Store the access token in database or session
      console.log('Facebook access token received:', tokenData.access_token)
      
      return NextResponse.redirect(
        new URL(`${state}?facebook_connected=true`, request.url)
      )
    }

    return NextResponse.redirect(
      new URL('/dashboard?error=token_failed', request.url)
    )
  } catch (error) {
    console.error('Facebook callback error:', error)
    return NextResponse.redirect(
      new URL('/dashboard?error=callback_failed', request.url)
    )
  }
}
