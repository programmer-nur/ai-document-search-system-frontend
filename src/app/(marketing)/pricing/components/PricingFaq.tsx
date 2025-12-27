import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What happens if I exceed my limits?",
    answer:
      "We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity. Enterprise customers can set custom limits.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes, annual billing is available for all plans and includes a 20% discount. Contact us for annual pricing details.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers for Enterprise customers. All payments are processed securely.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes, all plans include a 14-day free trial. No credit card required. You can cancel anytime during the trial period.",
  },
  {
    question: "What support is included?",
    answer:
      "Starter includes email support. Team includes priority email support. Enterprise includes 24/7 phone and email support with a dedicated account manager.",
  },
];

export function PricingFaq() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {faq.answer}
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

