import { motion, useScroll, useTransform } from 'framer-motion'
import { Coffee, MapPin, Clock, Phone, ArrowRight, Instagram, Heart, Leaf, Star, Sparkles, Droplet } from 'lucide-react'

const Overlay = () => {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.05], [1, 0.85])

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const date = formData.get('date');
    const guests = formData.get('guests');
    const notes = formData.get('notes');

    const message = `Hello Emjay Brewery! I would like to request a table reservation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${date}\n*Guests:* ${guests}\n*Special Requests:* ${notes || 'None'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916375448257?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="content">
      {/* Floating Organic Glow Orbs in the Background */}
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      {/* Section 1: Home/Hero */}
      <section className="section" id="home" style={{ alignItems: 'flex-start', paddingTop: '80px' }}>
        <motion.div
          className="section-content"
          style={{ opacity, scale }}
        >
          <motion.h2
            className="subtitle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            UDAIPUR'S ORGANIC KOMBUCHA BREWERY
          </motion.h2>
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ color: 'var(--primary)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '0.8rem' }}
          >
            Handcrafted Organic Kombucha <br /> for Gut Health & Wellness
          </motion.h1>
          <motion.p
            className="description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ marginBottom: '1.2rem', fontSize: '0.9rem', lineHeight: '1.6' }}
          >
            Emjay Brewery crafts small-batch organic kombucha in the heart of Udaipur using traditional fermentation methods and premium natural ingredients. Rich in probiotics, antioxidants, vitamins, and minerals, our handcrafted kombucha supports gut health, digestion, immunity, and daily wellness while delivering a refreshingly smooth sparkling taste. Founded in 2021, Emjay Brewery is committed to sustainable brewing, ethical sourcing, and creating healthier beverage choices for modern lifestyles.
          </motion.p>

          {/* Organic Bullet Features */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.5rem', width: '100%', maxWidth: '520px' }}
          >
            {[
              "🍃 Naturally Fermented Organic Tea",
              "🦠 Rich in Probiotics for Gut Health",
              "✨ Packed with Antioxidants & Nutrients",
              "🏺 Traditionally Crafted in Small Batches",
              "🌱 Sustainable & Eco-Conscious Brewing",
              "📍 Brewed Fresh in Udaipur, Rajasthan"
            ].map((text, i) => (
              <span key={i} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.02rem' }}>
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#drinks" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#faf9f6' }}>
                Shop Kombucha <ArrowRight size={18} />
              </a>
              <a href="#elixirs" className="btn-primary" style={{ backgroundColor: 'transparent', color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                Explore Our Flavours
              </a>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Available Flavours: Pomegranate Kombucha • Pineapple Rosemary Kombucha • Lemongrass Mint Kombucha • Classic Kombucha</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.3rem', color: 'var(--accent)', fontWeight: 700 }}>Scroll to Explore</p>
          <div className="mouse" style={{ borderColor: 'var(--accent)' }}>
            <div className="wheel"></div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Vibe */}
      <section className="section" id="vibe">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <motion.div
            className="section-content glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ borderRight: '4px solid var(--primary)', maxWidth: '480px', width: '100%' }}
          >
            <h2 className="subtitle">PURPOSE-DRIVEN BREWING SINCE 2021</h2>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--light)' }}>Naturally Fermented. <br /> Thoughtfully Crafted.</h1>
            <p className="description" style={{ marginBottom: '1.5rem' }}>
              Emjay Brewery is a homegrown Udaipur venture dedicated to brewing small-batch handcrafted kombucha using time-honoured fermentation methods. Rich in probiotics, antioxidants, vitamins, and minerals, our kombucha is designed to support everyday wellness while delivering a refreshing and distinctive taste experience.<br /><br />
              Set beside the historic Chandpole waterfront, our probiotic lounge brings together mindful hospitality, sustainable values, and the art of slow fermentation—creating a destination where health, culture, and community meet.
            </p>

            {/* Curation highlight */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginBottom: '2rem', borderTop: '1px solid rgba(30,53,47,0.08)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--accent)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
                <Sparkles size={14} /> FRESHLY BREWED BATCHES
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {["Pineapple Rosemary", "Pomegranate Kombucha", "Lemongrass Mint", "Kokum Kombucha"].map((flavour, i) => (
                  <span key={i} style={{ fontSize: '0.73rem', background: 'rgba(116,159,147,0.08)', padding: '0.3rem 0.7rem', borderRadius: '6px', border: '1px solid rgba(116,159,147,0.15)', color: 'var(--text-main)', fontWeight: 600 }}>
                    🌿 {flavour}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'flex-end' }}>
              {[{ icon: Star, label: 'Living Probiotics' }, { icon: Coffee, label: 'Araku Pour-overs' }].map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                  <item.icon color="var(--primary)" size={28} />
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', textAlign: 'center' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Our Elixirs Showcase */}
      <section className="section" id="elixirs">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
          <motion.div
            className="section-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '580px', width: '100%' }}
          >
            <h2 className="subtitle"><Droplet size={16} color="var(--accent)" /> SIGNATURE KOMBUCHA COLLECTION</h2>
            <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0, color: 'var(--primary)', marginBottom: '1.2rem' }}>Handcrafted Flavours, <br /> Naturally Alive</h1>
            <p className="description" style={{ marginBottom: '1.8rem', fontSize: '0.95rem' }}>
              Every Emjay kombucha begins as carefully brewed tea and transforms through natural fermentation into a refreshing probiotic beverage rich in living cultures, antioxidants, and organic goodness. Crafted in small batches in Udaipur, each flavour offers a unique balance of wellness and taste.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
              {[
                { name: "Pineapple Rosemary", price: "₹180", color: "#f5c542" },
                { name: "Pomegranate Kombucha", price: "₹190", color: "#c0392b" },
                { name: "Lemongrass Mint", price: "₹180", color: "#7ecf8e" },
                { name: "Kokum Kombucha", price: "₹185", color: "#e85d8a" },
                { name: "Original Kombucha", price: "₹170", color: "#d98a59" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  style={{ padding: '0.8rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `3px solid ${item.color}` }}
                  whileHover={{ y: -3, x: 3 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Droplet size={10} color={item.color} fill={item.color} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--light)', fontWeight: 600 }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.9rem', color: item.color, fontWeight: 800 }}>{item.price}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Drinks */}
      <section className="section" id="drinks">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '580px', width: '100%', alignSelf: 'flex-start', marginLeft: 0, marginRight: 'auto' }}
          >
            <h2 className="subtitle"><Star size={16} color="var(--accent)" /> Our Kombucha Menu</h2>
            <h1 className="hero-title" style={{ fontSize: '3rem', margin: 0, color: 'var(--primary)', marginBottom: '1.2rem' }}>Handcrafted Flavours</h1>
            <p className="description" style={{ marginBottom: '1.8rem', fontSize: '0.95rem' }}>
              Organic kombucha loaded with active living cultures, thoughtfully crafted for natural wellness.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', width: '100%', textAlign: 'left' }}>
              {[
                { name: "Pineapple Rosemary", desc: "Tropical pineapple meets aromatic rosemary for a bright, refreshing finish.", price: "₹180" },
                { name: "Pomegranate Kombucha", desc: "A vibrant blend with rich fruit notes and balanced natural acidity.", price: "₹190" },
                { name: "Lemongrass Mint", desc: "Clean, crisp and cooling with refreshing botanical character.", price: "₹180" },
                { name: "Kokum Kombucha", desc: "Tangy, coastal-inspired flavour with a naturally refreshing profile.", price: "₹185" },
                { name: "Original Kombucha", desc: "The pure expression of traditionally fermented tea and living cultures.", price: "₹170" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="glass-card"
                  style={{ padding: '1.2rem', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '3px solid var(--primary)' }}
                  whileHover={{ y: -5, borderColor: 'var(--primary)' }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--light)', fontFamily: 'Outfit', fontWeight: 700 }}>{item.name}</h3>
                    <span className="price" style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: 800 }}>{item.price}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: '1.45' }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Story */}
      <section className="section" id="story">
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
          <motion.div
            className="section-content glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ borderLeft: '4px solid var(--primary)', maxWidth: '480px', width: '100%' }}
          >
            <h2 className="subtitle">THE ART OF FERMENTATION</h2>
            <h1 className="hero-title" style={{ fontSize: '3.2rem', color: 'var(--light)' }}>Where Science, Nature <br /> & Craft Come Together</h1>
            <p className="description" style={{ fontSize: '0.98rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Kombucha is created through a natural fermentation process in which tea is transformed by a living culture of beneficial bacteria and yeast. At Emjay Brewery, we brew in small batches using glass fermentation vessels, allowing every brew to develop its unique character while preserving the integrity of its living cultures.<br /><br />
              The result is a refreshing probiotic beverage that celebrates both traditional fermentation wisdom and modern wellness. Born in the heart of Udaipur, every bottle reflects our commitment to quality, sustainability, and authentic craft brewing.
            </p>

            {/* Story specifications */}
            <div style={{ borderTop: '1px solid rgba(30,53,47,0.08)', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Sparkles size={13} /> BREWING PRINCIPLES
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {[
                  "✓ Small-Batch Production",
                  "✓ Glass Jar Fermentation",
                  "✓ Living SCOBY Cultures",
                  "✓ Naturally Fermented Tea",
                  "✓ Sustainable Packaging",
                  "✓ Crafted in Udaipur"
                ].map((item, i) => (
                  <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Contact & visit */}
      <section className="section" id="contact" style={{ height: 'auto', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 10%' }}>
        <div className="contact-grid">
          
          {/* Left Column: Cafe Details Card */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'left', padding: '1.6rem', borderLeft: '4px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'space-between', height: '100%' }}
          >
            <div>
              <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.75rem', letterSpacing: '0.15rem' }}><MapPin size={14} color="var(--accent)" /> CHANDPOLE WATERFRONT</h2>
              <h1 className="hero-title" style={{ fontSize: '2.1rem', color: 'var(--light)', margin: '0.3rem 0 0.6rem 0', lineHeight: 1.15 }}>The Lake Pichola Terrace</h1>
              <p className="description" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                Visit our cozy open deck facing the lake at Chandpole. Sip on freshly tapped kombuchas while watching Udaipur's breathtaking sunset views.
              </p>

              {/* Event tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                {[
                  "🌅 Shimmering Waterfront Deck",
                  "🌿 Authentic Fermentation Tours",
                  "🍃 Custom Probiotic Tasting Flights"
                ].map((exp, i) => (
                  <div key={i} style={{ fontSize: '0.75rem', color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>●</span> {exp}
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Contact Icons Row */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', borderTop: '1px solid rgba(30,53,47,0.08)', paddingTop: '0.8rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(194,123,99,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <MapPin color="var(--primary)" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)' }}>Location</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>36 Chandpole Waterfront, Gadiya Devra Road, Udaipur, RJ 313001</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(194,123,99,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <Clock color="var(--primary)" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)' }}>Hours</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>09:30 AM — 09:30 PM (Daily)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(194,123,99,0.1)', padding: '0.4rem', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <Phone color="var(--primary)" size={16} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05rem', color: 'var(--primary)' }}>Contact</h4>
                    <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>+91 63754 48257 | emjaybrewery@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Instagram link */}
              <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(30,53,47,0.08)', paddingTop: '0.8rem' }}>
                <motion.a
                  href="https://www.instagram.com/emjaybrewery/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, color: 'var(--primary)' }}
                  style={{ color: 'var(--light)', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}
                >
                  <Instagram size={15} color="var(--primary)" /> Follow our ferments on Instagram
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Table Reservation Form */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            style={{ padding: '1.6rem', border: '1px solid rgba(194,123,99,0.2)', display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'space-between', height: '100%' }}
          >
            <form onSubmit={handleWhatsAppSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <h2 className="subtitle" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0, fontSize: '0.75rem', letterSpacing: '0.15rem' }}><Sparkles size={14} color="var(--primary)" /> WATERFRONT SEATS</h2>
                <h1 className="hero-title" style={{ fontSize: '2.1rem', color: 'var(--light)', margin: '0.3rem 0 0.6rem 0', lineHeight: 1.15 }}>Reserve Lake Table</h1>
                <p className="description" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '0.8rem' }}>
                  Secure a front-row terrace seat looking over the lake. We save the finest spots for advance table bookings!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {/* Name field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" placeholder="Your Full Name" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Contact field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                  </div>

                  {/* Date & Guests Row */}
                  <div className="form-row" style={{ gap: '0.8rem' }}>
                    <div className="form-group" style={{ gap: '0.3rem' }}>
                      <label className="form-label">Date</label>
                      <input type="date" name="date" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem' }} />
                    </div>
                    <div className="form-group" style={{ gap: '0.3rem' }}>
                      <label className="form-label">Guests</label>
                      <select name="guests" required className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem', appearance: 'none', background: 'rgba(255,255,255,0.02) url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'10\' fill=\'%23c27b63\'><polygon points=\'0,0 10,0 5,5\'/></svg>") no-repeat right 1rem center' }}>
                        <option value="2" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>2 People</option>
                        <option value="3" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>3 People</option>
                        <option value="4" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>4 People</option>
                        <option value="6" style={{ backgroundColor: 'var(--dark)', color: 'var(--text-main)' }}>6+ People</option>
                      </select>
                    </div>
                  </div>

                  {/* Note field */}
                  <div className="form-group" style={{ gap: '0.3rem' }}>
                    <label className="form-label">Special Requests (Allergies, deck view etc.)</label>
                    <textarea name="notes" rows="2" placeholder="I would love a table close to the lake railing!" className="form-input" style={{ padding: '0.65rem 1rem', borderRadius: '10px', fontSize: '0.85rem', resize: 'none' }}></textarea>
                  </div>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '0.8rem', marginTop: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', border: 'none', fontSize: '0.82rem', color: '#faf9f6' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Terrace Reservation <ArrowRight size={15} />
                </motion.button>

                <div style={{ marginTop: '0.8rem', borderTop: '1px solid rgba(30,53,47,0.08)', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1rem' }}>
                  <span>BREWED WITH <Heart size={10} style={{ display: 'inline', color: 'var(--primary)' }} /> IN UDAIPUR</span>
                  <span>© 2026 EMJAY BREWERY</span>
                </div>
              </div>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Overlay
