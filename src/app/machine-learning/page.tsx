import MachineLearning from "."
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: "DevXP | Machine-Learning",
  description: "Blog posts on machine learning which includes topics like data preproccessing, supervisd and unsupervised algorithms and regulization techniques."
}

const page = () => {
  return (
    <MachineLearning/>
  )
}

export default page