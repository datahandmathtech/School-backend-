import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn about GoGetGo Taxi, Udaipur's most trusted taxi service...",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
