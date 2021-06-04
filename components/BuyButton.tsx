import { loadStripe } from '@stripe/stripe-js'
import { FunctionComponent, useState } from 'react'
import Stripe from 'stripe'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
)

type Props = {
  quantity: number
  price: Stripe.Price
}

const BuyButton: FunctionComponent<Props> = ({ quantity, price, children }) => {
  const [stripeError, setStripeError] = useState(null)

  const handleClick = async () => {
    const { sessionId } = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity, price: price.id }),
    }).then((r) => r.json())
    const stripe = await stripePromise
    const { error } = await stripe?.redirectToCheckout({
      sessionId,
    })

    if (error) {
      setStripeError(error)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="px-3 py-2 text-xs font-bold uppercase rounded bg-primary text-bg"
      >
        {children}
      </button>
      {stripeError && <div className="text-red-700">{stripeError}</div>}
    </>
  )
}

export default BuyButton
