import PageEnter from "@/components/animations/page-enter";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <PageEnter>
        <section className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center">
          <h1 className="text-4xl font-bold font- tracking-tight md:text-6xl">
            Where finance meets community
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground">
            Join lively discussions, share insights, and explore analytics. An
            app built for modern investors.
          </p>
          <div className="mt-2">
            <Button asChild size="lg" variant="glass">
              <Link href="/auth/sign-up">Join the Forum</Link>
            </Button>
          </div>
        </section>
      </PageEnter>
    </main>
  );
}
