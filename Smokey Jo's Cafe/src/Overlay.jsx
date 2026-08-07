import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, Instagram, Disc, Sparkles, ArrowDown } from 'lucide-react'
import logoImg from './assets/logo.png'

const Overlay = () => {
  return (
    <div className="content">

      {/* Hero Section */}
      <section className="section" id="home">
        <div className="grid-2-col" style={{ height: '100%', width: '100%' }}>
          <motion.div
            className="section-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="subtitle">Udaipur's Hillside Sanctuary</h2>
            
            <h1 className="hero-title">
              Rustic Vegan <br />
              <span className="highlight">For The Soul</span>
            </h1>
            
            <p className="description" style={{ maxWidth: '480px' }}>
              Smokey Jo's is a tranquil open-air vegan haven nestled in Chandpole, Udaipur. We pair house-made organic sourdough, fresh cold brews, and hand-rolled pasta with live, soulful acoustic guitar sets played against the stunning rooftop backdrop of Lake Pichola.
            </p>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
              <a href="#vibe" className="btn-primary">
                Discover the Vibe
              </a>
            </div>
            
            <motion.div 
              style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2rem', fontWeight: 'bold' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown size={16} /> Scroll to explore
            </motion.div>
          </motion.div>
          {/* Right column is empty to allow the 3D Vinyl to shine! */}
          <div></div>
        </div>
      </section>

      {/* Vibe Section */}
      <section className="section" id="vibe">
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <motion.div 
            className="section-content glass-card"
            style={{ maxWidth: '500px', padding: '3rem', borderRadius: '24px', borderLeft: '4px solid var(--primary)', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="subtitle">The Acoustic Experience</h2>
            <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Live Tunes & <br/><span className="highlight">Sunsets</span></h1>
            <p className="description">
              Watch the sun dip behind Lake Pichola while sipping a slow-dripped coffee or our house-brewed kombucha. Every evening features live, hand-picked acoustic guitar sets and soft soulful melodies, creating a warm, nostalgic atmosphere where you can fully unwind in our chilled-out rooftop sanctuary.
            </p>

            <div style={{ marginTop: '2.5rem' }}>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--primary-dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                <Sparkles size={16} /> Live Acoustic Today
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {["Local Indie Folk Sets", "Soulful Bossa Nova", "Soft Valley Blues"].map((album, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-olive)', letterSpacing: '0.05rem', fontWeight: 600 }}>
                      {album}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Food Section */}
      <section className="section" id="food" style={{ alignItems: 'flex-end' }}>
        <motion.div 
          className="section-content"
          style={{ maxWidth: '500px', textAlign: 'right' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ justifyContent: 'flex-end' }}>Organic & Crafted</h2>
          <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>Food Menu</h1>
          <p className="description" style={{ marginLeft: 'auto' }}>
            Our food is entirely vegan, highlighting fresh, house-made pastas, custom-baked country breads, and slow-cooked organic ingredients sourced directly from local Rajasthani farms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              { name: "Pesto Tofu Sandwich", price: "₹320" },
              { name: "Handmade Sourdough Pasta", price: "₹380" },
              { name: "Jackfruit Sloppy Joe", price: "₹310" },
              { name: "Pumpkin Oats Burger", price: "₹290" },
              { name: "Vegan Mac & Cheese", price: "₹350" },
              { name: "Classic Margherita Pizza", price: "₹450" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="glass-card"
                style={{ padding: '1.2rem 1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)', textAlign: 'left', border: '1px solid var(--border-color)' }}
                whileHover={{ scale: 1.02, borderColor: 'var(--primary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text-olive)', margin: 0 }}>{item.name}</h3>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{item.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Drinks Section */}
      <section className="section" id="drinks">
        <motion.div
          className="section-content"
          style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="subtitle" style={{ justifyContent: 'center' }}>Botanical Elixirs</h2>
            <h1 className="hero-title" style={{ fontSize: '3.5rem' }}>Drinks & Breakfast</h1>
          </div>

          <div className="grid-2-col" style={{ alignItems: 'start' }}>
            {[
              { name: "House-Brewed Kombucha", desc: "14-day double-fermentation in organic clay jars, infused with wild mountain blueberries.", price: "₹180" },
              { name: "Vibrant Berry Smoothie Bowl", desc: "Velvety blend of organic forest berries and bananas, topped with our house granola.", price: "₹250" },
              { name: "Fresh Watermelon Basil", desc: "Cold-pressed local watermelon juice with a hint of fresh basil leaves.", price: "₹160" },
              { name: "Golden Turmeric Latte", desc: "Warm almond milk infused with fresh turmeric, black pepper, and cinnamon.", price: "₹200" },
              { name: "Green Detox Cold-Press", desc: "Spinach, celery, green apple, and ginger pressed fresh every morning.", price: "₹190" },
              { name: "Artisanal Pour-Over", desc: "Freshly ground single-origin Araku Valley organic beans slowly hand-drip brewed.", price: "₹220" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '20px', background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(10px)' }}
              >
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-olive)', marginBottom: '0.5rem' }}>{item.name}</h3>
                <span style={{ color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>{item.price}</span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="section" id="story">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '500px', width: '100%', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(10px)' }}
          >
            <h2 className="subtitle">Slow-Food Philosophy</h2>
            <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Crafted Bread <br/><span className="highlight">Earthy Roots</span></h1>
            <p className="description">
              We are a 100% vegan kitchen dedicated to cruelty-free comfort food. Every loaf of sourdough we serve is baked right here, and all our rich sauces and decadent desserts are crafted completely in-house from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact" style={{ padding: '10rem 10%' }}>
        <div className="grid-contact">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1 }}
          >
            <h2 className="subtitle">Come Experience</h2>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>The Hillside <br/> <span className="highlight">Garden Deck</span></h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <MapPin color="var(--primary)" size={20} style={{ marginTop: '5px' }} />
                <div>
                  <h4 style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: 600 }}>Location</h4>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5', fontWeight: 500 }}>Chandpole, Udaipur<br/>Rajasthan 313001</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <Clock color="var(--primary)" size={20} style={{ marginTop: '5px' }} />
                <div>
                  <h4 style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--primary-dark)', marginBottom: '0.5rem', fontWeight: 600 }}>Hours</h4>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5', fontWeight: 500 }}>05:00 PM — 10:00 PM<br/>Closed Mondays</p>
                </div>
              </div>
            </div>

            <motion.a
              href="https://www.instagram.com/smokey.jos.cafe/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', marginTop: '4rem', color: 'var(--text-olive)', textDecoration: 'none', fontFamily: 'Montserrat', fontSize: '0.8rem', letterSpacing: '0.1rem', textTransform: 'uppercase', fontWeight: 600 }}
              whileHover={{ color: 'var(--primary)' }}
            >
              <Instagram size={18} /> Follow on Instagram
            </motion.a>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--text-olive)', marginBottom: '2rem', textAlign: 'center' }}>Reserve a Table</h3>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Reservation Request Received!'); }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Enter your name" required />
              </div>
              
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-input" placeholder="+91" required />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                Request Reservation
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Overlay
