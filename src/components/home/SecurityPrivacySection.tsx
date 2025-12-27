import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const securityFeatures = [
  {
    title: "Workspace Isolation",
    description:
      "Multi-tenant architecture with strict workspace isolation. Each workspace is completely isolated at the database and vector store level.",
  },
  {
    title: "No AI Training",
    description:
      "Your documents are never used to train AI models. Explicitly stated in our architecture - your data stays yours, always.",
  },
  {
    title: "Enterprise Security",
    description:
      "JWT authentication, role-based access control, signed S3 URLs, audit logs, and encryption at rest and in transit.",
  },
  {
    title: "Production-Grade",
    description:
      "Built as enterprise-ready SaaS with stateless APIs, horizontal scaling, job retry strategies, and graceful degradation.",
  },
];

export function SecurityPrivacySection() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Security & Privacy
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your data is protected with enterprise-grade security
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {securityFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

