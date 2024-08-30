import type { Metadata } from 'next'
import Frontend from '.'
 
export const metadata: Metadata = {
  title: "DevXP | Frontend",
  description: "Blog posts on frontend which includes topics like react, ssr, seo, csr etc."
}

const page = () => {
  return (
    <Frontend/>
  )
}

export default page