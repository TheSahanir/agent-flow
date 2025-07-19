import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'edge';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    try {
      const credits = parseInt(session.metadata?.credits || '0');
      const userEmail = session.customer_details?.email;

      if (!userEmail || credits === 0) {
        console.error('Missing email or credits in session');
        return NextResponse.json({ error: 'Missing data' }, { status: 400 });
      }

      // Buscar usuário pelo email usando Supabase REST API
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?email=eq.${encodeURIComponent(userEmail)}&select=id`,
        {
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          },
        }
      );

      const users = await userResponse.json();
      if (!users || users.length === 0) {
        console.error('User not found:', userEmail);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      const userId = users[0].id;

      // Adicionar créditos usando RPC
      const rpcResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/add_user_credits`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            credits_to_add: credits,
          }),
        }
      );

      if (!rpcResponse.ok) {
        console.error('Error adding credits:', await rpcResponse.text());
        return NextResponse.json({ error: 'Error updating credits' }, { status: 500 });
      }

      // Registrar transação
      await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/transactions`, {
        method: 'POST',
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          stripe_payment_intent_id: session.payment_intent,
          amount: session.amount_total || 0,
          credits: credits,
          status: 'completed',
        }),
      });

    } catch (error) {
      console.error('Error processing webhook:', error);
      return NextResponse.json({ error: 'Processing error' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
