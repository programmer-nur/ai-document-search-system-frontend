import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const solutions = [
  {
    title: "AI-Powered Search",
    description:
      "Ask questions in natural language and get instant, accurate answers with proper citations. Query latency of 2-3 seconds even with 10k+ documents.",
  },
  {
    title: "Hybrid Retrieval",
    description:
      "Combines vector search (semantic understanding) with BM25 (keyword matching) using Reciprocal Rank Fusion for the most relevant, grounded results.",
  },
  {
    title: "Secure & Private",
    description:
      "Multi-tenant workspace isolation, no AI model training on your data, enterprise-grade security with JWT authentication and role-based access.",
  },
];

export function SolutionSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Solution
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            AI-powered document intelligence at your fingertips
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.title}>
              <CardHeader>
                <CardTitle>{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{solution.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

