import React, { useState, useEffect } from 'react'
import desktopBg from '../assets/mockups/perfect_clean_hero.png';
import mobileBg from '../assets/Mobile-View/home_hero_mobile_full.png';
import tabletBg from '../assets/TAB/tablet_hero_bg.png';

const Hero = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        // Phones
        setDeviceType('mobile');
      } else if (width <= 1024) {
        // Tablets (including 768px iPad)
        setDeviceType('tablet');
      } else {
        // Desktop
        setDeviceType('desktop');
      }
    };
    checkDevice(); // Check immediately
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  return (isMobile || isTablet) ? (
    <section id="home" style={{ width: '100%', lineHeight: 0, padding: 0, paddingTop: '80px', marginBottom: '1rem' }}>
      <img src={mobileBg} alt="Home Hero Mobile" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '0' }} />
    </section>
  ) : (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      /* Add massive paddingBottom on mobile to reserve space for the bottles in the background */
      /* For tablet, just use standard padding and rely on left-alignment */
      padding: isTablet ? '100px 5% 0 5%' : '80px 5% 0 5%',
      overflow: 'hidden'
    }}>
      {/* Background Image */}
      <div className="hero-bg" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${isMobile ? mobileBg : (isTablet ? tabletBg : desktopBg)})`,
        backgroundSize: 'cover',
        backgroundPosition: isMobile ? 'center bottom' : (isTablet ? 'right center' : 'right center'),
        zIndex: 0,
      }} />

      {/* Clean Text Overlay */}
      <div className="hero-content" style={{ 
        position: 'relative', 
        zIndex: 1, 
        /* Provide enough paddingTop so it clears the fixed Navbar */
        paddingTop: isMobile ? '20px' : (isTablet ? '40px' : '40px'), 
        maxWidth: isTablet ? '350px' : '600px', // Restrict width on tablet so it doesn't overlap the center bottles
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: isMobile ? '0.8rem' : '1.5rem' }}>
          <h4 style={{ margin: 0, color: 'var(--accent-green)', letterSpacing: '0.15em', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700 }}>
            CRAFTED IN UDAIPUR
          </h4>
          <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--accent-green)' }} />
        </div>
        
        <h1 style={{ 
          fontSize: isMobile ? 'clamp(2.5rem, 11vw, 4.5rem)' : (isTablet ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(3rem, 6vw, 4.5rem)'), 
          color: 'var(--text-main)', 
          marginBottom: isMobile ? '0.8rem' : '1.5rem',
          lineHeight: 1.05
        }}>
          Ancient<br />Fermentation.<br />Modern<br />Refreshment.
        </h1>
        
        <p style={{ 
          fontSize: isMobile ? '0.9rem' : (isTablet ? '0.95rem' : '1.1rem'), 
          color: 'var(--text-muted)', 
          marginBottom: isMobile ? '1.2rem' : (isTablet ? '1.5rem' : '2.5rem'), 
          maxWidth: '450px',
          fontWeight: 500,
          lineHeight: 1.4
        }}>
          Small-batch kombucha brewed with real ingredients, natural fermentation and bold flavors.
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: isMobile ? '1.2rem' : '3rem' }}>
          <a href="#our-kombucha" className="btn-primary" style={{ width: isMobile || isTablet ? '100%' : 'auto', padding: isMobile || isTablet ? '0.7rem' : '0.8rem 1.8rem' }}>
            EXPLORE FLAVOURS &rarr;
          </a>
          <a href="#where-to-find-emjay" className="btn-outline" style={{ width: isMobile || isTablet ? '100%' : 'auto', padding: isMobile || isTablet ? '0.7rem' : '0.8rem 1.8rem' }}>
            FIND EMJAY NEAR YOU &rarr;
          </a>
        </div>

        {/* Icons Row */}
        <div className="hero-icons-row" style={{ 
          display: 'flex', 
          gap: isMobile ? '0.8rem' : (isTablet ? '1rem' : '2rem'), 
          alignItems: isMobile || isTablet ? 'flex-start' : 'center',
          flexDirection: isTablet ? 'column' : 'row', // Stack vertically on tablet because horizontal width is restricted to 350px
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: isMobile ? '30px' : '40px', height: isMobile ? '30px' : '40px', borderRadius: '50%', border: '1px solid var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '0.8rem' : '1rem' }}>
              🍃
            </div>
            <span style={{ fontSize: isMobile ? '0.6rem' : '0.75rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>NATURALLY<br />FERMENTED</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: isMobile ? '30px' : '40px', height: isMobile ? '30px' : '40px', borderRadius: '50%', border: '1px solid var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '0.8rem' : '1rem' }}>
              🌿
            </div>
            <span style={{ fontSize: isMobile ? '0.6rem' : '0.75rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>REAL<br />INGREDIENTS</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <div style={{ width: isMobile ? '30px' : '40px', height: isMobile ? '30px' : '40px', borderRadius: '50%', border: '1px solid var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '0.8rem' : '1rem' }}>
              🔬
            </div>
            <span style={{ fontSize: isMobile ? '0.6rem' : '0.75rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.2 }}>NO ARTIFICIAL<br />ANYTHING</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
