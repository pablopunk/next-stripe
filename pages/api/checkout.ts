import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
})

export default async function ApiCheckout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quantity, price } = req.body
  if (!quantity || !price) {
    return res
      .status(405)
      .json({ error: 'bad request, missing quantity or price' })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price,
        quantity,
      },
    ],
    mode: 'payment',
    success_url: req.headers.origin + '/success',
    cancel_url: req.headers.referer!,
  })

  res.status(200).json({ sessionId: session.id })
}
