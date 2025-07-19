import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'edge'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil' as any,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.metadata?.userId
      
      if (userId) {
        console.log(`Payment completed for user: ${userId}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
