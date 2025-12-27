import type { Metadata } from "next";
import {
  PricingHero,
  PricingTiers,
  PricingFaq,
  EnterpriseCta,
} from "./components";

export const metadata: Metadata = {
  title: "Pricing - AI Document Search & Q&A System",
  description:
    "Simple, transparent pricing for AI-powered document search. Choose from Starter, Team, or Enterprise plans. All plans include hybrid retrieval, document processing, and secure storage.",
  keywords: [
    "document search pricing",
    "AI search pricing",
    "document Q&A pricing",
    "enterprise document search",
    "document intelligence pricing",
  ],
  openGraph: {
    title: "Pricing - AI Document Search & Q&A System",
    description:
      "Simple, transparent pricing for AI-powered document search. Choose the plan that fits your needs.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingTiers />
      <PricingFaq />
      <EnterpriseCta />
    </>
  );
}
