import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Rajasthan Tour Packages",
  description: "Curated Rajasthan tour packages starting from Udaipur.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Rajasthan Tour Packages", "Curated Rajasthan tour packages starting from Udaipur.", "800")) }} />
    </>
  );
}
