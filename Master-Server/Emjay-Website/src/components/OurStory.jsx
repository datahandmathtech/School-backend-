import React from 'react'
import imgAsset0 from '../assets/mockups/our_story_bg.png';
import imgAsset1 from '../assets/mockups/our_story_split_bg.png';
import imgAsset2 from '../assets/badge_logo.png';
import imgAsset3 from '../assets/mockups/our_story_v3_bg.png';
import imgAsset4 from '../assets/mockups/our_story_v4_bg.png';
import mobileImgAsset2 from '../assets/Mobile-View/our_story_mobile_2.png';
import mobileImgAsset2Full from '../assets/Mobile-View/our_story_mobile_2_full.png';
import mobileImgAsset3Full from '../assets/Mobile-View/our_story_mobile_3_full.png';
import mobileImgAsset4Full from '../assets/Mobile-View/our_story_mobile_4_full.png';
import ourStoryHeroMobile from '../assets/Mobile-View/our_story_hero_mobile_full.png';

const OurStory = () => {
  return (
    <div style={{ paddingTop: '80px', backgroundColor: '#f6f3eb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global styles for Our Story page */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        
        .os-subtitle {
          margin: 0; 
          color: '#4a5b48'; 
          letter-spacing: 0.15em; 
          font-size: 0.8vw; 
          text-transform: uppercase; 
          font-weight: 700;
        }

        .os-subtitle-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 1.5vw;
        }

        .os-divider {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 5px;
        }

        .os-title {
          font-family: 'Playfair Display', 'Cormorant Garamond', serif;
          line-height: 1.1;
          color: #3b2b20;
          margin: 0;
          margin-bottom: 2vw;
        }

        .os-para {
          font-family: 'Inter', sans-serif;
          font-size: 1vw;
          line-height: 1.6;
          color: #3b2b20;
          margin: 0;
          margin-bottom: 1.5vw;
          font-weight: 500;
        }

        .os-cursive {
          font-family: 'Caveat', cursive;
          line-height: 1.2;
          color: #4a5b48;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .pill {
          display: flex; align-items: center; background: rgba(255, 255, 255, 0.85);
          padding: 0.5vw 1vw; border-radius: 50px; font-family: 'Inter', sans-serif;
          font-size: 0.85vw; font-weight: 600; color: #3b2b20; width: fit-content;
          margin-bottom: 0.8vw; box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .os-mobile-only { display: none; width: 100%; height: 100%; }
        .os-desktop-only { display: block; width: 100%; height: 100%; }
        
        @media (max-width: 900px) {
          .os-mobile-only { display: block !important; }
          .os-desktop-only { display: none !important; }
          .os-section-1, .os-section-2, .os-section-3, .os-section-4 {
            background-image: none !important;
            background: none !important;
            padding: 0 !important;
            height: auto !important;
            min-height: auto !important;
            display: block !important;
            aspect-ratio: auto !important;
          }
        }
      `}</style>

      {/* ================= SECTION 1 ================= */}
      <section className="os-section os-section-1" style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        backgroundImage: `url(${imgAsset0})`,
        backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        {/* ================= DESKTOP CONTENT ================= */}
        <div className="os-desktop-only">
          <div className="os-content" style={{ position: 'absolute', left: '5%', top: '7%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          
          <div className="os-subtitle-container" style={{ alignItems: 'center', alignSelf: 'flex-start', marginBottom: '2vw' }}>
            <h4 className="os-subtitle" style={{ margin: 0, color: '#4a5b48', letterSpacing: '0.15em', fontSize: '0.9vw', textTransform: 'uppercase', fontWeight: 700 }}>
              OUR STORY
            </h4>
            <div className="os-divider">
              <div style={{ width: '20px', height: '1px', backgroundColor: '#4a5b48' }} />
              <div style={{ width: '4px', height: '4px', backgroundColor: '#4a5b48', transform: 'rotate(45deg)' }} />
              <div style={{ width: '20px', height: '1px', backgroundColor: '#4a5b48' }} />
            </div>
          </div>

          <h2 className="os-title" style={{ fontSize: '3.8vw' }}>
            Rooted In Udaipur.<br/>Brewed For<br/>Modern Living.
          </h2>

          <div className="os-section-1-divider-line" style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', marginBottom: '2vw' }}>
            <div style={{ width: '6vw', minWidth: '40px', height: '2px', backgroundColor: '#4a5b48' }} />
          </div>

          <p className="os-para" style={{ fontSize: '1.1vw' }}>
            Emjay Brewery was born from a simple belief —<br/>better beverages should be crafted with care,<br/>not manufactured by shortcuts.
          </p>

          <p className="os-para" style={{ fontSize: '1.1vw' }}>
            Inspired by Udaipur's rich culture, slower pace<br/>of life and appreciation for meaningful moments,<br/>we set out to create a refreshing alternative<br/>for modern lifestyles.
          </p>

          <div className="os-cursive" style={{ fontSize: '2.5vw', marginTop: '1.5vw' }}>
            Crafted with tradition.<br/>Made for today.
          </div>
        </div>

        <div className="os-spin-badge" style={{ position: 'absolute', left: '6%', bottom: '5%', width: '14vw', height: '14vw' }}>
          <img src={imgAsset2} alt="Emjay Logo" style={{ position: 'absolute', width: '40%', height: '40%', top: '30%', left: '30%', objectFit: 'contain', zIndex: 2 }} />
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', animation: 'spin 20s linear infinite' }}>
            <defs>
              <path id="circlePath1" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
            </defs>
            <text fontSize="8" fontWeight="bold" fill="#583120" letterSpacing="2">
              <textPath href="#circlePath1" startOffset="0%">
                BREWED IN UDAIPUR • ROOTED IN TRADITION •
              </textPath>
            </text>
          </svg>
        </div>

        <div className="os-section-1-bottom" style={{ display: 'none' }}>
          <div className="os-section-1-icon-col">
            <div className="os-section-1-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
            </div>
            <div className="os-section-1-icon-text">REAL INGREDIENTS</div>
          </div>
          <div className="os-section-1-icon-col">
            <div className="os-section-1-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H4zm2 14V8h12v12H6zm3-14V3h6v3M9 3v3m6-3v3"/></svg>
            </div>
            <div className="os-section-1-icon-text">LIVE CULTURES</div>
          </div>
          <div className="os-section-1-icon-col">
            <div className="os-section-1-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div className="os-section-1-icon-text">MADE WITH LOVE</div>
          </div>
          <div className="os-section-1-icon-col">
            <div className="os-section-1-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M6 10h12M6 14h12M6 18h12M10 2v2M14 2v2"/></svg>
            </div>
            <div className="os-section-1-icon-text">CRAFTED IN UDAIPUR</div>
          </div>
        </div>
        </div>

        {/* ================= MOBILE CONTENT ================= */}
        <div className="os-mobile-only" style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '2rem' }}>
          <img src={ourStoryHeroMobile} alt="Our Story Hero Mobile" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      {/* ================= SECTION 2 ================= */}
      <section className="os-section os-section-2" style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        backgroundImage: `url(${imgAsset1})`,
        backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        {/* ================= DESKTOP CONTENT ================= */}
        <div className="os-desktop-only">
          <div className="os-content" style={{ position: 'absolute', left: '8%', top: '7%', width: '32%' }}>
            <div className="os-subtitle-container">
              <h4 className="os-subtitle" style={{ margin: 0, color: '#4a5b48', letterSpacing: '0.15em', fontSize: '0.8vw', textTransform: 'uppercase', fontWeight: 700 }}>OUR STORY</h4>
              <div className="os-divider">
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
                <div style={{ width: '4px', height: '4px', backgroundColor: '#4a5b48', transform: 'rotate(45deg)' }} />
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
              </div>
            </div>

            <h2 className="os-title" style={{ fontSize: '2.2vw', maxWidth: '32vw' }}>We Wanted Better<br/>Than Ordinary Drinks.</h2>
            <div style={{ width: '4vw', height: '2px', backgroundColor: '#4a5b48', marginBottom: '1.5vw' }} />

            <p className="os-para" style={{ maxWidth: '30vw' }}>In a world filled with sugary soft drinks and<br/>artificial ingredients, we wanted something more real.</p>
            <p className="os-para" style={{ maxWidth: '30vw' }}>Drawing inspiration from centuries-old fermentation<br/>traditions and combining them with contemporary<br/>flavors, Emjay Brewery creates beverages that feel<br/>both familiar and refreshingly new.</p>

            <div className="os-features" style={{ marginTop: '2vw' }}>
              <div className="pill"><span style={{ color: '#a04639', marginRight: '0.5vw', fontWeight: 'bold', fontSize: '1vw' }}>ⓧ</span> Loaded with sugar</div>
              <div className="pill"><span style={{ color: '#a04639', marginRight: '0.5vw', fontWeight: 'bold', fontSize: '1vw' }}>ⓧ</span> Artificial flavors & colors</div>
              <div className="pill"><span style={{ color: '#a04639', marginRight: '0.5vw', fontWeight: 'bold', fontSize: '1vw' }}>ⓧ</span> Empty calories</div>
              <div className="pill"><span style={{ color: '#a04639', marginRight: '0.5vw', fontWeight: 'bold', fontSize: '1vw' }}>ⓧ</span> No real benefits</div>
            </div>
          </div>

          <div className="os-content" style={{ position: 'absolute', right: '18%', top: '14%' }}>
            <h3 className="os-title" style={{ fontSize: '2.2vw', marginBottom: '1.5vw' }}>We chose the real way.</h3>
            <div className="os-divider" style={{ marginBottom: '1.5vw', alignSelf: 'center', justifyContent: 'center' }}>
              <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
              <div style={{ width: '4px', height: '4px', backgroundColor: '#4a5b48', transform: 'rotate(45deg)' }} />
              <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8vw' }}>
              {['Real tea. Real fruits.', 'Authentic herbs & botanicals.', 'Naturally fermented.', 'Good for gut. Good for you.'].map(txt => (
                <div key={txt} className="os-para" style={{ display: 'flex', alignItems: 'center', fontSize: '1vw', fontFamily: 'Inter', fontWeight: 500, color: '#3b2b20', marginBottom: 0 }}>
                  <span style={{ color: '#4a5b48', marginRight: '0.5vw', fontWeight: 'bold', fontSize: '1vw' }}>✓</span> {txt}
                </div>
              ))}
            </div>
          </div>

          <div className="os-cursive os-content" style={{ position: 'absolute', fontSize: '2vw', right: '5%', top: '22%' }}>Real Tea ↙</div>
          <div className="os-cursive os-content" style={{ position: 'absolute', fontSize: '2vw', right: '2%', top: '33%', width: '8vw', textAlign: 'center' }}>Fruits &<br/>Botanicals ↙</div>

          <div className="os-spin-badge" style={{
            position: 'absolute', left: '47%', top: '45%', transform: 'translate(-50%, -50%)',
            width: '11vw', height: '11vw', borderRadius: '50%', backgroundColor: '#dbbe95',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
          }}>
            <img src={imgAsset2} alt="Emjay Logo" style={{ width: '50%', height: '50%', objectFit: 'contain', zIndex: 2 }} />
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '90%', height: '90%', animation: 'spin 15s linear infinite' }}>
              <defs><path id="badgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" /></defs>
              <text fontSize="9.5" fontWeight="bold" fill="#583120" letterSpacing="3">
                <textPath href="#badgePath" startOffset="0%">REAL IS BETTER • ALWAYS • </textPath>
              </text>
            </svg>
          </div>
          
          <div className="os-bottom-grid">
            <div style={{ position: 'absolute', fontFamily: 'Inter', fontSize: '0.85vw', lineHeight: 1.4, color: '#3b2b20', fontWeight: 500, left: '21%', bottom: '8%' }}>
              Better for your body.<br/>Better for the planet.
            </div>
            <div style={{ position: 'absolute', fontFamily: 'Inter', fontSize: '0.85vw', lineHeight: 1.4, color: '#3b2b20', fontWeight: 500, left: '50%', bottom: '8%' }}>
              A refreshing alternative<br/>you can feel good about.
            </div>
            <div style={{ position: 'absolute', fontFamily: 'Inter', fontSize: '0.85vw', lineHeight: 1.4, color: '#3b2b20', fontWeight: 500, left: '78%', bottom: '8%' }}>
              Crafted for the moments<br/>that matter.
            </div>
          </div>
        </div>

        {/* ================= MOBILE CONTENT ================= */}
        <div className="os-mobile-only" style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '2rem' }}>
          <img src={mobileImgAsset2Full} alt="Our Story Section 2" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      {/* ================= SECTION 3 ================= */}
      <section className="os-section os-section-3" style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        backgroundImage: `url(${imgAsset3})`,
        backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        {/* ================= DESKTOP CONTENT ================= */}
        <div className="os-desktop-only">
          <div className="os-content" style={{ position: 'absolute', left: '8%', top: '5%', width: '38%' }}>
            <div className="os-subtitle-container" style={{ marginBottom: '1vw' }}>
              <h4 className="os-subtitle" style={{ margin: 0, color: '#4a5b48', letterSpacing: '0.15em', fontSize: '0.8vw', textTransform: 'uppercase', fontWeight: 700 }}>OUR STORY</h4>
              <div className="os-divider">
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
                <div style={{ width: '4px', height: '4px', backgroundColor: '#4a5b48', transform: 'rotate(45deg)' }} />
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
              </div>
            </div>

            <h3 className="os-title" style={{ fontSize: '3vw', maxWidth: '38vw', marginBottom: '1vw' }}>Slow Brewing.<br/>Real Ingredients.<br/>No Shortcuts.</h3>
            <div style={{ width: '4vw', height: '2px', backgroundColor: '#4a5b48', marginBottom: '1vw' }} />

            <p className="os-para" style={{ fontSize: '1.1vw', maxWidth: '35vw', marginBottom: '1vw' }}>
              Every bottle begins with carefully selected tea, natural ingredients, and a living culture known as <span style={{ color: '#4a5b48', fontWeight: 700 }}>SCOBY</span>.
            </p>
            <p className="os-para" style={{ fontSize: '1.1vw', maxWidth: '35vw', marginBottom: '1vw' }}>
              Through patient fermentation and small-batch brewing, simple ingredients transform into bold flavors designed to be enjoyed slowly.
            </p>

            <div className="os-cursive" style={{ fontSize: '2.2vw', marginTop: '2vw' }}>
              Time is our ingredient.<br/>Quality is our promise.
            </div>
          </div>

          <div className="os-spin-badge" style={{
            position: 'absolute', right: '5%', top: '20%', width: '9vw', height: '9vw',
            borderRadius: '50%', border: '1px solid #4a5b48', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8
          }}>
            <div style={{ color: '#4a5b48', fontSize: '2vw' }}>🌿</div>
            <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 20s linear infinite' }}>
              <defs><path id="stampPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" /></defs>
              <text fontSize="10" fontWeight="bold" fill="#4a5b48" letterSpacing="4">
                <textPath href="#stampPath" startOffset="0%">SMALL BATCH • BIG CARE • </textPath>
              </text>
            </svg>
          </div>
          
          {/* Bottom Boxes */}
          <div className="os-bottom-grid">
            <div style={{ position: 'absolute', left: '17%', top: '77%' }}>
              <h3 style={{ fontFamily: 'Inter', fontSize: '0.9vw', fontWeight: 800, color: '#3b2b20', letterSpacing: '0.05em', margin: '0 0 0.8vw 0', lineHeight: 1.2 }}>NATURALLY<br/>FERMENTED</h3>
            </div>
            <div style={{ position: 'absolute', left: '39%', top: '77%' }}>
              <h4 style={{ fontFamily: 'Inter', fontSize: '0.9vw', fontWeight: 800, color: '#3b2b20', letterSpacing: '0.05em', margin: '0 0 0.8vw 0', lineHeight: 1.2 }}>REAL<br/>INGREDIENTS</h4>
            </div>
            <div style={{ position: 'absolute', left: '62%', top: '77%' }}>
              <h4 style={{ fontFamily: 'Inter', fontSize: '0.9vw', fontWeight: 800, color: '#3b2b20', letterSpacing: '0.05em', margin: '0 0 0.8vw 0', lineHeight: 1.2 }}>BOLD<br/>FLAVOURS</h4>
            </div>
            <div style={{ position: 'absolute', left: '87%', top: '77%' }}>
              <h4 style={{ fontFamily: 'Inter', fontSize: '0.9vw', fontWeight: 800, color: '#3b2b20', letterSpacing: '0.05em', margin: '0 0 0.8vw 0', lineHeight: 1.2 }}>MADE FOR<br/>MOMENTS</h4>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="os-bottom-banner" style={{ position: 'absolute', bottom: '4.5%', width: '100%', textAlign: 'center', fontFamily: 'Inter', fontSize: '0.85vw', fontWeight: 700, color: '#4a5b48', letterSpacing: '0.05em' }}>
            SLOW BREWED IN SMALL BATCHES &nbsp;•&nbsp; THOUGHTFULLY CRAFTED &nbsp;•&nbsp; ALWAYS REAL
          </div>
        </div>

        {/* ================= MOBILE CONTENT ================= */}
        <div className="os-mobile-only" style={{ width: '100%', lineHeight: 0, padding: 0, marginBottom: '2rem' }}>
          <img src={mobileImgAsset3Full} alt="Our Story Section 3" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

      {/* ================= SECTION 4 ================= */}
      <section className="os-section os-section-4" style={{
        position: 'relative', width: '100%', aspectRatio: '16/9',
        backgroundImage: `url(${imgAsset4})`,
        backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}>
        {/* ================= DESKTOP CONTENT ================= */}
        <div className="os-desktop-only">
          {/* Left Content */}
          <div className="os-content" style={{ position: 'absolute', left: '3%', top: '10%', width: '32%' }}>
            <div className="os-subtitle-container" style={{ marginBottom: '1vw' }}>
              <h3 className="os-subtitle" style={{ margin: 0, color: '#4a5b48', letterSpacing: '0.15em', fontSize: '0.8vw', textTransform: 'uppercase', fontWeight: 700 }}>OUR STORY</h3>
              <div className="os-divider">
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
                <div style={{ width: '4px', height: '4px', backgroundColor: '#4a5b48', transform: 'rotate(45deg)' }} />
                <div style={{ width: '15px', height: '1px', backgroundColor: '#4a5b48' }} />
              </div>
            </div>

            <h3 className="os-title" style={{ fontSize: '2.5vw', maxWidth: '32vw', marginBottom: '1vw' }}>More Than A Drink.<br/>A Moment To Remember.</h3>
            <div style={{ width: '4vw', height: '2px', backgroundColor: '#4a5b48', marginBottom: '1vw' }} />

            <p className="os-para" style={{ fontSize: '1vw', maxWidth: '30vw', marginBottom: '1vw' }}>
              From café conversations to game day energy,<br/>from focused workdays to road trip playlists —<br/>Emjay Kombucha is made for life's real moments.
            </p>
            <p className="os-para" style={{ fontSize: '1vw', maxWidth: '30vw', marginBottom: '1vw' }}>
              Thoughtfully brewed to uplift your everyday<br/>with refreshment that feels good,<br/>inside and out.
            </p>

            <div className="os-cursive" style={{ fontSize: '2.5vw', marginTop: '1vw' }}>
              Better moments.<br/>Better together.
            </div>
          </div>

          {/* Right Grid Overlay Text */}
          <style>{`
            .grid-text-container {
              position: absolute;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              width: 14vw;
              transform: translateX(-50%);
            }
            .grid-icon {
              font-size: 1.2vw;
              margin-bottom: 0.5vw;
              color: #ffffff;
            }
            .grid-title {
              font-family: 'Inter', sans-serif;
              font-size: 0.8vw;
              font-weight: 700;
              color: #ffffff;
              letter-spacing: 0.05em;
              margin: 0 0 0.5vw 0;
            }
            .grid-body {
              font-family: 'Inter', sans-serif;
              font-size: 0.7vw;
              font-weight: 500;
              color: #ffffff;
              margin: 0;
              line-height: 1.4;
            }
          `}</style>

          <div className="os-bottom-grid">
            {/* Top Row */}
            <div className="grid-text-container os-grid-text-container" style={{ left: '43.5%', top: '9%' }}>
              <div className="grid-icon">☕</div>
              <h4 className="grid-title">CAFÉ CULTURE</h4>
              <p className="grid-body">Long talks. Good vibes.<br/>Better drinks.</p>
            </div>
            <div className="grid-text-container os-grid-text-container" style={{ left: '65.7%', top: '9%' }}>
              <div className="grid-icon">🎾</div>
              <h4 className="grid-title">SPORTS & MOVEMENT</h4>
              <p className="grid-body">Play hard.<br/>Refresh naturally.</p>
            </div>
            <div className="grid-text-container os-grid-text-container" style={{ left: '87.7%', top: '9%' }}>
              <div className="grid-icon">💻</div>
              <h4 className="grid-title">WORK & CREATIVITY</h4>
              <p className="grid-body">Focus better.<br/>Think fresher.</p>
            </div>

            {/* Bottom Row */}
            <div className="grid-text-container os-grid-text-container" style={{ left: '43.5%', top: '47%' }}>
              <div className="grid-icon">🎵</div>
              <h4 className="grid-title">MUSIC & COMMUNITY</h4>
              <p className="grid-body">Live music.<br/>Real people. Real vibe.</p>
            </div>
            <div className="grid-text-container os-grid-text-container" style={{ left: '65.7%', top: '47%' }}>
              <div className="grid-icon">🍴</div>
              <h4 className="grid-title">FOOD PAIRING</h4>
              <p className="grid-body">Pairs well with<br/>good food.</p>
            </div>
            <div className="grid-text-container os-grid-text-container" style={{ left: '87.7%', top: '47%' }}>
              <div className="grid-icon">📍</div>
              <h4 className="grid-title">TRAVEL & EXPLORATION</h4>
              <p className="grid-body">New places.<br/>Same good choice.</p>
            </div>
          </div>

          {/* Bottom Banner Container */}
          <div className="os-bottom-banner" style={{
            position: 'absolute',
            bottom: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <h3 className="os-title" style={{
              fontFamily: 'Playfair Display',
              fontSize: '2vw',
              color: '#3b2b20',
              margin: '0 0 1.5vw 0',
              fontWeight: 700
            }}>
              Taste The Emjay Story.
            </h3>
            <div className="os-btn-group" style={{ display: 'flex', gap: '1.5vw' }}>
              <a href="/#why-kombucha" style={{
                backgroundColor: '#4a5b48',
                color: '#ffffff',
                padding: '0.8vw 1.5vw',
                borderRadius: '50px',
                textDecoration: 'none',
                fontFamily: 'Inter',
                fontSize: '0.8vw',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}>
                EXPLORE OUR KOMBUCHA &rarr;
              </a>
              <a href="/#contact" style={{
                backgroundColor: 'transparent',
                color: '#4a5b48',
                border: '1px solid #4a5b48',
                padding: '0.8vw 1.5vw',
                borderRadius: '50px',
                textDecoration: 'none',
                fontFamily: 'Inter',
                fontSize: '0.8vw',
                fontWeight: 700,
                letterSpacing: '0.05em'
              }}>
                SCHEDULE A TASTING &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* ================= MOBILE CONTENT ================= */}
        <div className="os-mobile-only" style={{ width: '100%', lineHeight: 0, padding: 0 }}>
          <img src={mobileImgAsset4Full} alt="Our Story Section 4" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </section>

    </div>
  )
}

export default OurStory
