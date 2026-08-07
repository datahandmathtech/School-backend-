import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Yatree Destination",
  description: "Privacy Policy for Yatree Destination - Udaipur's premium taxi service.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-navy-950 mb-8">
          Privacy <span className="text-gold-premium">Policy</span>
        </h1>

        <div className="space-y-8 text-slate-600 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">1. Information We Collect</h2>
            <p>
              At Yatree Destination, we collect information to provide better services to our users. This includes:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Personal details such as name, email address, and phone number when you make a booking.</li>
              <li>Pickup and drop-off locations, date, and time of travel.</li>
              <li>Device information, IP addresses, and browsing data when you use our website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">2. How We Use Information</h2>
            <p>
              The information we collect is used in the following ways:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To provide, maintain, and improve our taxi and travel services.</li>
              <li>To communicate with you regarding your bookings, updates, or customer support.</li>
              <li>To personalize your experience and offer promotions relevant to you.</li>
              <li>To ensure safety and security for both our passengers and drivers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">3. Data Sharing and Protection</h2>
            <p>
              We prioritize your privacy and do not sell or rent your personal information to third parties. We may share your information with our trusted partners and drivers strictly for the purpose of fulfilling your booking. All data is protected with industry-standard security measures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">4. Cookies</h2>
            <p>
              Our website uses cookies to enhance user experience. Cookies help us understand website traffic and usage patterns, allowing us to improve our services. You can choose to disable cookies through your browser settings, but this may affect certain functionalities of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
              <p><strong>Email:</strong> Kavishjain@yatreedestination.com, info@yatreedestination.com</p>
              <p><strong>Phone:</strong> +91 76270 13579</p>
              <p><strong>Address:</strong> 97, BEHIND VIKAS HOSPITAL, HIRAN MAGRI SEC 3, UDAIPUR, Udaipur, Rajasthan, 313001</p>
            </div>
          </section>
          
          <p className="text-sm text-slate-400 pt-8 border-t border-slate-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
