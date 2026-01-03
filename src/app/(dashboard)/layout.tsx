import { DashboardLayout as DashboardLayoutComponent } from "@/components/layout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>;
}

