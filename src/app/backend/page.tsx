import type { Metadata } from 'next'
import Backend from '.'
 
export const metadata: Metadata = {
  title: "DevXP | Backend",
  description: "Blog posts on backend which includes topics like APIs, servers, system design  etc."
}

const page = () => {
  return (
    <Backend/>
  )
}

export default page