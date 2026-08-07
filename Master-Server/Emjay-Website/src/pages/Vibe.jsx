import { motion } from 'framer-motion'
import { Music, Sparkles, Droplets, ArrowLeft, Thermometer, Calendar } from 'lucide-react'
import lakeViewImg from '../assets/lake_view_ambiance.png'

const Vibe = ({ onBack }) => {
  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: 'transparent', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '20%', left: '10%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '20%', right: '10%' }} />

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ color: 'var(--accent)', fontSize: '0.95rem', letterSpacing: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Sparkles size={16} style={{ marginRight: '0.2rem' }} /> OUR STORY
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--light)', margin: '1rem 0' }}>
            From Udaipur, <br /> With Purpose
          </h1>
          <p className="description" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            Emjay Brewery was founded with a simple vision: to create a beverage that is as enjoyable as it is beneficial. Inspired by the centuries-old tradition of kombucha fermentation, we set out to craft a product that combines great taste with natural wellness.
            <br /><br />
            Since 2021, we have been brewing small batches of kombucha in Udaipur, focusing on quality ingredients, careful fermentation, and authentic craftsmanship. Beyond brewing beverages, our mission is to build a community around healthier lifestyles, conscious choices, and sustainable growth.
            <br /><br />
            Today, Emjay Brewery continues to introduce more people to the world of kombucha while staying true to the values that inspired our journey from the very beginning.
          </p>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {[{ icon: Sparkles, label: 'OUR MISSION', desc: 'To make naturally fermented wellness beverages a part of everyday life while promoting healthier choices.' }, { icon: Droplets, label: 'WELLNESS', desc: 'Combining great taste with natural wellness and sustainable practices.' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(116, 159, 147, 0.12)', padding: '0.8rem', borderRadius: '12px' }}>
                  <item.icon color="var(--primary)" size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--light)', margin: 0, fontWeight: 600 }}>{item.label}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{item.desc}</p>
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
          <div style={{ width: '100%', maxWidth: '500px', height: '400px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(194, 123, 99, 0.25)', boxShadow: '0 20px 45px rgba(30, 53, 47, 0.08)' }}>
            <img src={lakeViewImg} alt="Lake Pichola Brewery Sunset Deck" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Decorative Clay Pot tied cloth overlay floating */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, var(--primary) 20%, var(--primary-dark) 80%)',
              borderRadius: '50%',
              border: '4px solid var(--dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(30, 53, 47, 0.15)'
            }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{ width: '50px', height: '50px', background: 'var(--dark)', borderRadius: '50%', border: '1px solid rgba(30, 53, 47, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets size={24} color="var(--primary)" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fermentation Logs & Today's spins section */}
      <motion.div
        className="glass-card"
        style={{ marginTop: '5rem', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(194, 123, 99, 0.15)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> WHAT WE STAND FOR
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            { title: "Handcrafted Small-Batch Brewing", icon: Thermometer, status: "Active Principle", value: "Everyday Wellness" },
            { title: "Naturally Fermented Kombucha", icon: Calendar, status: "Active Principle", value: "Everyday Wellness" },
            { title: "Community-Centered Growth", icon: Droplets, status: "Active Principle", value: "Everyday Wellness" },
            { title: "Sustainable & Responsible Practices", icon: Droplets, status: "Active Principle", value: "Everyday Wellness" }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(10,15,12,0.55)', padding: '1.2rem', borderRadius: '14px', border: '1px solid rgba(217,138,89,0.1)', backdropFilter: 'blur(8px)' }}>
              <h4 style={{ color: 'var(--light)', margin: 0, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                <item.icon size={14} color="var(--primary)" /> {item.title}
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>{item.status}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Vibe
