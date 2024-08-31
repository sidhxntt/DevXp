import Databases from "."
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: "DevXP | DBMS",
  description: "Blog posts on databases which includes all topics for OLTP and OLAP"
}

const page = () => {
  return (
    <Databases/>
  )
}

export default page