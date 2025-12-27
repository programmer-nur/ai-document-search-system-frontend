import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const trustPrinciples = [
  {
    title: "No AI Model Training",
    description:
      "Your documents are never used to train AI models. We explicitly state this in our documentation and architecture - your data stays yours, always.",
  },
  {
    title: "Workspace Isolation",
    description:
      "Multi-tenant architecture with strict workspace isolation prevents cross-workspace data leaks. Each workspace is completely isolated at the database and vector store level.",
  },
  {
    title: "Enterprise Security",
    description:
      "JWT authentication, role-based access control, signed S3 URLs, audit logs, and encryption at rest and in transit. Built with enterprise security standards from day one.",
  },
  {
    title: "Transparent Architecture",
    description:
      "We're open about our technology stack: hybrid retrieval (vector search + BM25), asynchronous processing, and how we handle your data. No black boxes.",
  },
  {
    title: "Data Sovereignty",
    description:
      "You control your data completely. Granular permissions, workspace-scoped access, and the ability to delete all your data at any time. We don't sell or share your documents.",
  },
  {
    title: "Production-Grade Reliability",
    description:
      "Built as a real enterprise-ready SaaS, not a demo. Stateless API servers, horizontal scaling, job retry strategies, and graceful degradation ensure reliability.",
  },
];

export function TrustAndTransparency() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Trust & Transparency
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Building trust through transparency and principled design
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {trustPrinciples.map((principle) => (
              <Card key={principle.title}>
                <CardHeader>
                  <CardTitle>{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

