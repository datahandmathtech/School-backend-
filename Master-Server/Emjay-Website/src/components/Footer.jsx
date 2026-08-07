import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bgImage from '../assets/mockups/footer_v2_bg.png';
import badgeLogo from '../assets/badge_logo.png';

const Footer = () => {
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

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements['name']?.value || '';
    const email = form.elements['email']?.value || '';
    const subject = form.elements['subject']?.value || '';
    const message = form.elements['message']?.value || '';
    
    let waText = `Hi, I am ${name}.\n`;
    if(email) waText += `Email: ${email}\n`;
    if(subject) waText += `Subject: ${subject}\n\n`;
    waText += `${message}`;
    
    const waUrl = `https://wa.me/919116741952?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  };

  // DESKTOP LAYOUT (Original Absolute Overlay)
  if (!isMobile && !isTablet) {
    return (
      <footer id="contact" style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16/9',
        backgroundColor: '#f6f3eb',
        overflow: 'hidden',
        minHeight: '600px',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          backgroundImage: `url(${bgImage})`, backgroundSize: '100% 100%', backgroundPosition: 'center', zIndex: 0,
        }} />

        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          {/* --- Left Column (Contact Info) --- */}
          <div style={{ position: 'absolute', top: '14%', left: '20%', width: '26%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '0.8vw' }}>
              <span style={{ color: '#577247', letterSpacing: '0.1em', fontSize: 'clamp(0.6rem, 0.8vw, 1rem)', fontWeight: 700, textTransform: 'uppercase' }}>LET'S CONNECT</span>
              <div style={{ display: 'flex', alignItems: 'center', width: '100px', marginTop: '0.2vw' }}>
                <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
                <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
                <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              </div>
            </div>

            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 5rem)', color: '#3a2b25', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, lineHeight: 1.1, marginBottom: '1vw' }}>
              We'd Love to<br />Hear From You.
            </h2>

            <p style={{ fontSize: 'clamp(0.7rem, 0.9vw, 1.2rem)', color: '#3a2b25', lineHeight: 1.5, marginBottom: '2vw', fontWeight: 500 }}>
              Have a question, want to collaborate, or interested<br />
              in bringing Emjay Kombucha to your space?<br />
              We're just a message away.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2vw' }}>
              <a href="tel:+919116741952" style={{ display: 'flex', alignItems: 'center', gap: '1vw', textDecoration: 'none' }}>
                <div style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '0.9vw' }}>📞</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9vw', fontWeight: 600 }}>+91 91167 41952</span>
                  <span style={{ color: '#577247', fontSize: '0.75vw', fontWeight: 500 }}>Mon – Sat | 10 AM – 6 PM</span>
                </div>
              </a>
              <a href="mailto:sales@emjaybrewery@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1vw', textDecoration: 'none' }}>
                <div style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '0.9vw' }}>✉</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9vw', fontWeight: 600 }}>sales@emjaybrewery@gmail.com</span>
                  <span style={{ color: '#577247', fontSize: '0.75vw', fontWeight: 500 }}>We reply within 24 hours</span>
                </div>
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1vw' }}>
                <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '1vw' }}>📍</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9vw', fontWeight: 600, lineHeight: 1.4 }}>36, Chandpole, Gadiya Devra Road,<br/>Chandpole Bridge, Udaipur, Rajasthan 313004</span>
                  <span style={{ color: '#577247', fontSize: '0.75vw', fontWeight: 500 }}>Rooted in tradition. Crafted for today.</span>
                </div>
              </div>
              <a href="https://instagram.com/emjaybrewery" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1vw', textDecoration: 'none' }}>
                <div style={{ width: '2.5vw', height: '2.5vw', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '1vw' }}>📷</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9vw', fontWeight: 600 }}>@emjaybrewery</span>
                  <span style={{ color: '#577247', fontSize: '0.75vw', fontWeight: 500 }}>Follow our journey</span>
                </div>
              </a>
            </div>
          </div>

          {/* --- Right Column (Form Box) --- */}
          <div style={{
            position: 'absolute', top: '12%', right: '5.5%', width: '38%', height: '62%',
            border: '1px solid #c8c1b5', borderRadius: '1.5vw', display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: '1.5vw', backgroundColor: 'transparent', overflow: 'hidden'
          }}>
            <img src={badgeLogo} alt="Logo" style={{ width: '3vw', height: '3vw', marginBottom: '1vw' }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1vw' }}>
              <span style={{ color: '#577247', letterSpacing: '0.1em', fontSize: 'clamp(0.6rem, 0.9vw, 1.2rem)', fontWeight: 700 }}>SEND US A MESSAGE</span>
              <div style={{ display: 'flex', alignItems: 'center', width: '50px', marginTop: '0.3vw' }}>
                <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
                <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
                <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              </div>
            </div>

            <form style={{ width: '85%', display: 'flex', flexDirection: 'column', gap: '0.8vw' }} onSubmit={handleWhatsAppSubmit}>
              <div style={{ display: 'flex', gap: '1vw', width: '100%' }}>
                <input name="name" type="text" placeholder="Your Name" style={{ flex: 1, padding: '0.8vw 1vw', background: 'transparent', border: '1px solid #d9d2c5', borderRadius: '0.5vw', color: '#3a2b25', fontSize: '0.8vw', outline: 'none' }} required />
                <input name="email" type="email" placeholder="Email Address" style={{ flex: 1, padding: '0.8vw 1vw', background: 'transparent', border: '1px solid #d9d2c5', borderRadius: '0.5vw', color: '#3a2b25', fontSize: '0.8vw', outline: 'none' }} required />
              </div>
              <input name="subject" type="text" placeholder="Subject" style={{ width: '100%', padding: '0.8vw 1vw', background: 'transparent', border: '1px solid #d9d2c5', borderRadius: '0.5vw', color: '#3a2b25', fontSize: '0.8vw', outline: 'none' }} />
              <textarea name="message" placeholder="Your Message" style={{ width: '100%', padding: '1vw', background: 'transparent', border: '1px solid #d9d2c5', borderRadius: '0.5vw', color: '#3a2b25', fontSize: '0.8vw', outline: 'none', resize: 'none', height: '5.5vw' }} required />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5vw', marginTop: '0.2vw' }}>
                <input type="checkbox" id="newsletter" style={{ cursor: 'pointer', width: '1vw', height: '1vw', accentColor: '#577247' }} />
                <label htmlFor="newsletter" style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 500, cursor: 'pointer' }}>
                  I'd like to receive updates and offers from Emjay Brewery.
                </label>
              </div>

              <button type="submit" style={{ 
                alignSelf: 'center', marginTop: '0.8vw', backgroundColor: '#4a2c1f', color: '#f6f3eb', 
                border: 'none', borderRadius: '0.5vw', padding: '0.8vw 2vw', fontSize: '0.8vw', 
                fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer', display: 'flex', 
                alignItems: 'center', transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#301c13'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4a2c1f'}
              >
                SEND MESSAGE &rarr;
              </button>
            </form>

            {/* Green Box */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '100%', height: '5vw',
              backgroundColor: '#e9ecd9', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #c8c1b5', padding: '0 2vw', boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', flex: 1 }}>
                <div style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw' }}>🍾</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 700, lineHeight: 1.2 }}>Planning something special?</span>
                  <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 500, lineHeight: 1.2 }}>Let's brew it together.</span>
                </div>
              </div>
              <div style={{ width: '1px', height: '2.5vw', backgroundColor: '#c8c1b5', margin: '0 1vw' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '1vw', flex: 1, justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 500, lineHeight: 1.2 }}>For partnerships, corporate programs</span>
                  <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 500, lineHeight: 1.2 }}>or bulk inquiries, we're here to help.</span>
                </div>
                <div style={{ width: '2vw', height: '2vw', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1vw' }}>🌿</div>
              </div>
            </div>
          </div>

          {/* --- Footer Section (Bottom) --- */}
          <div style={{ position: 'absolute', top: '80.5%', left: '27%' }}>
            <div style={{ color: '#3a2b25', fontSize: '1.8vw', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '0.15em', lineHeight: 1 }}>EMJAY</div>
            <div style={{ color: '#3a2b25', fontSize: '0.8vw', fontWeight: 600, letterSpacing: '0.3em' }}>BREWERY</div>
          </div>
          
          <div style={{ position: 'absolute', top: '87.5%', left: '22.5%', width: '18%', textAlign: 'center', color: '#577247', fontSize: '0.60vw', fontWeight: 700, letterSpacing: '0.1em' }}>
            ROOTED IN ANCIENT UDAIPUR.<br />BREWED FOR MODERN SOULS.
          </div>

          <style>{`
            .footer-link { color: #3a2b25; font-size: 0.75vw; font-weight: 500; text-decoration: none; transition: color 0.3s; }
            .footer-link:hover { color: #577247; text-decoration: underline; }
            .social-icon { width: 1.5vw; height: 1.5vw; border-radius: 50%; border: 1px solid #3a2b25; display: flex; align-items: center; justify-content: center; font-size: 0.7vw; color: #3a2b25; text-decoration: none; transition: all 0.3s; }
            .social-icon:hover { background-color: #577247; color: #fff; border-color: #577247; }
          `}</style>

          <div style={{ position: 'absolute', top: '80.5%', left: '40%', display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.3vw' }}>EXPLORE</span>
            <Link to="/Our-Story" className="footer-link">Our Story</Link>
            <Link to="/our-kombucha" className="footer-link">Our Kombucha</Link>
            <Link to="/#why-kombucha" className="footer-link">Why Kombucha?</Link>
            <Link to="/the-emjay-vibe" className="footer-link">The Emjay Vibe</Link>
          </div>

          <div style={{ position: 'absolute', top: '80.5%', left: '49.5%', display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.3vw' }}>CONNECT</span>
            <Link to="/find-emjay-near-you" className="footer-link">Where to Find Emjay</Link>
            <Link to="/contact" className="footer-link">Corporate Wellness</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>

          <div style={{ position: 'absolute', top: '80.5%', left: '60.5%', display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.3vw' }}>POLICIES</span>
            <a href="/#privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/#terms" className="footer-link">Terms & Conditions</a>
          </div>

          <div style={{ position: 'absolute', top: '80.5%', left: '71.5%', display: 'flex', flexDirection: 'column', gap: '0.5vw' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.3vw' }}>STAY CONNECTED</span>
            <span style={{ color: '#3a2b25', fontSize: '0.75vw', fontWeight: 500, width: '11vw' }}>Follow us for updates, events and good vibes.</span>
            <div style={{ display: 'flex', gap: '0.8vw', marginTop: '0.5vw' }}>
              <a href="https://instagram.com/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon">ig</a>
              <a href="https://facebook.com/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon">fb</a>
              <a href="https://linkedin.com/company/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon">in</a>
            </div>
          </div>

          <div style={{ position: 'absolute', top: '98%', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '1vw', color: '#3a2b25', fontSize: '0.65vw', fontWeight: 600 }}>
            <span>© 2026 handmathtechnologiesindia</span>
            <div style={{ width: '1px', height: '10px', backgroundColor: '#c8c1b5' }} />
            <span>Brewed with love in Udaipur, Rajasthan. ♥</span>
          </div>
        </div>
      </footer>
    );
  }

  // MOBILE AND TABLET LAYOUT (Stacked, readable font sizes)
  return (
    <footer id="contact" style={{
      width: '100%',
      backgroundColor: '#f6f3eb',
      padding: isMobile ? '4rem 5%' : '5rem 8%',
      fontFamily: "'Inter', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem',
      boxSizing: 'border-box'
    }}>
      <style>{`
        .footer-link-m { color: #3a2b25; font-size: ${isMobile ? '1rem' : '1.1rem'}; font-weight: 500; text-decoration: none; transition: color 0.3s; }
        .footer-link-m:hover { color: #577247; text-decoration: underline; }
        .social-icon-m { width: ${isMobile ? '2.5rem' : '3rem'}; height: ${isMobile ? '2.5rem' : '3rem'}; border-radius: 50%; border: 1px solid #3a2b25; display: flex; align-items: center; justify-content: center; font-size: ${isMobile ? '1rem' : '1.2rem'}; color: #3a2b25; text-decoration: none; transition: all 0.3s; }
        .social-icon-m:hover { background-color: #577247; color: #fff; border-color: #577247; }
        .input-m { width: 100%; padding: ${isMobile ? '1rem' : '1.2rem'}; background: transparent; border: 1px solid #d9d2c5; border-radius: 8px; color: #3a2b25; font-size: ${isMobile ? '1rem' : '1.1rem'}; outline: none; box-sizing: border-box; }
      `}</style>

      {/* Top Section: Contact Info + Form */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '3rem' }}>
        
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{ color: '#577247', letterSpacing: '0.1em', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>LET'S CONNECT</span>
            <div style={{ display: 'flex', alignItems: 'center', width: '100px', marginTop: '0.5rem' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
            </div>
          </div>

          <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', color: '#3a2b25', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            We'd Love to<br />Hear From You.
          </h2>

          <p style={{ fontSize: isMobile ? '1rem' : '1.1rem', color: '#3a2b25', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
            Have a question, want to collaborate, or interested in bringing Emjay Kombucha to your space? We're just a message away.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a href="tel:+919116741952" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '1.2rem', flexShrink: 0 }}>📞</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#3a2b25', fontSize: '1rem', fontWeight: 600 }}>+91 91167 41952</span>
                <span style={{ color: '#577247', fontSize: '0.85rem', fontWeight: 500 }}>Mon – Sat | 10 AM – 6 PM</span>
              </div>
            </a>
            <a href="mailto:sales@emjaybrewery@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '1.2rem', flexShrink: 0 }}>✉</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#3a2b25', fontSize: '1rem', fontWeight: 600 }}>sales@emjaybrewery@gmail.com</span>
                <span style={{ color: '#577247', fontSize: '0.85rem', fontWeight: 500 }}>We reply within 24 hours</span>
              </div>
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #d9d2c5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#577247', fontSize: '1.2rem', flexShrink: 0 }}>📍</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#3a2b25', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>36, Chandpole, Gadiya Devra Road,<br/>Chandpole Bridge, Udaipur, Rajasthan 313004</span>
                <span style={{ color: '#577247', fontSize: '0.85rem', fontWeight: 500 }}>Rooted in tradition. Crafted for today.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div style={{
          border: '1px solid #c8c1b5', borderRadius: '24px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', padding: '2rem 1rem 0 1rem', backgroundColor: '#fff', overflow: 'hidden'
        }}>
          <img src={badgeLogo} alt="Logo" style={{ width: '50px', height: '50px', marginBottom: '1rem' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ color: '#577247', letterSpacing: '0.1em', fontSize: '0.85rem', fontWeight: 700 }}>SEND US A MESSAGE</span>
            <div style={{ display: 'flex', alignItems: 'center', width: '50px', marginTop: '0.5rem' }}>
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
              <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', backgroundColor: '#577247', margin: '0 5px' }} />
              <div style={{ height: '1px', flex: 1, backgroundColor: '#c8c1b5' }} />
            </div>
          </div>

          <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }} onSubmit={handleWhatsAppSubmit}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', width: '100%' }}>
              <input name="name" type="text" placeholder="Your Name" className="input-m" required />
              <input name="email" type="email" placeholder="Email Address" className="input-m" required />
            </div>
            <input name="subject" type="text" placeholder="Subject" className="input-m" />
            <textarea name="message" placeholder="Your Message" className="input-m" style={{ resize: 'none', height: '120px' }} required />
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginTop: '0.5rem' }}>
              <input type="checkbox" id="newsletter-m" style={{ cursor: 'pointer', width: '1.2rem', height: '1.2rem', accentColor: '#577247', marginTop: '0.2rem' }} />
              <label htmlFor="newsletter-m" style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', lineHeight: 1.4 }}>
                I'd like to receive updates and offers from Emjay Brewery.
              </label>
            </div>

            <button type="submit" style={{ 
              alignSelf: 'center', marginTop: '1rem', backgroundColor: '#4a2c1f', color: '#f6f3eb', 
              border: 'none', borderRadius: '8px', padding: '1rem 2rem', fontSize: '1rem', 
              fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer', width: isMobile ? '100%' : 'auto'
            }}>
              SEND MESSAGE &rarr;
            </button>
          </form>

          {/* Green Box */}
          <div style={{
            width: 'calc(100% + 2rem)', margin: '0 -1rem', backgroundColor: '#e9ecd9', display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', 
            justifyContent: 'space-between', borderTop: '1px solid #c8c1b5', padding: '1.5rem', gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🍾</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.2 }}>Planning something special?</span>
                <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>Let's brew it together.</span>
              </div>
            </div>
            {!isMobile && <div style={{ width: '1px', height: '40px', backgroundColor: '#c8c1b5' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', alignSelf: isMobile ? 'flex-start' : 'auto' }}>
              {!isMobile && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>For partnerships, corporate programs</span>
                  <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>or bulk inquiries, we're here to help.</span>
                </div>
              )}
              {isMobile && (
                 <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                  <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>For partnerships, corporate programs</span>
                  <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.2 }}>or bulk inquiries, we're here to help.</span>
                </div>
              )}
              {!isMobile && <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #3a2b25', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>🌿</div>}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '1px', width: '100%', backgroundColor: '#c8c1b5' }} />

      {/* Bottom Section: Links & Logo */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>EXPLORE</span>
            <Link to="/Our-Story" className="footer-link-m">Our Story</Link>
            <Link to="/our-kombucha" className="footer-link-m">Our Kombucha</Link>
            <Link to="/#why-kombucha" className="footer-link-m">Why Kombucha?</Link>
            <Link to="/the-emjay-vibe" className="footer-link-m">The Emjay Vibe</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>CONNECT</span>
            <Link to="/find-emjay-near-you" className="footer-link-m">Where to Find Emjay</Link>
            <Link to="/contact" className="footer-link-m">Corporate Wellness</Link>
            <Link to="/contact" className="footer-link-m">Contact</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>POLICIES</span>
            <a href="/#privacy-policy" className="footer-link-m">Privacy Policy</a>
            <a href="/#terms" className="footer-link-m">Terms & Conditions</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>STAY CONNECTED</span>
            <span style={{ color: '#3a2b25', fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>Follow us for updates, events and good vibes.</span>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://instagram.com/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon-m">ig</a>
              <a href="https://facebook.com/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon-m">fb</a>
              <a href="https://linkedin.com/company/emjaybrewery" target="_blank" rel="noreferrer" className="social-icon-m">in</a>
            </div>
          </div>
        </div>

        {/* Logo and Copyright */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: '#3a2b25', fontSize: '3rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, letterSpacing: '0.15em', lineHeight: 1 }}>EMJAY</div>
            <div style={{ color: '#3a2b25', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.3em' }}>BREWERY</div>
          </div>
          <div style={{ color: '#577247', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            ROOTED IN ANCIENT UDAIPUR. BREWED FOR MODERN SOULS.
          </div>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: '0.5rem', color: '#3a2b25', fontSize: '0.85rem', fontWeight: 600, marginTop: '1rem' }}>
            <span>© 2026 Emjay Brewery. All Rights Reserved.</span>
            {!isMobile && <div style={{ width: '1px', height: '12px', backgroundColor: '#c8c1b5' }} />}
            <span>Brewed with love in Udaipur, Rajasthan. ♥</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
