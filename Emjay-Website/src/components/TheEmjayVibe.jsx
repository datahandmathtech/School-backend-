import React, { useState, useEffect } from 'react'
import imgAsset0 from '../assets/mockups/section5_clean_bg.png';
import mobileBgFull from '../assets/Mobile-View/the_emjay_vibe_mobile_full.png';

const TheEmjayVibe = () => {
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
      <section id="the-emjay-vibe" style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f6f3eb' }}>
        <img src={mobileBgFull} alt="The Emjay Vibe" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-12%' }} />
      </section>
    );
  }

  return (
    <section id="the-emjay-vibe" style={{
      position: 'relative',
      width: '100%',
      // Aspect ratio for the background image (16:9) on desktop, auto on mobile/tablet
      aspectRatio: isMobile || isTablet ? 'auto' : '16/9',
      backgroundColor: '#f6f3eb',
      overflow: 'hidden',
      minHeight: isMobile || isTablet ? 'auto' : '600px',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Image - visible on all devices, but behaves differently */}
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
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile || isTablet ? 'auto' : '100%',
        padding: isMobile ? '3rem 5%' : (isTablet ? '4rem 10%' : '0'),
        zIndex: 1,
        backgroundColor: isMobile || isTablet ? '#f6f3eb' : 'transparent',
        display: isMobile || isTablet ? 'flex' : 'block',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Main Text Content */}
        <div style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '12%', 
          left: isMobile || isTablet ? 'auto' : '5%',
          width: isMobile || isTablet ? '100%' : '26%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile || isTablet ? 'center' : 'flex-start',
          textAlign: isMobile || isTablet ? 'center' : 'left',
          marginBottom: isMobile || isTablet ? '3rem' : '0'
        }}>
          {/* Small Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: isMobile || isTablet ? 'center' : 'flex-start', marginBottom: isMobile || isTablet ? '2rem' : '1vw' }}>
            <span style={{ color: '#577247', letterSpacing: '0.15em', fontSize: isMobile ? '0.8rem' : 'clamp(0.6rem, 0.9vw, 1rem)', fontWeight: 700, textTransform: 'uppercase' }}>
              THE EMJAY VIBE
            </span>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '10px' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
            </div>
          </div>

          {/* Big Heading */}
          <h2 style={{ 
            fontSize: isMobile ? '3rem' : (isTablet ? '4rem' : 'clamp(1.8rem, 3.4vw, 4.5rem)'), 
            color: '#3a2b25', 
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: isMobile || isTablet ? '1.5rem' : '1.2vw'
          }}>
            Made For<br />Every Important<br />Moment.
          </h2>

          {/* Paragraph */}
          <p style={{ 
            fontSize: isMobile ? '1rem' : (isTablet ? '1.2rem' : 'clamp(0.8rem, 1vw, 1.2rem)'), 
            color: '#3a2b25', 
            lineHeight: 1.5,
            marginBottom: isMobile || isTablet ? '2rem' : '1.5vw',
            fontWeight: 500
          }}>
            From slow mornings to late nights,<br className="hide-on-mobile" />
            good conversations to big wins.<br className="hide-on-mobile" />
            Emjay Kombucha belongs everywhere<br className="hide-on-mobile" />
            real moments happen.
          </p>

          {/* Cursive Signature */}
          <div style={{ 
            fontSize: isMobile ? '1.8rem' : (isTablet ? '2.2rem' : 'clamp(1.2rem, 1.6vw, 2.2rem)'), 
            color: '#577247',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 600
          }}>
            This is the vibe.
          </div>
        </div>

        {/* --- Photo Overlays Grid --- */}
        <div style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '0',
          left: isMobile || isTablet ? 'auto' : '0',
          width: '100%',
          height: isMobile || isTablet ? 'auto' : '100%',
          display: isMobile || isTablet ? 'grid' : 'block',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile || isTablet ? '2rem' : '0'
        }}>
          {[
            { id: 1, icon: '☕', title: 'Café Culture', desc: 'Conversations that flow.', top: '46%', left: '32.5%' },
            { id: 2, icon: '🏓', title: 'Sports & Movement', desc: 'Fuel for an active you.', top: '46%', left: '57%' },
            { id: 3, icon: '💻', title: 'Work & Creativity', desc: 'Clarity in every sip.', top: '46%', left: '79%' },
            { id: 4, icon: '🎵', title: 'Music & Good Times', desc: 'Great music, better moments.', top: '82%', left: '5%' },
            { id: 5, icon: '🍽️', title: 'Food & Flavours', desc: 'Pairs with every plate.', top: '82%', left: '39%' },
            { id: 6, icon: '📍', title: 'Travel & Exploration', desc: 'Take your vibe anywhere.', top: '82%', left: '69%' },
          ].map((item) => (
            <div key={item.id} style={{
              position: isMobile || isTablet ? 'relative' : 'absolute',
              top: isMobile || isTablet ? 'auto' : item.top,
              left: isMobile || isTablet ? 'auto' : item.left,
              display: 'flex',
              alignItems: 'center',
              gap: isMobile || isTablet ? '1rem' : '0.6vw',
              backgroundColor: isMobile || isTablet ? '#fff' : 'transparent',
              padding: isMobile || isTablet ? '1rem' : '0',
              borderRadius: isMobile || isTablet ? '8px' : '0',
              boxShadow: isMobile || isTablet ? '0 4px 6px rgba(0,0,0,0.05)' : 'none'
            }}>
              <div style={{ 
                width: isMobile || isTablet ? '50px' : '2.5vw', 
                height: isMobile || isTablet ? '50px' : '2.5vw', 
                borderRadius: '50%', 
                backgroundColor: isMobile || isTablet ? '#f6f3eb' : '#f6f3eb', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: isMobile || isTablet ? '1.5rem' : '1.2vw', 
                color: '#577247',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: isMobile || isTablet ? '#3a2b25' : '#f6f3eb', fontSize: isMobile || isTablet ? '1.1rem' : '0.9vw', fontWeight: 600 }}>{item.title}</span>
                <span style={{ color: isMobile || isTablet ? '#5c4e43' : 'rgba(246, 243, 235, 0.9)', fontSize: isMobile || isTablet ? '0.9rem' : '0.7vw' }}>{item.desc}</span>
              </div>
            </div>
          ))}
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

export default TheEmjayVibe
