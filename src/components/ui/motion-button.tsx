"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "motion/react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "pointer-events-auto bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        glass:
          "border border-white/20 dark:border-white/10 " +
          "bg-white/20 dark:bg-white/20 supports-[backdrop-filter]:bg-white/20 " +
          "backdrop-blur-xl backdrop-saturate-150 shadow-sm " +
          "hover:bg-white/30 dark:hover:bg-white/30 supports-[backdrop-filter]:hover:bg-white/30 " +
          "focus-visible:ring-white/40 focus-visible:ring-offset-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function MotionButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  return (
    <motion.button
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        "pointer-events-auto"
      )}
      initial={{ opacity: 1, scale: 1 }}
      whileHover={{ opacity: 0.75 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        opacity: { duration: 0.5, ease: "easeInOut" },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
      {...props}
    />
  );
}

export { MotionButton, buttonVariants };
