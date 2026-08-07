import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import newLogo from '../assets/mockups/Emjay Brewery logo -01.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { label: 'HOME', to: '/' },
    { label: 'OUR STORY', to: '/Our-Story' },
    { label: 'OUR KOMBUCHA', to: '/our-kombucha' },
    { label: 'THE EMJAY VIBE', to: '/the-emjay-vibe' },
    { label: 'WHERE TO FIND EMJAY', to: '/find-emjay-near-you' },
    { label: 'CONTACT', to: '/contact' }
  ];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem 5%',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: '#f6f3eb',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
      boxSizing: 'border-box'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <img src={newLogo} alt="Emjay Brewery" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--text-main)', margin: 0, letterSpacing: '0.05em' }}>EMJAY</h2>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-main)', margin: 0, letterSpacing: '0.15em', fontWeight: 600 }}>BREWERY</p>
          </div>
        </div>
      </Link>

      {/* Desktop Links */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="nav-links">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to} style={{
            textDecoration: 'none',
            color: 'var(--text-main)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'color 0.2s',
          }}
          onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.target.style.color = 'var(--text-main)'}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop CTA Button */}
      <div className="nav-cta">
        <Link to="/contact" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', textDecoration: 'none' }}>
          SCHEDULE A TASTING &rarr;
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="mobile-menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'none', color: 'var(--text-main)' }}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`} style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        backgroundColor: '#f6f3eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0',
        maxHeight: isOpen ? '500px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out',
        boxShadow: isOpen ? '0 10px 20px rgba(0,0,0,0.05)' : 'none'
      }}>
        {navLinks.map((link) => (
          <Link 
            key={link.label} 
            to={link.to} 
            onClick={toggleMenu}
            style={{
              textDecoration: 'none',
              color: 'var(--text-main)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              padding: '1rem 0',
              width: '100%',
              textAlign: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            {link.label}
          </Link>
        ))}
        <div style={{ padding: '1.5rem 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Link to="/contact" onClick={toggleMenu} className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.85rem', textDecoration: 'none' }}>
            SCHEDULE A TASTING &rarr;
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav-links {
            display: none !important;
          }
          .nav-cta {
            display: none !important;
          }
          .mobile-menu-icon {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar
