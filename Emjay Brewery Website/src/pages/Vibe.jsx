import { motion } from 'framer-motion'
import { Music, Disc, Coffee, ArrowLeft } from 'lucide-react'
import lakeViewImg from '../assets/lake_view_ambiance.png'

const Vibe = ({ onBack }) => {
  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: '#1a130f', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '20%', left: '10%' }} />
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>The Vinyl & Sunset Experience</h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--light)', margin: '1rem 0' }}>Retro Tunes <br /> Valley Sunset</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            Watch the sun dip behind the rolling Aravalli hills while sipping a slow-dripped coffee.
            We play hand-picked 1960s and 70s rock, blues, and jazz vinyls on our custom turntable,
            creating a warm, nostalgic atmosphere where you can fully unwind.
          </p>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {[{ icon: Disc, label: 'Analog Vinyls', desc: 'Original rare records from 60s & 70s' }, { icon: Coffee, label: 'Wood-Fired Brews', desc: 'Slow dripped artisan local roast' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,163,115,0.1)', padding: '0.8rem', borderRadius: '12px' }}>
                  <item.icon color="#d4a373" size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', margin: 0 }}>{item.label}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={{ width: '100%', maxWidth: '500px', height: '400px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src={lakeViewImg} alt="Palri Hillside Sunset Deck" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Decorative Vinyl Record floating */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, #222 20%, #111 60%, #000 100%)',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Disc size={20} color="#111" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Spinning Collective Section */}
      <motion.div
        className="glass-card"
        style={{ marginTop: '5rem', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Music size={16} /> TODAY'S SPINNING COLLECTIVE
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { album: "Pink Floyd — Dark Side", year: "1973", genre: "Progressive Rock" },
            { album: "Bob Dylan — Highway 61", year: "1965", genre: "Folk Rock / Blues" },
            { album: "Jimi Hendrix — Ladyland", year: "1968", genre: "Psychedelic Rock" },
            { album: "Led Zeppelin — IV", year: "1971", genre: "Hard Rock" }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h4 style={{ color: 'var(--light)', margin: 0, fontSize: '0.95rem' }}>{item.album}</h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>{item.genre}</span>
                <span style={{ color: 'var(--primary)' }}>{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Vibe
