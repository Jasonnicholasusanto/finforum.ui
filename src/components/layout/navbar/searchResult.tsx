"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { QuoteResult } from "@/models/search";
import { environment } from "@/lib/environment/env";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SearchResultsProps {
  results: QuoteResult[];
  loading: boolean;
  hasSearched: boolean;
  onSelect?: (result: any) => void;
  className?: string;
}

/**
 * Renders a single search result item with logo, symbol, and longname.
 */
function SearchQuoteItem({
  item,
  onSelect,
}: {
  item: QuoteResult;
  onSelect?: (result: QuoteResult) => void;
}) {
  const logoUrl = `${environment.logoKitTickerApiUrl}/${item.symbol}?token=${environment.logoKitTickerApiToken}`;

  return (
    <div
      key={item.symbol}
      className="px-3 py-3 hover:bg-accent cursor-pointer text-sm flex items-center gap-3 transition-colors rounded-lg"
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => onSelect?.(item)}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={logoUrl}
          alt={`${item.shortname || item.symbol} logo`}
          className="object-cover"
        />
        <AvatarFallback className="text-xs font-medium">
          {item.symbol?.charAt(0).toUpperCase() || "?"}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col min-w-0">
        <p className="font-semibold text-foreground leading-none">
          {item.symbol}
        </p>
        <p className="text-xs text-muted-foreground truncate min-w-0">
          {item.longname || item.shortname} &bull; {item.exchange}
        </p>
      </div>
    </div>
  );
}

/**
 * Renders the search results dropdown content.
 */
export function SearchResults({
  results,
  loading,
  hasSearched,
  onSelect,
  className,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">Searching…</div>
    );
  }

  if (!loading && results.length > 0) {
    return (
      <div className={cn("max-h-75 overflow-auto p-2", className)}>
        {results.map((item) => (
          <SearchQuoteItem key={item.symbol} item={item} onSelect={onSelect} />
        ))}
      </div>
    );
  }

  if (!loading && hasSearched && results.length === 0) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">
        No results found
      </div>
    );
  }

  return null;
}
