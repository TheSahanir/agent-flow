import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Verificar se o usuário existe (simplificado para Cloudflare Pages)
    // Em produção, você pode querer verificar via Supabase REST API
    if (!userId) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Configurar URL de autorização do Facebook
    const facebookAppId = process.env.FACEBOOK_APP_ID!;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/social/facebook/callback`;
    
    const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
      `client_id=${facebookAppId}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=pages_manage_posts,pages_read_engagement,pages_show_list,instagram_basic,instagram_content_publish&` +
      `state=${userId}&` +
      `response_type=code`;

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error initiating Facebook auth:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
