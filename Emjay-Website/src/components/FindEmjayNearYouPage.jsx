import React, { useState, useEffect } from 'react'
import heroBgImage from '../assets/mockups/find_emjay_hero_bg.png';
import heroBgMobile from '../assets/Mobile-View/life_tastes_better_mobile_full.png';
import craftedBgImage from '../assets/mockups/find_emjay_crafted_bg.png';
import craftedBgMobile from '../assets/Mobile-View/crafted_in_udaipur_mobile_full.png';
import mapBgImage from '../assets/mockups/find_emjay_map_bg.png';
import orderBgImage from '../assets/mockups/find_emjay_order_bg.png';
import orderBgMobile from '../assets/Mobile-View/order_directly_mobile_full.png';
import logoStamp from '../assets/logo_stamp.png';
import { 
  Leaf, 
  Sprout, 
  Heart, 
  Users, 
  Sun,
  MapPin,
  Globe,
  Coffee,
  ShoppingBag,
  ConciergeBell,
  Target,
  Activity,
  MoreHorizontal,
  Flower2,
  Lock,
  Truck,
  Store
} from 'lucide-react';

const FindEmjayNearYouPage = () => {
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
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#f6f3eb', paddingTop: '80px' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column' }}>

        {/* =========================================================
            SECTION 1: HERO (Life Tastes Better Unhurried)
        ========================================================= */}
        {isMobile ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={heroBgMobile} alt="Life Tastes Better Unhurried Mobile" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '0' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={heroBgImage} 
            alt="Life Tastes Better Unhurried" 
            style={{ width: '100%', height: 'auto', display: 'block', marginTop: '-8%' }} 
          />

          {/* Gradient Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #f6f3eb 5%, rgba(246, 243, 235, 0.1) 45%, rgba(246, 243, 235, 0) 65%)',
            pointerEvents: 'none'
          }} />

          {/* 1. Main Header Area (Left Side) */}
          <div style={{ 
            position: 'absolute', 
            top: '14%', 
            left: '4%', 
            maxWidth: 'min(32vw, 576px)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)', marginBottom: 'min(0.5vw, 9px)' }}>
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.9vw, 16px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                THE EMJAY VIBE
              </h3>
              <div style={{ width: 'min(4vw, 72px)', height: '1px', backgroundColor: '#1a130f', opacity: 0.4 }} />
            </div>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 99px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Life Tastes<br/>Better Unhurried.
            </h2>

            {/* Decorative Diamond */}
            <div style={{ 
              width: 'min(0.6vw, 11px)', 
              height: 'min(0.6vw, 11px)', 
              backgroundColor: '#1a130f', 
              transform: 'rotate(45deg)', 
              opacity: 0.8,
              marginBottom: 'min(1.5vw, 27px)'
            }} />

            <p style={{
              fontSize: 'min(1vw, 18px)',
              color: '#1a130f',
              margin: '0 0 min(1.5vw, 27px) 0',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              In a world that moves too fast, Emjay celebrates the moments worth slowing down for.<br/>
              The conversations that linger, the sunsets that deserve another minute, and the simple rituals that make everyday life extraordinary.
            </p>

            {/* Bullet Point */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14px)' }}>
              <div style={{ color: '#1a130f' }}><Leaf strokeWidth={1.5} size="min(1.5vw, 27px)" /></div>
              <p style={{ margin: 0, fontSize: 'min(0.9vw, 16px)', color: '#1a130f', fontWeight: 600 }}>
                Because the best moments aren't rushed.
              </p>
            </div>
          </div>

          {/* 2. Bottom Left Features Grid (4 Cols) */}
          <div style={{
            position: 'absolute',
            bottom: '10%',
            left: '4%',
            display: 'flex',
            alignItems: 'center',
            maxWidth: 'min(35vw, 630px)',
            justifyContent: 'space-between'
          }}>
            {[
              { icon: <Sprout strokeWidth={1.5} />, title: 'SLOW BREWED', text: 'With Patience' },
              { icon: <Heart strokeWidth={1.5} />, title: 'REAL INGREDIENTS', text: 'From Nature' },
              { icon: <Users strokeWidth={1.5} />, title: 'REAL MOMENTS', text: 'Real Connections' },
              { icon: <Sun strokeWidth={1.5} />, title: 'MADE TO BE SHARED', text: 'Made to Be Remembered' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                padding: '0 min(0.5vw, 9px)',
                borderLeft: idx === 0 ? 'none' : '1px solid rgba(26, 19, 15, 0.2)'
              }}>
                <div style={{
                  width: 'min(3vw, 54px)',
                  height: 'min(3vw, 54px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a130f',
                  border: '1px solid rgba(26,19,15,0.4)',
                  marginBottom: 'min(0.8vw, 14px)'
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                </div>
                <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.7vw, 12px)', color: '#1a130f', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</h4>
                <p style={{ margin: 0, fontSize: 'min(0.7vw, 12px)', color: '#2a1f1a', fontWeight: 600 }}>{item.text}</p>
              </div>
            ))}
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 2: CRAFTED IN UDAIPUR
        ========================================================= */}
        {isMobile ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={craftedBgMobile} alt="Crafted In Udaipur Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={craftedBgImage} 
            alt="Crafted In Udaipur" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #f6f3eb 32%, rgba(246, 243, 235, 0.9) 45%, rgba(246, 243, 235, 0) 65%)',
            pointerEvents: 'none'
          }} />
          

          {/* Header Area (Left Side) */}
          <div style={{ 
            position: 'absolute', 
            top: '7%', 
            left: '4%', 
            maxWidth: 'min(35vw, 630px)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)', marginBottom: 'min(0.5vw, 9px)' }}>
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.9vw, 16px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                THE EMJAY VIBE
              </h3>
              <div style={{ width: 'min(4vw, 72px)', height: '1px', backgroundColor: '#1a130f', opacity: 0.4 }} />
            </div>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(8.6vw, 90px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Crafted In Udaipur.<br/>Shared Everywhere.
            </h2>

            <p style={{
              fontSize: 'min(1.1vw, 19.8px)',
              color: '#1a130f',
              margin: '0 0 min(1.8vw, 30px) 0',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Inspired by the heritage, creativity and calm of Udaipur,<br/>
              Emjay brings together tradition, craftsmanship<br/>
              and modern living in every bottle.<br/>
              From intimate gatherings to meaningful celebrations,<br/>
              Emjay is made to be shared.
            </p>

            {/* Bullet Point */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14px)' }}>
              <div style={{ color: '#1a130f' }}><Leaf strokeWidth={1.5} size="min(1.5vw, 27px)" /></div>
              <p style={{ margin: 0, fontSize: 'min(0.95vw, 17px)', color: '#1a130f', fontWeight: 600 }}>
                Rooted in tradition. Made for today.
              </p>
            </div>
          </div>

          {/* Bottom Left Features Grid (4 Cols) */}
          <div style={{
            position: 'absolute',
            bottom: '18%',
            left: '4%',
            display: 'flex',
            alignItems: 'flex-start',
            maxWidth: 'min(32vw, 576px)',
            justifyContent: 'space-between'
          }}>
            {[
              { icon: <MapPin strokeWidth={1.5} />, title: 'BORN IN UDAIPUR', text: 'Inspired by our city,\\ncrafted with love.' },
              { icon: <Sprout strokeWidth={1.5} />, title: 'SMALL BATCH BREWED', text: 'Fermented slowly\\nwith care.' },
              { icon: <Users strokeWidth={1.5} />, title: 'MADE FOR CONNECTIONS', text: 'Great drinks bring\\npeople together.' },
              { icon: <Globe strokeWidth={1.5} />, title: 'SHARED EVERYWHERE', text: 'From Udaipur\\nto the world.' }
            ].map((item, idx) => (
              <div key={idx} style={{ 
                flex: 1, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                padding: '0 min(0.5vw, 9px)',
                borderLeft: idx === 0 ? 'none' : '1px solid rgba(26, 19, 15, 0.2)'
              }}>
                <div style={{
                  width: 'min(3vw, 54px)',
                  height: 'min(3vw, 54px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a130f',
                  border: '1px solid rgba(26,19,15,0.4)',
                  marginBottom: 'min(0.8vw, 14px)'
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                </div>
                <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(0.65vw, 11.7px)', color: '#1a130f', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.title}</h4>
                {item.text.split('\\n').map((line, i) => (
                  <p key={i} style={{ margin: 0, fontSize: 'min(0.65vw, 11.7px)', color: '#2a1f1a', fontWeight: 600 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Pill Badge */}
          <div style={{
            position: 'absolute',
            bottom: '4%',
            left: 'min(20vw, 360px)', 
            backgroundColor: '#353c29', 
            borderRadius: '50px',
            padding: 'min(1vw, 18px) min(2.5vw, 45px)',
            display: 'flex',
            alignItems: 'center',
            gap: 'min(2vw, 36px)',
            color: '#f6f3eb',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14px)' }}>
              <MapPin size="min(1.2vw, 21px)" />
              <span style={{ fontSize: 'min(0.85vw, 15px)', fontWeight: 600, letterSpacing: '0.05em' }}>UDAIPUR, RAJASTHAN, INDIA</span>
            </div>
            <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246, 243, 235, 0.4)' }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'min(1.3vw, 23.4px)' }}>Brewed with Patience. Shared with Purpose.</span>
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 3: WHERE TO FIND EMJAY (MAP)
        ========================================================= */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={mapBgImage} 
            alt="Where To Find Emjay Map" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #f6f3eb 32%, rgba(246, 243, 235, 0.9) 45%, rgba(246, 243, 235, 0) 65%)',
            pointerEvents: 'none'
          }} />


          {/* Top Right Script Title */}
          <div style={{
            position: 'absolute',
            top: 'min(5vw, 90px)',
            right: 'min(6vw, 108px)',
            fontFamily: "'Dancing Script', 'Caveat', cursive, 'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'min(2.5vw, 45px)',
            color: '#1a130f',
            transform: 'rotate(-5deg)',
            lineHeight: 1.1,
            textAlign: 'right'
          }}>
            Crafted in Udaipur.<br/>Loved Everywhere.
          </div>

          {/* Header Area (Left Side) */}
          <div style={{ 
            position: 'absolute', 
            top: '16%', 
            left: '4%', 
            maxWidth: 'min(30vw, 540px)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)', marginBottom: 'min(0.5vw, 9px)' }}>
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.85vw, 15px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                PAGE 6
              </h3>
              <div style={{ width: 'min(3vw, 54px)', height: '1px', backgroundColor: '#1a130f', opacity: 0.4 }} />
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.85vw, 15px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                WHERE TO FIND EMJAY
              </h3>
            </div>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 99px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Where To<br/>Find Emjay
            </h2>

            <p style={{
              fontSize: 'min(1vw, 18px)',
              color: '#1a130f',
              margin: '0 0 min(2.5vw, 45px) 0',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Available at selected cafés, restaurants, wellness spaces and premium lifestyle destinations.
            </p>

            {/* Categories Grid (2 Rows, 3 Cols) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'min(2vw, 36px) min(1vw, 18px)',
              marginBottom: 'min(2.5vw, 45px)'
            }}>
              {[
                { icon: <Coffee strokeWidth={1.5} />, label: 'CAFÉS' },
                { icon: <ConciergeBell strokeWidth={1.5} />, label: 'RESTAURANTS' },
                { icon: <Target strokeWidth={1.5} />, label: 'SPORTS CLUBS' },
                { icon: <Activity strokeWidth={1.5} />, label: 'WELLNESS\\nSTUDIOS' },
                { icon: <ShoppingBag strokeWidth={1.5} />, label: 'RETAIL\\nSTORES' },
                { icon: <MoreHorizontal strokeWidth={1.5} />, label: 'AND MANY MORE\\nPREMIUM SPACES' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{
                    width: 'min(3.5vw, 63px)',
                    height: 'min(3.5vw, 63px)',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(26,19,15,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a130f',
                    marginBottom: 'min(0.8vw, 14px)'
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                  </div>
                  {item.label.split('\\n').map((line, i) => (
                    <span key={i} style={{ display: 'block', fontSize: 'min(0.7vw, 12.6px)', color: '#1a130f', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{line}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* Left Side Bottom Box (Growing Network) */}
            <div style={{
              backgroundColor: 'rgba(235, 230, 215, 0.6)',
              borderRadius: '20px',
              border: '1px solid rgba(26, 19, 15, 0.1)',
              padding: 'min(1.2vw, 21px) min(1.5vw, 27px)',
              display: 'flex',
              alignItems: 'center',
              gap: 'min(1.2vw, 21px)'
            }}>
              <Leaf size="min(2vw, 36px)" color="#1a130f" strokeWidth={1.5} />
              <div>
                <p style={{ margin: 0, fontSize: 'min(1vw, 18px)', color: '#1a130f', fontWeight: 600 }}>Our network is growing every day.</p>
                <p style={{ margin: 0, fontSize: 'min(0.9vw, 16.2px)', color: '#2a1f1a', fontWeight: 500 }}>More places. More people. More good choices.</p>
              </div>
            </div>
          </div>

          {/* Right Side Bottom Box (Can't find us?) */}
          <div style={{
            position: 'absolute',
            bottom: '12%',
            right: '4%',
            backgroundColor: 'rgba(190, 195, 155, 0.85)', // olive tint
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: 'min(1.5vw, 27px) min(2.5vw, 45px)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'min(1.2vw, 21px)',
            maxWidth: 'min(25vw, 450px)'
          }}>
            <div style={{ 
              width: 'min(2.5vw, 45px)', 
              height: 'min(2.5vw, 45px)', 
              borderRadius: '50%', 
              border: '1.5px solid #1a130f',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <MapPin size="min(1.2vw, 21px)" color="#1a130f" strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 min(0.3vw, 5px) 0', fontSize: 'min(1vw, 18px)', color: '#1a130f', fontWeight: 600 }}>Can't find us near you?</h4>
              <p style={{ margin: '0 0 min(1.2vw, 21px) 0', fontSize: 'min(0.8vw, 14.4px)', color: '#2a1f1a', fontWeight: 500 }}>Request Emjay at your favourite place.</p>
              <div style={{ fontSize: 'min(0.8vw, 14.4px)', color: '#1a130f', fontWeight: 800, letterSpacing: '0.1em', cursor: 'pointer' }}>LET US KNOW &rarr;</div>
            </div>
          </div>

          {/* Map Pins */}
          {[
            { top: '38%', left: '49%', icon: <Coffee />, color: '#5b6140', label: 'KANGRI, PAHADO\\nKA SWAAD', labelPos: 'top', link: 'https://maps.app.goo.gl/QfVzNT4BgnRz2U9J7' },
            { top: '36%', left: '60%', icon: <ConciergeBell />, color: '#683f2a', label: 'INTO THE WILD\\nPIZZERIA', labelPos: 'bottom', link: 'https://maps.app.goo.gl/4xaDzjhhwjujfeox7' },
            { top: '48%', left: '75%', icon: <Coffee />, color: '#5b6140', label: 'SLAPS', labelPos: 'top', link: 'https://maps.app.goo.gl/KqGqGWmJpc9WZRVz8' },
            { top: '62%', left: '56%', icon: <ConciergeBell />, color: '#4a3020', label: 'BAO UDAIPUR', labelPos: 'bottom', link: 'https://maps.app.goo.gl/s21bqbcxgdn8dGzP6' },
            { top: '66%', left: '42%', icon: <Store />, color: '#8a4b30', label: 'FOOGLE', labelPos: 'bottom', link: 'https://maps.app.goo.gl/2TnwL7egF1Wasaor7' }
          ].map((pin, i) => (
            <a key={i} href={pin.link || '#'} target={pin.link ? '_blank' : '_self'} rel="noopener noreferrer" style={{ position: 'absolute', top: pin.top, left: pin.left, textDecoration: 'none', cursor: pin.link ? 'pointer' : 'default' }}>
              {/* The Teardrop Pin */}
              <div style={{
                position: 'relative',
                width: 'min(3.5vw, 63px)',
                height: 'min(3.5vw, 63px)',
                backgroundColor: pin.color,
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg) translate(-50%, -50%)',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transformOrigin: '0% 0%',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(-45deg) translate(-50%, -50%) scale(1.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(-45deg) translate(-50%, -50%) scale(1)'; }}
              >
                <div style={{ transform: 'rotate(45deg)', color: '#f6f3eb' }}>
                  {React.cloneElement(pin.icon, { size: 'min(1.5vw, 27px)', strokeWidth: 1.5 })}
                </div>
              </div>
              {/* Optional Label */}
              {pin.label && (
                <div style={{
                  position: 'absolute',
                  ...(pin.labelPos === 'bottom' ? { top: 'min(2.5vw, 45px)', left: '50%', transform: 'translateX(-50%)' } : 
                     pin.labelPos === 'top' ? { bottom: 'min(4.5vw, 81px)', left: '50%', transform: 'translateX(-50%)' } :
                     pin.labelPos === 'left' ? { top: 'min(-1.5vw, -27px)', right: 'min(3vw, 54px)' } : {}),
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'min(0.9vw, 16px)',
                  fontWeight: 700,
                  color: '#1a130f',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 5px rgba(246, 243, 235, 0.8)'
                }}>
                  {pin.label.split('\\n').map((l, idx) => <div key={idx}>{l}</div>)}
                </div>
              )}
            </a>
          ))}

          {/* Bottom Full-Width Bar */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#353c29', // dark olive green
            padding: 'min(1.2vw, 21px) 4%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // wait, the mockup has them spaced evenly
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14px)', color: '#f6f3eb' }}>
              <Leaf size="min(1.2vw, 21px)" />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'min(1.2vw, 21px)' }}>Real ingredients. Real fermentation. Real flavour.</span>
            </div>
            <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246, 243, 235, 0.3)' }} />
            <div style={{ color: '#f6f3eb', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'min(1.2vw, 21px)' }}>
              Better for you. Better for your world.
            </div>
            <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246, 243, 235, 0.3)' }} />
            <div style={{ color: '#d9ba7f', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'min(1.2vw, 21px)', fontWeight: 600 }}>
              #BrewedWithPurpose
            </div>
          </div>

        </div>

        {/* =========================================================
            SECTION 4: ORDER DIRECTLY
        ========================================================= */}
        {isMobile ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={orderBgMobile} alt="Order Directly Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            src={orderBgImage} 
            alt="Order Directly" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #f6f3eb 32%, rgba(246, 243, 235, 0.9) 45%, rgba(246, 243, 235, 0) 65%)',
            pointerEvents: 'none'
          }} />

          {/* Logo */}
          <div style={{ 
            position: 'absolute', 
            top: 'min(3vw, 54px)', 
            left: 'min(4vw, 72px)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'min(0.8vw, 14px)' 
          }}>
            <img src={logoStamp} alt="Emjay Logo" style={{ width: 'min(3.5vw, 63px)', height: 'min(3.5vw, 63px)' }} />
            <div style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: 'min(1.2vw, 21px)', 
              fontWeight: 700, 
              color: '#3a2b25',
              lineHeight: 1.1,
              letterSpacing: '0.1em'
            }}>
              EMJAY<br/>BREWERY
            </div>
          </div>

          {/* Header Area (Left Side) */}
          <div style={{ 
            position: 'absolute', 
            top: '18%', 
            left: '4%', 
            maxWidth: 'min(32vw, 576px)',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(1vw, 18px)', marginBottom: 'min(0.5vw, 9px)' }}>
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.85vw, 15px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                PAGE 6
              </h3>
              <div style={{ width: 'min(3vw, 54px)', height: '1px', backgroundColor: '#1a130f', opacity: 0.4 }} />
              <h3 style={{
                color: '#1a130f',
                fontSize: 'min(0.85vw, 15px)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                margin: 0,
                fontWeight: 700
              }}>
                ORDER DIRECTLY
              </h3>
            </div>
            
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 99px)',
              color: '#353c29', // dark olive/greenish brown
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Fresh Kombucha<br/>Delivered To<br/>Your Door
            </h2>

            <div style={{ 
              width: 'min(0.5vw, 9px)', 
              height: 'min(0.5vw, 9px)', 
              backgroundColor: '#1a130f', 
              transform: 'rotate(45deg)', 
              opacity: 0.8,
              marginBottom: 'min(1.5vw, 27px)'
            }} />

            <p style={{
              fontSize: 'min(1.1vw, 19.8px)',
              color: '#1a130f',
              margin: '0 0 min(2.5vw, 45px) 0',
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Order directly from Emjay Brewery and enjoy<br/>
              fresh small-batch kombucha delivered across India.
            </p>

            {/* 4 Icons Grid */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 'min(2.5vw, 45px)',
              maxWidth: 'min(30vw, 540px)'
            }}>
              {[
                { icon: <Lock strokeWidth={1.5} />, label: 'SECURE\\nCHECKOUT' },
                { icon: <Leaf strokeWidth={1.5} />, label: 'FRESH\\nBATCHES' },
                { icon: <Truck strokeWidth={1.5} />, label: 'FAST\\nSHIPPING' },
                { icon: <Store strokeWidth={1.5} />, label: 'DIRECT FROM\\nBREWERY' }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  borderRight: idx === 3 ? 'none' : '1px solid rgba(26,19,15,0.15)'
                }}>
                  <div style={{
                    width: 'min(3.5vw, 63px)',
                    height: 'min(3.5vw, 63px)',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(26,19,15,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a130f',
                    marginBottom: 'min(0.8vw, 14px)'
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                  </div>
                  {item.label.split('\\n').map((line, i) => (
                    <span key={i} style={{ display: 'block', fontSize: 'min(0.7vw, 12.6px)', color: '#1a130f', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{line}</span>
                  ))}
                </div>
              ))}
            </div>

            {/* Shop Now Button */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#353c29',
              color: '#f6f3eb',
              padding: 'min(1vw, 18px) min(2.5vw, 45px)',
              borderRadius: '50px',
              fontSize: 'min(0.9vw, 16.2px)',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginBottom: 'min(2vw, 36px)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
            }}>
              SHOP NOW &rarr;
            </div>

            {/* Footer Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14px)' }}>
              <div style={{ color: '#1a130f' }}><Leaf strokeWidth={1.5} size="min(1.5vw, 27px)" /></div>
              <p style={{ margin: 0, fontSize: 'min(0.95vw, 17px)', color: '#1a130f', fontWeight: 600 }}>
                Crafted in Udaipur <span style={{ margin: '0 min(0.5vw, 9px)' }}>&bull;</span> Delivered Across India
              </p>
            </div>

          </div>

        </div>
        )}

      </div>
    </div>
  )
}

export default FindEmjayNearYouPage
