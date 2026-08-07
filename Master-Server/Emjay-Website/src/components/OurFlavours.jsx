import React, { useState, useEffect } from 'react'
import imgAsset0 from '../assets/mockups/perfect_clean_flavours.png';
import mobileBgFull from '../assets/Mobile-View/our_flavours_mobile_full.png';

const OurFlavours = () => {
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
      <section id="our-flavours" style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f6f3eb' }}>
        <img src={mobileBgFull} alt="Our Flavours" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-12%' }} />
      </section>
    );
  }

  const cards = [
    {
      title: 'ORIGINAL', sub: 'CLASSIC & CLEAN', text: 'Pure, smooth and timeless. The perfect everyday kombucha.',
      color: '#8a4b38', subColor: '#8a4b38', textColor: '#5c4e48', bgColor: '#f0e6d6',
      icons: [{i: '🍃', t: 'Green Tea'}, {i: '🧊', t: 'Cane Sugar'}, {i: '🦠', t: 'SCOBY Culture'}]
    }, {
      title: 'POMEGRANATE', sub: 'TANGY & REFRESHING', text: 'Juicy pomegranate with a crisp, vibrant finish.',
      color: '#8a2b25', subColor: '#8a2b25', textColor: '#5c3e38', bgColor: '#f6d6cf',
      icons: [{i: '🍃', t: 'Green Tea'}, {i: '🔴', t: 'Pomegranate'}, {i: '🧊', t: 'Cane Sugar'}]
    }, {
      title: 'KOKUM', sub: 'BOLD & TART', text: "A tangy, tropical twist inspired by India's coastal heritage.",
      color: '#fff', subColor: '#ddd', textColor: '#eee', bgColor: '#633045',
      icons: [{i: '🍃', t: 'Black Tea'}, {i: '🫐', t: 'Kokum'}, {i: '🧊', t: 'Cane Sugar'}]
    }, {
      title: 'LEMONGRASS MINT', sub: 'FRESH & UPLIFTING', text: 'Zesty lemongrass meets cool mint for a refreshing balance.',
      color: '#2d5c32', subColor: '#2d5c32', textColor: '#3d4e38', bgColor: '#dcedc8',
      icons: [{i: '🍃', t: 'Green Tea'}, {i: '🌿', t: 'Lemongrass'}, {i: '🌱', t: 'Mint Leaves'}]
    }, {
      title: 'PINEAPPLE ROSEMARY', sub: 'TROPICAL & HERBAL', text: 'Sweet pineapple infused with aromatic rosemary.',
      color: '#7a5a28', subColor: '#7a5a28', textColor: '#5a4a38', bgColor: '#ffecb3',
      icons: [{i: '🍃', t: 'Green Tea'}, {i: '🍍', t: 'Pineapple'}, {i: '🌿', t: 'Rosemary'}]
    }
  ];

  return (
    <section id="our-flavours" style={{
      position: 'relative',
      width: '100%',
      // Use aspect ratio on desktop, auto height on mobile/tablet
      aspectRatio: isMobile || isTablet ? 'auto' : '16/9',
      backgroundColor: '#f6f3eb',
      overflow: 'hidden',
      minHeight: isMobile || isTablet ? 'auto' : '600px',
      padding: isMobile || isTablet ? '4rem 1rem' : '0',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Background Image - NO CROPPING. Hidden on mobile/tablet */}
      <div style={{
        display: isMobile || isTablet ? 'none' : 'block',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${imgAsset0})`, 
        backgroundSize: '100% 100%', // Stretches to perfectly fit the aspect-ratio container
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
        zIndex: 1 
      }}>
        
        {/* Top Header */}
        <div style={{ 
          position: isMobile || isTablet ? 'relative' : 'absolute', 
          top: isMobile || isTablet ? 'auto' : '8%', 
          left: isMobile || isTablet ? 'auto' : '50%', 
          transform: isMobile || isTablet ? 'none' : 'translateX(-50%)',
          textAlign: 'center', 
          width: isMobile || isTablet ? '100%' : '80%',
          marginBottom: isMobile || isTablet ? '2rem' : '0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: isMobile || isTablet ? '1rem' : '1vw' }}>
            <div style={{ width: isMobile || isTablet ? '40px' : '3vw', height: '1px', backgroundColor: '#5c6b47' }} />
            <span style={{ color: '#5c6b47', letterSpacing: '0.2em', fontSize: isMobile ? '0.8rem' : 'clamp(0.6rem, 1vw, 0.9rem)', textTransform: 'uppercase', fontWeight: 600 }}>
              OUR FLAVOURS
            </span>
            <div style={{ width: isMobile || isTablet ? '40px' : '3vw', height: '1px', backgroundColor: '#5c6b47' }} />
          </div>
          
          <h2 style={{ fontSize: isMobile ? '2.5rem' : (isTablet ? '3rem' : 'clamp(2rem, 3.5vw, 4rem)'), color: '#3a2b25', marginBottom: isMobile || isTablet ? '1rem' : '1vw', fontFamily: 'Cormorant Garamond', fontWeight: 600 }}>
            Five Flavours. Endless Moments.
          </h2>
          
          <p style={{ fontSize: isMobile ? '1rem' : (isTablet ? '1.2rem' : 'clamp(0.9rem, 1.2vw, 1.2rem)'), color: '#4a3f39', maxWidth: '700px', margin: '0 auto' }}>
            Thoughtfully crafted kombucha for every mood, moment and occasion.
          </p>
        </div>

        {/* 5 Cards Container */}
        <div style={{ 
          position: isMobile || isTablet ? 'relative' : 'absolute',
          top: isMobile || isTablet ? 'auto' : '28%',
          left: isMobile || isTablet ? 'auto' : '3.5%', // Adjust based on visual margins of the image boxes
          width: isMobile || isTablet ? '100%' : '93%', // The total width of all 5 boxes
          height: isMobile || isTablet ? 'auto' : '56%', // Height of the colored boxes
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)'), 
          gap: isMobile || isTablet ? '2rem' : '1.5%', // Gap between the boxes
          alignItems: 'stretch'
        }}>
          
          {cards.map((card, index) => (
            <div key={index} style={{ 
              position: 'relative',
              padding: isMobile || isTablet ? '2rem' : '26% 5% 5% 10%', // Increased top padding to 26% on desktop to push text down further
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: isMobile || isTablet ? card.bgColor : 'transparent',
              borderRadius: isMobile || isTablet ? '12px' : '0'
            }}>
              {/* Text Container */}
              <div style={{ width: isMobile || isTablet ? '100%' : '55%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ color: card.color, fontSize: isMobile ? '1.5rem' : 'clamp(0.9rem, 1.2vw, 1.3rem)', fontWeight: 700, marginBottom: isMobile || isTablet ? '0.5rem' : '0.5vw', letterSpacing: '0.05em' }}>{card.title}</h3>
                <p style={{ color: card.subColor, fontSize: isMobile ? '0.8rem' : 'clamp(0.5rem, 0.7vw, 0.75rem)', fontWeight: 700, letterSpacing: '0.1em', marginBottom: isMobile || isTablet ? '1rem' : '1.5vw' }}>{card.sub}</p>
                <p style={{ color: card.textColor, fontSize: isMobile ? '1rem' : 'clamp(0.7rem, 0.9vw, 0.9rem)', marginBottom: isMobile || isTablet ? '1.5rem' : '2vw', lineHeight: 1.4 }}>
                  {card.text}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile || isTablet ? '0.5rem' : '0.8vw', marginBottom: 'auto' }}>
                  {card.icons.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: isMobile || isTablet ? '0.5rem' : '0.5vw', fontSize: isMobile ? '0.9rem' : 'clamp(0.6rem, 0.8vw, 0.8rem)', color: card.textColor, whiteSpace: 'nowrap' }}>
                      <span>{item.i}</span> {item.t}
                    </div>
                  ))}
                </div>
                
                {index === 0 && (
                  <button style={{ marginTop: isMobile || isTablet ? '1.5rem' : '2vw', padding: isMobile || isTablet ? '0.8rem 1.5rem' : '0.5vw 1vw', border: `1px solid ${card.color}`, background: 'transparent', color: card.color, fontSize: isMobile ? '0.9rem' : 'clamp(0.5rem, 0.7vw, 0.75rem)', fontWeight: 700, cursor: 'pointer', alignSelf: 'flex-start' }}>
                    LEARN MORE &rarr;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}

export default OurFlavours
