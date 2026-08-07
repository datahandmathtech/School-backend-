import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Heart, ShieldCheck } from 'lucide-react'
import breadImg from '../assets/art_bread.png'

const Story = ({ onBack }) => {
  return (
    <div className="page-container-responsive">
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '25%', left: '10%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '15%', right: '10%' }} />

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
      <div className="grid-2-col grid-reverse-mobile">
        
        {/* Story details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>100% Vegan & Cruelty-Free</h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--text-olive)', margin: '1rem 0' }}>Crafted Bread <br /> Earthy Roots</h1>
          <p className="description" style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
            We are a 100% vegan kitchen dedicated to cruelty-free comfort food. Every single loaf of sourdough we serve is baked fresh right here in our open-air kitchen. We use stone-ground ancient grains, wild yeast cultures, and a **36-hour slow cold fermentation process**. 
            <br /><br />
            Our commitment to quality means no shortcuts. From our rich savory sauces to our decadent desserts, absolutely everything is crafted completely in-house from scratch. We partner directly with local farmers across Rajasthan to ensure our ingredients are grown with ultimate respect for the earth and soil.
          </p>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
            {[{ icon: Heart, label: 'Earthy & Organic', desc: 'Zero preservatives or chemical additives' }, { icon: ShieldCheck, label: 'Easy Digestion', desc: 'Slow 36-hr yeast pre-digested gluten' }].map((item, i) => (
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

        {/* Image Display */}
        <motion.div
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={{ width: '100%', maxWidth: '500px', height: '400px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <img src={breadImg} alt="Smokey Jo's Country Wood-Fired Sourdough" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>

      {/* Signature Selections */}
      <motion.div
        className="glass-card"
        style={{ marginTop: '5rem', padding: '2.5rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)' }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> SIGNATURE BREAD SELECTIONS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {[
            { name: "🍞 Country Sourdough Loaf", desc: "Our original classic baked with organic stone-ground whole wheat and wild yeast starter." },
            { name: "🌿 Mediterranean Olive & Rosemary", desc: "Loaded with kalamata olives, wild-harvested valley rosemary, and extra virgin olive oil." },
            { name: "🌾 Golden Turmeric & Pumpkin Seed", desc: "Golden crumb infused with local organic haldi, toasted pumpkin seeds, and cracked pepper." },
            { name: "🍂 Pecan & Wild Raw Fig", desc: "Sweet and nutty sourdough packed with dry forest figs and toasted wild pecans." }
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
              <h4 style={{ color: 'var(--text-olive)', margin: 0, fontSize: '1rem' }}>{item.name}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0.4rem 0 0 0', lineHeight: '1.4' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Story
