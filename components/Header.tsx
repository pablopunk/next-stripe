import Link from 'next/link'

export default function Header() {
  return (
    <div className="flex items-center justify-between px-5 py-2 shadow-lg border-primary">
      <Link href="/">
        <a className="p-2 text-2xl font-bold tracking-wide uppercase transform -skew-x-6 text-bg bg-primary">
          <h1>Stripe shop</h1>
        </a>
      </Link>
      <Link href="https://github.com/pablopunk/next-stripe">
        <a className="font-bold ">Github</a>
      </Link>
    </div>
  )
}
