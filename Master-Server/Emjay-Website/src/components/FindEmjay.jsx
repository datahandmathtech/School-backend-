import React, { useState, useEffect } from 'react'
import imgAsset0 from '../assets/mockups/section6_clean_bg.png';
import mobileBgFull from '../assets/Mobile-View/find_emjay_mobile_full.png';

const FindEmjay = () => {
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
      <section id="find-emjay-near-you" style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f6f3eb' }}>
        <img src={mobileBgFull} alt="Find Emjay Near You" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-12%' }} />
      </section>
    );
  }

  return (
    <section id="find-emjay-near-you" style={{
      position: 'relative',
      width: '100%',
      // Aspect ratio for the background image (16:9)
      aspectRatio: isMobile || isTablet ? 'auto' : '16/9',
      backgroundColor: '#f6f3eb',
      overflow: 'hidden',
      minHeight: isMobile || isTablet ? 'auto' : '600px',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Image - stays at top or absolute behind */}
      <div style={{
        position: isMobile || isTablet ? 'relative' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile || isTablet ? '35vh' : '100%',
        minHeight: isMobile || isTablet ? '250px' : 'auto',
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
        
        {/* --- Top Header Text --- */}
        <div style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '12%',
          left: isMobile || isTablet ? 'auto' : '50%',
          transform: isMobile || isTablet ? 'none' : 'translateX(-50%)',
          width: isMobile || isTablet ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: isMobile || isTablet ? '3rem' : '0'
        }}>
          {/* Small Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: isMobile || isTablet ? '2rem' : '1.2vw' }}>
            <span style={{ color: '#577247', letterSpacing: '0.15em', fontSize: isMobile ? '0.8rem' : 'clamp(0.6rem, 0.9vw, 1.2rem)', fontWeight: 700, textTransform: 'uppercase' }}>
              AVAILABLE ACROSS
            </span>
            <div style={{ display: 'flex', alignItems: 'center', width: '200px', marginTop: '10px' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
            </div>
          </div>

          {/* Big Heading */}
          <h2 style={{ 
            fontSize: isMobile ? '3rem' : (isTablet ? '4rem' : 'clamp(2rem, 4vw, 5rem)'), 
            color: '#3a2b25', 
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: isMobile || isTablet ? '1.5rem' : '1vw'
          }}>
            Find Emjay Near You.
          </h2>

          {/* Paragraph */}
          <p style={{ 
            fontSize: isMobile ? '1rem' : (isTablet ? '1.2rem' : 'clamp(0.8rem, 1.1vw, 1.5rem)'), 
            color: '#3a2b25', 
            lineHeight: 1.5,
            fontWeight: 500,
            margin: 0
          }}>
            Our kombucha is available across spaces that value<br className="hide-on-mobile" />quality, wellness and great taste.
          </p>
        </div>

        {/* --- 6 Vertical Cards Text --- */}
        <div style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '48%',
          left: isMobile || isTablet ? 'auto' : '0',
          width: '100%',
          display: isMobile || isTablet ? 'grid' : 'block',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile || isTablet ? '2rem' : '0',
          marginBottom: isMobile || isTablet ? '3rem' : '0'
        }}>
          {[
            { id: 1, title: 'Cafés', desc: 'Your favorite cafés serving real conversations and real refreshment.', left: '12%' },
            { id: 2, title: 'Restaurants', desc: 'Elevating dining experiences with a better choice.', left: '27.2%' },
            { id: 3, title: 'Hotels', desc: 'Thoughtful stays with mindful refreshment.', left: '42.4%' },
            { id: 4, title: 'Sports Clubs', desc: 'Fuel for an active lifestyle and better performance.', left: '57.6%' },
            { id: 5, title: 'Corporate Offices', desc: 'Wellness that fits perfectly into your work culture.', left: '72.8%' },
            { id: 6, title: 'Retail Stores', desc: 'Grab your favorite flavour from a store near you.', left: '88%' },
          ].map((item) => (
            <div key={item.id} style={{
              position: isMobile || isTablet ? 'relative' : 'absolute',
              top: isMobile || isTablet ? 'auto' : '0',
              left: isMobile || isTablet ? 'auto' : item.left,
              transform: isMobile || isTablet ? 'none' : 'translateX(-50%)',
              width: isMobile || isTablet ? '100%' : '14%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: isMobile || isTablet ? '#fff' : 'transparent',
              padding: isMobile || isTablet ? '2rem 1.5rem' : '0',
              borderRadius: isMobile || isTablet ? '8px' : '0',
              boxShadow: isMobile || isTablet ? '0 4px 6px rgba(0,0,0,0.05)' : 'none'
            }}>
              <h4 style={{
                color: '#3a2b25',
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? '1.8rem' : (isTablet ? '2rem' : 'clamp(0.8rem, 1.3vw, 1.7rem)'),
                fontWeight: 700,
                whiteSpace: isMobile || isTablet ? 'normal' : 'nowrap',
                marginBottom: isMobile || isTablet ? '1rem' : '1.5vw' // Increased spacing on desktop
              }}>
                {item.title}
              </h4>
              <p style={{
                color: '#3a2b25',
                fontSize: isMobile ? '1rem' : (isTablet ? '1.1rem' : 'clamp(0.55rem, 0.75vw, 1rem)'),
                lineHeight: 1.45,
                fontWeight: 500,
                margin: 0,
                width: isMobile || isTablet ? '100%' : '80%' // constrained slightly on desktop
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- Bottom Banner Text --- */}
        <div style={{
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '89.5%',
          left: isMobile || isTablet ? 'auto' : '0',
          width: '100%',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: isMobile || isTablet ? 'center' : 'flex-start',
          alignItems: isMobile || isTablet ? 'center' : 'flex-start',
          gap: isMobile ? '2rem' : (isTablet ? '3rem' : '0'),
          textAlign: isMobile || isTablet ? 'center' : 'left'
        }}>
          
          {/* Left Block */}
          <div style={{
            position: isMobile || isTablet ? 'relative' : 'absolute',
            left: isMobile || isTablet ? 'auto' : '12%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile || isTablet ? 'center' : 'flex-start'
          }}>
            <h3 style={{ margin: 0, color: '#3a2b25', fontSize: isMobile ? '1.5rem' : (isTablet ? '1.8rem' : 'clamp(0.9rem, 1.3vw, 1.8rem)'), fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
              Can't find us near you?
            </h3>
            <p style={{ margin: isMobile || isTablet ? '0.5rem 0 0 0' : '0.2vw 0 0 0', color: '#3a2b25', fontSize: isMobile ? '1rem' : (isTablet ? '1.1rem' : 'clamp(0.6rem, 0.8vw, 1.1rem)'), fontWeight: 500 }}>
              We're growing every day. Stay tuned!
            </p>
          </div>

          {/* Center Block */}
          <div style={{
            position: isMobile || isTablet ? 'relative' : 'absolute',
            left: isMobile || isTablet ? 'auto' : '42%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile || isTablet ? 'center' : 'flex-start'
          }}>
            <p style={{ margin: isMobile || isTablet ? '0 0 0.5rem 0' : '0 0 0.4vw 0', color: '#3a2b25', fontSize: isMobile ? '1.1rem' : (isTablet ? '1.2rem' : 'clamp(0.8rem, 1.1vw, 1.4rem)'), fontWeight: 500 }}>
              Explore locations & stockists
            </p>
            <a href="#" style={{ 
              color: '#577247', 
              fontSize: isMobile ? '0.9rem' : (isTablet ? '1rem' : 'clamp(0.6rem, 0.8vw, 1.1rem)'), 
              fontWeight: 700, 
              textDecoration: 'none',
              letterSpacing: '0.05em'
            }}>
              VIEW ALL LOCATIONS &nbsp; &rarr;
            </a>
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

export default FindEmjay
