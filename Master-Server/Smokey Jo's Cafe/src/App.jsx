import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import logoImg from './assets/logo.png'
import Experience from './Experience'
import Overlay from './Overlay'
import Vibe from './pages/Vibe'
import Food from './pages/Food'
import Drinks from './pages/Drinks'
import Story from './pages/Story'
import Contact from './pages/Contact'
import './App.css'

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.glass-card')) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <>
      <div 
        className={`custom-cursor ${isHovered ? 'cursor-hover' : ''}`} 
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      <div 
        className="custom-cursor-dot" 
        style={{ left: mousePos.x, top: mousePos.y }}
      />
    </>
  )
}

function App() {
  const [pages, setPages] = useState(6.2)
  const [currentRoute, setCurrentRoute] = useState('home')

  useEffect(() => {
    const updatePages = () => {
      const contentEl = document.querySelector('.content')
      if (contentEl) {
        // Calculate exact pages based on actual HTML height
        const height = contentEl.getBoundingClientRect().height
        let newPages = height / window.innerHeight
        // Add a tiny buffer (0.1) so the scroll doesn't abruptly snap off the very last pixel
        setPages(newPages > 0 ? newPages + 0.1 : 6.5)
      } else {
        // Fallback
        setPages(window.innerWidth <= 768 ? 8.5 : 6.5)
      }
    }
    
    updatePages()
    // Update after a short delay to account for rendering/fonts
    const timeout = setTimeout(updatePages, 500)
    
    window.addEventListener('resize', updatePages)
    return () => {
      window.removeEventListener('resize', updatePages)
      clearTimeout(timeout)
    }
  }, [])

  // Read route from URL hash on load and listen to hashchange
  useEffect(() => {
    const getRouteFromHash = () => {
      const hash = window.location.hash.substring(1)
      const validRoutes = ['home', 'vibe', 'food', 'drinks', 'story', 'contact']
      return validRoutes.includes(hash) ? hash : 'home'
    }

    setCurrentRoute(getRouteFromHash())

    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleBackTo3D = () => {
    history.pushState('', document.title, window.location.pathname + window.location.search)
    setCurrentRoute('home')
  }

  // Render the appropriate component based on the hash-based route
  const renderContent = () => {
    switch (currentRoute) {
      case 'vibe':
        return <Vibe onBack={handleBackTo3D} />
      case 'food':
        return <Food onBack={handleBackTo3D} />
      case 'drinks':
        return <Drinks onBack={handleBackTo3D} />
      case 'story':
        return <Story onBack={handleBackTo3D} />
      case 'contact':
        return <Contact onBack={handleBackTo3D} />
      case 'home':
      default:
        return (
          <div className="canvas-container">
            <Canvas
              shadows={{ type: 1 }}
              camera={{ position: [0, 0, 5], fov: 35 }}
            >
              <Suspense fallback={
                <Html center>
                  <div style={{ 
                    color: 'white', 
                    fontFamily: 'Outfit', 
                    whiteSpace: 'nowrap',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '1rem 2rem',
                    borderRadius: '10px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    Loading Experience...
                  </div>
                </Html>
              }>
                <ScrollControls pages={pages} damping={0.25}>
                  <Experience pages={pages} />
                  <Scroll html>
                    <Overlay />
                  </Scroll>
                </ScrollControls>
              </Suspense>
            </Canvas>
          </div>
        )
    }
  }

  return (
    <div className="app-container">
      <CustomCursor />

      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '2rem 8%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        pointerEvents: 'auto',
        background: 'linear-gradient(to bottom, rgba(249,246,240,0.95) 0%, rgba(249,246,240,0) 100%)',
      }}>
        <div 
          onClick={handleBackTo3D} 
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
        >
          <motion.img
            src={logoImg}
            alt="Smokey Jo's"
            style={{ height: '48px', borderRadius: '50%' }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          />
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', letterSpacing: '0.05rem', color: 'var(--text-olive)', margin: 0 }}>Smokey Jo's</h2>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.3rem', textTransform: 'uppercase', color: 'var(--primary-dark)', margin: 0, fontWeight: 600 }}>Vegan Café</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          {['Vibe', 'Food', 'Drinks', 'Story', 'Contact'].map((item) => {
            const itemRoute = item.toLowerCase()
            const isActive = currentRoute === itemRoute
            return (
              <motion.a
                key={item}
                href={`#${itemRoute}`}
                style={{ 
                  color: isActive ? 'var(--primary)' : 'var(--text-main)', 
                  textDecoration: 'none', 
                  fontFamily: 'Montserrat',
                  fontWeight: 600, 
                  letterSpacing: '0.15rem', 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase',
                  borderBottom: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                  paddingBottom: '0.3rem',
                  transition: 'color 0.3s, border-color 0.3s'
                }}
                whileHover={{ color: 'var(--primary)' }}
              >
                {item}
              </motion.a>
            )
          })}
        </div>
      </nav>

      {renderContent()}
    </div>
  )
}

export default App
