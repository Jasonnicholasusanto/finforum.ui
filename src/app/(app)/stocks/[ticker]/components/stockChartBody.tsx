"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryPoint, StockHistoryResponse } from "@/models/stocks";
import StockAreaLineChart from "./stockAreaLineChart";
import { cn, formatPrice, stockDataPeriods } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { DotWave } from "ldrs/react";
import CandlestickChart from "./stockCandleStickChart";
import { Button } from "@/components/ui/button";
import { LuChartArea, LuChartCandlestick } from "react-icons/lu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "motion/react";

interface StockChartProps {
  symbol: string;
  closingPrice?: number;
}

export default function StockChartBody({
  symbol,
  closingPrice,
}: StockChartProps) {
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [change, setChange] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<"line" | "candle">("line");
  const [interval, setInterval] = useState("30m");
  const [period, setPeriod] = useState("1mo");

  async function fetchHistory() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/stocks/${symbol}?interval=${interval}&period=${period}`
      );
      const data = await res.json();
      const dataParsed: StockHistoryResponse = data.results;
      const sorted = (dataParsed.history || []).sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      setHistory(sorted || []);
      setChange(dataParsed.change || 0);
      setPercentChange(dataParsed.change_percentage || 0);
    } catch (err) {
      console.error("Failed to fetch ticker history:", err);
    } finally {
      setLoading(false);
    }
  }

  function getPeriodDescription(period: string) {
    return stockDataPeriods.find((p) => p.period === period)?.description || "";
  }

  useEffect(() => {
    fetchHistory();
  }, [symbol, interval, period]);

  function getIntervalForPeriod(period: string): string | undefined {
    return stockDataPeriods.find((p) => p.period === period)?.interval;
  }

  function handleStockDataPeriodChange(newPeriod: string) {
    setPeriod(newPeriod);
    const nextInterval = getIntervalForPeriod(newPeriod);
    if (nextInterval) setInterval(nextInterval);
  }

  return (
    <div>
      <div className="flex flex-end justify-between items-center mb-5">
        <Tabs value={period} onValueChange={handleStockDataPeriodChange}>
          <TabsList className="bg-muted gap-1 rounded-xl">
            {stockDataPeriods.map((p) => (
              <TabsTrigger
                key={p.period}
                value={p.period}
                className="bg-muted rounded-lg cursor-pointer px-5"
              >
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-end justify-end items-center mb-3 gap-2">
          {loading ? (
            <div className="text-right flex flex-row gap-5 items-end">
              <Badge
                variant="ticker"
                className="px-3 py-1 rounded-3xl min-w-50"
              >
                <Skeleton className="h-3 w-[100%] rounded-full" />
              </Badge>
            </div>
          ) : (
            <div className="text-right flex flex-row gap-5 items-end">
              <Badge
                variant="ticker"
                className={cn(
                  "px-3 py-1 rounded-3xl",
                  change > 0 ? "bg-green-500/10" : "bg-red-500/10"
                )}
              >
                <div className="flex items-center gap-2 justify-end">
                  <p
                    className={cn(
                      "text-md font-bold flex flex-row items-center gap-0.5",
                      change > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {change! >= 0 ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
                    {formatPrice(Math.abs(change))}
                  </p>
                  <p
                    className={cn(
                      "text-md font-bold",
                      percentChange > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    ({percentChange > 0 ? "+" : "-"}
                    {Math.abs(percentChange).toFixed(2)}&#37;)
                  </p>
                  <p
                    className={cn(
                      "text-md",
                      percentChange > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {getPeriodDescription(period)}
                  </p>
                </div>
              </Badge>
            </div>
          )}
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  setChartType(chartType === "line" ? "candle" : "line")
                }
              >
                {chartType === "line" ? (
                  <LuChartArea />
                ) : (
                  <LuChartCandlestick />
                )}
              </Button>
            </TooltipTrigger>

            <TooltipContent side="bottom">
              {chartType === "line" ? "Simple chart" : "Advanced chart"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {loading ? (
        <div className="h-[500px] lg:h-[465px] rounded-lg flex bg-muted-foreground/3 items-center justify-center">
          <DotWave size="50" speed="1" color="white" />
        </div>
      ) : (
        <div className="h-[500px] lg:h-[465px] flex items-center justify-center rounded-md">
          {chartType === "line" ? (
            <StockAreaLineChart
              data={history}
              change={change}
              period={period}
            />
          ) : (
            <CandlestickChart data={history} />
          )}
        </div>
      )}
    </div>
  );
}
