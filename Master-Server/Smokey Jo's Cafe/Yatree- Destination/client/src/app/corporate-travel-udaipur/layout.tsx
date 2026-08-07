import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Corporate Travel in Udaipur",
  description: "B2B corporate travel solutions in Udaipur. Premium fleet, GST billing.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Corporate Travel in Udaipur", "B2B corporate travel solutions in Udaipur. Premium fleet, GST billing.", "800")) }} />
    </>
  );
}
