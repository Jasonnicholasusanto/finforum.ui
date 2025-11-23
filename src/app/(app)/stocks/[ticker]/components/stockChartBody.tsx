"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HistoryPoint, StockHistoryResponse } from "@/models/stocks";
import StockAreaLineChart from "./stockAreaLineChart";
import { cn, stockDataPeriods } from "@/lib/utils";

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

  if (loading)
    return (
      <Card className="h-[350px] flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Fetching chart data...</p>
      </Card>
    );

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
      <div className="flex flex-end justify-between items-center">
        <Tabs value={period} onValueChange={handleStockDataPeriodChange}>
          <TabsList className="bg-muted">
            {stockDataPeriods.map((p) => (
              <TabsTrigger
                key={p.period}
                value={p.period}
                className="bg-muted rounded-none cursor-pointer"
              >
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="text-right flex flex-row gap-5 items-end">
          <div className="flex items-center gap-2 justify-end">
            <p
              className={cn(
                "text-md font-bold",
                change > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {change > 0 ? "+" : "-"} &#36;
              {Math.abs(change).toFixed(2)}
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
            <p className="text-md text-muted-foreground">
              {getPeriodDescription(period)}
            </p>
          </div>
        </div>
      </div>

      <div className="h-full flex items-center justify-center rounded-md">
        <StockAreaLineChart data={history} symbol={symbol} change={change} />
      </div>
    </div>
  );
}
