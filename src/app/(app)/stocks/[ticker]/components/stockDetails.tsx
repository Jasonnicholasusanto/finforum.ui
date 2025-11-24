"use client";

import { Card } from "@/components/ui/card";
import { StockInfoResponse } from "@/models/stocks";
import { motion } from "motion/react";
import { useState } from "react";

interface StockDetailsProps {
  stock: StockInfoResponse;
}

export default function StockDetails({ stock }: StockDetailsProps) {
  if (!stock) return null;

  const [expanded, setExpanded] = useState(false);

  const summary =
    stock.longBusinessSummary || "No company description available.";
  const MAX_CHARS = 250; // adjust as needed

  const isLong = summary.length > MAX_CHARS;
  const displayedText = expanded ? summary : summary.slice(0, MAX_CHARS);

  const fmt = (v: number | undefined | null, decimals = 2) =>
    v !== undefined && v !== null
      ? v.toLocaleString("en-US", { maximumFractionDigits: decimals })
      : "-";

  const statRow = (label: string, value: any) => (
    <div className="flex justify-between py-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? "-"}</span>
    </div>
  );

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-3 gap-5">
        {/* LEFT COLUMN — ABOUT */}
        <Card className="md:col-span-1 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About</h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {displayedText}
              {!expanded && isLong && "…"}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 text-xs font-medium text-blue-400 hover:underline"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          <div className="space-y-1">
            {statRow("CEO", stock.companyOfficers?.[0]?.name || "—")}
            {statRow("Industry", stock.industry)}
            {statRow("Sector", stock.sector)}
            {statRow(
              "Website",
              stock.website ? (
                <a
                  href={stock.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 text-blue-400 hover:text-blue-300"
                >
                  {stock.website}
                </a>
              ) : (
                "—"
              )
            )}
            {statRow("Country", stock.country)}
            {statRow(
              "Employees",
              stock.fullTimeEmployees?.toLocaleString() ?? "—"
            )}
          </div>
        </Card>

        {/* RIGHT COLUMN — KEY STATISTICS */}
        <Card className="md:col-span-2 p-6 space-y-6">
          <h2 className="text-xl font-semibold">Key Statistics</h2>

          <div className="space-y-4">
            {/* PRICE + TRADING */}
            <div>
              <h3 className="text-lg font-medium mb-1">Trading</h3>
              {statRow("Previous Close", fmt(stock.previousClose))}
              {statRow("Open", fmt(stock.open))}
              {statRow(
                "Bid",
                stock.bid ? `${fmt(stock.bid)} x ${stock.bidSize}` : "—"
              )}
              {statRow(
                "Ask",
                stock.ask ? `${fmt(stock.ask)} x ${stock.askSize}` : "—"
              )}
              {statRow(
                "Day Range",
                stock.regularMarketDayRange ||
                  `${fmt(stock.dayLow)} – ${fmt(stock.dayHigh)}`
              )}
              {statRow(
                "52-Week Range",
                stock.fiftyTwoWeekRange ||
                  `${fmt(stock.fiftyTwoWeekLow)} – ${fmt(
                    stock.fiftyTwoWeekHigh
                  )}`
              )}
              {statRow("Volume", stock.regularMarketVolume?.toLocaleString())}
              {statRow(
                "Avg Volume (3M)",
                stock.averageDailyVolume3Month?.toLocaleString()
              )}
              {statRow(
                "Avg Volume (10D)",
                stock.averageDailyVolume10Day?.toLocaleString()
              )}
            </div>

            {/* FUNDAMENTALS */}
            <div>
              <h3 className="text-lg font-medium mb-1">Fundamentals</h3>
              {statRow(
                "Market Cap",
                stock.marketCap ? `$${fmt(stock.marketCap, 0)}` : "—"
              )}
              {statRow("Beta", fmt(stock.beta))}
              {statRow("EPS (TTM)", fmt(stock.epsTrailingTwelveMonths))}
              {statRow("PE (TTM)", fmt(stock.trailingPE))}
              {statRow("Forward PE", fmt(stock.forwardPE))}
              {statRow(
                "Profit Margins",
                stock.profitMargins !== undefined
                  ? `${(stock.profitMargins * 100).toFixed(2)}%`
                  : "—"
              )}
              {statRow(
                "Operating Margins",
                stock.operatingMargins !== undefined
                  ? `${(stock.operatingMargins * 100).toFixed(2)}%`
                  : "—"
              )}
            </div>

            {/* DIVIDENDS */}
            <div>
              <h3 className="text-lg font-medium mb-1">Dividends</h3>
              {statRow(
                "Dividend Rate",
                stock.dividendRate ? `$${fmt(stock.dividendRate)}` : "—"
              )}
              {statRow(
                "Dividend Yield",
                stock.dividendYield
                  ? `${(stock.dividendYield * 100).toFixed(2)}%`
                  : "—"
              )}
              {statRow(
                "Payout Ratio",
                stock.payoutRatio !== undefined
                  ? `${(stock.payoutRatio * 100).toFixed(2)}%`
                  : "—"
              )}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
