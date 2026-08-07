import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Heart, Shield, Compass, Droplet } from 'lucide-react'
import kombuchaImg from '../assets/house_kombucha.png'
import drinkPomegranate from '../assets/drink_pomegranate.png'

const Story = ({ onBack }) => {
  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: 'transparent', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '25%', left: '15%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '25%', right: '15%' }} />

      <motion.button
        onClick={onBack}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'var(--primary)', color: 'var(--primary)', marginBottom: '3rem' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to 3D Experience
      </motion.button>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ color: 'var(--accent)', fontSize: '0.95rem', letterSpacing: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>
            <Sparkles size={16} style={{ marginRight: '0.2rem' }} /> THE EMJAY STORY
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--light)', margin: '1rem 0' }}>
            A Small Brew with <br /> a Bigger Purpose
          </h1>
          <p className="description" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            In December 2021, Emjay Brewery began with a simple question: Why should choosing a healthier beverage mean compromising on taste, experience, or community?
            <br /><br />
            Born in the heart of Udaipur, Emjay was founded with a vision to introduce more people to the world of naturally fermented kombucha—a refreshing beverage crafted through the remarkable partnership of tea, time, and living cultures. Inspired by the growing need for mindful alternatives to conventional soft drinks, we set out to create something that was both enjoyable and beneficial.
            <br /><br />
            What started as small experimental batches soon evolved into a purpose-driven brewery dedicated to quality, sustainability, and wellness. Today, every bottle we craft reflects our commitment to traditional fermentation, conscious production, and helping people discover a healthier way to refresh and reconnect.
            <br /><br />
            <strong>Our Journey:</strong> Since our founding in 2021, we've refined our recipes, built a community of wellness enthusiasts in Udaipur, and stayed true to our roots of natural craftsmanship. We believe the future of beverages lies not in artificial ingredients or fleeting trends, but in timeless processes that have nourished communities for generations.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              { icon: Heart, label: 'Wellness Through Nature', desc: 'Crafting natural probiotic beverages that support your everyday health.' },
              { icon: Shield, label: 'The Power of Fermentation', desc: 'Harnessing living cultures to create naturally carbonated, complex flavors.' },
              { icon: Compass, label: 'Sustainable Business Practices', desc: 'Committed to conscious production, eco-friendly values, and community connection.' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(217, 138, 89, 0.12)', padding: '0.6rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                  <item.icon color="var(--primary)" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--light)', margin: 0, fontWeight: 700 }}>{item.label}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Images */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={{ width: '100%', height: '280px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(217,138,89,0.2)', boxShadow: '0 20px 45px rgba(0,0,0,0.2)' }}>
            <img src={kombuchaImg} alt="Emjay Kombucha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '100%', height: '200px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(217,138,89,0.2)', boxShadow: '0 20px 45px rgba(0,0,0,0.2)', position: 'relative' }}>
            <img src={drinkPomegranate} alt="Pomegranate Ginger Kombucha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,12,0.85) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplet size={14} color="var(--primary)" />
              <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>Authentic Natural Fermentation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Story
