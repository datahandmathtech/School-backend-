import React, { useState, useEffect } from 'react';
import contactBgImage from '../assets/mockups/contact_hero_bg.png';
// import contactBgMobile from '../assets/Mobile-View/contact_emjay_mobile_full.png';
import getInTouchBg from '../assets/mockups/contact_get_in_touch_bg.png';
// import getInTouchMobile from '../assets/Mobile-View/get_in_touch_mobile_full.png';
import helpBg from '../assets/mockups/contact_help_bg.png';
import helpBgMobile from '../assets/Mobile-View/how_can_we_help_mobile_full.png';
import rootedBg from '../assets/mockups/contact_rooted_bg.png';
import rootedBgMobile from '../assets/Mobile-View/rooted_in_udaipur_mobile_full.png';
import logoStamp from '../assets/logo_stamp.png';
import { 
  ShoppingBag,
  Handshake,
  Send,
  Leaf, 
  FlaskConical, 
  Heart, 
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Coffee,
  MessageCircle,
  Instagram
} from 'lucide-react';

const ContactPage = () => {
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
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#dfd2bc', paddingTop: '80px' }}>
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '1800px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0px' 
      }}>
        
        {/* =========================================================
            SECTION 1: CONTACT HERO
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            {/* <img src={contactBgMobile} alt="Contact Emjay Mobile" style={{ width: '100%', height: 'auto', display: 'block', marginTop: '0' }} /> */}
          </div>
        ) : (
        <div className="resp-container" style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            className="resp-bg-img"
            src={contactBgImage} 
            alt="Contact Emjay" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability - Matches Sunset */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #dfd2bc 32%, rgba(223, 210, 188, 0.9) 45%, rgba(223, 210, 188, 0) 65%)',
            pointerEvents: 'none'
          }} />

      

          {/* Header Area (Left Side) */}
          <div className="resp-overlay-box resp-flex-col" style={{ 
            position: 'absolute', 
            top: '12%', 
            left: '4%', 
            maxWidth: 'min(38vw, 684px)',
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
                PAGE 7
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
                CONTACT EMJAY
              </h3>
            </div>
            
            <h2 className="resp-text-h1" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5.5vw, 70px)',
              color: '#1a130f',
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Let's Brew<br/>Something Better<br/>Together.
            </h2>

            <p className="resp-text-p" style={{
              fontSize: 'min(1.1vw, 19.8px)',
              color: '#1a130f',
              margin: '0 0 min(2.5vw, 45px) 0',
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: 'min(32vw, 576px)'
            }}>
              Whether you're looking for healthier beverages,<br/>
              a café partnership, corporate supply, or simply<br/>
              want to say hello — we'd love to hear from you.
            </p>

            {/* Action Buttons Row */}
            <div className="resp-flex-wrap" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'min(1vw, 18px)',
              marginBottom: 'min(3.5vw, 63px)'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: '#2b331f', // Dark olive
                color: '#f6f3eb',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.8vw, 14.4px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <ShoppingBag size="min(1.2vw, 21px)" /> ORDER ONLINE
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: '#725032', // Warm brown
                color: '#f6f3eb',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.8vw, 14.4px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <Handshake size="min(1.2vw, 21px)" /> BECOME A PARTNER
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(26,19,15,0.4)',
                color: '#1a130f',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.8vw, 14.4px)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <Send size="min(1.2vw, 21px)" /> CONTACT US
              </div>
            </div>

            {/* 4 Icons Grid */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              maxWidth: 'min(35vw, 630px)'
            }}>
              {[
                { icon: <Leaf strokeWidth={1.5} />, title: 'REAL INGREDIENTS', text: 'Nothing artificial.\\nEver.' },
                { icon: <FlaskConical strokeWidth={1.5} />, title: 'NATURALLY\\nFERMENTED', text: 'Slow brewed\\nfor maximum good.' },
                { icon: <Heart strokeWidth={1.5} />, title: 'MADE WITH\\nPATIENCE', text: 'Good things\\ntake time.' },
                { icon: <Users strokeWidth={1.5} />, title: 'SHARED\\nEVERYWHERE', text: 'From Udaipur\\nto the world.' }
              ].map((item, idx) => (
                <div key={idx} style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  borderLeft: idx === 0 ? 'none' : '1px solid rgba(26,19,15,0.15)',
                  padding: '0 min(0.5vw, 9px)'
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
                    marginBottom: 'min(1vw, 18px)'
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.5vw, 27px)' })}
                  </div>
                  <h4 style={{ margin: '0 0 min(0.5vw, 9px) 0', fontSize: 'min(0.65vw, 11.7px)', color: '#1a130f', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4 }}>
                    {item.title.split('\\n').map((line, i) => <div key={i}>{line}</div>)}
                  </h4>
                  {item.text.split('\\n').map((line, i) => (
                    <p key={i} style={{ margin: 0, fontSize: 'min(0.65vw, 11.7px)', color: '#2a1f1a', fontWeight: 500, lineHeight: 1.4 }}>{line}</p>
                  ))}
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Pill Badge */}
          <div style={{
            position: 'absolute',
            bottom: '4%',
            left: 'min(20vw, 360px)', 
            backgroundColor: '#3b432a', // olive green matching the shop now buttons
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
              <span style={{ fontSize: 'min(0.85vw, 15px)', fontWeight: 600, letterSpacing: '0.05em' }}>CRAFTED IN UDAIPUR</span>
            </div>
            <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246, 243, 235, 0.4)' }} />
            <span style={{ fontSize: 'min(0.85vw, 15px)', fontWeight: 600, letterSpacing: '0.05em' }}>BREWED WITH PATIENCE</span>
            <div style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(246, 243, 235, 0.4)' }} />
            <span style={{ fontSize: 'min(0.85vw, 15px)', fontWeight: 600, letterSpacing: '0.05em' }}>SHARED WITH PURPOSE</span>
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 2: GET IN TOUCH
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            {/* <img src={getInTouchMobile} alt="Get In Touch Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} /> */}
          </div>
        ) : (
        <div className="resp-container" style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            className="resp-bg-img"
            src={getInTouchBg} 
            alt="Get In Touch" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability - Matches Sketch Texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #e8ddc9 25%, rgba(232, 221, 201, 0.9) 40%, rgba(232, 221, 201, 0) 65%)',
            pointerEvents: 'none'
          }} />

          {/* Logo */}
          

          {/* Top Right Script Title */}
          <div className="resp-hide" style={{
            position: 'absolute',
            top: 'min(5vw, 90px)',
            right: 'min(6vw, 108px)',
            fontFamily: "'Dancing Script', 'Caveat', cursive, 'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'min(2.2vw, 39.6px)',
            color: '#1a130f',
            transform: 'rotate(-5deg)',
            lineHeight: 1.1,
            textAlign: 'right'
          }}>
            Crafted in Udaipur.<br/>Loved Everywhere.
          </div>

          {/* Header Area (Left Side) */}
          <div className="resp-overlay-box resp-flex-col" style={{ 
            position: 'absolute', 
            top: '8%', 
            left: '4%', 
            maxWidth: 'min(38vw, 684px)',
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
                PAGE 7
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
                CONTACT EMJAY
              </h3>
            </div>
            
            <h2 className="resp-text-h1" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(6.5vw, 117px)',
              color: '#353c29', // dark olive/greenish brown
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1vw, 18px) 0',
              letterSpacing: '0.01em'
            }}>
              Get In Touch
            </h2>

            {/* Separator under title */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'min(0.5vw, 9px)', 
              marginBottom: 'min(1.5vw, 27px)',
              opacity: 0.6
            }}>
              <div style={{ width: 'min(5vw, 90px)', height: '1px', backgroundColor: '#1a130f' }} />
              <div style={{ width: 'min(0.4vw, 7.2px)', height: 'min(0.4vw, 7.2px)', backgroundColor: '#1a130f', transform: 'rotate(45deg)' }} />
              <div style={{ width: 'min(5vw, 90px)', height: '1px', backgroundColor: '#1a130f' }} />
            </div>

            <p className="resp-text-p" style={{
              fontSize: 'min(1.1vw, 19.8px)',
              color: '#1a130f',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: 'min(28vw, 504px)'
            }}>
              We'd love to hear from you. Reach out for<br/>
              orders, partnerships, corporate enquiries<br/>
              or anything in between.
            </p>
          </div>

          {/* 4 Vertical Contact Cards Row */}
          <div className="resp-overlay-box resp-flex-wrap" style={{
            position: 'absolute',
            bottom: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: 'min(1.5vw, 27px)',
            width: '90%',
            maxWidth: 'min(75vw, 1350px)'
          }}>
            {[
              { icon: <MapPin strokeWidth={1.5} />, label: 'LOCATION', text: '36, Chandpole, Gadiya Devra Road,\\nChandpole Bridge, Udaipur, Rajasthan 313004' },
              { icon: <Phone strokeWidth={1.5} />, label: 'PHONE', text: '+91 91167 41952' },
              { icon: <Mail strokeWidth={1.5} />, label: 'EMAIL', text: 'sales@emjaybrewery@gmail.com' },
              { icon: <Globe strokeWidth={1.5} />, label: 'WEBSITE', text: 'www.emjaybrewery.in' }
            ].map((item, idx) => (
              <div key={idx} style={{
                flex: 1,
                backgroundColor: 'rgba(246, 243, 235, 0.75)',
                backdropFilter: 'blur(5px)',
                borderRadius: '15px',
                padding: 'min(2vw, 36px) min(1vw, 18px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.4)',
                minHeight: 'min(20vw, 360px)'
              }}>
                <div style={{
                  width: 'min(4vw, 72px)',
                  height: 'min(4vw, 72px)',
                  borderRadius: '50%',
                  backgroundColor: '#353c29', // dark olive circle
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f6f3eb',
                  marginBottom: 'min(1.5vw, 27px)'
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.8vw, 32.4px)' })}
                </div>
                
                <h4 style={{ 
                  margin: '0 0 min(0.8vw, 14px) 0', 
                  fontSize: 'min(1vw, 18px)', 
                  color: '#353c29', 
                  fontWeight: 800, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em' 
                }}>
                  {item.label}
                </h4>

                <div style={{ 
                  width: 'min(0.4vw, 7.2px)', 
                  height: 'min(0.4vw, 7.2px)', 
                  backgroundColor: '#353c29', 
                  transform: 'rotate(45deg)', 
                  opacity: 0.7,
                  marginBottom: 'min(1.5vw, 27px)'
                }} />

                {item.text.split('\\n').map((line, i) => (
                  <p className="resp-text-p" key={i} style={{ 
                    margin: '0 0 min(0.3vw, 5px) 0', 
                    fontSize: 'min(0.9vw, 16.2px)', 
                    color: '#1a130f', 
                    fontWeight: 500,
                    lineHeight: 1.5
                  }}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div className="resp-overlay-box resp-flex-col" style={{ 
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', 
            alignItems: 'center', 
            gap: 'min(1vw, 18px)' 
          }}>
            <div style={{ color: '#353c29' }}><Leaf strokeWidth={1.5} size="min(2vw, 36px)" /></div>
            <div style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontStyle: 'italic', 
              fontSize: 'min(1.1vw, 19.8px)', 
              color: '#1a130f', 
              fontWeight: 600,
              lineHeight: 1.2
            }}>
              We usually reply within 24 hours.<br/>
              Thank you for being part of the Emjay journey.
            </div>
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 3: HOW CAN WE HELP YOU
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={helpBgMobile} alt="How Can We Help You Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <div className="resp-container" style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto 1.5vw', overflow: 'hidden' }}>
          
          <img 
            className="resp-bg-img"
            src={helpBg} 
            alt="How Can We Help You" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Header Area (Top Center) */}
          <div className="resp-overlay-box resp-flex-col" style={{ 
            position: 'absolute', 
            top: '5%', 
            left: '50%', 
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '100%'
          }}>
            <h2 className="resp-text-h1" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(5vw, 90px)',
              color: '#353c29', // dark olive
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1vw, 18px) 0',
              letterSpacing: '0.01em'
            }}>
              How Can We Help You?
            </h2>

            {/* Separator under title */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 'min(0.5vw, 9px)', 
              marginBottom: 'min(1.5vw, 27px)',
              opacity: 0.6
            }}>
              <div style={{ width: 'min(3vw, 54px)', height: '1px', backgroundColor: '#1a130f' }} />
              <div style={{ width: 'min(0.4vw, 7.2px)', height: 'min(0.4vw, 7.2px)', backgroundColor: '#1a130f', transform: 'rotate(45deg)' }} />
              <div style={{ width: 'min(3vw, 54px)', height: '1px', backgroundColor: '#1a130f' }} />
            </div>

            <p style={{
              fontSize: 'min(1.1vw, 19.8px)',
              color: '#1a130f',
              margin: 0,
              fontWeight: 500,
              lineHeight: 1.6
            }}>
              Choose the option that best describes you.<br/>
              Our team will get back to you shortly.
            </p>
          </div>

          {/* 5 Cards Content Overlay Container */}
          {/* Positoned starting exactly where the blank beige part of the cards start in the background image (around 56% down) */}
          <div className="resp-overlay-box resp-flex-wrap" style={{
            position: 'absolute',
            top: '56.3%',
            left: '5.8%', // Padding to align with the cards in the background image
            right: '5.8%',
            height: '24%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'stretch'
          }}>
            {[
              { icon: <ShoppingBag />, title: 'I Want To Order', text: 'Looking to buy Emjay Kombucha\\nfor yourself, a gift or a special\\noccasion.' },
              { icon: <Coffee />, title: 'I Own A Café /\\nRestaurant', text: 'Interested in serving Emjay\\nKombucha at your café or\\nrestaurant?' },
              { icon: <Briefcase />, title: 'Corporate /\\nOffice Supply', text: 'Healthy beverages for your\\nteam, workplace or corporate\\nevents.' },
              { icon: <Handshake />, title: 'Distributor\\nOpportunity', text: 'Join hands with Emjay Brewery\\nand be a part of our growing\\njourney.' },
              { icon: <MessageCircle />, title: 'General\\nEnquiry', text: 'Have a question or just want to\\nsay hello? We\'re here to help.' }
            ].map((item, idx) => (
              <div key={idx} style={{
                position: 'relative',
                flex: 1,
                margin: '0 min(0.3vw, 5px)', // Small gap adjustments to fit perfectly over the cards
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingTop: 'min(2.5vw, 45px)' // Make room for the overlapping icon
              }}>
                
                {/* Overlapping Icon Circle */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'min(4vw, 72px)',
                  height: 'min(4vw, 72px)',
                  borderRadius: '50%',
                  backgroundColor: '#3b432a', // dark olive circle
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f6f3eb',
                  border: '3px solid #eeeade' // Creates the cutout effect over the card background
                }}>
                  {React.cloneElement(item.icon, { size: 'min(1.8vw, 32.4px)', strokeWidth: 1.5 })}
                </div>
                
                <h4 style={{ 
                  fontFamily: "'Cormorant Garamond', serif",
                  margin: '0 0 min(1vw, 18px) 0', 
                  fontSize: 'min(1.8vw, 32.4px)', 
                  color: '#353c29', 
                  fontWeight: 600, 
                  lineHeight: 1.1
                }}>
                  {item.title.split('\\n').map((line, i) => <div key={i}>{line}</div>)}
                </h4>

                {item.text.split('\\n').map((line, i) => (
                  <p className="resp-text-p" key={i} style={{ 
                    margin: '0 0 min(0.2vw, 3.6px) 0', 
                    fontSize: 'min(0.85vw, 15.3px)', 
                    color: '#2a1f1a', 
                    fontWeight: 500,
                    lineHeight: 1.4
                  }}>
                    {line}
                  </p>
                ))}
                
                <div style={{
                  marginTop: 'auto',
                  paddingTop: 'min(1vw, 18px)',
                  fontSize: 'min(1.2vw, 21.6px)',
                  color: '#353c29',
                  fontWeight: 300,
                  cursor: 'pointer'
                }}>
                  &rarr;
                </div>
              </div>
            ))}
          </div>

          {/* Footer Text */}
          <div style={{ 
            position: 'absolute',
            top: '85%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 'min(1vw, 18px)' 
          }}>
            <div style={{ color: '#353c29' }}><Leaf strokeWidth={1.5} size="min(2vw, 36px)" /></div>
            <div style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontStyle: 'italic', 
              fontSize: 'min(1.2vw, 18.6px)', 
              color: '#1a130f', 
              fontWeight: 600,
              lineHeight: 1.3
            }}>
              Every meaningful relationship begins with a conversation.<br/>
              We can't wait to connect with you.
            </div>
          </div>

        </div>
        )}

        {/* =========================================================
            SECTION 4: ROOTED IN UDAIPUR
        ========================================================= */}
        {(isMobile || isTablet) ? (
          <div style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '1rem' }}>
            <img src={rootedBgMobile} alt="Rooted in Udaipur Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        ) : (
        <>
        <div className="resp-container" style={{ position: 'relative', width: '100%', maxWidth: '1800px', margin: '0 auto', overflow: 'hidden' }}>
          
          <img 
            className="resp-bg-img"
            src={rootedBg} 
            alt="Rooted in Udaipur" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />

          {/* Gradient Overlay for Text Readability - Matches Sunset */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #dfd2bc 32%, rgba(223, 210, 188, 0.9) 45%, rgba(223, 210, 188, 0) 65%)',
            pointerEvents: 'none'
          }} />

          {/* Header Area (Left Side) */}
          <div className="resp-overlay-box resp-flex-col" style={{ 
            position: 'absolute', 
            top: '8%', 
            left: '4%', 
            maxWidth: 'min(42vw, 756px)',
            textAlign: 'left'
          }}>
            
            
            <h2 className="resp-text-h1" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'min(6vw, 108px)',
              color: '#353c29', // dark olive/greenish brown
              fontWeight: 700,
              lineHeight: 1.05,
              margin: '0 0 min(1.5vw, 27px) 0',
              letterSpacing: '0.01em'
            }}>
              Rooted In Udaipur.<br/>Shared Everywhere.
            </h2>

            {/* Separator under title */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'min(0.5vw, 9px)', 
              marginBottom: 'min(2.5vw, 45px)',
              opacity: 0.6
            }}>
              <div style={{ width: 'min(0.4vw, 7.2px)', height: 'min(0.4vw, 7.2px)', backgroundColor: '#1a130f', transform: 'rotate(45deg)' }} />
              <div style={{ width: 'min(5vw, 90px)', height: '1px', backgroundColor: '#1a130f' }} />
            </div>

            {/* 3 Features List */}
            <div className="resp-flex-col" style={{ display: 'flex', flexDirection: 'column', gap: 'min(1.5vw, 27px)', marginBottom: 'min(3.5vw, 63px)' }}>
              {[
                { icon: <Leaf strokeWidth={1.5} />, text: 'Crafted with patience.' },
                { icon: <FlaskConical strokeWidth={1.5} />, text: 'Powered by fermentation.' },
                { icon: <Heart strokeWidth={1.5} />, text: 'Made for meaningful moments.' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'min(1.5vw, 27px)' }}>
                  <div style={{
                    width: 'min(3vw, 54px)',
                    height: 'min(3vw, 54px)',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(26,19,15,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a130f'
                  }}>
                    {React.cloneElement(item.icon, { size: 'min(1.3vw, 23.4px)' })}
                  </div>
                  <span className="resp-text-p" style={{ fontSize: 'min(1.3vw, 23.4px)', color: '#1a130f', fontWeight: 500 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Action Buttons Row */}
            <div className="resp-flex-col" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'min(1vw, 18px)',
              marginBottom: 'min(3vw, 54px)'
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: '#3b432a', // Dark olive
                color: '#f6f3eb',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.7vw, 12.6px)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <Instagram size="min(1.2vw, 21px)" /> FOLLOW EMJAY &rarr;
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: '#725032', // Warm brown
                color: '#f6f3eb',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.7vw, 12.6px)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <ShoppingBag size="min(1.2vw, 21px)" /> SHOP ONLINE &rarr;
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'min(0.5vw, 9px)',
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(26,19,15,0.4)',
                color: '#1a130f',
                padding: 'min(0.8vw, 14px) min(1.5vw, 27px)',
                borderRadius: '8px',
                fontSize: 'min(0.7vw, 12.6px)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                cursor: 'pointer'
              }}>
                <Handshake size="min(1.2vw, 21px)" /> PARTNER WITH US &rarr;
              </div>
            </div>

            {/* Script Text below buttons */}
            <div className="resp-text-h2" style={{ 
              fontFamily: "'Dancing Script', 'Caveat', cursive, 'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'min(2vw, 36px)',
              color: '#2a241f',
              lineHeight: 1.2,
              transform: 'rotate(-3deg)',
              display: 'inline-block'
            }}>
              Thank you for being<br/>
              part of the Emjay journey.
              <span style={{ display: 'block', textAlign: 'center', marginTop: 'min(0.5vw, 9px)' }}>
                <Heart strokeWidth={1.5} size="min(1.2vw, 21px)" />
              </span>
            </div>

          </div>

        </div>
        
        {/* =========================================================
            BOTTOM BANNERS
        ========================================================= */}
        {/* Banner 1: Light Beige */}
        <div className="resp-flex-col" style={{
          width: '100%',
          backgroundColor: '#dfd5be', // Matches the light beige band in mockup
          padding: 'min(1.2vw, 21.6px) 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'min(2vw, 36px)'
        }}>
          {[
            { icon: <Leaf strokeWidth={1.5} />, text: 'Small-Batch Kombucha' },
            { icon: <FlaskConical strokeWidth={1.5} />, text: 'Naturally Fermented' },
            { icon: <Heart strokeWidth={1.5} />, text: 'Better Ingredients. Better Choices. Better You.' },
            { icon: <MapPin strokeWidth={1.5} />, text: '36, Chandpole, Gadiya Devra Road, Chandpole Bridge, Udaipur, Rajasthan 313004' }
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <div className="resp-text-p" style={{ display: 'flex', alignItems: 'center', gap: 'min(0.8vw, 14.4px)', color: '#2a241f', margin: '5px 0' }}>
                {React.cloneElement(item.icon, { size: 'min(1.2vw, 21.6px)' })}
                <span style={{ fontSize: 'min(0.9vw, 16.2px)', fontWeight: 600, letterSpacing: '0.02em' }}>{item.text}</span>
              </div>
              {idx < 3 && (
                <div className="resp-hide" style={{ width: '1px', height: 'min(1.5vw, 27px)', backgroundColor: 'rgba(42,36,31,0.2)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Banner 2: Dark Olive */}
        <div className="resp-flex-col" style={{
          width: '100%',
          backgroundColor: '#2e3721', // Dark olive matching mockup
          padding: 'min(1.2vw, 21.6px) 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'min(1vw, 18px)',
          position: 'relative'
        }}>
          <span className="resp-text-small" style={{ fontSize: 'min(0.9vw, 16.2px)', color: '#f6f3eb', fontWeight: 600, letterSpacing: '0.15em', textAlign: 'center' }}>
            EMJAY BREWERY &mdash; CRAFTED IN UDAIPUR, LOVED EVERYWHERE.
          </span>
          <div className="resp-hide" style={{
            position: 'absolute',
            right: '4%',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src={logoStamp} alt="Emjay Logo" style={{ width: 'min(2.5vw, 45px)', height: 'min(2.5vw, 45px)', filter: 'brightness(0) invert(1) opacity(0.8)' }} />
          </div>
        </div>
        </>
        )}

      </div>
    </div>
  )
}

export default ContactPage;
