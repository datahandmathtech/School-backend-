import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, ArrowLeft, Instagram, Sparkles, ArrowRight, Heart } from 'lucide-react'

const Contact = ({ onBack }) => {
  return (
    <div className="page-container-responsive">
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '15%', left: '10%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '20%', right: '10%' }} />

      <motion.button
        onClick={onBack}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'var(--primary)', color: 'var(--primary)', marginBottom: '3rem' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to 3D Experience
      </motion.button>

      {/* Main Grid */}
      <div className="grid-contact">
        
        {/* Left Column: Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card"
          style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary)', background: 'rgba(255,255,255,0.02)' }}
        >
          <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.85rem', letterSpacing: '0.2rem', color: 'var(--primary)' }}>
            <MapPin size={16} /> COME EXPERIENCE
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--text-olive)', margin: '1rem 0' }}>The Hillside Garden Deck</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2rem' }}>
            Follow the music. Feel the fresh mountain breeze. Experience the organic slow-soul food of Udaipur tucked beside the peaceful Aravalli hills of Palri.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {[
              "✨ Private Hillside Tasting Menus & Private Dining",
              "🎤 Saturday Acoustic & Vintage Vinyl Record Listening Sessions",
              "🧪 Sourdough Fermentation & Baking Workshops"
            ].map((exp, i) => (
              <div key={i} style={{ fontSize: '0.9rem', color: 'var(--primary-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)' }}>●</span> {exp}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.6rem', borderRadius: '10px' }}>
                <MapPin color="#d4a373" size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Location</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Palri, Udaipur, Rajasthan 313011</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.6rem', borderRadius: '10px' }}>
                <Clock color="#d4a373" size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Hours</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>05:00 PM — 10:00 PM (Closed Mondays)</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.6rem', borderRadius: '10px' }}>
                <Phone color="#d4a373" size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary-light)' }}>Contact</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>+91 91167 41952 | smokeyjos@gmail.com</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
            <motion.a
              href="https://www.instagram.com/smokey.jos.cafe/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, color: 'var(--primary)' }}
              style={{ color: 'var(--text-olive)', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              <Instagram size={18} /> Follow our latest hillside moments on Instagram
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card"
          style={{ padding: '2.5rem', border: '1px solid rgba(212,163,115,0.2)' }}
        >
          <form onSubmit={(e) => { e.preventDefault(); alert('Reservation Request Received! We will text you shortly to confirm.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.85rem', letterSpacing: '0.2rem', color: 'var(--primary)' }}>
                <Sparkles size={16} color="var(--primary)" /> RESERVE A TABLE
              </h2>
              <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--text-olive)', margin: '1rem 0' }}>Book Your Experience</h1>
              <p className="description" style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Secure a cozy spot on our deck overlooking the Udaipur mountains. We will save the best vinyl spins for you!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group" style={{ gap: '0.4rem' }}>
                <label className="form-label">Full Name</label>
                <input type="text" placeholder="John Doe" required className="form-input" style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem' }} />
              </div>

              <div className="form-group" style={{ gap: '0.4rem' }}>
                <label className="form-label">Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required className="form-input" style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem' }} />
              </div>

              <div className="form-row-responsive">
                <div className="form-group" style={{ gap: '0.4rem' }}>
                  <label className="form-label">Date</label>
                  <input type="date" required className="form-input" style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', width: '100%' }} />
                </div>
                <div className="form-group" style={{ gap: '0.4rem' }}>
                  <label className="form-label">Guests</label>
                  <select required className="form-input" style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', width: '100%', appearance: 'none', background: 'rgba(255,255,255,0.02) url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' fill=\'%23d4a373\'><polygon points=\'0,0 10,0 5,5\'/></svg>") no-repeat right 1.2rem center' }}>
                    <option value="2" style={{ backgroundColor: '#ffffff' }}>2 People</option>
                    <option value="3" style={{ backgroundColor: '#ffffff' }}>3 People</option>
                    <option value="4" style={{ backgroundColor: '#ffffff' }}>4 People</option>
                    <option value="6" style={{ backgroundColor: '#ffffff' }}>6+ People</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ gap: '0.4rem' }}>
                <label className="form-label">Special Requests (Vinyl, allergy etc.)</label>
                <textarea rows="3" placeholder="I would love a table close to the speaker!" className="form-input" style={{ padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', resize: 'none' }}></textarea>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', border: 'none', fontSize: '0.9rem' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Request Table Reservation <ArrowRight size={16} />
            </motion.button>

            <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1rem' }}>
              <span>HAND-CRAFTED WITH <Heart size={10} style={{ display: 'inline', color: 'var(--primary)' }} /> IN UDAIPUR</span>
              <span>© 2026 SMOKEY JO'S</span>
            </div>
          </form>
        </motion.div>

      </div>
    </div>
  )
}

export default Contact
