"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchHistoryEntry {
  id: string | number;
  query: string;
}

interface SearchHistoryDropdownProps {
  loading: boolean;
  history: SearchHistoryEntry[];
  onSelect: (entry: SearchHistoryEntry) => void;
  className?: string;
}

/**
 * Displays the user's recent search history in a dropdown list.
 */
export function SearchHistoryDropdown({
  loading,
  history,
  onSelect,
  className,
}: SearchHistoryDropdownProps) {
  if (loading) {
    return (
      <div className={cn("px-3 py-2 text-sm text-muted-foreground", className)}>
        Fetching recent searches…
      </div>
    );
  }

  if (!loading && history.length === 0) {
    return (
      <div className={cn("px-3 py-2 text-sm text-muted-foreground", className)}>
        No recent searches
      </div>
    );
  }

  return (
    <div className={cn("max-h-75 overflow-auto p-2", className)}>
      {history.map((h) => (
        <div
          key={h.id}
          className="px-3 py-3 hover:bg-accent cursor-pointer text-sm flex items-center gap-3 transition-colors rounded-lg"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onSelect(h)}
        >
          <Clock size={14} className="text-muted-foreground" />
          <span className="truncate">{h.query}</span>
        </div>
      ))}
    </div>
  );
}
