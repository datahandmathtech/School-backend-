import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us",
  description: "Get in touch with Yatree Destination for all your travel needs.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
