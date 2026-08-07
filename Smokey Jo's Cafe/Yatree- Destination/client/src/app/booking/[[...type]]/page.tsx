import BookingClient from "./BookingClient";
import { Metadata } from "next";

export function generateStaticParams() {
  return [
    { type: [] },       // Matches /booking
    { type: ["car"] },  // Matches /booking/car
    { type: ["bus"] },  // Matches /booking/bus (legacy)
    { type: ["tempo"] },// Matches /booking/tempo
  ];
}

export const metadata: Metadata = {
  title: "Book Taxi or Tempo Traveller in Udaipur | Yatree Destination",
  description: "Instant booking for premium sedans, SUVs, and Tempo Travellers in Udaipur.",
  keywords: ["Book Taxi Udaipur", "Udaipur Cab Booking", "Tempo Traveller Booking Udaipur", "Innova Crysta Hire Udaipur", "Outstation Taxi Booking", "Airport Taxi Udaipur Booking", "Hire Cab Rajasthan"],
};

export default function Page() {
  return <BookingClient />;
}
