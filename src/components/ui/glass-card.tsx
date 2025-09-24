import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "hover" | "pressed";
}

export function GlassCard({
  children,
  className,
  variant = "default",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "group backdrop-blur-md border rounded-xl transition-all duration-300 shadow-sm",
        {
          "bg-white/5 border-white/10 dark:bg-white/5 dark:border-white/10":
            variant === "default",
          "bg-white/10 hover:bg-white/15 border-white/20 dark:bg-white/10 dark:hover:bg-white/20 cursor-pointer shadow-md":
            variant === "hover",
          "bg-white/15 border-white/30 dark:bg-white/15 dark:border-white/30":
            variant === "pressed",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
