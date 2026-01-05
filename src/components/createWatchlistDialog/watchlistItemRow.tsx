"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScreenerTickerInfo } from "@/models/screener";
import { environment } from "@/lib/environment/env";
import { cn } from "@/lib/utils";

interface ScreenerResultRowProps {
  item: ScreenerTickerInfo;
  onAdd?: (symbol: string) => void;
}

export function WatchlistItemRow({ item, onAdd }: ScreenerResultRowProps) {
  const logoUrl = `${environment.logoKitTickerApiUrl}/${item.symbol}?token=${environment.logoKitTickerApiToken}`;
  const displayName = item.longName || item.displayName || item.symbol;

  const change = item.regularMarketChange;
  const isPositive = typeof change === "number" && change > 0;
  const isNegative = typeof change === "number" && change < 0;

  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50">
      {/* Left: logo + names */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar className="w-8 h-8 shrink-0">
          <AvatarImage
            src={logoUrl}
            alt={`${displayName} logo`}
            className="object-contain"
          />
          <AvatarFallback className="text-xs font-medium">
            {item.symbol?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate">{item.symbol}</span>
          <span className="text-xs text-muted-foreground truncate">
            {displayName}
          </span>
        </div>
      </div>

      {/* Right: price + change + action */}
      <div className="flex items-center gap-6">
        {/* Price */}
        <span className="text-right text-sm font-mono">
          {typeof item.regularMarketPrice === "number"
            ? `$${item.regularMarketPrice.toFixed(2)}`
            : "—"}
        </span>

        {/* Day change */}
        <span
          className={cn(
            "text-right text-sm flex items-center justify-end gap-1",
            isPositive && "text-emerald-600",
            isNegative && "text-red-600",
            !isPositive && !isNegative && "text-muted-foreground"
          )}
        >
          {isPositive && "▲"}
          {isNegative && "▼"}
          {typeof change === "number" ? Math.abs(change).toFixed(2) : "—"}
        </span>

        {/* Action */}
        <div className="flex justify-end">
          {onAdd && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onAdd(item.symbol)}
            >
              + Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
