import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollReset from './components/ScrollReset';
import LoadingScreen from './components/LoadingScreen';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const LogKaro = lazy(() => import('./pages/LogKaro'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const WebDevelopment = lazy(() => import('./pages/WebDevelopment'));
const AppDevelopment = lazy(() => import('./pages/AppDevelopment'));
const AIAutomation = lazy(() => import('./pages/AIAutomation'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SoftwareDefine = lazy(() => import('./pages/SoftwareDefine'));
const Workflow = lazy(() => import('./pages/Workflow'));
const Features = lazy(() => import('./pages/Features'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Products = lazy(() => import('./pages/Products'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const LogKaroGuide = lazy(() => import('./pages/LogKaroGuide'));

function App() {
  return (
    <Router>
      <ScrollReset />
      <div className="min-h-screen bg-offwhite text-navy font-body selection:bg-electric selection:text-white overflow-x-hidden">
        <Suspense fallback={<LoadingScreen />}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logkaro" element={<LogKaro />} />
            <Route path="/logkaro/software-define" element={<SoftwareDefine />} />
            <Route path="/logkaro/workflow" element={<Workflow />} />
            <Route path="/logkaro/features" element={<Features />} />
            <Route path="/logkaro/pricing" element={<Pricing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/app-development" element={<AppDevelopment />} />
            <Route path="/services/ai-automation" element={<AIAutomation />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/knowledge-base/logkaro-fleet-management" element={<LogKaroGuide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <ScrollToTop />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
