import { FunctionComponent } from 'react'
import Header from 'components/Header'

const Page: FunctionComponent = ({ children }) => {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center py-6 max-w-[1400px] w-full mx-auto">
        <div>{children}</div>
      </main>
    </>
  )
}

export default Page
