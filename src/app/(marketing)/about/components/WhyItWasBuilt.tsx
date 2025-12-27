import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const reasons = [
  {
    title: "The Document Problem",
    description:
      "Teams struggle with thousands of messy PDFs, spreadsheets, and presentations. Finding the right information takes hours, not seconds. Manual searching is inefficient and error-prone.",
  },
  {
    title: "AI Technology Gap",
    description:
      "Existing AI search solutions were either too expensive, too complex, or didn't respect user privacy. We needed a solution that balances power with trust.",
  },
  {
    title: "Real-World Use Cases",
    description:
      "Customer support knowledge bases, compliance & policy search, legal document analysis, internal documentation, and enterprise onboarding all needed a better solution.",
  },
  {
    title: "The Technical Solution",
    description:
      "We built a system using hybrid retrieval (vector search + BM25), asynchronous document processing, multi-tenant isolation, and enterprise-grade security to solve these problems.",
  },
];

export function WhyItWasBuilt() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why It Was Built
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Born from frustration, built with purpose
            </p>
          </div>
          <div className="mt-16 space-y-8">
            {reasons.map((reason, index) => (
              <Card key={reason.title}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl">{reason.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {reason.description}
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

