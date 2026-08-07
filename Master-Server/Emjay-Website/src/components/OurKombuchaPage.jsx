import React, { useState, useEffect } from 'react'
import bgImage from '../assets/mockups/our_kombucha_bg.png';
import ourKombuchaHeroMobile from '../assets/Mobile-View/our_kombucha_hero_mobile_full.png';
import trustedBg from '../assets/mockups/trusted_spaces_bg.png';
import trustedBgMobile from '../assets/Mobile-View/our_kombucha_page_mobile_2.png';
import buildBoxBgMobile from '../assets/Mobile-View/build_your_box_mobile_full.png';
import communityWhyEmjayBgMobile from '../assets/Mobile-View/community_why_emjay_mobile_full.png';
import bgImage2 from '../assets/mockups/our_kombucha_section2_bg.png';
import bgImage3 from '../assets/mockups/our_kombucha_section3_bg.png';
import bgImage4 from '../assets/mockups/our_kombucha_section4_bg.png';
import logoStamp from '../assets/logo_stamp.png';
import { 
  Coffee, 
  Utensils, 
  ConciergeBell, 
  Target, 
  Dumbbell, 
  Laptop, 
  Briefcase,
  Leaf
} from 'lucide-react';

const OurKombuchaPage = () => {
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
    <div style={{ paddingTop: '80px', backgroundColor: '#f6f3eb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {(isMobile || isTablet) ? (
        <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
          <img src={ourKombuchaHeroMobile} alt="Our Kombucha Hero Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      ) : (
      <section style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1.9',
        minHeight: '600px',
        overflow: 'hidden'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center bottom', zIndex: 0,
        }} />

        {/* Content Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          
          {/* Left Content Area */}
          <div style={{ position: 'absolute', top: '5%', left: '4%', width: '28%' }}>
            
            {/* Small Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8vw', marginBottom: '1.5vw' }}>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#8a4b38' }} />
              <span style={{ color: '#8a4b38', letterSpacing: '0.15em', fontSize: '0.75vw', fontWeight: 700, textTransform: 'uppercase' }}>
                OUR KOMBUCHA
              </span>
              <div style={{ width: '40px', height: '1px', backgroundColor: '#8a4b38' }} />
            </div>

            {/* Main Headline */}
            <h1 style={{ 
              fontSize: 'clamp(2rem, 3.8vw, 5rem)', color: '#3a2b25', fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600, lineHeight: 1.1, marginBottom: '1.5vw'
            }}>
              Naturally<br />Fermented,<br />Boldly Refreshing.
            </h1>

            {/* Subtext */}
            <p style={{ fontSize: 'clamp(0.9rem, 1vw, 1.2rem)', color: '#3a2b25', fontWeight: 500, lineHeight: 1.4, marginBottom: '2.5vw' }}>
              Crafted in small batches using tea,<br />real ingredients and time.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1vw', marginBottom: '4vw' }}>
              <button style={{ 
                backgroundColor: '#4a2c1f', color: '#f6f3eb', border: 'none', borderRadius: '0.5vw', 
                padding: '1vw 2vw', fontSize: '0.8vw', fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5vw'
              }}>
                SHOP NOW &rarr;
              </button>
              <button style={{ 
                backgroundColor: 'transparent', color: '#3a2b25', border: '1px solid #3a2b25', borderRadius: '0.5vw', 
                padding: '1vw 2vw', fontSize: '0.8vw', fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer' 
              }}>
                VIEW FLAVOURS
              </button>
            </div>

            {/* Feature Icons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1vw', width: '90%' }}>
              {[
                { icon: '🍃', title: 'NATURALLY\nFERMENTED' },
                { icon: '🌿', title: 'REAL\nINGREDIENTS' },
                { icon: '⏳', title: 'SMALL BATCH\nBREWED' },
                { icon: '❤️', title: 'NO ARTIFICIAL\nSHORTCUTS' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.8vw' }}>
                  <div style={{ 
                    width: '3.5vw', height: '3.5vw', borderRadius: '50%', border: '1px solid #c8c1b5', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5vw',
                    backgroundColor: 'rgba(255,255,255,0.3)'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ color: '#3a2b25', fontSize: '0.6vw', fontWeight: 700, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{item.title}</span>
                </div>
              ))}
            </div>
            
          </div>

          {/* Bottom Banner Area */}
          <div style={{ 
            position: 'absolute', bottom: '3%', left: '12.5%', width: '75%', 
            backgroundColor: '#f1eadd', borderRadius: '1vw', padding: '1.2vw 2vw',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}>
            
            {/* Proudly Brewed */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#8a4b38', fontSize: '0.85vw', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.2vw' }}>PROUDLY BREWED IN UDAIPUR, RAJASTHAN</span>
              <span style={{ color: '#3a2b25', fontSize: '0.85vw', fontWeight: 500 }}>Rooted in tradition. Crafted for today.</span>
            </div>

            <div style={{ width: '1px', height: '2.5vw', backgroundColor: '#c8c1b5' }} />

            {/* 3 Icons */}
            <div style={{ display: 'flex', gap: '2vw' }}>
              {[
                { icon: '🌱', label: 'VEGAN\nFRIENDLY' },
                { icon: '🌾', label: 'GLUTEN\nFREE' },
                { icon: '🦠', label: 'LIVE CULTURES\n(SCOBY)' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw' }}>
                  <div style={{ 
                    width: '2.2vw', height: '2.2vw', borderRadius: '50%', border: '1px solid #3a2b25', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw' 
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ color: '#3a2b25', fontSize: '0.7vw', fontWeight: 600, whiteSpace: 'pre-line', lineHeight: 1.2 }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ width: '1px', height: '2.5vw', backgroundColor: '#c8c1b5' }} />

            {/* Script Text */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ color: '#8a4b38', fontSize: '1.5vw', fontFamily: "'Dancing Script', cursive", lineHeight: 1.1 }}>Time is our ingredient.</span>
              <span style={{ color: '#8a4b38', fontSize: '1.5vw', fontFamily: "'Dancing Script', cursive", lineHeight: 1.1 }}>Quality is our promise.</span>
            </div>

          </div>

        </div>
      </section>
      )}

      {/* =========================================================
          SECTION 2: TRUSTED BY MODERN SPACES
      ========================================================= */}
      {(isMobile || isTablet) ? (
        <div style={{ width: '100%', lineHeight: 0, padding: 0, overflow: 'hidden' }}>
          <img src={trustedBgMobile} alt="Trusted By Modern Spaces Mobile" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-4%' }} />
        </div>
      ) : (
      <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
        
        <img 
          src={trustedBg} 
          alt="Trusted By Modern Spaces" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />

        {/* Header Area (Left Side) */}
        <div style={{ 
          position: 'absolute', 
          top: '8%', 
          left: '4%', 
          maxWidth: 'min(40vw, 720px)',
          textAlign: 'left'
        }}>
          
          
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'min(5.5vw, 85px)',
            color: '#353c29', // dark olive
            fontWeight: 700,
            lineHeight: 1.05,
            margin: '0 0 min(1.5vw, 27px) 0',
            letterSpacing: '0.01em'
          }}>
            Trusted By<br/>Modern Spaces
          </h2>

          <p style={{
            fontSize: 'min(1.1vw, 19.8px)',
            color: '#1a130f',
            margin: 0,
            fontWeight: 500,
            lineHeight: 1.6
          }}>
            From health-conscious cafés to vibrant community hubs,<br/>
            Emjay is becoming a preferred beverage choice.
          </p>
        </div>

        {/* 7 Cards Overlay Container */}
        {/* Positoned exactly over the beige space below the 7 photos in the background image */}
        <div style={{
          position: 'absolute',
          top: '78%',
          left: '2%',
          right: '2%',
          height: '15%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          {[
            { icon: <Coffee />, title: 'CAFÉS', text: 'Elevating everyday\\nmoments with better,\\nhealthier choices.' },
            { icon: <Utensils />, title: 'RESTAURANTS', text: 'The perfect partner\\nfor conscious dining\\nexperiences.' },
            { icon: <ConciergeBell />, title: 'HOTELS', text: 'Crafted for guests who\\nappreciate quality and\\nwellness.' },
            { icon: <Target />, title: 'PICKLEBALL COURTS', text: 'Refreshing energy for\\nactive communities and\\nchampions.' },
            { icon: <Dumbbell />, title: 'GYMS', text: 'Clean, natural fuel for\\na healthier, stronger\\nlifestyle.' },
            { icon: <Laptop />, title: 'CO-WORKING SPACES', text: 'Better focus.\\nBetter drinks.\\nBetter ideas.' },
            { icon: <Briefcase />, title: 'CORPORATE OFFICES', text: 'Thoughtful workplaces\\nchoose beverages that\\ncare for people.' }
          ].map((item, idx) => (
            <div key={idx} style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 min(0.3vw, 5px)'
            }}>
              
              {/* Icon Circle */}
              <div style={{
                width: 'min(3vw, 54px)',
                height: 'min(3vw, 54px)',
                borderRadius: '50%',
                backgroundColor: '#eeeade', // very light beige to stand out
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b432a', // dark olive icon
                border: '1.5px solid #3b432a',
                marginBottom: 'min(0.8vw, 14px)'
              }}>
                {React.cloneElement(item.icon, { size: 'min(1.4vw, 25.2px)', strokeWidth: 1.5 })}
              </div>
              
              <h4 style={{ 
                margin: '0 0 min(0.5vw, 9px) 0', 
                fontSize: 'min(0.8vw, 14.4px)', 
                color: '#1a130f', 
                fontWeight: 700, 
                letterSpacing: '0.05em'
              }}>
                {item.title}
              </h4>

              {item.text.split('\\n').map((line, i) => (
                <p key={i} style={{ 
                  margin: '0 0 min(0.2vw, 3.6px) 0', 
                  fontSize: 'min(0.75vw, 13.5px)', 
                  color: '#2a1f1a', 
                  fontWeight: 500,
                  lineHeight: 1.4
                }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ 
          position: 'absolute',
          bottom: '3%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', 
          alignItems: 'center', 
          gap: 'min(2vw, 36px)',
          width: '80%',
          justifyContent: 'center',
          borderTop: '1px solid rgba(26,19,15,0.2)',
          paddingTop: 'min(1.5vw, 27px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)' }}>
            <div style={{ color: '#f6f3eb' }}><Leaf strokeWidth={1.5} size="min(1.5vw, 27px)" /></div>
            <div style={{ 
              fontSize: 'min(1vw, 18px)', 
              color: '#f6f3eb', 
              fontWeight: 500,
              letterSpacing: '0.02em'
            }}>
              Better Ingredients. Better Choices. Better You.
            </div>
          </div>
          
          <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246,243,235,0.3)' }} />
          
          <div style={{ 
            fontSize: 'min(1vw, 18px)', 
            color: '#f6f3eb', 
            fontWeight: 500,
            letterSpacing: '0.02em'
          }}>
            Crafted in Udaipur. Loved Everywhere.
          </div>
        </div>

      </div>
      )}

      {/* --- SECTION 3: MEET THE COLLECTION --- */}
     

      {/* --- SECTION 3: BUILD YOUR BOX --- */}
      {(isMobile || isTablet) ? (
        <div style={{ width: '100%', lineHeight: 0, padding: 0 }}>
          <img src={buildBoxBgMobile} alt="Build Your Box Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      ) : (
      <section style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1920/1080', // Approximate landscape ratio for the new image
        minHeight: '600px',
        overflow: 'hidden',
        backgroundColor: '#f1ebd9'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${bgImage3})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />

        {/* Content Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          
          {/* Center Content */}
          <div style={{ position: 'absolute', top: '7%', left: '45%', width: '22%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginBottom: '1vw' }}>
              <div style={{ width: '0.4vw', height: '0.4vw', backgroundColor: '#8a252c', transform: 'rotate(45deg)' }} />
              <span style={{ color: '#8a252c', letterSpacing: '0.1em', fontSize: 'clamp(0.6rem, 0.7vw, 1rem)', fontWeight: 700 }}>BUILD YOUR BOX</span>
              <div style={{ width: '0.4vw', height: '0.4vw', backgroundColor: '#8a252c', transform: 'rotate(45deg)' }} />
            </div>
            
            <h3 style={{ fontSize: 'clamp(2rem, 3.2vw, 4.5rem)', color: '#3a2b25', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, margin: '0 0 2vw 0', lineHeight: 1.1 }}>
              Create Your Perfect Kombucha<br />Experience
            </h3>
            
            <p style={{ fontSize: 'clamp(0.7rem, 0.9vw, 1.2rem)', color: '#3a2b25', fontWeight: 500, margin: '0 0 1.5vw 0' }}>
              Mix your favourite flavours or start<br />with our curated packs.
            </p>
            <p style={{ fontSize: 'clamp(0.7rem, 0.9vw, 1.2rem)', color: '#3a2b25', fontWeight: 500, margin: '0 0 3vw 0' }}>
              Choose what suits your mood,<br />your lifestyle, and your wellness<br />journey.
            </p>

            <button style={{ width: '100%', padding: '1vw 0', backgroundColor: '#4a2c1f', color: '#fff', border: 'none', borderRadius: '0.5vw', fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer', marginBottom: '1vw' }}>
              DISCOVERY PACK &rarr;
            </button>
            <button style={{ width: '100%', padding: '1vw 0', backgroundColor: 'transparent', color: '#4a2c1f', border: '1px solid #4a2c1f', borderRadius: '0.5vw', fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer' }}>
              CUSTOM BOX &rarr;
            </button>
          </div>

          {/* Right Cards Area */}
          <div style={{ position: 'absolute', top: '8%', right: '4%', width: '28%', display: 'flex', flexDirection: 'column', gap: '1.5vw' }}>
            
            {/* Discovery Pack Card */}
            <div style={{ backgroundColor: '#eef2e6', borderRadius: '1vw', border: '1px solid #d9d2c5', position: 'relative', padding: '1.5vw' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#34522a', color: '#fff', padding: '0.4vw 1vw', borderTopLeftRadius: '1vw', borderBottomRightRadius: '1vw', fontSize: 'clamp(0.5rem, 0.65vw, 0.8rem)', fontWeight: 700, transform: 'rotate(-45deg) translate(-20%, -50%)', transformOrigin: 'top left' }}>MOST POPULAR</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.5rem)', fontWeight: 800, color: '#3a2b25', margin: '0 0 0.2vw 0', paddingLeft: '2vw' }}>DISCOVERY PACK</h4>
                  <p style={{ fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', color: '#3a2b25', margin: '0 0 1vw 0', paddingLeft: '2vw' }}>All 5 Flavours Included</p>
                  
                  {/* Miniature Bottles Placeholder */}
                  <div style={{ display: 'flex', gap: '0.5vw', paddingLeft: '2vw', marginBottom: '1vw' }}>
                    <div style={{ width: '1.5vw', height: '4vw', backgroundColor: '#4a2c1f', borderRadius: '0.2vw' }}></div>
                    <div style={{ width: '1.5vw', height: '4vw', backgroundColor: '#7a1c22', borderRadius: '0.2vw' }}></div>
                    <div style={{ width: '1.5vw', height: '4vw', backgroundColor: '#3b2459', borderRadius: '0.2vw' }}></div>
                    <div style={{ width: '1.5vw', height: '4vw', backgroundColor: '#2a5b28', borderRadius: '0.2vw' }}></div>
                    <div style={{ width: '1.5vw', height: '4vw', backgroundColor: '#135459', borderRadius: '0.2vw' }}></div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', paddingLeft: '2vw' }}>
                    <span style={{ fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', color: '#34522a', fontWeight: 800 }}>₹799</span>
                    <span style={{ fontSize: 'clamp(0.8rem, 1vw, 1.2rem)', color: '#888', textDecoration: 'line-through' }}>₹900</span>
                    <span style={{ backgroundColor: '#34522a', color: '#fff', padding: '0.3vw 0.8vw', borderRadius: '0.3vw', fontSize: 'clamp(0.6rem, 0.7vw, 0.9rem)', fontWeight: 700 }}>SAVE ₹101</span>
                  </div>
                </div>

                {/* Checklist */}
                <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', gap: '0.5vw', paddingTop: '1vw' }}>
                  {['Original', 'Pomegranate', 'Kokum', 'Lemongrass Mint', 'Pineapple Rosemary'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)', color: '#3a2b25', fontWeight: 600 }}>
                      <span style={{ color: '#34522a' }}>✓</span> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Box Card */}
            <div style={{ backgroundColor: '#f6f3eb', borderRadius: '1vw', border: '1px solid #d9d2c5', padding: '1.5vw', display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '4vw', height: '4vw', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5vw' }}>🛍️</span>
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.5rem)', fontWeight: 800, color: '#8a252c', margin: '0 0 0.2vw 0' }}>CUSTOM BOX</h4>
                <p style={{ fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', color: '#3a2b25', margin: '0 0 1.5vw 0' }}>Choose Any 6 Bottles</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.9rem)', color: '#888', fontWeight: 600 }}>STARTING AT</div>
                    <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', color: '#8a252c', fontWeight: 800, lineHeight: 1 }}>₹699</div>
                  </div>
                  <p style={{ fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)', color: '#3a2b25', margin: 0, textAlign: 'right', width: '45%' }}>
                    Pick your favourite flavours and create your box.
                  </p>
                </div>
              </div>
            </div>

            {/* Family Pack Card */}
            <div style={{ backgroundColor: '#f6f3eb', borderRadius: '1vw', border: '1px solid #d9d2c5', padding: '1.5vw', display: 'flex', alignItems: 'center', gap: '1.5vw' }}>
              <div style={{ width: '4vw', height: '4vw', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5vw' }}>📦</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2vw' }}>
                  <h4 style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.5rem)', fontWeight: 800, color: '#3a2b25', margin: 0 }}>FAMILY PACK</h4>
                  <span style={{ backgroundColor: '#c78c2e', color: '#fff', padding: '0.3vw 0.8vw', borderRadius: '1vw', fontSize: 'clamp(0.5rem, 0.65vw, 0.8rem)', fontWeight: 700 }}>BEST VALUE</span>
                </div>
                <p style={{ fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', color: '#3a2b25', margin: '0 0 1.5vw 0' }}>12 Bottles</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', color: '#3a2b25', fontWeight: 800, lineHeight: 1 }}>₹1399</div>
                  <p style={{ fontSize: 'clamp(0.6rem, 0.75vw, 0.9rem)', color: '#3a2b25', margin: 0, textAlign: 'right', width: '50%' }}>
                    Perfect for families, gatherings & daily wellness.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Banner */}
          <div style={{ 
            position: 'absolute', bottom: '2%', left: '4%', width: '92%', height: '8%', 
            backgroundColor: '#f8f5ee', borderRadius: '1vw', border: '1px solid #e5dfd3',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 3vw',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'flex', gap: '3vw' }}>
              {[
                { icon: '🍃', title: 'NATURALLY FERMENTED', sub: 'With live cultures (SCOBY)' },
                { icon: '🍶', title: 'SMALL BATCH BREWED', sub: 'Crafted with care and time' },
                { icon: '🌱', title: 'VEGAN FRIENDLY', sub: '100% plant based' },
                { icon: '🌾', title: 'GLUTEN FREE', sub: 'Safe and gentle' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.8vw' }}>
                  <div style={{ fontSize: '1.5vw' }}>{item.icon}</div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.7vw', fontWeight: 700, color: '#3a2b25' }}>{item.title}</span>
                    <span style={{ fontSize: '0.6vw', fontWeight: 500, color: '#6d5a55' }}>{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '1vw' }}>
                <span style={{ color: '#8a4b38', fontSize: '1.5vw', fontFamily: "'Dancing Script', cursive", lineHeight: 1.1 }}>Good for you.</span>
                <span style={{ color: '#8a4b38', fontSize: '1.5vw', fontFamily: "'Dancing Script', cursive", lineHeight: 1.1 }}>Good for the earth.</span>
              </div>
              <div style={{ fontSize: '2.5vw', opacity: 0.2 }}>🧘‍♀️</div>
            </div>
          </div>

        </div>
      </section>
      )}

      {/* --- SECTION 4: COMMUNITY & WHY EMJAY --- */}
      {(isMobile || isTablet) ? (
        <div style={{ width: '100%', lineHeight: 0, padding: 0 }}>
          <img src={communityWhyEmjayBgMobile} alt="Community and Why Emjay Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      ) : (
      <section style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1920/1080',
        minHeight: '600px',
        overflow: 'hidden',
        backgroundColor: '#e6d8c3'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${bgImage4})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0,
        }} />

        {/* Content Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          
          {/* Left: Reviews Area */}
          <div style={{ position: 'absolute', top: '10%', left: '2%', width: '22%' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5vw' }}>
              <span style={{ color: '#4a2c1f', letterSpacing: '0.1em', fontSize: 'clamp(0.6rem, 0.8vw, 1rem)', fontWeight: 800 }}>LOVED BY OUR COMMUNITY</span>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5vw' }}>
                <div style={{ width: '2vw', height: '1px', backgroundColor: '#4a2c1f' }} />
                <div style={{ width: '0.3vw', height: '0.3vw', backgroundColor: '#4a2c1f', transform: 'rotate(45deg)', margin: '0 0.5vw' }} />
                <div style={{ width: '2vw', height: '1px', backgroundColor: '#4a2c1f' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw' }}>
              {[
                { text: 'Finally a drink that feels refreshing without being overloaded with sugar.', author: '- Aditi S.' },
                { text: 'The Pomegranate and Kokum flavours are incredible. My new daily ritual.', author: '- Rohan M.' },
                { text: 'A premium healthy alternative to soft drinks. Highly recommended.', author: '- Neha P.' }
              ].map((review, idx) => (
                <div key={idx} style={{ 
                  padding: '1.2vw 1.5vw',
                  position: 'relative',
                  height: '11vw', // approximate height of the baked-in box
                  display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}>
                  <div style={{ color: '#8a252c', fontSize: '1vw', marginBottom: '0.5vw' }}>★★★★★</div>
                  <div style={{ position: 'absolute', top: '1vw', left: '1vw', fontSize: '2vw', color: '#c8c1b5', opacity: 0.5, fontFamily: 'serif' }}>"</div>
                  <p style={{ fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', color: '#3a2b25', fontWeight: 600, margin: '0 0 1vw 0', position: 'relative', zIndex: 1, paddingLeft: '1vw' }}>
                    {review.text}
                  </p>
                  <p style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.9rem)', color: '#3a2b25', margin: 0, paddingLeft: '1vw', fontWeight: 500 }}>{review.author}</p>
                  
                  {/* Decorative leaves */}
                  <div style={{ position: 'absolute', bottom: '0.5vw', right: '0.5vw', fontSize: '2vw', opacity: 0.1 }}>🌿</div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Title & Button */}
          <div style={{ position: 'absolute', top: '8%', left: '30%', width: '38%' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 3.5vw, 4.5rem)', color: '#3a2b25', fontFamily: "'Cormorant Garamond', serif", 
              fontWeight: 600, margin: '0 0 1.5vw 0', lineHeight: 1.1 
            }}>
              EVERY<br />IMPORTANT MOMENT<br />DESERVES<br />SOMETHING BETTER
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5vw' }}>
              <div style={{ width: '3vw', height: '1px', backgroundColor: '#3a2b25' }} />
              <div style={{ width: '0.4vw', height: '0.4vw', backgroundColor: '#3a2b25', transform: 'rotate(45deg)', margin: '0 0.5vw' }} />
              <div style={{ width: '10vw', height: '1px', backgroundColor: '#3a2b25' }} />
            </div>
            <p style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1.5rem)', color: '#3a2b25', fontWeight: 500, margin: '0 0 2vw 0', lineHeight: 1.4 }}>
              Refresh Naturally.<br />Live Consciously.<br />Sip Thoughtfully.
            </p>
            <button style={{ 
              padding: '1vw 2.5vw', backgroundColor: '#4a1515', color: '#fff', border: 'none', 
              borderRadius: '0.3vw', fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', fontWeight: 700, 
              letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5vw' 
            }}>
              SHOP NOW &rarr;
            </button>
          </div>

          {/* Right: Why Emjay Card */}
          <div style={{ position: 'absolute', top: '8%', right: '1%', width: '20%', height: '76%', padding: '2vw 1.5vw', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center', marginBottom: '2vw' }}>
              <h3 style={{ color: '#8a252c', letterSpacing: '0.05em', fontSize: 'clamp(1rem, 1.2vw, 1.5rem)', fontWeight: 600, margin: '0 0 0.5vw 0', fontFamily: "'Cormorant Garamond', serif" }}>WHY EMJAY?</h3>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '2vw', height: '1px', backgroundColor: '#8a252c' }} />
                <div style={{ width: '0.3vw', height: '0.3vw', backgroundColor: '#8a252c', transform: 'rotate(45deg)', margin: '0 0.5vw' }} />
                <div style={{ width: '2vw', height: '1px', backgroundColor: '#8a252c' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw', flexGrow: 1}}>
              {[
                { icon: '🍃', title: 'NATURALLY FERMENTED' },
                { icon: '🍶', title: 'SMALL BATCH BREWED' },
                { icon: '🦠', title: 'LIVE CULTURES (SCOBY)' },
                { icon: '🌱', title: 'VEGAN FRIENDLY' },
                { icon: '🌾', title: 'GLUTEN FREE' },
                { icon: '💧', title: 'NO ARTIFICIAL COLOURS' },
                { icon: '🧪', title: 'NO ARTIFICIAL FLAVOURS' },
                { icon: '🏰', title: 'CRAFTED IN UDAIPUR' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1vw', paddingBottom: '0.3vw' , borderBottom: idx < 7 ? '1px dotted #d9d2c5' : 'none' }}>
                  <div style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '1px solid #c8c1b5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.9rem)', fontWeight: 700, color: '#3a2b25' }}>{item.title}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '1vw', paddingTop: '1vw', borderTop: '1px solid #d9d2c5' }}>
              <div style={{ fontSize: 'clamp(0.7rem, 0.8vw, 1rem)', color: '#3a2b25', fontWeight: 600, margin: '0 0 0.5vw 0' }}>Rooted in Tradition.</div>
              <div style={{ fontSize: 'clamp(1.2rem, 1.8vw, 2.5rem)', color: '#8a252c', fontFamily: "'Dancing Script', cursive", lineHeight: 1.1 }}>Crafted for Modern Living.</div>
            </div>
          </div>

          {/* Footer Banner */}
          <div style={{ 
            position: 'absolute', bottom: '3.5%', left: '12.5%', width: '79%', height: '8%', 
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 2vw'
          }}>
            {[
              { title: '100% PLANT BASED', sub: 'Good for you.' },
              { title: 'SAFE & SECURE DELIVERY', sub: 'Packed with care.' },
              {  title: 'QUALITY YOU CAN TRUST', sub: 'Made the right way.' },
              {  title: 'SUPPORT LOCAL', sub: 'Empower small batches.' }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
              
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.7vw', fontWeight: 800, color: '#3a2b25' }}>{item.title}</span>
                  <span style={{ fontSize: '0.65vw', fontWeight: 600, color: '#6d5a55' }}>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      )}
    </div>
  )
}

export default OurKombuchaPage
