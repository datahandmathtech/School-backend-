import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Airport Taxi Udaipur",
  description: "Reliable and punctual airport taxi transfers in Udaipur.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Airport Taxi Udaipur", "Reliable and punctual airport taxi transfers in Udaipur.", "800")) }} />
    </>
  );
}
