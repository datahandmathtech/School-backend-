import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Event Transportation Udaipur",
  description: "Reliable event and conference transportation in Udaipur.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Event Transportation Udaipur", "Reliable event and conference transportation in Udaipur.", "800")) }} />
    </>
  );
}
