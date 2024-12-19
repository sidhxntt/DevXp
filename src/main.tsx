import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import Root from './Root'
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
       <Root />
    </RecoilRoot>
  </StrictMode>,
)
