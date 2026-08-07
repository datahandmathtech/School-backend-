import React, { useState, useEffect } from 'react'
import imgAsset0 from '../assets/mockups/section4_clean_bg.png';
import mobileBgFull from '../assets/Mobile-View/process_mobile_full.png';

const WhereToFind = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setDeviceType('mobile');
      } else if (width <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  if (isMobile) {
    return (
      <section id="good-things" style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f6f3eb' }}>
        <img src={mobileBgFull} alt="Process Mobile" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-12%' }} />
      </section>
    );
  }

  return (
    <section id="good-things" style={{
      position: 'relative',
      width: '100%',
      // Don't force aspect ratio on mobile so it can grow with content
      aspectRatio: isMobile ? 'auto' : '1920 / 1080',
      backgroundColor: '#f6f3eb',
      overflow: 'hidden',
      minHeight: '600px',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: isMobile || isTablet ? 'column' : 'row'
    }}>
      {/* Background Image */}
      <div style={{
        position: isMobile || isTablet ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile || isTablet ? '40vh' : '100%',
        minHeight: isMobile || isTablet ? '300px' : 'auto',
        backgroundImage: `url(${imgAsset0})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Content Overlay */}
      <div style={{
        position: isMobile || isTablet ? 'relative' : 'absolute',
        top: isMobile || isTablet ? 'auto' : '10%',
        left: isMobile || isTablet ? 'auto' : '52%',
        width: isMobile || isTablet ? '100%' : '43%',
        padding: isMobile ? '3rem 5%' : (isTablet ? '4rem 10%' : '0'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile || isTablet ? 'center' : 'flex-start',
        textAlign: isMobile || isTablet ? 'center' : 'left',
        zIndex: 1,
        backgroundColor: isMobile || isTablet ? '#f6f3eb' : 'transparent' // solid bg for stacked view
      }}>
        
        {/* Main Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile || isTablet ? 'center' : 'flex-start'
        }}>
          {/* Small Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: isMobile || isTablet ? 'center' : 'flex-start', marginBottom: isMobile ? '2rem' : '1.5vw' }}>
            <span style={{ color: '#3d4e38', letterSpacing: '0.15em', fontSize: isMobile ? '0.8rem' : 'clamp(0.6rem, 0.9vw, 1rem)', fontWeight: 700, textTransform: 'uppercase' }}>
              BREWED WITH TIME
            </span>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '10px' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#3d4e38', margin: '0 5px' }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
            </div>
          </div>

          {/* Big Heading */}
          <h2 style={{ 
            fontSize: isMobile ? '3rem' : (isTablet ? '4rem' : 'clamp(2.5rem, 5vw, 6rem)'), 
            color: '#3a2b25', 
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: isMobile ? '1.5rem' : '1.5vw',
            textAlign: isMobile || isTablet ? 'center' : 'left'
          }}>
            Good Things<br />Take Time.
          </h2>

          {/* Paragraph */}
          <p style={{ 
            fontSize: isMobile ? '1rem' : (isTablet ? '1.2rem' : 'clamp(0.8rem, 1.1vw, 1.3rem)'), 
            color: '#3a2b25', 
            lineHeight: 1.6,
            marginBottom: isMobile ? '3rem' : '3vw',
            maxWidth: isMobile || isTablet ? '100%' : '90%'
          }}>
            Every bottle of Emjay Kombucha is brewed in small batches<br className="hide-on-mobile" />
            using traditional fermentation and natural ingredients.<br className="hide-on-mobile" />
            No shortcuts. Just time, care and patience.
          </p>

          {/* Icons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
            gap: isMobile ? '2.5rem' : '1vw',
            width: '100%',
            position: 'relative'
          }}>
            {/* Vertical Separator Lines - only show on desktop */}
            {!isMobile && !isTablet && (
              <>
                <div style={{ position: 'absolute', left: '25%', top: '10%', bottom: '10%', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <div style={{ position: 'absolute', left: '50%', top: '10%', bottom: '10%', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
                <div style={{ position: 'absolute', left: '75%', top: '10%', bottom: '10%', width: '1px', backgroundColor: 'rgba(0,0,0,0.1)' }} />
              </>
            )}
            
            {[
              { icon: '🌿', title: 'NATURAL\nINGREDIENTS', desc: 'We use real tea,\norganic fruits, herbs\nand natural sugars.' },
              { icon: '🏺', title: 'TRADITIONAL\nFERMENTATION', desc: 'Brewed slowly with\nSCOBY cultures for\nbetter taste and gut\ngoodness.' },
              { icon: '📅', title: 'TIME &\nPATIENCE', desc: 'Fermented for weeks,\nnot minutes. Because\ngreat things\ntake time.' },
              { icon: '🍾', title: 'SMALL BATCH\nCRAFTED', desc: 'Crafted in small\nbatches to ensure\nquality in every sip.' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: isMobile || isTablet ? '0 1rem' : '0 0.5vw' }}>
                {/* Icon Circle */}
                <div style={{ 
                  width: isMobile ? '60px' : (isTablet ? '50px' : '3.5vw'), 
                  height: isMobile ? '60px' : (isTablet ? '50px' : '3.5vw'), 
                  borderRadius: '50%', 
                  border: '1px solid #3d4e38', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: isMobile ? '1.5rem' : (isTablet ? '1.5rem' : 'clamp(1rem, 1.5vw, 2rem)'),
                  marginBottom: isMobile || isTablet ? '1rem' : '1vw',
                  color: '#3d4e38'
                }}>
                  {item.icon}
                </div>
                {/* Title */}
                <h4 style={{ 
                  fontSize: isMobile ? '1rem' : (isTablet ? '1.1rem' : 'clamp(0.6rem, 0.75vw, 0.9rem)'), 
                  fontWeight: 700, 
                  color: '#3d4e38', 
                  letterSpacing: '0.05em',
                  marginBottom: isMobile || isTablet ? '0.5rem' : '0.8vw',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.4
                }}>
                  {item.title}
                </h4>
                {/* Desc */}
                <p style={{ 
                  fontSize: isMobile ? '0.9rem' : (isTablet ? '1rem' : 'clamp(0.5rem, 0.7vw, 0.8rem)'), 
                  color: '#4a3f39', 
                  whiteSpace: 'pre-line',
                  lineHeight: 1.5
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .hide-on-mobile {
          display: block;
        }
        @media (max-width: 600px) {
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default WhereToFind
