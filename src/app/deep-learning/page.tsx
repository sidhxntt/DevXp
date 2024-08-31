import type { Metadata } from 'next'
import DeepLearning from '.'
 
export const metadata: Metadata = {
  title: "DevXP | Deep-Learning",
  description: "Blog posts on Deep learning which includes topics like ANN, CNN, RNN, LSTM, etc. "
}

const page = () => {
  return (
    <DeepLearning/>
  )
}

export default page