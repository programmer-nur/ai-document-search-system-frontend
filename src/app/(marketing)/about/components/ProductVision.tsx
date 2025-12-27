import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const visionPoints = [
  {
    title: "Handle Thousands of Documents",
    description:
      "Built to scale from small teams to enterprise organizations. Process and search through thousands of PDFs, spreadsheets, and presentations effortlessly.",
  },
  {
    title: "Fast, Accurate, Grounded Answers",
    description:
      "Hybrid retrieval combining semantic search and keyword matching ensures accurate answers with proper citations, reducing AI hallucinations.",
  },
  {
    title: "Privacy-First Architecture",
    description:
      "Your documents never leave your control. Multi-tenant isolation, workspace-scoped access, and no AI model training on customer data.",
  },
  {
    title: "Enterprise-Ready Infrastructure",
    description:
      "Production-grade architecture with asynchronous processing, horizontal scaling, and enterprise security standards from day one.",
  },
];

export function ProductVision() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Product Vision
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We envision a world where finding information in documents is as
              natural as asking a question
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {visionPoints.map((point) => (
              <Card key={point.title}>
                <CardHeader>
                  <CardTitle>{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {point.description}
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

