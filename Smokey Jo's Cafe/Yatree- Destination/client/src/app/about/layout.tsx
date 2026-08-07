import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us",
  description: "Learn about Yatree Destination, Udaipur's most trusted taxi service...",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
