import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingFeature {
  label: string;
  value: string | number;
}

interface PricingTier {
  name: string;
  description: string;
  price: string;
  period: string;
  documentLimit: string | number;
  queryLimit: string | number;
  ocrUsage: string;
  features: string[];
  highlighted: boolean;
  ctaText: string;
  ctaLink: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams getting started",
    price: "$29",
    period: "/month",
    documentLimit: "100 documents",
    queryLimit: "1,000 queries/month",
    ocrUsage: "Basic OCR included",
    features: [
      "AI-powered document search",
      "Natural language Q&A with citations",
      "Asynchronous document processing",
      "Basic OCR support",
      "Hybrid retrieval (vector + keyword)",
      "Email support",
      "99.9% uptime SLA",
    ],
    highlighted: false,
    ctaText: "Get Started",
    ctaLink: "/register",
  },
  {
    name: "Team",
    description: "Best for growing teams and departments",
    price: "$99",
    period: "/month",
    documentLimit: "1,000 documents",
    queryLimit: "10,000 queries/month",
    ocrUsage: "Advanced OCR included",
    features: [
      "Everything in Starter",
      "Team collaboration",
      "Advanced OCR processing",
      "Priority asynchronous processing",
      "Role-based access control (RBAC)",
      "Workspace isolation & security",
      "Usage analytics & insights",
      "Priority email support",
      "99.95% uptime SLA",
    ],
    highlighted: true,
    ctaText: "Start Free Trial",
    ctaLink: "/register",
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "",
    documentLimit: "Unlimited",
    queryLimit: "Unlimited",
    ocrUsage: "Full OCR suite + custom",
    features: [
      "Everything in Team",
      "Unlimited documents & queries",
      "Custom OCR configurations",
      "Horizontal scaling support",
      "Dedicated account manager",
      "Custom integrations",
      "SSO & advanced security",
      "24/7 phone & email support",
      "99.99% uptime SLA",
      "Custom SLA options",
      "On-premise deployment available",
    ],
    highlighted: false,
    ctaText: "Contact Sales",
    ctaLink: "/contact",
  },
];

export function PricingTiers() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${
              tier.highlighted ? "border-primary shadow-lg" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription className="mt-2">
                {tier.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-muted-foreground">{tier.period}</span>
                  )}
                </div>
              </div>

              <div className="mb-6 space-y-4 border-b border-border pb-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Document Limit
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {tier.documentLimit}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Query Limit
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {tier.queryLimit}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    OCR Usage
                  </p>
                  <p className="mt-1 text-lg font-semibold">{tier.ocrUsage}</p>
                </div>
              </div>

              <ul className="flex-1 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-primary">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                variant={tier.highlighted ? "default" : "outline"}
                className="w-full"
                asChild
              >
                <Link href={tier.ctaLink}>{tier.ctaText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

