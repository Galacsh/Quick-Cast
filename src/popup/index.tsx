import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')

if (!root) throw new Error('root element not found.')

createRoot(root).render(
  <StrictMode>
    <div>Popup</div>
  </StrictMode>
)
