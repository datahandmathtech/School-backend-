import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurStory from './components/OurStory'
import OurKombuchaPage from './components/OurKombuchaPage'
import OurKombucha from './components/OurKombucha'
import OurFlavours from './components/OurFlavours'
import TheEmjayVibe from './components/TheEmjayVibe'
import TheEmjayVibePage from './components/TheEmjayVibePage'
import WhereToFind from './components/WhereToFind'
import FindEmjay from './components/FindEmjay'
import FindEmjayNearYouPage from './components/FindEmjayNearYouPage'
import ContactPage from './components/ContactPage'
import Footer from './components/Footer'
import './App.css'

const Home = () => (
  <main>
    <Hero />
    <OurKombucha />
    <OurFlavours />
    <WhereToFind />
    <TheEmjayVibe />
    <FindEmjay />
  </main>
)

const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToAnchor />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Our-Story" element={<OurStory />} />
          <Route path="/Out-Story" element={<OurStory />} />
          <Route path="/our-kombucha" element={<OurKombuchaPage />} />
          <Route path="/Our-Kombucha" element={<OurKombuchaPage />} />
          <Route path="/the-emjay-vibe" element={<TheEmjayVibePage />} />
          <Route path="/find-emjay-near-you" element={<FindEmjayNearYouPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
