"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Props = {
  /** Show only once per tab session */
  oncePerSession?: boolean;
  /** ms for each phase (tweak to taste) */
  textMs?: number; // Finforum fade-in
  gradientMs?: number; // gradient bloom
  holdMs?: number; // pause before fade-out
  fadeOutMs?: number; // overlay fade-out
};

export default function StartupReveal({
  oncePerSession = true,
  textMs = 900,
  gradientMs = 900,
  holdMs = 350,
  fadeOutMs = 600,
}: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setShow(false);
      return;
    }

    const KEY = "ff_seen_intro";

    if (oncePerSession && KEY) {
      setShow(false);
      return;
    }
    if (oncePerSession) sessionStorage.setItem(KEY, "1");

    // total timeline length (a smidge extra for safety)
    const totalMs = textMs + gradientMs + holdMs + fadeOutMs + 80;
    const t = window.setTimeout(() => setShow(false), totalMs);
    return () => clearTimeout(t);
  }, [oncePerSession, textMs, gradientMs, holdMs, fadeOutMs]);

  // Convert to seconds for Motion transitions
  const s = (ms: number) => ms / 1000;

  console.log("SHOW INTRO:", show);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[999] pointer-events-none"
          // Start with a pure dark canvas
          style={{
            background: "linear-gradient(0deg, rgba(0,0,0,1), rgba(0,0,0,1))",
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: s(fadeOutMs), ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Centered brand text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: s(textMs), ease: "easeOut" }}
          >
            <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white/90 select-none">
              Finforum
            </div>
          </motion.div>

          {/* Gradient bloom layer (behind text) */}
          <motion.div
            // container for blobs
            className="absolute inset-0 will-change-transform"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: s(gradientMs),
              ease: [0.16, 1, 0.3, 1],
              delay: s(textMs * 0.6), // blooms shortly after text starts
            }}
          >
            {/* soft blur to make it dreamy */}
            {/* <div className="absolute inset-0 [filter:blur(36px)] opacity-90">
              <div
                className="absolute left-[18%] top-[28%] w-[52vmax] h-[52vmax]
                              rounded-full
                              bg-[radial-gradient(circle_at_center,rgba(var(--color1),0.95)_0,rgba(var(--color1),0)_58%)]"
              />
              <div
                className="absolute right-[14%] top-[18%] w-[46vmax] h-[46vmax]
                              rounded-full
                              bg-[radial-gradient(circle_at_center,rgba(var(--color2),0.9)_0,rgba(var(--color2),0)_55%)]"
              />
              <div
                className="absolute left-[35%] bottom-[12%] w-[50vmax] h-[50vmax]
                              rounded-full
                              bg-[radial-gradient(circle_at_center,rgba(var(--color3),0.9)_0,rgba(var(--color3),0)_55%)]"
              />
              <div
                className="absolute right-[30%] bottom-[22%] w-[40vmax] h-[40vmax]
                              rounded-full opacity-80
                              mix-blend-overlay
                              bg-[radial-gradient(circle_at_center,rgba(var(--color4),0.85)_0,rgba(var(--color4),0)_55%)]"
              />
            </div> */}
          </motion.div>

          {/* Optional: slight lift then settle, before exit */}
          <motion.div
            className="absolute inset-0"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ delay: s(textMs + gradientMs + holdMs) }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
