import type { Metadata } from 'next'
import Devops from '.'
 
export const metadata: Metadata = {
  title: "DevXP | Devops",
  description: "Blog posts on devops which includes topics like operating systems, ci/cd pipelines, containerisation etc."
}

const page = () => {
  return (
    <Devops/>
  )
}

export default page