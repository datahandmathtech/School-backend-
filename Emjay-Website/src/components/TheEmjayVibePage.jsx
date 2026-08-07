import React, { useState, useEffect } from 'react'
import bgImage from '../assets/mockups/daily_drink_clean.png';
import kdMobile from '../assets/Mobile-View/KD.png';
import aliveBgImage from '../assets/mockups/alive_by_nature_bg.png';
import aliveBgMobile from '../assets/Mobile-View/alive_by_nature_mobile_full.png';
import scienceBgImage from '../assets/mockups/science_behind_sip_bg.png';
import scienceBgMobile from '../assets/Mobile-View/science_behind_sip_mobile_full.png';
import whyBgImage from '../assets/mockups/why_people_switch_bg.png';
import whyBgMobile from '../assets/Mobile-View/why_people_switch_mobile_full.png';
import logoStamp from '../assets/logo_stamp.png';
import { 
  HandHeart, 
  FlaskConical, 
  Sprout, 
  Leaf, 
  WheatOff, 
  Landmark,
  Dna,
  Droplets,
  Beaker,
  Clock,
  Activity,
  ShieldCheck,
  Microscope,
  Globe,
  HeartHandshake,
  Wine,
  Archive,
  Heart,
  Grid2X2,
  Zap,
  GlassWater
} from 'lucide-react';

const P = ({ children, style }) => <p style={{ margin: 0, ...style }}>{children}</p>;

const TheEmjayVibePage = () => {
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

  return (
    <div style={{ backgroundColor: '#f5f2eb', fontFamily: "'Inter', sans-serif", width: '100%', minHeight: '100vh', paddingBottom: '0' }}>
      
      {/* Wrapper to push below navbar */}
      <div style={{ paddingTop: '80px', width: '100%', display: 'flex', flexDirection: 'column', gap: 0 }}>
        
        {/* =========================================================
            SECTION 1: YOUR DAILY DRINK, REIMAGINED
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={kdMobile} alt="Your Daily Drink Reimagined Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={bgImage} 
            alt="Emjay Kombucha vs Artificial Drinks" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* 1. Header Area */}
          <div style={{ 
            position: 'absolute', 
            top: '5%', 
            left: '0', 
            width: '100%', 
            textAlign: 'center',
            padding: '0 2rem'
          }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(4.5vw, 81px)',
              color: '#3a2b25',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: '0 0 min(1vw, 18px) 0',
              letterSpacing: '0.02em'
            }}>
              YOUR DAILY DRINK, REIMAGINED
            </h2>
            <p style={{
              fontSize: 'min(1.2vw, 21px)',
              color: '#3a2b25',
              margin: '0 auto',
              fontWeight: 500,
              lineHeight: 1.4
            }}>
              A refreshing alternative crafted through natural fermentation and real ingredients.
            </p>
          </div>

          {/* 2. Left Column: The Everyday Choice */}
          <div style={{ 
            position: 'absolute', 
            top: '25%', 
            left: '6%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start',
            gap: 'min(0.5vw, 9px)' 
          }}>
            <div>
              <h3 style={{
                color: '#631d1d',
                fontSize: 'min(1.1vw, 19px)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: '0 0 min(0.3vw, 5px) 0',
                fontWeight: 700
              }}>
                THE EVERYDAY CHOICE
              </h3>
              <div style={{ width: '100%', height: '1px', backgroundColor: '#631d1d', opacity: 0.6 }} />
            </div>
            
            <div style={{
              color: '#2a1f1a',
              fontSize: 'min(1vw, 18px)',
              fontWeight: 600,
              lineHeight: 1.6,
              marginTop: 'min(0.5vw, 9px)'
            }}>
              <P>High Sugar.</P>
              <P>Artificial Ingredients.</P>
              <P>Empty Refreshment.</P>
            </div>
          </div>

          {/* 3. Center: CHOOSE BETTER */}
          <div style={{ 
            position: 'absolute', 
            top: '38%', 
            left: '42%', 
            textAlign: 'center',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <img 
              src={logoStamp} 
              alt="" 
              style={{ 
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -80%)',
                width: 'min(20vw, 360px)',
                opacity: 0.05,
                zIndex: 0,
                pointerEvents: 'none'
              }} 
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'min(5vw, 90px)',
                color: '#3a2b25',
                lineHeight: 1,
                margin: '0 0 min(1vw, 18px) 0',
                fontWeight: 700,
                letterSpacing: '0.02em'
              }}>
                CHOOSE<br/>BETTER
              </h1>
              <p style={{
                color: '#2a1f1a',
                fontSize: 'min(1.1vw, 19px)',
                margin: 0,
                lineHeight: 1.5,
                fontWeight: 600
              }}>
                Trade artificial refreshment<br/>for naturally fermented<br/>wellness.
              </p>
            </div>
          </div>

          {/* 4. Right Column: The Better Ritual */}
          <div style={{ 
            position: 'absolute', 
            top: '22%', 
            right: '8%', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-end',
            textAlign: 'right',
            gap: 'min(0.5vw, 9px)' 
          }}>
            <div style={{ width: '100%', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <h3 style={{
                color: '#233618',
                fontSize: 'min(1.1vw, 19px)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                margin: '0 0 min(0.3vw, 5px) 0',
                fontWeight: 700
              }}>
                THE BETTER RITUAL
              </h3>
              <div style={{ width: 'min(10vw, 180px)', height: '1px', backgroundColor: '#233618', opacity: 0.6 }} />
            </div>
            
            <div style={{
              color: '#2a1f1a',
              fontSize: 'min(1vw, 18px)',
              fontWeight: 600,
              lineHeight: 1.6,
              marginTop: 'min(0.5vw, 9px)'
            }}>
              <P>Natural Fermentation.</P>
              <P>Live Cultures.</P>
              <P>Real Ingredients.</P>
              <P>Plant Based.</P>
              <P>Low Sugar.</P>
            </div>
          </div>

          {/* 5. Features Bar */}
          <div style={{ 
            position: 'absolute', 
            bottom: '3%', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%'
          }}>
            <div className="features-bar" style={{
              backgroundColor: 'rgba(245, 242, 235, 0.85)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'min(1.5vw, 24px)',
              padding: 'min(1.5vw, 24px) min(2vw, 36px)',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 'min(1vw, 18px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              alignItems: 'center',
              justifyItems: 'center'
            }}>
              {[
                { icon: <HandHeart strokeWidth={1.5} />, text: 'NATURALLY\nFERMENTED' },
                { icon: <FlaskConical strokeWidth={1.5} />, text: 'LIVE CULTURES\n(SCOBY)' },
                { icon: <Sprout strokeWidth={1.5} />, text: 'REAL\nINGREDIENTS' },
                { icon: <Leaf strokeWidth={1.5} />, text: 'VEGAN\nFRIENDLY' },
                { icon: <WheatOff strokeWidth={1.5} />, text: 'GLUTEN\nFREE' },
                { icon: <Landmark strokeWidth={1.5} />, text: 'CRAFTED IN\nUDAIPUR' }
              ].map((item, idx) => (
                <div key={idx} className="feature-item" style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 'min(0.8vw, 14px)',
                  textAlign: 'left'
                }}>
                  <div style={{
                    width: 'min(3.5vw, 63px)',
                    height: 'min(3.5vw, 63px)',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3a2b25',
                    border: '1px solid rgba(58,43,37,0.3)',
                    '& > svg': {
                      width: 'min(1.8vw, 32px)',
                      height: 'min(1.8vw, 32px)'
                    }
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.8vw, 32px)' })}
                  </div>
                  <span style={{
                    color: '#3a2b25',
                    fontSize: 'min(0.8vw, 14px)',
                    fontWeight: 600,
                    whiteSpace: 'pre-line',
                    lineHeight: 1.3,
                    letterSpacing: '0.05em'
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* =========================================================
            SECTION 2: ALIVE BY NATURE
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={aliveBgMobile} alt="Alive By Nature Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={aliveBgImage} 
            alt="Alive By Nature" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* 1. Header Area */}
          <div style={{ 
            position: 'absolute', 
            top: '4%', 
            left: '0', 
            width: '100%', 
            textAlign: 'center',
            padding: '0 2rem'
          }}>
            <h3 style={{
              color: '#5a2b1f',
              fontSize: 'min(1.2vw, 22px)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: '0 0 min(0.5vw, 9px) 0',
              fontWeight: 700
            }}>
              WHAT MAKES KOMBUCHA DIFFERENT?
            </h3>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 99px)',
              color: '#3a2b25',
              fontWeight: 700,
              lineHeight: 1,
              margin: '0 0 min(1vw, 18px) 0',
              letterSpacing: '0.01em'
            }}>
              Alive By Nature.
            </h2>
            <p style={{
              fontSize: 'min(1.3vw, 23px)',
              color: '#2a1f1a',
              margin: '0 auto',
              fontWeight: 600,
              lineHeight: 1.4,
              maxWidth: 'min(45vw, 810px)'
            }}>
              Kombucha is a living beverage, created through the perfect balance of time, ingredients and fermentation.
            </p>
          </div>

          {/* 3. The 4 Process Elements */}
          
          {/* TEA */}
          <div style={{ position: 'absolute', top: '32%', left: '18%', textAlign: 'center', width: 'min(14vw, 250px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#1a130f', marginBottom: 'min(0.5vw, 9px)' }}><Leaf strokeWidth={1.75} size="min(2vw, 36px)" /></div>
            <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', fontWeight: 700, color: '#1a130f', letterSpacing: '0.05em' }}>TEA</h4>
            <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', lineHeight: 1.4, fontWeight: 600 }}>Carefully selected tea leaves rich in antioxidants.</p>
          </div>

          {/* WATER */}
          <div style={{ position: 'absolute', top: '55%', left: '17%', textAlign: 'center', width: 'min(14vw, 250px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#1a130f', marginBottom: 'min(0.5vw, 9px)' }}><Droplets strokeWidth={1.75} size="min(2vw, 36px)" /></div>
            <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', fontWeight: 700, color: '#1a130f', letterSpacing: '0.05em' }}>WATER</h4>
            <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', lineHeight: 1.4, fontWeight: 600 }}>Pure, filtered water provides the perfect foundation.</p>
          </div>

          {/* TIME */}
          <div style={{ position: 'absolute', top: '68%', left: '38%', transform: 'translateX(-50%)', textAlign: 'center', width: 'min(14vw, 250px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#1a130f', marginBottom: 'min(0.5vw, 9px)' }}><Clock strokeWidth={1.75} size="min(2vw, 36px)" /></div>
            <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', fontWeight: 700, color: '#1a130f', letterSpacing: '0.05em' }}>TIME</h4>
            <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', lineHeight: 1.4, fontWeight: 600 }}>Slow fermentation takes time. Good things can't be rushed.</p>
          </div>

          {/* LIVE CULTURES */}
          <div style={{ position: 'absolute', top: '28%', left: '48%', textAlign: 'center', width: 'min(14vw, 250px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#1a130f', marginBottom: 'min(0.5vw, 9px)' }}><Dna strokeWidth={1.75} size="min(2vw, 36px)" /></div>
            <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', fontWeight: 700, color: '#1a130f', letterSpacing: '0.05em' }}>LIVE CULTURES<br/>(SCOBY)</h4>
            <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', lineHeight: 1.4, fontWeight: 600 }}>A living symbiotic culture of bacteria and yeast brings kombucha to life.</p>
          </div>

          {/* FERMENTATION */}
          <div style={{ position: 'absolute', top: '53%', left: '48%', textAlign: 'center', width: 'min(14vw, 250px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: '#1a130f', marginBottom: 'min(0.5vw, 9px)' }}><Sprout strokeWidth={1.75} size="min(2vw, 36px)" /></div>
            <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', fontWeight: 700, color: '#1a130f', letterSpacing: '0.05em' }}>FERMENTATION</h4>
            <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', lineHeight: 1.4, fontWeight: 600 }}>Natural fermentation unlocks probiotics, organic acids and enzymes.</p>
          </div>

          {/* 4. Bottom Banner: The Power of Fermentation */}
          <div style={{ 
            position: 'absolute', 
            bottom: '2%', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%'
          }}>
            <div style={{
              backgroundColor: '#edd3b3', // Warmer, slightly darker beige matching target
              borderRadius: 'min(1vw, 18px)',
              padding: 'min(1.5vw, 27px) min(3vw, 54px)', // Tighter padding
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'min(1.2vw, 21px)' // Tighter gap between elements
            }}>
              
              {/* Banner Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)' }}>
                <div style={{ width: 'min(6vw, 108px)', height: '1px', backgroundColor: '#3a2b25', opacity: 0.3 }} />
                <h3 style={{ margin: 0, fontSize: 'min(0.9vw, 16px)', color: '#2a1f1a', fontWeight: 700, letterSpacing: '0.15em' }}>
                  THE POWER OF FERMENTATION
                </h3>
                <div style={{ width: 'min(6vw, 108px)', height: '1px', backgroundColor: '#3a2b25', opacity: 0.3 }} />
              </div>

              {/* Banner Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 'min(1.5vw, 27px)', // Slightly tighter column gap
                width: '100%'
              }}>
                {[
                  { icon: <HandHeart strokeWidth={1.75} />, title: 'LIVE CULTURES', text: 'Naturally occurring probiotics for everyday well-being.' },
                  { icon: <Dna strokeWidth={1.75} />, title: 'ORGANIC ACIDS', text: 'Supports a healthy gut environment and aids digestion naturally.' },
                  { icon: <Droplets strokeWidth={1.75} />, title: 'ANTIOXIDANTS', text: 'Rich in antioxidants that help protect your cells from daily stress.' },
                  { icon: <Leaf strokeWidth={1.75} />, title: 'REAL INGREDIENTS', text: 'Made with real tea, fruits, herbs and nothing artificial.' },
                  { icon: <Beaker strokeWidth={1.75} />, title: 'SMALL BATCH CRAFTED', text: 'Brewed in small batches with care, passion and patience.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'min(0.8vw, 14px)' }}>
                    <div style={{
                      width: 'min(3vw, 54px)', // Smaller icon circles
                      height: 'min(3vw, 54px)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#2a1f1a',
                      border: '1px solid rgba(58,43,37,0.4)', // Darker border
                      flexShrink: 0
                    }}>
                      {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.85vw, 15px)', color: '#1a130f', fontWeight: 700 }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: 'min(0.75vw, 13px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 600 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Banner Footer */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', fontWeight: 600 }}>
                  No shortcuts. No preservatives. Just real ingredients, real fermentation, real benefits.
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 700, color: '#631d1d', marginLeft: 'min(0.4vw, 7px)', fontSize: 'min(1vw, 18px)' }}>
                    That's the Emjay way.
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
        )}

        {/* =========================================================
            SECTION 3: THE SCIENCE BEHIND EVERY SIP
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0 }}>
            <img src={scienceBgMobile} alt="The Science Behind Every Sip Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={scienceBgImage} 
            alt="The Science Behind Every Sip" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* 1. Header Area (Top Left) */}
          <div style={{ 
            position: 'absolute', 
            top: '4%', 
            left: '4%', 
            maxWidth: 'min(30vw, 540px)',
            textAlign: 'left'
          }}>
            <h3 style={{
              color: '#3a2b25',
              fontSize: 'min(1vw, 18px)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 min(0.5vw, 9px) 0',
              fontWeight: 700
            }}>
              THE SCIENCE BEHIND EVERY SIP
            </h3>
            <h4 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(6vw, 80px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 0.95,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              More Than<br/>Just A Drink.
            </h4>
            <p style={{
              fontSize: 'min(1.1vw, 19px)',
              color: '#2a1f1a',
              margin: 0,
              fontWeight: 600,
              lineHeight: 1.5
            }}>
              Kombucha is a naturally fermented beverage packed with live cultures and organic acids that support everyday wellness.
            </p>
          </div>

          {/* 2. Top Right Features (5 Cols) */}
          <div style={{
            position: 'absolute',
            top: '5%',
            right: '4%',
            width: 'min(50vw, 900px)',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            {[
              { icon: <Leaf strokeWidth={1.5} />, title: 'NATURALLY\nFERMENTED', text: 'Brewed slowly with\npatience, not\nchemicals.' },
              { icon: <Archive strokeWidth={1.5} />, title: 'LIVE CULTURES\n(SCOBY)', text: 'A living symbiotic\nculture that brings\nkombucha to life.' },
              { icon: <Droplets strokeWidth={1.5} />, title: 'ORGANIC ACIDS', text: 'Contains beneficial\ncompounds that\nsupport wellness.' },
              { icon: <Leaf strokeWidth={1.5} />, title: 'REAL\nINGREDIENTS', text: 'Made with real tea,\nfruits, herbs and\nnothing artificial.' },
              { icon: <Heart strokeWidth={1.5} />, title: 'DAILY WELLNESS\nRITUAL', text: 'A small choice\ntoday for a better\ntomorrow.' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                padding: '0 min(0.5vw, 9px)',
                borderLeft: idx === 0 ? 'none' : '1px solid rgba(58, 43, 37, 0.15)'
              }}>
                <div style={{
                  width: 'min(3.5vw, 63px)',
                  height: 'min(3.5vw, 63px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a130f',
                  border: '1px solid rgba(58,43,37,0.3)',
                  marginBottom: 'min(0.8vw, 14px)'
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.8vw, 32px)' })}
                </div>
                <h4 style={{ margin: '0 0 min(0.6vw, 11px) 0', fontSize: 'min(0.85vw, 15px)', color: '#1a130f', fontWeight: 700, letterSpacing: '0.05em', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: 'min(0.8vw, 14px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 600, whiteSpace: 'pre-line' }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* 3. Left Vertical List (5 Items) */}
          <div style={{
            position: 'absolute',
            top: '36%',
            left: '4%',
            width: 'min(25vw, 450px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'min(1vw, 18px)'
          }}>
            {[
              { icon: <Activity strokeWidth={1.5} />, title: 'DIGESTIVE SUPPORT', text: 'Probiotics and organic acids may\nsupport a healthy gut and digestion.' },
              { icon: <Droplets strokeWidth={1.5} />, title: 'NATURAL REFRESHMENT', text: 'Lightly effervescent and refreshing,\nwithout the crash.' },
              { icon: <Grid2X2 strokeWidth={1.5} />, title: 'LOWER SUGAR ALTERNATIVE', text: 'Significantly lower in sugar than\nregular soft drinks.' },
              { icon: <Dna strokeWidth={1.5} />, title: 'LIVE CULTURES', text: 'Contains live probiotics (SCOBY)\nthat come alive in every bottle.' },
              { icon: <Leaf strokeWidth={1.5} />, title: 'PLANT BASED & CLEAN', text: '100% plant based, vegan, gluten free\nand free from artificial additives.' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 'min(1.2vw, 21px)',
                paddingBottom: idx === 4 ? 0 : 'min(1vw, 18px)',
                borderBottom: idx === 4 ? 'none' : '1px solid rgba(58, 43, 37, 0.15)'
              }}>
                <div style={{
                  width: 'min(3.5vw, 63px)',
                  height: 'min(3.5vw, 63px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a130f',
                  border: '1px solid rgba(58,43,37,0.3)',
                  flexShrink: 0
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.8vw, 32px)' })}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.95vw, 17px)', color: '#1a130f', fontWeight: 700, letterSpacing: '0.05em' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 600, whiteSpace: 'pre-line' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Bottom Banner (5 Items) */}
          <div style={{ 
            position: 'absolute', 
            bottom: '3%', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%'
          }}>
            <div style={{
              backgroundColor: '#eae4d3',
              borderRadius: 'min(0.8vw, 14px)',
              padding: 'min(1.5vw, 27px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {[
                { icon: <ShieldCheck strokeWidth={1.5} />, title: 'SAFE & NATURAL', text: 'No artificial colours,\nflavours or preservatives.' },
                { icon: <Microscope strokeWidth={1.5} />, title: 'BACKED BY TRADITION', text: 'Fermentation roots dating\nback thousands of years.' },
                { icon: <Globe strokeWidth={1.5} />, title: 'CRAFTED IN UDAIPUR', text: 'Brewed in small batches\nwith care and intention.' },
                { icon: <HeartHandshake strokeWidth={1.5} />, title: 'GOOD FOR YOU', text: 'A mindful choice for your\nbody and the planet.' },
                { icon: <Wine strokeWidth={1.5} />, title: 'BETTER BY NATURE', text: 'Real ingredients.\nReal fermentation.\nReal benefits.' }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 'min(0.8vw, 14px)',
                  padding: '0 min(0.5vw, 9px)',
                  borderLeft: idx === 0 ? 'none' : '1px solid rgba(58, 43, 37, 0.15)'
                }}>
                  <div style={{
                    width: 'min(2.5vw, 45px)',
                    height: 'min(2.5vw, 45px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a130f',
                    flexShrink: 0
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(2.2vw, 40px)' })}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.8vw, 14px)', color: '#1a130f', fontWeight: 700 }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: 'min(0.75vw, 13px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 600, whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 4: WHY PEOPLE SWITCH
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={whyBgMobile} alt="Why People Switch Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={whyBgImage} 
            alt="Why People Switch" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* 1. Header Area (Top Center) */}
          <div style={{ 
            position: 'absolute', 
            top: '8%', 
            left: '50%', 
            transform: 'translateX(-50%)',
            maxWidth: 'min(40vw, 720px)',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#5a2b1f',
              fontSize: 'min(1vw, 18px)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: '0 0 min(0.5vw, 9px) 0',
              fontWeight: 700
            }}>
              WHY PEOPLE SWITCH
            </h3>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 60px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 1,
              margin: '0 0 min(1vw, 18px) 0',
              letterSpacing: '0.01em'
            }}>
              Once You Discover<br/>Better, It's Hard<br/>To Go Back.
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'min(1vw, 18px)', margin: 'min(1.5vw, 27px) 0' }}>
              <div style={{ width: 'min(4vw, 72px)', height: '1px', backgroundColor: '#3a2b25', opacity: 0.3 }} />
              <div style={{ width: 'min(0.4vw, 7px)', height: 'min(0.4vw, 7px)', backgroundColor: '#3a2b25', transform: 'rotate(45deg)', opacity: 0.8 }} />
              <div style={{ width: 'min(4vw, 72px)', height: '1px', backgroundColor: '#3a2b25', opacity: 0.3 }} />
            </div>
            <p style={{
              fontSize: 'min(1.1vw, 19px)',
              color: '#2a1f1a',
              margin: 0,
              fontWeight: 600,
              lineHeight: 1.5
            }}>
              Choose a drink that's rooted in tradition,<br/>crafted with care, and made for<br/>modern living.
            </p>
          </div>

          {/* 2. Left Column (Bad Stuff) */}
          <div style={{
            position: 'absolute',
            top: '6%',
            left: '5%',
            width: 'min(22vw, 396px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'min(1.5vw, 27px)'
          }}>
            <div style={{ backgroundColor: '#4a2b25', color: '#f5f2eb', padding: 'min(0.6vw, 11px) min(1.5vw, 27px)', borderRadius: 'min(2vw, 36px)', fontSize: 'min(0.9vw, 16px)', fontWeight: 700, letterSpacing: '0.05em' }}>
              WHAT YOU'VE BEEN DRINKING
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(1.5vw, 27px)', width: '100%' }}>
              {[
                { icon: <Grid2X2 strokeWidth={1.5} />, title: 'HIGH SUGAR', text: 'Loaded with sugar\nand empty calories.' },
                { icon: <Beaker strokeWidth={1.5} />, title: 'ARTIFICIAL INGREDIENTS', text: 'Full of additives, colours\nand preservatives.' },
                { icon: <Zap strokeWidth={1.5} />, title: 'TEMPORARY ENERGY', text: 'Artificial boost followed\nby a crash.' },
                { icon: <Activity strokeWidth={1.5} />, title: 'HARD ON YOUR GUT', text: 'No probiotics, no support\nfor digestion.' },
                { icon: <GlassWater strokeWidth={1.5} />, title: 'EMPTY REFRESHMENT', text: 'Hydration without\nany real benefits.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'min(1vw, 18px)' }}>
                  <div style={{
                    width: 'min(3.5vw, 63px)', height: 'min(3.5vw, 63px)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#4a2b25', border: '1px solid rgba(74,43,37,0.3)', flexShrink: 0
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.8vw, 32px)' })}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.9vw, 16px)', color: '#1a130f', fontWeight: 700 }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 500, whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right Column (Good Stuff) */}
          <div style={{
            position: 'absolute',
            top: '6%',
            right: '5%',
            width: 'min(22vw, 396px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'min(1.5vw, 27px)'
          }}>
            <div style={{ backgroundColor: '#2b3a25', color: '#f5f2eb', padding: 'min(0.2vw, 10px) min(1.3vw, 21px)', borderRadius: 'min(2vw, 36px)', fontSize: 'min(0.9vw, 16px)', fontWeight: 700, letterSpacing: '0.05em' }}>
              WHAT YOU COULD BE DRINKING
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(1.5vw, 27px)', width: '100%' }}>
              {[
                { icon: <Leaf strokeWidth={1.5} />, title: 'REAL INGREDIENTS', text: 'Made with real tea,\nfruits, herbs and botanicals.' },
                { icon: <Archive strokeWidth={1.5} />, title: 'NATURAL FERMENTATION', text: 'Slow-brewed with live cultures\nfor a better you.' },
                { icon: <Activity strokeWidth={1.5} />, title: 'GUT FRIENDLY', text: 'Contains probiotics that\nsupport digestion.' },
                { icon: <Droplets strokeWidth={1.5} />, title: 'LOWER SUGAR', text: 'Naturally low in sugar,\nnever artificially sweetened.' },
                { icon: <Heart strokeWidth={1.5} />, title: 'LIVE CULTURES', text: 'A refreshing way to care\nfor your body daily.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 'min(1vw, 18px)' }}>
                  <div style={{
                    width: 'min(3.5vw, 63px)', height: 'min(3.5vw, 63px)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#2b3a25', border: '1px solid rgba(43,58,37,0.3)', flexShrink: 0
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.8vw, 32px)' })}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.9vw, 16px)', color: '#1a130f', fontWeight: 700 }}>{item.title}</h4>
                    <p style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#2a1f1a', lineHeight: 1.4, fontWeight: 500, whiteSpace: 'pre-line' }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Center VS Element */}
          <div style={{
            position: 'absolute',
            top: '55%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'min(1vw, 18px)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 'min(6vw, 108px)', height: 'min(6vw, 108px)', borderRadius: '50%',
              backgroundColor: '#2b3a25', color: '#f5f2eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'min(2.5vw, 45px)', fontFamily: "'Cormorant Garamond', serif",
              border: 'min(0.3vw, 5px) solid rgba(245, 242, 235, 0.8)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              VS
            </div>
            <div>
              <div style={{ color: '#2b3a25', marginBottom: 'min(0.3vw, 5px)' }}><Leaf strokeWidth={1.5} size="min(1.5vw, 27px)" /></div>
              <h4 style={{ margin: 0, fontSize: 'min(0.9vw, 16px)', color: '#1a130f', fontWeight: 700, letterSpacing: '0.05em' }}>BETTER INGREDIENTS.</h4>
              <h4 style={{ margin: 0, fontSize: 'min(0.9vw, 16px)', color: '#1a130f', fontWeight: 700, letterSpacing: '0.05em' }}>BETTER YOU.</h4>
            </div>
          </div>

          {/* 5. Bottom Banner */}
          <div style={{ 
            position: 'absolute', 
            bottom: '4%', 
            left: '50%',
            transform: 'translateX(-50%)',
            width: '95%'
          }}>
            <div style={{
              backgroundColor: '#eae4d3',
              borderRadius: 'min(1vw, 18px)',
              padding: 'min(1.5vw, 27px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              {[
                { icon: <Leaf strokeWidth={1.5} />, title: 'NATURALLY\nFERMENTED' },
                { icon: <Archive strokeWidth={1.5} />, title: 'SMALL BATCH\nCRAFTED' },
                { icon: <Leaf strokeWidth={1.5} />, title: 'PLANT BASED\n& VEGAN' },
                { icon: <WheatOff strokeWidth={1.5} />, title: 'GLUTEN\nFREE' },
                { icon: <Landmark strokeWidth={1.5} />, title: 'CRAFTED WITH LOVE\nIN UDAIPUR' }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  gap: 'min(1vw, 18px)',
                  padding: '0 min(0.5vw, 9px)',
                  borderLeft: idx === 0 ? 'none' : '1px solid rgba(58, 43, 37, 0.15)'
                }}>
                  <div style={{
                    width: 'min(3vw, 54px)', height: 'min(3vw, 54px)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#1a130f', border: '1px solid rgba(58,43,37,0.3)', flexShrink: 0
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                  </div>
                  <h4 style={{ margin: 0, fontSize: 'min(0.85vw, 15px)', color: '#1a130f', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.title}</h4>
                </div>
              ))}

              {/* Bottom Button */}
              <div style={{
                position: 'absolute',
                bottom: '-min(1.5vw, 27px)',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#2b3a25',
                color: '#f5f2eb',
                padding: 'min(0.8vw, 14px) min(2.5vw, 45px)',
                borderRadius: 'min(0.5vw, 9px)',
                fontSize: 'min(0.9vw, 16px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: 'min(1vw, 18px)',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s ease, background-color 0.2s ease'
              }}>
                EXPLORE THE COLLECTION
                <span>→</span>
              </div>
            </div>
          </div>

        </div>
        )}

      </div>
    </div>
  )
}

export default TheEmjayVibePage
