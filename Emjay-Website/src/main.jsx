import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const originalError = console.error
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('already been passed to createRoot()')) {
    return // Suppress harmless React Drei HMR warning
  }
  originalError(...args)
}

const container = document.getElementById('root')
const root = container._reactRoot || createRoot(container)
container._reactRoot = root

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
