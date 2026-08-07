import { constructMetadata, getServiceSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Tempo Traveller in Udaipur",
  description: "Rent luxury Tempo Travellers in Udaipur for group tours.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema("Tempo Traveller in Udaipur", "Rent luxury Tempo Travellers in Udaipur for group tours.", "800")) }} />
    </>
  );
}
