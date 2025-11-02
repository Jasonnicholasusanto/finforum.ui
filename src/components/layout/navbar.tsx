"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
    >
      <header
        className="
        fixed top-0 z-50 w-full
        border-b border-white/5
        bg-neutral-900/60 dark:bg-neutral-900/60
        backdrop-blur-xl backdrop-saturate-150
        supports-[backdrop-filter]:bg-neutral-900/30
        dark:supports-[backdrop-filter]:bg-neutral-900/30
        bg-clip-padding shadow-sm
        before:content-[''] before:absolute before:inset-0 before:pointer-events-none
        before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]
        before:opacity-60
      "
      >
        <nav className="relative z-10 mx-auto flex h-16 max-w-7xl lg:max-w-8xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-extrabold tracking-tight">
            Finforum
          </Link>
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hover:bg-white/10 dark:hover:bg-white/10"
            >
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild variant="glass">
              <Link href="/auth/sign-up">Sign up</Link>
            </Button>
          </div>
        </nav>
      </header>
    </motion.div>
  );
}
