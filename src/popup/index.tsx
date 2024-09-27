import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import '@/globals.css'

const root = document.getElementById('root')

if (!root) throw new Error('root element not found.')

/**
 * Service worker gets inactivated every 30 seconds even popup page is opened.
 * So, run this function should be called before rendering UI.
 */
async function activateWorker() {
  const port = chrome.runtime.connect()
  port.onDisconnect.addListener(activateWorker)
}

activateWorker()
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
