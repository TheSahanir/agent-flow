import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // user_id
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=${error}`);
    }

    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=missing_params`);
    }

    const userId = state;

    // Trocar código por token de acesso
    const tokenUrl = new URL('https://graph.facebook.com/v18.0/oauth/access_token');
    tokenUrl.searchParams.set('client_id', process.env.FACEBOOK_APP_ID!);
    tokenUrl.searchParams.set('client_secret', process.env.FACEBOOK_APP_SECRET!);
    tokenUrl.searchParams.set('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/social/facebook/callback`);
    tokenUrl.searchParams.set('code', code);
    
    const tokenResponse = await fetch(tokenUrl.toString(), {
      method: 'GET',
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=token_failed`);
    }

    // Buscar páginas do usuário
    const pagesResponse = await fetch('https://graph.facebook.com/v18.0/me/accounts', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    const pagesData = await pagesResponse.json();

    // Salvar conexão inicial usando Supabase REST API
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/social_connections`, {
      method: 'POST',
      headers: {
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        platform: 'facebook',
        access_token: tokenData.access_token,
        expires_at: new Date(Date.now() + (tokenData.expires_in * 1000)).toISOString(),
      }),
    });

    // Redirecionar para seleção de página
    const pages = pagesData.data || [];
    const pagesParam = encodeURIComponent(JSON.stringify(pages));
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?facebook_connected=true&pages=${pagesParam}`
    );

  } catch (error) {
    console.error('Error in Facebook callback:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard?error=callback_failed`);
  }
}
