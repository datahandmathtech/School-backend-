import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Yatree Destination",
  description: "Terms of Service for Yatree Destination - Udaipur's premium taxi service.",
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-navy-950 mb-8">
          Terms of <span className="text-gold-premium">Service</span>
        </h1>

        <div className="space-y-8 text-slate-600 font-medium leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Yatree Destination website or booking our services, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">2. Booking and Cancellation</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>All bookings are subject to availability of vehicles.</li>
              <li>A booking confirmation will be provided upon successful reservation.</li>
              <li>Cancellations made within 24 hours of the pickup time may be subject to a cancellation fee.</li>
              <li>Yatree Destination reserves the right to cancel any booking due to unforeseen circumstances (e.g., severe weather, vehicle breakdown). In such cases, a full refund or alternative arrangement will be provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">3. Passenger Responsibilities</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Passengers must provide accurate pickup and drop-off details at the time of booking.</li>
              <li>Any damage caused to the vehicle by the passenger will be charged to the passenger.</li>
              <li>Smoking, consumption of alcohol, and illegal substances are strictly prohibited inside the vehicles.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">4. Pricing and Payments</h2>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Prices are subject to change without prior notice, except for confirmed bookings.</li>
              <li>Toll taxes, parking fees, and interstate taxes (if applicable) are usually extra unless specified in the package.</li>
              <li>Payments must be made as per the agreed terms during the booking process.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">5. Limitation of Liability</h2>
            <p>
              Yatree Destination shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. We do not take responsibility for any loss of luggage or personal belongings during the journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-navy-950 mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of our services following any changes signifies your acceptance of the new terms.
            </p>
          </section>
          
          <p className="text-sm text-slate-400 pt-8 border-t border-slate-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
