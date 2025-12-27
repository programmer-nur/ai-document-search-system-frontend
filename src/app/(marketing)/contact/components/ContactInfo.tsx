import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const contactMethods = [
  {
    title: "Sales Inquiries",
    description: "Interested in enterprise solutions or custom pricing?",
    details: "Our sales team will help you find the perfect plan for your organization.",
  },
  {
    title: "Demo Requests",
    description: "Schedule a personalized demo",
    details: "See how our AI document search can transform your workflow in a live demonstration.",
  },
  {
    title: "Support Contact",
    description: "Need help with your account?",
    details: "Our support team is available to assist with technical questions and account issues.",
  },
];

export function ContactInfo() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How We Can Help
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the right contact method for your needs
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {contactMethods.map((method) => (
              <Card key={method.title}>
                <CardHeader>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {method.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {method.details}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

