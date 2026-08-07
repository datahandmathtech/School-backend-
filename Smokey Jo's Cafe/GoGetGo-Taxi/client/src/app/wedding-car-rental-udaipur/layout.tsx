import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Wedding Car Rental Udaipur",
  description: "Luxury wedding car rentals and complete guest transportation logistics.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Wedding Car Rental Udaipur", "Luxury wedding car rentals and complete guest transportation logistics.", "800")) }} />
    </>
  );
}
