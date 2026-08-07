import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress library-level Three.js deprecation logs in console.warn & console.error
const filterConsoleLogs = (originalFunc) => {
  return (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('THREE.Clock') || 
       args[0].includes('THREE.Timer') ||
       args[0].includes('PCFSoftShadowMap') || 
       args[0].includes('createRoot') ||
       args[0].includes('deprecated'))
    ) {
      return
    }
    originalFunc(...args)
  }
}

console.warn = filterConsoleLogs(console.warn)
console.error = filterConsoleLogs(console.error)

// DOM-Node Persisted React Root Cache & Re-use
const container = document.getElementById('root')

if (!container.__reactRootInstance) {
  container.__reactRootInstance = createRoot(container)
}

container.__reactRootInstance.render(
  <StrictMode>
    <App />
  </StrictMode>
)
