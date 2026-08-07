import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Book a Ride",
  description: "Book your luxury taxi, tempo traveller, or Innova Crysta in Udaipur with Yatree Destination. Fast, reliable, and secure online booking.",
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
