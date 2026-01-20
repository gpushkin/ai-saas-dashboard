import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">AI SaaS Dashboard</h1>
        <p className="text-muted-foreground">
          Smart analytics & AI assistant
        </p>
        <Link href="/login">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </main>
  );
}