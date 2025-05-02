import Stripe from 'stripe';
import { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const body = await req.json();
    const items = body.items;

    if (!Array.isArray(items)) {
      return new Response(JSON.stringify({ error: 'Brak produktów' }), { status: 400 });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'pln',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), 
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'blik'],
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_DOMAIN_URL}/payment/cancel`,
    });

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });

  } catch (error) {
    console.error('Stripe session error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
