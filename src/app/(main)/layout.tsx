import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </>
  );
}
