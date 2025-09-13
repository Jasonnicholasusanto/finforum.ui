"use client";

import { useEffect, useRef } from "react";

export default function GradientBg() {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = interactiveRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let curX = 0,
      curY = 0,
      tgX = 0,
      tgY = 0,
      raf = 0;
    const move = () => {
      curX += (tgX - curX) / 18;
      curY += (tgY - curY) / 18;
      el.style.transform = `translate(${Math.round(curX)}px, ${Math.round(
        curY
      )}px)`;
      raf = requestAnimationFrame(move);
    };
    const onPointerMove = (e: PointerEvent) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    raf = requestAnimationFrame(move);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="gradient-bg pointer-events-none fixed inset-0 -z-10"
      aria-hidden
    >
      <svg className="absolute h-0 w-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <div className="gradients-container">
        <div className="g1" />
        <div className="g2" />
        <div className="g3" />
        <div className="g4" />
        <div className="g5" />
        <div ref={interactiveRef} className="interactive" />
      </div>
    </div>
  );
}
