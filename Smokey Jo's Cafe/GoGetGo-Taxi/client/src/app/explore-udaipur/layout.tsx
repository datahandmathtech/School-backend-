import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Explore Udaipur",
  description: "Discover the magic of the City of Lakes with local expert guides.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
