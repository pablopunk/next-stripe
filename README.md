# next-stripe

> Serverless ecommerce.

This is a simple project to help you get started with your first online ecommerce. [**See Demo**](https://next-stripe.pablopunk.com).

## Get started

Just clone the repo and provide the stripe secrets inside `.env`. You can check [`.env.sample`](./.env.sample) for all the needed variables.

### Development

```sh
npm run dev
```

### Deploy

You can easily deploy it with [Vercel](https://vercel.com), or just host it your own:

```sh
npm run build && npm start
```

## Features

I want to keep it as simple as possible. This is not meant to be a production-ready ecommerce, it's just a startpoint so you can start playing with the Stripe API.

- [x] SSG
- [x] List all products and their prices
- [x] Click "buy" on a product and it will take you to Stripe Checkout page for that product
- [ ] WIP

## Author

| ![me](https://gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?size=100) |
| ---------------------------------------------------------------------------- |
| [Pablo Varela](https://pablopunk.com)                                        |
