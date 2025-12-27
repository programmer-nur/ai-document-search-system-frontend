const steps = [
  {
    number: 1,
    title: "Upload",
    description:
      "Drag and drop your documents. We support PDFs, spreadsheets, and more.",
  },
  {
    number: 2,
    title: "Ask",
    description:
      "Type your question in natural language. Our AI understands context and intent.",
  },
  {
    number: 3,
    title: "Answer",
    description:
      "Get instant answers with citations. See exactly where the information came from.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Simple 3-step flow to get answers from your documents
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl gap-12 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

