import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const problems = [
  {
    title: "Messy PDFs",
    description:
      "Documents scattered across folders, impossible to find what you need when you need it.",
  },
  {
    title: "Large Spreadsheets",
    description:
      "Thousands of rows and columns make it impossible to extract insights quickly.",
  },
  {
    title: "Manual Searching",
    description:
      "Hours wasted scrolling through documents, trying to find that one piece of information.",
  },
];

export function ProblemSection() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Problem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Managing documents shouldn&apos;t be this hard
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <Card key={problem.title}>
              <CardHeader>
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{problem.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

