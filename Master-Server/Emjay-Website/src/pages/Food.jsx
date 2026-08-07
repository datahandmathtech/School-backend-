import { motion } from 'framer-motion'
import { Leaf, ArrowLeft, Flame, Sparkles } from 'lucide-react'

import burgerImg from '../assets/pumpkin_burger.png'
import pastaImg from '../assets/hand_rolled_pasta.png'
import breadImg from '../assets/sourdough_bread.png'
import kombuchaImg from '../assets/house_kombucha.png'

const foodItems = [
  { name: "Charred Sourdough Margherita", desc: "36-hour slow-fermented base, fresh organic marinara, house-made vegan cashew mozzarella, local sweet basil, cold-pressed olive oil drizzle.", price: "₹380", tag: "Signature", img: breadImg },
  { name: "Truffle Mushroom & Ricotta", desc: "Wild seasonal mushrooms, white truffle oil drizzle, whipped vegan ricotta, roasted garlic confit.", price: "₹450", tag: "Premium", img: pastaImg },
  { name: "Smoked Fig & Goat Cheese", desc: "Caramelized local figs, organic arugula, cashew goat-style cheese, balsamic reduction glaze.", price: "₹420", tag: "Sweet & Savory", img: kombuchaImg },
  { name: "Spicy Calabrian Chili", desc: "Wood-roasted peppers, sun-dried tomatoes, spicy agave honey drizzle, vegan parmesan.", price: "₹400", tag: "Spicy", img: breadImg },
  { name: "Pumpkin Seed Oats Burger", desc: "Crafted baked pumpkin & roasted oats patty, organic avocado whip, garden greens, cashew-garlic cream, on a toasted sourdough brioche.", price: "₹290", tag: "Vegan Favorite", img: burgerImg },
  { name: "Pulled Jackfruit Sourdough Melt", desc: "Slow-smoked raw jackfruit, melted vegan cheddar, house slaw, served in thick toasted sourdough slices.", price: "₹340", tag: "Hearty", img: burgerImg },
  { name: "Burrata & Heirloom Tomato", desc: "Fresh creamy burrata-style cashew cheese, heirloom tomatoes, basil pesto, served with crunchy sourdough toast.", price: "₹320", tag: "Fresh", img: pastaImg },
  { name: "Wood-Fired Roasted Roots", desc: "Sweet potato, baby beets, and local carrots slow-caramelized in wood-fire, served over traditional creamy stone-ground moong dal hummus.", price: "₹270", tag: "Earthy & Warm", img: breadImg },
]

const Food = ({ onBack }) => {
  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: 'transparent', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '15%', right: '15%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '15%', left: '15%' }} />

      <motion.button
        onClick={onBack}
        className="btn-primary"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', borderColor: 'var(--primary)', color: 'var(--primary)', marginBottom: '3rem' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to 3D Experience
      </motion.button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
        {/* Header Block */}
        <div>
          <h2 className="subtitle" style={{ color: 'var(--accent)', fontSize: '0.9rem', letterSpacing: '0.2rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={16} /> Slow Sourdough Kitchen
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--light)', margin: '0.5rem 0' }}>Stone-Baked Crusts <br /> & Wholesome Roots</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '700px' }}>
            Our kitchen is built around slow-fermentation and clean eating.
            We bake our ancient-grain sourdough daily with a long 36-hour cold-fermentation process
            and source heirloom organic vegetables from sustainable family farms across Udaipur.
          </p>
        </div>

        {/* Premium Food Card Grid with Images */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {foodItems.map((item, i) => (
            <motion.div
              key={i}
              className="glass-card"
              style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid rgba(217,138,89,0.15)' }}
              whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 }}
            >
              {/* Food Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(10,15,12,0.92) 100%)' }} />
                {/* Price Badge */}
                <span style={{
                  position: 'absolute', top: '0.8rem', right: '0.8rem',
                  background: 'rgba(10,15,12,0.75)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(217,138,89,0.4)',
                  color: 'var(--primary)', padding: '0.3rem 0.8rem',
                  borderRadius: '20px', fontWeight: 800, fontSize: '1rem',
                  fontFamily: 'Plus Jakarta Sans'
                }}>
                  {item.price}
                </span>
                {/* Tag Badge */}
                <span style={{
                  position: 'absolute', top: '0.8rem', left: '0.8rem',
                  background: 'rgba(217,138,89,0.2)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(217,138,89,0.3)',
                  color: 'var(--accent)', padding: '0.25rem 0.7rem',
                  borderRadius: '20px', fontSize: '0.6rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05rem',
                }}>
                  {item.tag}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.2rem 1.4rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--light)', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.55' }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700 }}>
                  <Flame size={11} /> Wood-fired with local Acacia wood
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-Width Kitchen Showcase */}
        <div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--light)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>
            <Sparkles size={20} color="var(--primary)" /> Sourdough & Kitchen Visuals
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <motion.div
              style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '320px' }}
              whileHover={{ scale: 1.01 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src={burgerImg} alt="Pumpkin Oats Burger" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,12,0.9) 0%, rgba(10,15,12,0.15) 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.5rem' }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>Organic Pumpkin Oats Slider</p>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.78rem', color: 'rgba(250,249,246,0.7)' }}>Baked daily, packed with plant-based protein & avocado whip</p>
              </div>
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div
                style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', flex: 1, minHeight: '150px' }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <img src={pastaImg} alt="Tagliatelle Pesto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,12,0.9) 0%, rgba(10,15,12,0.1) 60%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#faf9f6' }}>Hand-Rolled Pesto Tagliatelle</p>
                </div>
              </motion.div>
              <motion.div
                style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', flex: 1, minHeight: '150px' }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <img src={breadImg} alt="Sourdough Bread" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,12,0.9) 0%, rgba(10,15,12,0.1) 60%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.85rem', color: '#faf9f6' }}>36-Hour Fermented Sourdough</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Food
