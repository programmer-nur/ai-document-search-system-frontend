import type { Metadata } from "next";
import {
  AboutHero,
  ProductVision,
  WhyItWasBuilt,
  TrustAndTransparency,
} from "./components";

export const metadata: Metadata = {
  title: "About Us - AI Document Search & Q&A System",
  description:
    "Learn about our product vision, why we built AI document search, and our commitment to trust and transparency. Built as enterprise-ready SaaS with hybrid retrieval and privacy-first architecture.",
  keywords: [
    "about AI document search",
    "document intelligence company",
    "AI search technology",
    "hybrid retrieval",
    "enterprise document search",
    "privacy-first AI",
  ],
  openGraph: {
    title: "About Us - AI Document Search & Q&A System",
    description:
      "Building the future of document intelligence with AI-powered search and retrieval. Learn about our vision, mission, and commitment to trust.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProductVision />
      <WhyItWasBuilt />
      <TrustAndTransparency />
    </>
  );
}

