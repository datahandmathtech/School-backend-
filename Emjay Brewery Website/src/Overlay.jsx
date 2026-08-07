import { motion, useScroll, useTransform } from 'framer-motion'
import { Coffee, MapPin, Clock, Phone, ArrowRight, Instagram, Disc, Heart, Leaf, Music, Sparkles } from 'lucide-react'
import logoImg from './assets/logo.png'

const Overlay = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.85])

  return (
    <div className="content">
      {/* Floating Organic Glow Orbs in the Background */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Section Content */}

      <section className="section" id="home" style={{ alignItems: 'flex-start', paddingTop: '100px' }}>
        <motion.div
          className="section-content"
          style={{ opacity, scale }}
        >
          <motion.h2
            className="subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Udaipur's Hillside Sanctuary — Nestled in Palri
          </motion.h2>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ color: 'var(--primary)' }}
          >
            Pure Vegan <br /> Crafted for <span style={{ color: 'var(--light)', fontStyle: 'italic', fontFamily: 'Playfair Display' }}>The Soul</span>
          </motion.h1>
          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Smokey Jo's is a tranquil open-air vegan haven nestled in the serene valley of Palri,
            tucked by the side of a peaceful hill. We pair house-made organic sourdough, fresh cold brews,
            and hand-rolled pasta with the crackle of vintage 60s and 70s classic vinyl records.
          </motion.p>

          {/* Elegant Organic Pledge bullet metadata */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '2.5rem', width: '100%', maxWidth: '520px' }}
          >
            {[
              "🌿 100% Certified Vegan & Dairy-Free",
              "🍞 Stone-Ground Sourdough Baked Daily",
              "🎵 Analog 60s & 70s Rock Vinyls",
              "⛰️ Unrivaled Valley & Hillside Views"
            ].map((text, i) => (
              <span key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.02rem' }}>
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', gap: '1.5rem' }}
          >
            <a href="#vibe" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Begin Journey <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-primary" style={{ backgroundColor: 'transparent', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
              Find Us
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3rem', color: 'var(--primary)' }}>Scroll to Spin</p>
          <div className="mouse" style={{ borderColor: 'var(--primary)' }}>
            <div className="wheel"></div>
          </div>
        </motion.div>
      </section>

      <section className="section" id="vibe">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <motion.div
            className="section-content glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ borderRight: '4px solid var(--primary)', maxWidth: '480px', width: '100%' }}
          >
            <h2 className="subtitle">The Vinyl & Sunset Experience</h2>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--light)' }}>Retro Tunes <br /> Valley Sunset</h1>
            <p className="description" style={{ marginBottom: '1.5rem' }}>
              Watch the sun dip behind the rolling Aravalli hills while sipping a slow-dripped coffee.
              We play hand-picked 1960s and 70s rock, blues, and jazz vinyls on our custom turntable,
              creating a warm, nostalgic atmosphere where you can fully unwind.
            </p>

            {/* Rich Content Addition: Today's Spins */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
                <Music size={14} /> TODAY'S SPINNING COLLECTIVE
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {["Pink Floyd — Dark Side", "Bob Dylan — Highway 61", "Jimi Hendrix — Ladyland", "Led Zeppelin — IV"].map((album, i) => (
                  <span key={i} style={{ fontSize: '0.73rem', background: 'rgba(255,255,255,0.04)', padding: '0.3rem 0.7rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                    {album}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'flex-end' }}>
              {[{ icon: Disc, label: 'Analog Vinyls' }, { icon: Coffee, label: 'Wood-Fired Brews' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <item.icon color="#d4a373" size={32} />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)', textAlign: 'center' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" id="food">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '580px', width: '100%' }}
          >
            <h2 className="subtitle"><Leaf size={16} color="var(--primary)" /> Gourmet Mains</h2>
            <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0, color: 'var(--primary)', marginBottom: '1.2rem' }}>Crafted Food Menu</h1>
            <p className="description" style={{ marginBottom: '1.8rem', fontSize: '0.95rem' }}>
              Our food is entirely vegan, highlighting fresh, house-made pastas, custom-baked breads, and slow-cooked ingredients.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%' }}>
              {[
                { name: "Pumpkin Oats Burger", desc: "House-crafted baked pumpkin & roasted oats patty, organic avocado mash, local garden greens, custom cashew cream spread, with hand-cut cajun fries.", price: "₹290" },
                { name: "Hand-Rolled Pesto Tagliatelle", desc: "Fresh artisanal tagliatelle hand-rolled hourly, tossed in wild home-grown basil pesto, Udaipur cold-pressed olive oil, toasted pine nuts, cashew parmesan.", price: "₹340" },
                { name: "BBQ Jackfruit Sloppy Joe", desc: "Smoky organic pulled jackfruit slow-cooked for 6 hours in our sweet-spicy BBQ glaze, served on a toasted sourdough roll with vegan purple cabbage slaw.", price: "₹310" },
                { name: "Roasted Roots & Hummus", desc: "Warm wood-roasted locally sourced sweet potatoes, baby carrots, and beets served over a velvety bed of traditional stone-ground moong dal hummus.", price: "₹260" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  style={{ padding: '1.2rem', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--primary)', fontFamily: 'Outfit', fontWeight: 600 }}>{item.name}</h3>
                    <span className="price" style={{ fontSize: '1.05rem', color: 'var(--light)' }}>{item.price}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.45' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section" id="drinks">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '580px', width: '100%', alignSelf: 'flex-start', marginLeft: 0, marginRight: 'auto' }}
          >
          <h2 className="subtitle"><Leaf size={16} color="var(--primary)" /> Botanical Elixirs</h2>
          <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0, color: 'var(--primary)', marginBottom: '1.2rem' }}>Drinks & Breakfast</h1>
          <p className="description" style={{ marginBottom: '1.8rem', fontSize: '0.95rem' }}>
            From in-house fermented sparkling kombucha to slow pour-over single-origin coffees and refreshing berry bowls.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%', textAlign: 'left' }}>
            {[
              { name: "House-Brewed Kombucha", desc: "14-day double-fermentation in organic clay jars, infused with wild mountain blueberries, forest raspberries, and hand-picked garden mint.", price: "₹180" },
              { name: "Artisanal Pour-Over Coffee", desc: "Freshly ground single-origin Araku Valley organic beans slowly hand-drip brewed, served over ice with house-made creamy raw coconut or oat milk.", price: "₹220" },
              { name: "Vibrant Berry Smoothie Bowl", desc: "A velvety blend of organic forest berries and bananas, topped with sliced local strawberries, organic blueberries, toasted chia seeds, and coconut flakes.", price: "₹250" },
              { name: "Avocado Sourdough Toast", desc: "Smashed Haas avocado, garden-grown cherry tomatoes, garlic oil, microgreens, and Himalayan rock salt served on our signature wood-fired country sourdough.", price: "₹270" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-card"
                style={{ padding: '1.2rem', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--primary)', fontFamily: 'Outfit', fontWeight: 600 }}>{item.name}</h3>
                  <span className="price" style={{ fontSize: '1.05rem', color: 'var(--light)' }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.45' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        </div>
      </section>

      <section className="section" id="story">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ borderLeft: '4px solid var(--primary)', maxWidth: '480px', width: '100%' }}
          >
            <h2 className="subtitle">The Slow-Food Sourdough Philosophy</h2>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--light)' }}>Crafted Bread <br /> Earthy Roots</h1>
            <p className="description" style={{ fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Every loaf of sourdough we serve is baked right here in our open-air valley kitchen.
              We use stone-ground ancient grains, wild yeast cultures, and a **36-hour slow fermentation process**.
              This results in bread that is incredibly light, naturally digestible, and bursting with complex flavors.
              We partner directly with organic farmers across Rajasthan to ensure every root, seed, and herb is grown with respect for the earth.
            </p>

            {/* Rich Content Addition: Sourdough varieties list */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--primary)', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={13} /> SIGNATURE BREAD SELECTIONS
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {[
                  "🍞 Country Sourdough Loaf",
                  "🌿 Mediterranean Olive & Rosemary",
                  "🌾 Golden Turmeric & Pumpkin Seed",
                  "🍂 Pecan & Wild Raw Fig"
                ].map((bread, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {bread}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Contact & Visit */}
      <section className="section" id="contact" style={{ height: 'auto', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 10%' }}>
        <div className="contact-grid">
          
          {/* Left Column: Cafe Details Card */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'left', padding: '1.6rem', borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'space-between', height: '100%' }}
          >
            <div>
              <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.75rem', letterSpacing: '0.15rem' }}><MapPin size={14} color="var(--primary)" /> COME EXPERIENCE</h2>
              <h1 className="hero-title" style={{ fontSize: '2.1rem', color: 'var(--light)', margin: '0.3rem 0 0.6rem 0', lineHeight: 1.15 }}>The Hillside Garden Deck</h1>
              <p className="description" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                Follow the music. Feel the fresh mountain breeze. Experience the organic slow-soul food of Udaipur tucked beside the peaceful Aravalli hills.
              </p>

              {/* Event tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                {[
                  "✨ Private Hillside Tasting Menus",
                  "🎤 Saturday Acoustic Vinyl Sessions",
                  "🧪 Sourdough Fermentation Workshops"
                ].map((exp, i) => (
                  <div key={i} style={{ fontSize: '0.75rem', color: 'var(--primary-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>●</span> {exp}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Contact Icons Row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <MapPin color="#d4a373" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Location</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>Palri, Udaipur, Rajasthan 313011</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <Clock color="#d4a373" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Hours</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>05:00 PM — 10:00 PM (Closed Mondays)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <Phone color="#d4a373" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Contact</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>+91 91167 41952 | smokeyjos@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem' }}>
                <motion.a
                  href="https://www.instagram.com/smokey.jos.cafe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, color: 'var(--primary)' }}
                  style={{ color: 'var(--light)', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontSize: '0.8rem' }}
                >
                  <Instagram size={15} /> Follow our latest posts on Instagram
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Table Reservation Form */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '1.6rem', border: '1px solid rgba(212,163,115,0.2)', display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'space-between', height: '100%' }}
          >
            <form onSubmit={(e) => { e.preventDefault(); alert('Reservation Request Received! We will text you shortly to confirm.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.75rem', letterSpacing: '0.15rem' }}><Sparkles size={14} color="var(--primary)" /> RESERVE A TABLE</h2>
                <h1 className="hero-title" style={{ fontSize: '2.1rem', color: 'var(--light)', margin: '0.3rem 0 0.6rem 0', lineHeight: 1.15 }}>Book Your Experience</h1>
                <p className="description" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.8rem' }}>
                  Secure a cozy spot on our deck overlooking the Udaipur mountains. We will save the best vinyl spins for you!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {/* Name field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Full Name</label>
                    <input type="text" placeholder="Abhay Patel" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Contact field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Date & Guests Row */}
                  <div className="form-row" style={{ gap: '0.8rem' }}>
                    <div className="form-group" style={{ gap: '0.3rem' }}>
                      <label className="form-label">Date</label>
                      <input type="date" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                    </div>
                    <div className="form-group" style={{ gap: '0.3rem' }}>
                      <label className="form-label">Guests</label>
                      <select required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem', appearance: 'none', background: 'rgba(255,255,255,0.02) url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' fill=\'%23d4a373\'><polygon points=\'0,0 10,0 5,5\'/></svg>") no-repeat right 1rem center' }}>
                        <option value="2" style={{ backgroundColor: '#130f0c' }}>2 People</option>
                        <option value="3" style={{ backgroundColor: '#130f0c' }}>3 People</option>
                        <option value="4" style={{ backgroundColor: '#130f0c' }}>4 People</option>
                        <option value="6" style={{ backgroundColor: '#130f0c' }}>6+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Note field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Special Requests (Vinyl, allergy etc.)</label>
                    <textarea rows="2" placeholder="I would love a table close to the speaker!" className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem', resize: 'none' }}></textarea>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.8rem', marginTop: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none', fontSize: '0.82rem' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Table Reservation <ArrowRight size={15} />
                </motion.button>

                <div style={{ marginTop: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1rem' }}>
                  <span>HAND-CRAFTED WITH <Heart size={10} style={{ display: 'inline', color: 'var(--primary)' }} /> IN UDAIPUR</span>
                  <span>© 2026 SMOKEY JO'S</span>
                </div>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Overlay
