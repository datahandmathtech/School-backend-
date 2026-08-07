import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Taxi Service in Udaipur",
  description: "Udaipur's #1 Taxi Service. Book reliable cabs for local sightseeing.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Taxi Service in Udaipur", "Udaipur's #1 Taxi Service. Book reliable cabs for local sightseeing.", "800")) }} />
    </>
  );
}
