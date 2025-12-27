import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI Document Search & Q&A System",
  description: "Ask questions over your documents with AI-powered search and hybrid retrieval",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
