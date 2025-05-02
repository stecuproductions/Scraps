import Stripe from 'stripe';
import { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
export async function POST(req) {
  const {products, ...formData} = await req.json();
  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'pln',
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'blik'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_DOMAIN_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_DOMAIN_URL}/payment/cancel`,
  });
  return new Response(JSON.stringify({ id: session.id }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
