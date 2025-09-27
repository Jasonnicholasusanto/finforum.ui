"use client";

import BlurText from "@/components/blur-text";
import Navbar from "@/components/layout/navbar";
import { MotionButton } from "@/components/ui/motion-button";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function LandingPage() {
  const slogans = [
    "A platform where finance meets community",
    "Analytics and community in one platform",
    "Your social hub for financial insights",
    "Connect, discuss, and invest smarter",
  ];

  const [index, setIndex] = useState(0);
  const loopCount = useRef(0);

  useEffect(() => {
    const currentSlogan = slogans[index];
    const wordCount = currentSlogan.split(" ").length;
    const duration = wordCount * 700;

    const timeout = setTimeout(() => {
      setIndex((prev) => {
        const next = (prev + 1) % slogans.length;

        if (next === 0) {
          loopCount.current += 1;
          if (loopCount.current >= 1) {
            return 0;
          }
        }
        return next;
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [slogans, index]);

  return (
    <main className="relative min-h-screen overflow-hidden padding-top-14">
      <Navbar />
      <section className="mt-16 relative z-10 mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-4xl flex-col items-center justify-center gap-8 px-4 text-center">
        <AnimatePresence mode="wait">
          <BlurText
            key={slogans[index]}
            text={slogans[index]}
            delay={200}
            animateBy="words"
            direction="top"
            className="text-3xl font-black font- tracking-tight md:text-6xl justify-center text-center"
          />
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <div className="flex flex-col items-center gap-8">
            <p className="max-w-2xl text-balance text-muted-foreground">
              Join lively discussions, share insights, and explore analytics. An
              app built for modern investors.
            </p>
            <MotionButton asChild size="lg" variant="glass">
              <Link href="/auth/sign-up">Join the Forum</Link>
            </MotionButton>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
