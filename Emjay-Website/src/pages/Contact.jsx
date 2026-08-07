import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Phone, ArrowRight, Sparkles, Heart, ArrowLeft } from 'lucide-react'

const Contact = ({ onBack }) => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const guests = formData.get('guests');
    const notes = formData.get('notes');

    const message = `Hello Emjay Brewery! I would like to request a table reservation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Guests:* ${guests}\n*Special Requests:* ${notes || 'None'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919116741952?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setFormSubmitted(true)
  }

  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: 'transparent', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '10%', right: '10%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '10%', left: '10%' }} />

      <motion.button
        onClick={onBack}
        className="btn-primary"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'transparent',
          borderColor: 'var(--primary)', 
          color: 'var(--primary)', 
          marginBottom: '3rem',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to 3D Experience
      </motion.button>

      <div className="contact-grid">
        {/* Left Column: Brewery Details Card */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ 
            textAlign: 'left', 
            padding: '2rem', 
            borderLeft: '4px solid var(--primary)', 
            borderTop: '1px solid rgba(194, 123, 99, 0.15)',
            borderRight: '1px solid rgba(194, 123, 99, 0.15)',
            borderBottom: '1px solid rgba(194, 123, 99, 0.15)',
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1.2rem', 
            justifyContent: 'space-between',
            boxShadow: '0 20px 45px rgba(30, 53, 47, 0.05)'
          }}
        >
          <div>
            <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.8rem', letterSpacing: '0.15rem' }}>
              <MapPin size={14} color="var(--primary)" /> CHANDPOLE DECK
            </h2>
            <h1 className="hero-title" style={{ fontSize: '2.5rem', color: 'var(--light)', margin: '0.5rem 0 0.8rem 0', lineHeight: 1.15 }}>The Pichola Brew Room</h1>
            <p className="description" style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.2rem' }}>
              We are tucked away in the historic waterfront alleys of Gadiya Devra Road, facing Lake Pichola in Udaipur. Follow the winding streets to the water's edge and join us on our terrace deck.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {[
                "🌅 Scenic Sunset Lake Overlooks",
                "🏺 Traditional Clay Matka Fermentation Tours",
                "🍹 Probiotic Kombucha Tasting Flights"
              ].map((exp, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: 'var(--light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.7rem' }}>●</span> {exp}
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Contact Details Row */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid rgba(30, 53, 47, 0.08)', paddingTop: '1.2rem' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(217, 138, 89, 0.12)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <MapPin color="var(--primary)" size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)', fontWeight: 700 }}>Location</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>36 Chandpole, Gadiya Devra Road, Udaipur, RJ 313001</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(116, 159, 147, 0.12)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <Clock color="var(--primary)" size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)', fontWeight: 700 }}>Hours</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>05:00 PM — 10:00 PM (Closed Mondays)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <div style={{ background: 'rgba(116, 159, 147, 0.12)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <Phone color="var(--primary)" size={18} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)', fontWeight: 700 }}>Contact</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>+91 91167 41952 | emjaybrewery@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Premium Table Reservation Form */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ padding: '2rem', border: '1px solid rgba(194, 123, 99, 0.15)', display: 'flex', flexDirection: 'column', gap: '1.2rem', justifyContent: 'space-between', boxShadow: '0 20px 45px rgba(30, 53, 47, 0.05)' }}
        >
          {formSubmitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '350px', textAlign: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(116, 159, 147, 0.12)', padding: '1.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--primary)', marginBottom: '1rem' }}>
                <Sparkles size={40} color="var(--primary)" />
              </div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--light)', margin: 0 }}>Request Logged!</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', maxWidth: '300px', lineHeight: '1.6' }}>
                We have received your table request at Chandpole. Our host will text you shortly with a confirmation slip!
              </p>
              <button onClick={() => setFormSubmitted(false)} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.85rem', marginTop: '1rem' }}>
                Book Another Table
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.8rem', letterSpacing: '0.15rem' }}>
                  <Sparkles size={14} color="var(--primary)" /> WATERFRONT RESERVATION
                </h2>
                <h1 className="hero-title" style={{ fontSize: '2.5rem', color: 'var(--light)', margin: '0.5rem 0 0.8rem 0', lineHeight: 1.15 }}>Book Your Experience</h1>
                <p className="description" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.2rem' }}>
                  Secure a lakeside table for fresh kombucha under Udaipur's golden hour sun. We save the finest sunset spots for reservations!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Name field */}
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" placeholder="Your Full Name" required className="form-input" style={{ padding: '0.7rem 1.1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Contact field */}
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required className="form-input" style={{ padding: '0.7rem 1.1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Date & Guests Row */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date</label>
                      <input type="date" name="date" required className="form-input" style={{ padding: '0.7rem 1.1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Guests</label>
                      <select name="guests" required className="form-input" style={{ padding: '0.7rem 1.1rem 2rem 1.1rem', borderRadius: '10px', fontSize: '0.85rem', appearance: 'none', background: 'rgba(255,255,255,0.6) url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' fill=\'%23c27b63\'><polygon points=\'0,0 10,0 5,5\'/></svg>") no-repeat right 1rem center' }}>
                        <option value="2" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>2 People</option>
                        <option value="3" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>3 People</option>
                        <option value="4" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>4 People</option>
                        <option value="6" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>6+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Note field */}
                  <div className="form-group">
                    <label className="form-label">Special Requests (Deck railing, sunset seats, etc.)</label>
                    <textarea name="notes" rows="2" placeholder="I would love a table right on the deck railing!" className="form-input" style={{ padding: '0.7rem 1.1rem', borderRadius: '10px', fontSize: '0.85rem', resize: 'none' }}></textarea>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.85rem', marginTop: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: 'none', fontSize: '0.85rem' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Table Reservation <ArrowRight size={15} />
                </motion.button>

                <div style={{ marginTop: '1.2rem', borderTop: '1px solid rgba(30, 53, 47, 0.08)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08rem' }}>
                  <span>BREWED WITH <Heart size={10} style={{ display: 'inline', color: 'var(--primary)' }} /> IN UDAIPUR</span>
                  <span>© 2026 EMJAY BREWERY</span>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Contact
