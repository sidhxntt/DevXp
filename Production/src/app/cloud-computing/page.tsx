import type { Metadata } from 'next'
import CloudComputing from '.'
 
export const metadata: Metadata = {
  title: "DevXP | Cloud-Computing",
  description: "Blog posts on cloud computing which includes topics like AWS, cloud architecture,and big data etc. "
}

const page = () => {
  return (
    <CloudComputing/>
  )
}

export default page