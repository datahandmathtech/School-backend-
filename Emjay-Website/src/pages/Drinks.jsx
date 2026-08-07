import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Droplet, Star } from 'lucide-react'

// Individual drink images
import drinkPineapple from '../assets/drink_pineapple.png'
import drinkLemongrass from '../assets/drink_lemongrass.png'
import drinkRose from '../assets/drink_rose.png'
import drinkPomegranate from '../assets/drink_pomegranate.png'
import drinkSpirulina from '../assets/drink_spirulina.png'
import drinkApple from '../assets/drink_apple_cinnamon.png'
import drinkGinger from '../assets/drink_ginger.png'
import kombuchaImg from '../assets/house_kombucha.png'

const drinks = [
  {
    name: "Pineapple Rosemary Kombucha",
    desc: "Fresh sweet pineapples paired with organic piney rosemary stalks. Double-fermented in clay matkas. Tangy, aromatic, and incredibly refreshing.",
    price: "₹180",
    probiotic: "Active Cultures: 3.2 Billion",
    color: "#f5c542",
    img: drinkPineapple
  },
  {
    name: "Lemongrass Mint Kombucha",
    desc: "Crisp lemongrass stems and fresh crushed wild garden mint leaves. Naturally cooling, highly restorative, and clean on the palate.",
    price: "₹180",
    probiotic: "Active Cultures: 2.8 Billion",
    color: "#7ecf8e",
    img: drinkLemongrass
  },
  {
    name: "Traditional Kokum Rose",
    desc: "Sour Rajasthan Kokum berries aged with organic pink rose petals. Deep magenta hue with a bubbly, sweet-sour floral mouthfeel.",
    price: "₹185",
    probiotic: "Active Cultures: 2.9 Billion",
    color: "#e85d8a",
    img: drinkRose
  },
  {
    name: "Pomegranate Ginger Elixir",
    desc: "Cold-pressed local pomegranate juice secondary fermented with warm ginger roots for organic, zesty, gut-enriching carbonation.",
    price: "₹190",
    probiotic: "Active Cultures: 3.0 Billion",
    color: "#c0392b",
    img: drinkPomegranate
  },
  {
    name: "Lavender Blue Spirulina",
    desc: "Deep blue calming infusion featuring aromatic lavender buds and antioxidant-rich organic blue spirulina extract.",
    price: "₹210",
    probiotic: "Active Cultures: 3.1 Billion",
    color: "#7f8fc9",
    img: drinkSpirulina
  },
  {
    name: "Spiced Apple Cinnamon",
    desc: "Warm autumn-inspired cold brew with crisp Himalayan apples, Ceylon cinnamon bark, and a hint of clove.",
    price: "₹195",
    probiotic: "Active Cultures: 2.7 Billion",
    color: "#d98a59",
    img: drinkApple
  },
  {
    name: "Hibiscus Ginger Zest",
    desc: "Tart, ruby-red hibiscus petals cold-steeped with spicy ginger. Floral, immune-boosting, and intensely vibrant.",
    price: "₹185",
    probiotic: "Active Cultures: 3.0 Billion",
    color: "#e84393",
    img: kombuchaImg
  },
  {
    name: "Mango Jalapeno Sparkle",
    desc: "Sweet local mango puree with a surprising, subtle kick of fresh green jalapeno. A perfect sweet and spicy balance.",
    price: "₹190",
    probiotic: "Active Cultures: 2.8 Billion",
    color: "#f39c12",
    img: drinkGinger
  },
]

const Drinks = ({ onBack }) => {
  return (
    <div className="page-container" style={{ padding: '8rem 10% 4rem 10%', minHeight: '100vh', background: 'transparent', color: 'var(--text-main)' }}>
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '10%', left: '5%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '10%', right: '5%' }} />

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
            <Sparkles size={16} /> Heritage Probiotic Elixirs
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--light)', margin: '0.5rem 0' }}>Raw, Natural &<br /> Clay-Fermented Kombuchas</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', maxWidth: '700px' }}>
            We specialize in slow, authentic clay-jar fermentation.
            Our kombuchas are brewed inside porous clay vessels for 14 days,
            producing a natural evaporative cooling that micro-regulates temperatures to lock in complex botanicals and active, gut-friendly probiotics.
          </p>
        </div>

        {/* Premium Drink Cards with Images */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {drinks.map((item, i) => (
            <motion.div
              key={i}
              className="glass-card"
              style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', borderRadius: '20px', border: `1px solid rgba(217,138,89,0.15)` }}
              whileHover={{ y: -10, boxShadow: `0 20px 60px rgba(0,0,0,0.5)` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 }}
            >
              {/* Drink Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img
                  src={item.img}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                {/* Color tint overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to bottom, transparent 40%, rgba(10,15,12,0.92) 100%)`
                }} />
                {/* Price badge */}
                <span style={{
                  position: 'absolute', top: '0.8rem', right: '0.8rem',
                  background: 'rgba(10,15,12,0.75)', backdropFilter: 'blur(8px)',
                  border: `1px solid ${item.color}55`,
                  color: item.color, padding: '0.3rem 0.8rem',
                  borderRadius: '20px', fontWeight: 800, fontSize: '1rem',
                  fontFamily: 'Plus Jakarta Sans'
                }}>
                  {item.price}
                </span>
                {/* Matka badge */}
                <span style={{
                  position: 'absolute', top: '0.8rem', left: '0.8rem',
                  background: 'rgba(10,15,12,0.75)', backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(217,138,89,0.3)',
                  color: 'var(--accent)', padding: '0.25rem 0.6rem',
                  borderRadius: '20px', fontSize: '0.6rem', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05rem',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <Droplet size={9} /> Matka Aged
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.2rem 1.4rem 1.4rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--light)', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, lineHeight: 1.3 }}>{item.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.55', flex: 1 }}>{item.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.68rem', color: 'var(--accent)', fontWeight: 700 }}>
                  <Star size={11} fill="var(--accent)" color="var(--accent)" /> {item.probiotic}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Showcase Row */}
        <div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--light)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: 'Cormorant Garamond', fontStyle: 'italic' }}>
            <Sparkles size={20} color="var(--primary)" /> The Matka Ferment Process
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            {[
              { img: drinkPineapple, label: 'Day 1: Primary Fermentation', sub: 'Wild SCOBY inoculated into sweetened organic tea' },
              { img: drinkRose, label: 'Day 7: Clay Transfer', sub: 'Transferred into hand-thrown Rajasthani clay matkas' },
              { img: drinkPomegranate, label: 'Day 14: Bottled Live', sub: 'Naturally carbonated, bottled alive with billions of active cultures' },
            ].map((step, i) => (
              <motion.div
                key={i}
                style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '220px' }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <img src={step.img} alt={step.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,15,12,0.95) 0%, rgba(10,15,12,0.2) 60%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}>
                  <p style={{ margin: 0, fontWeight: 800, fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05rem' }}>{step.label}</p>
                  <p style={{ margin: '0.3rem 0 0', fontSize: '0.72rem', color: 'rgba(250,249,246,0.7)' }}>{step.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Drinks
