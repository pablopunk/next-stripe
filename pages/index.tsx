import { API_URL } from 'constants/url'
import { GetStaticProps } from 'next'
import { FunctionComponent } from 'react'
import Stripe from 'stripe'
import BuyButton from 'components/BuyButton'

type Props = {
  products: Stripe.Product[]
  prices: Record<Stripe.Product['id'], Stripe.Price>
}

const Index: FunctionComponent<Props> = ({ products, prices }) => {
  return (
    <>
      <h2 className="text-3xl">List of products</h2>
      <div className="flex flex-col items-center mt-5 md:grid md:gap-3 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => {
          const price = prices[product.id]

          return (
            <div
              className="m-3 flex items-center justify-between max-w-md overflow-hidden rounded-lg shadow-lg h-[136px]"
              key={product.id}
            >
              <div>
                <img
                  src={product.images[0]}
                  className="object-cover h-[136px] w-[150px]"
                />
              </div>
              <div className="px-3 py-0">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <p className="mt-2 text-sm">{product.description}</p>
                <div className="flex justify-between mt-3 item-center">
                  <h3 className="text-xl font-bold">
                    {price.currency === 'usd' && '$'}
                    {price.unit_amount! / 100}
                    {price.currency === 'eur' && '€'}
                  </h3>
                  <BuyButton quantity={1} price={price}>
                    Buy
                  </BuyButton>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { products, prices } = await fetch(API_URL + '/products').then((r) =>
    r.json()
  )
  return {
    props: {
      products,
      prices,
    },
  }
}

export default Index
