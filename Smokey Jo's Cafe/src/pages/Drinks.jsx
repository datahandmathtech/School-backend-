import { motion } from 'framer-motion'
import { Leaf, ArrowLeft } from 'lucide-react'
import kombuchaImg from '../assets/art_kombucha.png'
import smoothieImg from '../assets/art_smoothie.png'

const Drinks = ({ onBack }) => {
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
      <div className="grid-2-col-asym grid-reverse-mobile" style={{ alignItems: 'start' }}>
        
        {/* Menu list */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '0.2rem', textTransform: 'uppercase' }}>
            <Leaf size={16} /> Botanical Elixirs
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--primary)', margin: '1rem 0' }}>Drinks & Breakfast</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
            Indulge in our gut-friendly ferments and superfood bowls. From double-fermented clay jar kombuchas to slow hand-drip organic coffees sourced from India's premium high-altitude Araku Valley.
          </p>

          <div className="grid-2-col" style={{ alignItems: 'stretch' }}>
            {[
              { name: "House-Brewed Kombucha", desc: "14-day double-fermentation in organic clay jars, infused with wild mountain blueberries, forest raspberries, and hand-picked garden mint.", price: "₹180" },
              { name: "Fresh Watermelon Basil Juice", desc: "Refreshing cold-pressed local watermelon juice with a hint of freshly picked sweet basil leaves.", price: "₹160" },
              { name: "Vibrant Berry Smoothie Bowl", desc: "A velvety blend of organic forest berries and bananas, topped with sliced local strawberries, organic blueberries, toasted chia seeds, and coconut flakes.", price: "₹250" },
              { name: "Green Detox Cold-Press", desc: "Spinach, celery, green apple, cucumber, and ginger cold-pressed fresh every morning for ultimate hydration.", price: "₹190" },
              { name: "Artisanal Pour-Over Coffee", desc: "Freshly ground single-origin Araku Valley organic beans slowly hand-drip brewed, served over ice with house-made creamy raw coconut or oat milk.", price: "₹220" },
              { name: "Golden Turmeric Latte", desc: "Warm almond milk beautifully infused with fresh turmeric, black pepper, and cinnamon. Perfect for a chilly evening.", price: "₹200" },
              { name: "Avocado Sourdough Toast", desc: "Smashed Haas avocado, garden-grown cherry tomatoes, garlic oil, microgreens, and Himalayan rock salt served on our signature wood-fired country sourdough.", price: "₹270" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-card"
                style={{ padding: '1.5rem', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.05)' }}
                whileHover={{ y: -5, borderColor: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--primary)', fontFamily: 'Outfit', fontWeight: 600, margin: 0 }}>{item.name}</h3>
                  <span style={{ fontSize: '1.15rem', color: 'var(--text-olive)', fontWeight: 600, paddingLeft: '1rem' }}>{item.price}</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.8rem', lineHeight: '1.5', margin: '0.8rem 0 0 0' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Image Frames */}
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Kombucha image card */}
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.15)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            <img src={kombuchaImg} alt="Smokey Jo's Sparkling Kombucha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1rem', fontWeight: 700 }}>Clay-Fermented Kombucha</h4>
              <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.75rem' }}>Fermented slowly for gut-health and sparkle</p>
            </div>
          </div>

          {/* Smoothie bowl image card */}
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.15)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            <img src={smoothieImg} alt="Vibrant Berry Breakfast Smoothie Bowl" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1rem', fontWeight: 700 }}>Organic Superfood Berry Bowls</h4>
              <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.75rem' }}>Freshly prepared raw local ingredients</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Drinks
