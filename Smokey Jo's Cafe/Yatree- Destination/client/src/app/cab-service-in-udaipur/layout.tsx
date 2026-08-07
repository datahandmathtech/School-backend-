import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Cab Service in Udaipur",
  description: "Premium cab service in Udaipur for local sightseeing and outstation trips.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Cab Service in Udaipur", "Premium cab service in Udaipur for local sightseeing and outstation trips.", "800")) }} />
    </>
  );
}
