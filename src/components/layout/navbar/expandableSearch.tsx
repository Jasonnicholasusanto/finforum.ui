"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface ExpandableSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function ExpandableSearch({
  placeholder = "Search…",
  value,
  onChange,
  className,
}: ExpandableSearchProps) {
  const id = useId();
  const [focused, setFocused] = React.useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center transition-all duration-300",
        focused ? "w-86" : "w-32 md:w-48",
        className
      )}
    >
      <SearchIcon
        size={16}
        className="absolute left-2 text-muted-foreground/70 pointer-events-none"
      />
      <Input
        id={id ?? `input-${id}`}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "h-8 ps-8 pe-2 w-full text-sm transition-all duration-300",
          "border-muted focus-visible:ring-1 focus-visible:ring-accent"
        )}
      />
    </div>
  );
}
