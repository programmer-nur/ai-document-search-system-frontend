import { Navigation, Footer } from "@/components/layout";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}

