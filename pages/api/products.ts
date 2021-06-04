import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
})

const PAGE_SIZE = 10

export default async function ApiProducts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { data: products, has_more } = await stripe.products.list({
    limit: PAGE_SIZE,
  })

  const prices: Record<Stripe.Product['id'], Stripe.Price> = {}
  const priceResults = await Promise.all(
    products.map((product) => stripe.prices.list({ product: product.id }))
  )
  for (const result of priceResults) {
    const price = result.data[0]
    prices[price.product.toString()] = price
  }

  return res.status(200).send({
    products,
    prices,
    more: has_more,
  })
}
