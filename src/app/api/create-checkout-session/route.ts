import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'edge'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil' as any,
})

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin')}/credits?canceled=true`,
      metadata: {
        userId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
}
