import React, { useState, useEffect } from 'react'
import desktopBg from '../assets/mockups/perfect_clean_showcase.png';
import mobileBg from '../assets/Mobile-View/mobile_why_kombucha_bg.png';
import mobileBgFull from '../assets/Mobile-View/why_kombucha_mobile_full.png';
import tabletBg from '../assets/TAB/tablet_why_kombucha_bg.png';

const WhyKombucha = () => {
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
      <section id="why-kombucha" style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden', backgroundColor: '#f6f3eb' }}>
        <img src={mobileBgFull} alt="Why Kombucha" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-18%' }} />
      </section>
    );
  }

  // Desktop layout remains fully CSS-driven
  if (!isTablet) {
    return (
      <section id="why-kombucha" style={{
        position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '4rem 5% 4rem 5%', backgroundColor: '#f6f3eb', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${desktopBg})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '30px', height: '1px', backgroundColor: '#5c6b47' }} />
              <span style={{ color: '#5c6b47', letterSpacing: '0.15em', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700 }}>
                A BETTER WAY TO REFRESH
              </span>
              <div style={{ width: '30px', height: '1px', backgroundColor: '#5c6b47' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#3a2b25', marginBottom: '1rem', fontFamily: 'Cormorant Garamond', fontWeight: 700, lineHeight: 1.1 }}>
              Choose What's Real.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4a3f39', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 600 }}>
              Swap the sugar rush for a naturally fermented refreshment<br className="hide-mobile" />
              that's crafted with real ingredients and time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', width: '100%', alignItems: 'stretch', marginBottom: '4rem' }}>
            <div style={{ padding: '1.8rem 2.7rem', display: 'flex', flexDirection: 'column', position: 'relative', left: '-50px', top: '-25px' }}>
              <h3 style={{ color: '#8a4b38', fontSize: '2.1rem', fontFamily: 'Cormorant Garamond', fontWeight: 700, marginBottom: '2.3rem', lineHeight: 1.2 }}>Traditional<br />Carbonated Drinks</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                {[ { icon: '🧊', title: 'High in Sugar', desc: 'Causes energy crash' }, { icon: '🧪', title: 'Artificial Flavors', desc: 'Made, not real' }, { icon: '💧', title: 'Preservatives', desc: 'Added for shelf life' }, { icon: '⚡', title: 'Empty Calories', desc: 'No real nutrition' } ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1.1rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(138, 75, 56, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a4b38', flexShrink: 0, fontSize: '0.95rem' }}>{item.icon}</div>
                    <div><h5 style={{ margin: 0, color: '#8a4b38', fontSize: '0.95rem', fontWeight: 800 }}>{item.title}</h5><p style={{ margin: 0, color: '#6d5a55', fontSize: '0.8rem', fontWeight: 600 }}>{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '4rem' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#445c3c', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, border: '3px solid #f6f3eb', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', zIndex: 2 }}>VS</div>
            </div>
            <div style={{ padding: '1.8rem 2.7rem', display: 'flex', flexDirection: 'column', position: 'relative', left: '-30px', top: '-20px' }}>
              <h3 style={{ color: '#445c3c', fontSize: '2.1rem', fontFamily: 'Cormorant Garamond', fontWeight: 700, marginBottom: '2.3rem', lineHeight: 1.2 }}>Emjay<br />Kombucha</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
                {[ { icon: '🍃', title: 'Naturally Fermented', desc: 'Goodness from live cultures' }, { icon: '🌿', title: 'Real Ingredients', desc: 'Tea, fruits, herbs & love' }, { icon: '🧬', title: 'Better For You', desc: 'Supports gut & overall wellness' }, { icon: '💧', title: 'Low In Sugar', desc: 'Light, clean & refreshing' } ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1.1rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(68, 92, 60, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#445c3c', flexShrink: 0, fontSize: '0.95rem' }}>{item.icon}</div>
                    <div><h5 style={{ margin: 0, color: '#445c3c', fontSize: '0.95rem', fontWeight: 800 }}>{item.title}</h5><p style={{ margin: 0, color: '#5f695b', fontSize: '0.8rem', fontWeight: 600 }}>{item.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', maxWidth: '800px', width: '100%', padding: '2rem', position: 'relative', left: '-20px', top: '50px' }}>
            <div style={{ fontSize: '1.9rem', color: '#445c3c' }}>🍃</div>
            <div>
              <p style={{ margin: 0, color: '#3a2b25', fontSize: '1.05rem', fontWeight: 600 }}>Real ingredients. Real fermentation. Real refreshment.</p>
              <p style={{ margin: 0, color: '#445c3c', fontSize: '1.05rem', fontWeight: 800 }}>That's the Emjay way.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Mobile & Tablet styles mapped to precise % coordinates of the provided images
  const s = isMobile ? {
    // Moved text UP to the left-side blank spaces indicated by the user's circles
    colaBox: { top: '9%', left: '5%', width: '45%', height: '26%' },
    kombuchaBox: { top: '40.5%', left: '5%', width: '45%', height: '26%' },
    vsBadge: { top: '37.5%', left: '50%', transform: 'translate(-50%, -50%)', width: '8vw', height: '8vw', fontSize: '3vw' },
    banner: { top: '74%', left: '10%', width: '80%', height: '20%', flexDirection: 'column', gap: '2vw' },
    h3: { fontSize: '4.2vw', marginBottom: '2vw', textAlign: 'left' },
    h5: { fontSize: '2.6vw' },
    p: { fontSize: '2vw' },
    iconWrap: { width: '5.5vw', height: '5.5vw' },
    icon: { fontSize: '2.5vw' },
    itemGap: { gap: '1.5vw' },
    listGap: { display: 'flex', flexDirection: 'column', gap: '1.5vw' },
    bannerText1: { fontSize: '3.2vw' },
    bannerText2: { fontSize: '4vw' }
  } : { // Tablet
    // Placed text in the left-side blank spaces of the side-by-side boxes
    colaBox: { top: '25%', left: '6%', width: '20%', height: '50%' },
    kombuchaBox: { top: '25%', left: '52%', width: '20%', height: '50%' },
    vsBadge: { top: '49.5%', left: '50%', transform: 'translate(-50%, -50%)', width: '4vw', height: '4vw', fontSize: '1.5vw' },
    banner: { top: '83%', left: '10%', width: '80%', height: '12%', flexDirection: 'row', gap: '1.5vw' },
    h3: { fontSize: '2.2vw', marginBottom: '1.5vw', textAlign: 'left' },
    h5: { fontSize: '1.3vw' },
    p: { fontSize: '1vw' },
    iconWrap: { width: '2.5vw', height: '2.5vw' },
    icon: { fontSize: '1.2vw' },
    itemGap: { gap: '1vw' },
    listGap: { display: 'flex', flexDirection: 'column', gap: '1vw' },
    bannerText1: { fontSize: '1.5vw' },
    bannerText2: { fontSize: '1.8vw' }
  };

  return (
    <section id="why-kombucha" style={{ backgroundColor: '#f6f3eb', width: '100%', overflow: 'hidden' }}>
      
      {/* HEADER SECTION */}
      <div style={{ textAlign: 'center', padding: isMobile ? '3rem 5% 1rem 5%' : '4rem 5% 1rem 5%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '30px', height: '1px', backgroundColor: '#5c6b47' }} />
          <span style={{ color: '#5c6b47', letterSpacing: '0.15em', fontSize: '0.85rem', textTransform: 'uppercase', fontWeight: 700 }}>
            A BETTER WAY TO REFRESH
          </span>
          <div style={{ width: '30px', height: '1px', backgroundColor: '#5c6b47' }} />
        </div>
        
        <h2 style={{ fontSize: isMobile ? '2.5rem' : 'clamp(3rem, 5vw, 4.5rem)', color: '#3a2b25', marginBottom: '1rem', fontFamily: 'Cormorant Garamond', fontWeight: 700, lineHeight: 1.1 }}>
          Choose What's Real.
        </h2>
        
        <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: '#4a3f39', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6, fontWeight: 700 }}>
          Swap the sugar rush for a naturally fermented refreshment<br />
          that's crafted with real ingredients and time.
        </p>
      </div>

      {/* FLUID IMAGE OVERLAY SECTION */}
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={isMobile ? mobileBg : tabletBg} alt="Why Kombucha comparison" style={{ width: '100%', height: 'auto', display: 'block' }} />

        {/* Traditional Drinks - Positioned in the left blank space */}
        <div style={{ 
          position: 'absolute', ...s.colaBox,
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <h3 style={{ color: '#8a4b38', fontFamily: 'Cormorant Garamond', fontWeight: 800, lineHeight: 1.1, ...s.h3 }}>
            Traditional Carbonated Drinks
          </h3>
          <div style={{ ...s.listGap }}>
            {[
              { icon: '🧊', title: 'High in Sugar', desc: 'Causes energy crash' },
              { icon: '🧪', title: 'Artificial Flavors', desc: 'Made, not real' },
              { icon: '💧', title: 'Preservatives', desc: 'Added shelf life' },
              { icon: '⚡', title: 'Empty Calories', desc: 'No real nutrition' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', ...s.itemGap }}>
                <div style={{ ...s.iconWrap, borderRadius: '50%', border: '1px solid rgba(138, 75, 56, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8a4b38', flexShrink: 0, ...s.icon, backgroundColor: 'rgba(255,255,255,0.8)' }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <h5 style={{ margin: 0, color: '#8a4b38', fontWeight: 800, ...s.h5 }}>{item.title}</h5>
                  <p style={{ margin: 0, color: '#5f4c47', fontWeight: 700, ...s.p }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emjay Kombucha - Positioned BELOW the Kombucha Bottle */}
        <div style={{ 
          position: 'absolute', ...s.kombuchaBox,
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <h3 style={{ color: '#445c3c', fontFamily: 'Cormorant Garamond', fontWeight: 800, lineHeight: 1.1, ...s.h3 }}>
            Emjay Kombucha
          </h3>
          <div style={{ ...s.listGap }}>
            {[
              { icon: '🍃', title: 'Naturally Fermented', desc: 'From live cultures' },
              { icon: '🌿', title: 'Real Ingredients', desc: 'Tea, fruits & love' },
              { icon: '🧬', title: 'Better For You', desc: 'Supports gut health' },
              { icon: '💧', title: 'Low In Sugar', desc: 'Light & refreshing' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', ...s.itemGap }}>
                <div style={{ ...s.iconWrap, borderRadius: '50%', border: '1px solid rgba(68, 92, 60, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#445c3c', flexShrink: 0, ...s.icon, backgroundColor: 'rgba(255,255,255,0.8)' }}>
                  {item.icon}
                </div>
                <div style={{ textAlign: 'left', flex: 1 }}>
                  <h5 style={{ margin: 0, color: '#445c3c', fontWeight: 800, ...s.h5 }}>{item.title}</h5>
                  <p style={{ margin: 0, color: '#445c3c', fontWeight: 700, ...s.p }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VS Badge */}
        <div style={{
          justifyContent: 'center',
          gap: isMobile ? '1.2rem' : '1.5rem',
          maxWidth: '800px',
          width: '100%',
          padding: isMobile ? '1.5rem' : '2rem',
          position: 'relative',
          left: isMobile ? '0' : (isTablet ? '0' : '-20px'),
          top: isMobile ? '0' : (isTablet ? '0' : '50px'),
          backgroundColor: isMobile || isTablet ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
          backdropFilter: isMobile || isTablet ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isMobile || isTablet ? 'blur(16px)' : 'none',
          border: isMobile || isTablet ? '1px solid rgba(255, 255, 255, 0.6)' : 'none',
          borderRadius: isMobile || isTablet ? '100px' : '0',
          flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          <div style={{ fontSize: isMobile ? '2.5rem' : '1.9rem', color: '#445c3c' }}>🍃</div>
          <div>
            <p style={{ margin: 0, color: '#3a2b25', fontSize: isMobile ? '1.1rem' : '1.05rem', fontWeight: 600 }}>
              Real ingredients. Real fermentation. Real refreshment.
            </p>
            <p style={{ margin: 0, color: '#445c3c', fontSize: isMobile ? '1.2rem' : '1.05rem', fontWeight: 800 }}>
              That's the Emjay way.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WhyKombucha
