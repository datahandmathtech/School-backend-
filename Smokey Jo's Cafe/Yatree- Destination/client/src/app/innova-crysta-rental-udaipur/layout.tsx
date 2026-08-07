import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Innova Crysta Rental Udaipur",
  description: "Rent a luxury Toyota Innova Crysta in Udaipur.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Innova Crysta Rental Udaipur", "Rent a luxury Toyota Innova Crysta in Udaipur.", "800")) }} />
    </>
  );
}
