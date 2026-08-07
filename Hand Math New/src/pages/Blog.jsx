import React from 'react';
import { motion } from 'framer-motion';

const BlogPage = () => {
  const posts = [
    { id: 1, title: 'How Digital Run-Sheets Prevent Billing Leaks for Indian Taxi Fleets', category: 'Logistics', date: 'May 20, 2026', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Why Cloud-Based Taxi CRM is Mandatory for Modern Dispatch Operations', category: 'Technology', date: 'May 18, 2026', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Top 5 Cybersecurity Auditing Metrics for Driver Management Apps', category: 'Security', date: 'May 12, 2026', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Automating Driver Shifts & Shift Verification via Smart Mobile App', category: 'Productivity', date: 'May 08, 2026', image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'The Role of IoT OBD-II Telematics in Preventing Engine Failures', category: 'IoT', date: 'May 02, 2026', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, title: 'Optimizing Route Fare Calculations via Google Maps Routing APIs', category: 'Dev', date: 'April 25, 2026', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  ];

  return (
    <div className="pt-32 pb-24 bg-offwhite min-h-screen">
      <section className="container mx-auto px-6 mb-12">
        <div className="max-w-3xl text-center mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold mb-6 text-navy"
          >
            Our <span className="text-electric">Insights</span>
          </motion.h1>
          <p className="text-xl text-navy/60">
            Expert opinions, news, and guides on everything tech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer bg-white p-4 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-6 relative">
                <img
                  src={post.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={post.title}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-electric text-white font-bold text-[10px] rounded uppercase">
                  {post.category}
                </div>
              </div>
              <span className="text-navy/40 text-sm mb-2 block">{post.date} • 5 min read</span>
              <h3 className="text-xl font-heading font-bold mb-4 text-navy group-hover:text-electric transition-colors">
                {post.title}
              </h3>
              <div className="flex items-center text-electric text-sm font-bold gap-2">
                Read Article →
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
