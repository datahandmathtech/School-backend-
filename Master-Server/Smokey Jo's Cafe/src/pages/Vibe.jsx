import { motion } from 'framer-motion'
import { Music, Coffee, ArrowLeft, Guitar } from 'lucide-react'
import lakeViewImg from '../assets/art_lake.png'

const Vibe = ({ onBack }) => {
  return (
    <div className="page-container-responsive">
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

      <div className="grid-2-col grid-reverse-mobile">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>The Acoustic Sunset Experience</h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--text-olive)', margin: '1rem 0' }}>Live Tunes <br /> Lake Sunset</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            Watch the sun dip behind the beautiful Lake Pichola while sipping a slow-dripped coffee or kombucha.
            We host talented local musicians playing live acoustic sets from our relaxed rooftop sanctuary,
            creating a warm, nostalgic atmosphere where you can fully unwind.
          </p>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {[{ icon: Guitar, label: 'Live Acoustic', desc: 'Soulful indie folk & blues' }, { icon: Coffee, label: 'Wood-Fired Brews', desc: 'Slow dripped artisan local roast' }].map((item, i) => (
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
            <img src={lakeViewImg} alt="Lake Pichola Sunset Deck" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Decorative floating acoustic symbol */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '100px',
              height: '100px',
              background: 'var(--bg-color)',
              borderRadius: '50%',
              border: '2px solid rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Guitar size={30} color="#fff" />
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
          <Music size={16} /> UPCOMING LIVE SESSIONS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { album: "Acoustic Blues Night", year: "Fri 7 PM", genre: "Local Artists" },
            { album: "Indie Folk & Chai", year: "Sat 6 PM", genre: "Singer/Songwriter" },
            { album: "Bossa Nova Sunsets", year: "Sun 5 PM", genre: "Instrumental" },
            { album: "Open Mic Cafe", year: "Wed 8 PM", genre: "Community" }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h4 style={{ color: 'var(--text-olive)', margin: 0, fontSize: '0.95rem' }}>{item.album}</h4>
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
