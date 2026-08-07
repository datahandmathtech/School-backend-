"use client";

import { useState } from "react";
import { Plus, Minus, MessageCircle, Award, History, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

const faqs = [
  {
    category: "Royal Palaces & Forts",
    questions: [
      {
        q: "What is the significance of the City Palace?",
        a: "Towering over Lake Pichola, the City Palace is a magnificent architectural marvel and the largest palace complex in Rajasthan. Built over 400 years by several rulers of the Mewar dynasty, it offers stunning views, intricate mirror work, and a deep dive into the royal history of Udaipur."
      },
      {
        q: "Is Sajjangarh (Monsoon Palace) worth visiting?",
        a: "Absolutely! Perched high on the Aravalli Hills, the Monsoon Palace was built to watch monsoon clouds. It offers the most spectacular, panoramic sunset views of Udaipur city and its lakes. The surrounding Sajjangarh Wildlife Sanctuary is also a treat for nature lovers."
      },
      {
        q: "How far is Kumbhalgarh Fort and why is it famous?",
        a: "Located about 85 KM from Udaipur, Kumbhalgarh Fort is a UNESCO World Heritage Site. It is globally renowned for its massive fortress wall, which extends for 36 kilometers, making it the second-longest continuous wall in the world after the Great Wall of China."
      }
    ]
  },
  {
    category: "Iconic Lakes & Islands",
    questions: [
      {
        q: "What makes Lake Pichola so special?",
        a: "Lake Pichola is the crown jewel of Udaipur. It is an artificial fresh water lake created in the year 1362 AD. Taking a sunset boat ride on Lake Pichola while admiring the City Palace, Jag Mandir, and the Taj Lake Palace floating on the water is an unforgettable experience."
      },
      {
        q: "What can we do at Fateh Sagar Lake?",
        a: "Fateh Sagar is a vibrant artificial lake surrounded by hills and woods. You can enjoy speed boating, visit the solar observatory on one of its islands, or simply take a leisurely evening walk along the beautiful Fateh Sagar Paal (promenade) while enjoying local street food."
      },
      {
        q: "What is Jag Mandir Island Palace?",
        a: "Jag Mandir, also known as the 'Lake Garden Palace', is built on an island in Lake Pichola. It is famous for its stunning marble elephants, intricate architecture, and beautiful gardens. It famously inspired Emperor Shah Jahan in the design of the Taj Mahal."
      }
    ]
  },
  {
    category: "Culture & Nature Attractions",
    questions: [
      {
        q: "Why is Saheliyon-ki-Bari famous?",
        a: "Also known as the 'Garden of the Maidens', this beautiful garden was built by Maharana Sangram Singh for the 48 young women attendants who accompanied a princess to Udaipur as part of her dowry. It features lush green lawns, marble art, and stunning rain-fountains that operate without mechanical pumps."
      },
      {
        q: "Where can we experience traditional Rajasthani culture?",
        a: "Bagore Ki Haveli, located at Gangaur Ghat, is the best place to experience local culture. Every evening, they host 'Dharohar', an energetic and colorful Rajasthani folk dance and puppet show. Shilpgram, an arts and crafts village on the outskirts, is also fantastic for traditional handicrafts."
      },
      {
        q: "Are there any famous temples in Udaipur?",
        a: "Yes, the Jagdish Temple, located just outside the City Palace, is a massive 17th-century Hindu temple dedicated to Lord Vishnu. It is famous for its intricately carved pillars, beautifully sculpted ceilings, and stunning Indo-Aryan architecture."
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  // Generate FAQ Schema dynamically based on all questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(category => 
      category.questions.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    )
  };

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-premium/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-16 px-4">
          <span className="text-gold-premium font-bold uppercase tracking-[0.2em] text-[10px]">Explore The City of Lakes</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-2 mb-6 tracking-tight uppercase leading-[0.95]">
            Top Attractions in Udaipur.
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
            Discover the most beautiful locations, royal palaces, and serene lakes that make Udaipur the Venice of the East. Let us drive you to these magical destinations.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-gold-premium"></span>
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.questions.map((faq, idx) => {
                  const id = `${groupIdx}-${idx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div 
                      key={idx} 
                      className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-gold-premium shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <button 
                        onClick={() => toggleFAQ(id)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                      >
                        <span className="font-bold text-slate-900 pr-8 text-sm md:text-base">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-gold-premium text-midnight' : 'bg-slate-100 text-slate-500'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>



        <div className="mt-16 bg-slate-900 rounded-[2rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div>
             <h4 className="text-2xl font-bold text-white mb-2">Still have questions?</h4>
             <p className="text-slate-400 text-sm">Our travel experts are available 24/7 to assist you.</p>
           </div>
           <a href="https://wa.me/917627013579" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-green-600 transition-colors shrink-0">
             <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
           </a>
        </div>

      </div>
    </section>
  );
}
