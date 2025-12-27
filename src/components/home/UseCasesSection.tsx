import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const useCases = [
  {
    title: "Customer Support",
    description:
      "Quickly find answers to customer questions from your knowledge base and support docs. Reduce response time from hours to seconds.",
  },
  {
    title: "Legal & Compliance",
    description:
      "Search through contracts, regulations, and legal documents with precision. Perfect for compliance & policy search with accurate citations.",
  },
  {
    title: "Internal Knowledge Base",
    description:
      "Make your company&apos;s documentation searchable and accessible to everyone on your team. Ideal for enterprise onboarding and training.",
  },
];

export function UseCasesSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Use Cases
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by teams across industries
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.title}>
              <CardHeader>
                <CardTitle>{useCase.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{useCase.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

