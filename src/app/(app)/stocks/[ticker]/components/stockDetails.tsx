"use client";

import { motion } from "motion/react";
import { StockInfoResponse } from "@/models/stocks";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { environment } from "@/lib/environment/env";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import StockStats from "./components/StockStats";
// import StockFinancials from "./components/StockFinancials";
// import StockAbout from "./components/StockAbout";
// import StockCompanyInfo from "./components/StockCompanyInfo";
// import StockDiscussions from "./components/StockDiscussions";

export default function StockDetails({ stock }: { stock: StockInfoResponse }) {
  const isPositive =
    (stock.currentPrice ?? 0) - (stock.previousClose ?? 0) >= 0;

  const logoUrl = `${environment.logoKitTickerApiUrl}/${stock.symbol}?token=${environment.logoKitTickerApiToken}`;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <section className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
        <div className="flex items-center gap-5">
          {/* <img
            src={logoUrl}
            alt={`${stock.shortName || stock.symbol} logo`}
            width={56}
            height={56}
            loading="lazy"
            style={{
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
            }}
            onError={(e) => {
              e.currentTarget.src = "/default-logo.png";
            }}
          /> */}
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={logoUrl}
              alt={`${stock.shortName || stock.symbol} logo`}
              loading="lazy"
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-medium">
              {stock.symbol?.charAt(0).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {stock.longName || stock.shortName || stock.symbol}
            </h1>
            <p className="text-muted-foreground text-sm">
              {stock.symbol} • {stock.exchange || stock.market}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-semibold">
            {stock.currentPrice ? `$${stock.currentPrice.toFixed(2)}` : "N/A"}
          </p>
          {stock.previousClose && (
            <p
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {isPositive ? "+" : "-"}
              {Math.abs(
                (((stock.currentPrice ?? 0) - (stock.previousClose ?? 0)) /
                  (stock.previousClose ?? 1)) *
                  100
              ).toFixed(2)}
              %
            </p>
          )}
        </div>
      </section>

      <Separator />

      {/* Chart Placeholder */}
      <Card className="p-6 h-[300px] flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">📈 Chart coming soon</p>
      </Card>

      {/* Core Components */}
      {/* <StockStats stock={stock} />
      <StockFinancials stock={stock} />
      <StockAbout stock={stock} />
      <StockCompanyInfo stock={stock} />
      <StockDiscussions stock={stock} /> */}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Add to Watchlist</Button>
        <Button>Discuss on FinForum</Button>
      </div>
    </motion.div>
  );
}
