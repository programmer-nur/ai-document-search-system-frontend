import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EnterpriseCta() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-4xl border-primary bg-muted/30">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Need Enterprise Solutions?</CardTitle>
            <CardDescription className="mt-2 text-lg">
              Custom pricing, dedicated support, and tailored features for your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 text-center">
            <div className="mb-8 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custom Limits</p>
                <p className="mt-1 text-lg font-semibold">Unlimited scale</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dedicated Support</p>
                <p className="mt-1 text-lg font-semibold">24/7 assistance</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Custom Features</p>
                <p className="mt-1 text-lg font-semibold">Tailored to you</p>
              </div>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

