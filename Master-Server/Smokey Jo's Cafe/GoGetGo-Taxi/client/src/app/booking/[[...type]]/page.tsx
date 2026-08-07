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
  title: "Book Taxi or Tempo Traveller in Udaipur | GoGetGo Taxi",
  description: "Instant booking for premium sedans, SUVs, and Tempo Travellers in Udaipur.",
};

export default function Page() {
  return <BookingClient />;
}
