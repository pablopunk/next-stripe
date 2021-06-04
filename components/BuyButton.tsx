import { loadStripe } from '@stripe/stripe-js'
import { FunctionComponent, useEffect, useState } from 'react'
import Stripe from 'stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

type Props = {
  quantity: number
  price: Stripe.Price
}

const BuyButton: FunctionComponent<Props> = ({ quantity, price, children }) => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 3000)
    }
  }, [error])

  const handleClick = async () => {
    const { sessionId } = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity, price: price.id }),
    }).then((r) => r.json())
    const stripe = await stripePromise
    const response = await stripe?.redirectToCheckout({
      sessionId,
    })

    if (response?.error) {
      setError('Something went wrong')
    }
  }

  if (error) {
    return (
      <button className="px-3 py-2 text-xs font-bold text-white uppercase bg-red-700 rounded">
        {error}
      </button>
    )
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="px-3 py-2 text-xs font-bold uppercase rounded bg-primary text-bg"
      >
        {children}
      </button>
    </>
  )
}

export default BuyButton
