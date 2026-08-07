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
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPages(7.8) // Extra scrolling room on mobile where elements stack
      } else {
        setPages(6.2) // Fits perfectly on desktop viewports
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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
    window.location.hash = 'home'
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

      {/* Premium Glassmorphic Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 10%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        pointerEvents: 'auto',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.85), transparent)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255,255,255,0.03)'
      }}>
        <div 
          onClick={handleBackTo3D} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
        >
          <motion.img
            src={logoImg}
            alt="Smokey Jo's"
            style={{ height: '55px', borderRadius: '50%' }}
            whileHover={{ scale: 1.1, rotate: 10 }}
          />
          <div>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.3rem', letterSpacing: '0.05rem', color: 'var(--primary)', margin: 0 }}>Smokey Jo's</h2>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.2rem', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>Organic Vegan Café</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
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
                  fontWeight: 600, 
                  letterSpacing: '0.12rem', 
                  fontSize: '0.85rem', 
                  textTransform: 'uppercase',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  paddingBottom: '0.2rem',
                  transition: 'color 0.2s, border-color 0.2s'
                }}
                whileHover={{ color: 'var(--primary)', scale: 1.05 }}
              >
                {item}
              </motion.a>
            )
          })}
          <motion.a
            href="https://www.instagram.com/smokey.jos.cafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={14} /> @smokey.jos.cafe
          </motion.a>
        </div>
      </nav>

      {renderContent()}
    </div>
  )
}

export default App
