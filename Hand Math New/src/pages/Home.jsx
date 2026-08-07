import React from 'react';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import WhyChooseUs from '../sections/WhyChooseUs';
import Portfolio from '../sections/Portfolio';
import TechStack from '../sections/TechStack';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Home = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hand Math IT Solutions",
    "image": "https://handmathtechnologiesindia.com/logo.png",
    "@id": "https://handmathtechnologiesindia.com/",
    "url": "https://handmathtechnologiesindia.com/",
    "telephone": "+916367466426",
    "email": "handmathtechnologies@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "20-A, Vijetri Vihar, Adarsh Nagar",
      "addressLocality": "Udaipur",
      "addressRegion": "Rajasthan",
      "postalCode": "313001",
      "addressCountry": "IN"
    }
  };

  const homeFaqs = [
    {
      question: "What IT services does Hand Math IT Solutions offer?",
      answer: "We offer a comprehensive suite of IT services including Custom Software Development, SaaS Application Development, Mobile App Development (iOS & Android), Digital Marketing, SEO optimization, and 24/7 Managed IT Support. We specialize in building enterprise-grade digital infrastructure."
    },
    {
      question: "Where is Hand Math IT Solutions located?",
      answer: "Our main office is located at 20-A, Vijetri Vihar, Adarsh Nagar, Udaipur, Rajasthan, India (313001). However, we serve clients globally providing remote IT consulting and software development services."
    },
    {
      question: "Do you offer Custom CRM and Fleet Management Software?",
      answer: "Yes! In addition to custom builds, we offer our flagship product 'LogKaro CRM', which is a Smart Taxi & Fleet Management CRM designed to automate driver tracking, compliance, payroll, and fleet operations."
    },
    {
      question: "How much does custom software development cost?",
      answer: "The cost varies depending on the project's complexity, features, and technology stack. We offer free consultations to understand your business requirements and provide a detailed, transparent quotation tailored to your needs."
    }
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO 
        title="Best Software & Digital Marketing Agency India" 
        url="/" 
        schema={homeSchema} 
      />
      <Hero />
      <Services />
      <TechStack />
      <Portfolio />
      <FAQSection faqs={homeFaqs} title="Answers to Your Questions" subtitle="Learn more about how Hand Math IT Solutions can help scale your business." />
      <Contact />
    </motion.main>
  );
};

export default Home;
