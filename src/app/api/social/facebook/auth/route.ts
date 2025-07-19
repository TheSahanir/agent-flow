import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const redirectUri = searchParams.get('redirect_uri') || '/dashboard'

  const facebookAuthUrl = new URL('https://www.facebook.com/v18.0/dialog/oauth')
  facebookAuthUrl.searchParams.set('client_id', process.env.FACEBOOK_APP_ID!)
  facebookAuthUrl.searchParams.set('redirect_uri', `${request.headers.get('origin')}/api/social/facebook/callback`)
  facebookAuthUrl.searchParams.set('scope', 'pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish')
  facebookAuthUrl.searchParams.set('state', redirectUri)

  return NextResponse.redirect(facebookAuthUrl.toString())
}
