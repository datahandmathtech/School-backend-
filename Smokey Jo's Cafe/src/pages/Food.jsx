import { motion } from 'framer-motion'
import { Leaf, ArrowLeft } from 'lucide-react'
import burgerImg from '../assets/art_burger.png'
import pastaImg from '../assets/art_pasta.png'

const Food = ({ onBack }) => {
  return (
    <div className="page-container-responsive">
      {/* Floating Background Glows */}
      <div className="bg-glow bg-glow-1" style={{ top: '10%', right: '10%' }} />
      <div className="bg-glow bg-glow-2" style={{ bottom: '15%', left: '10%' }} />

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
            <Leaf size={16} /> Gourmet Mains
          </h2>
          <h1 className="hero-title" style={{ fontSize: '3.6rem', color: 'var(--primary)', margin: '1rem 0' }}>Crafted Food Menu</h1>
          <p className="description" style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
            Our food is entirely vegan, highlighting fresh, house-made pastas, custom-baked country breads, and slow-cooked organic ingredients. We grow our own herbs and source stone-ground ancient grains directly from local Rajasthani farms.
          </p>

          <div className="grid-2-col" style={{ alignItems: 'stretch' }}>
            {[
              { name: "Pumpkin Oats Burger", desc: "House-crafted baked pumpkin & roasted oats patty, organic avocado mash, local garden greens, custom cashew cream spread, with hand-cut cajun fries.", price: "₹290" },
              { name: "Pesto Tofu Sandwich", desc: "Grilled organic tofu, house-made wild basil pesto, fresh tomatoes, and crisp lettuce served on our signature wood-fired sourdough.", price: "₹320" },
              { name: "Handmade Sourdough Pasta", desc: "Fresh artisanal sourdough pasta hand-rolled hourly, tossed in our rich house-made marinara or pesto, topped with cashew parmesan.", price: "₹380" },
              { name: "Vegan Mac & Cheese", desc: "Classic comfort food completely veganized! Macaroni baked in our creamy, rich cashew and nutritional yeast cheese sauce.", price: "₹350" },
              { name: "BBQ Jackfruit Sloppy Joe", desc: "Smoky organic pulled jackfruit slow-cooked for 6 hours in our sweet-spicy BBQ glaze, served on a toasted sourdough roll with vegan purple cabbage slaw.", price: "₹310" },
              { name: "Classic Margherita Pizza", desc: "Hand-stretched sourdough crust baked with our house-made tomato sauce, fresh basil, and creamy cashew mozzarella.", price: "₹450" },
              { name: "Roasted Roots & Hummus", desc: "Warm wood-roasted locally sourced sweet potatoes, baby carrots, and beets served over a velvety bed of traditional stone-ground moong dal hummus.", price: "₹260" }
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
          {/* Burger image card */}
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.15)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            <img src={burgerImg} alt="Smokey Jo's Gourmet Burger" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1rem', fontWeight: 700 }}>Pumpkin Oats Burger</h4>
              <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.75rem' }}>Freshly prepared organic artisan mains</p>
            </div>
          </div>

          {/* Pasta image card */}
          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,163,115,0.15)', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
            <img src={pastaImg} alt="Artisanal Hand-Rolled Pesto Tagliatelle" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
              <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1rem', fontWeight: 700 }}>Hand-Rolled Pesto Tagliatelle</h4>
              <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0', fontSize: '0.75rem' }}>Pasta rolled hourly in Udaipur valley</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Food
