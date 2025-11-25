"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  ComposedChart,
  Cell,
} from "recharts";
import { HistoryPoint } from "@/models/stocks";

interface StockAreaLineChartProps {
  data: HistoryPoint[];
  symbol: string;
  change?: number;
  period?: string;
}

export default function StockAreaLineChart({
  data,
  symbol,
  change,
  period,
}: StockAreaLineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  const isPositive = change !== undefined ? change > 0 : true;
  const areaColor = isPositive ? "#22c55e" : "#ef4444";

  // Convert timestamp to readable date if needed
  const formattedData = data.map((d) => ({
    ...d,
    dateLabel:
      typeof d.timestamp === "string"
        ? d.timestamp
        : new Date(d.timestamp).toLocaleDateString("en-AU", {
            month: "short",
            day: "numeric",
          }),
  }));

  function formatXAxisLabel(iso: string, period?: string) {
    const date = new Date(iso);

    switch (period) {
      // intraday (1d normally) → include time
      case "1d":
      case "5d":
        return date
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "");

      // 1 week or shorter intraday ranges (like 30m candles)
      case "1wk":
      case "1w":
        return date
          .toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "");

      // 1 month or 3 month → show only day
      case "1mo":
      case "3mo":
      case "6mo":
        return date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

      // 1 year or max → show month + year
      case "1y":
      case "2y":
      case "5y":
      case "10y":
      case "max":
        return date.toLocaleString("en-GB", {
          month: "short",
          year: "numeric",
        });

      // fallback default
      default:
        return date.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || payload.length === 0) return null;

    const formatLabel = (iso: string) => {
      // Keep the original timezone offset in display (don’t convert to user’s local)
      // Extract date/time portion before offset
      const [datePart, timeAndOffset] = iso.split("T");
      const [timePart] = timeAndOffset.split(/[+-]/); // strip timezone offset
      const [year, month, day] = datePart.split("-");
      const [hour, minute] = timePart.split(":");

      const d = new Date(iso); // for weekday/month names (localizable)
      const weekday = d.toLocaleDateString("en-GB", { weekday: "short" }); // For day
      const monthShort = d.toLocaleDateString("en-GB", { month: "short" }); // For month

      return `${weekday} ${Number(
        day
      )} ${monthShort} ${year} ${hour}:${minute}`;
    };

    const p = payload[0].payload;

    return (
      <div className="rounded-md border bg-card p-3 shadow-md text-xs space-y-1">
        <div className="font-semibold">
          <b>{formatLabel(label)}</b>
        </div>
        <div>
          Price: <b>${p.close?.toFixed(2)}</b>
        </div>
        <div>
          Volume: <b>{p.volume?.toLocaleString()}</b>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[500px] lg:h-[465px] pt-10">
      <ResponsiveContainer width="100%" maxHeight={500}>
        <ComposedChart
          data={data}
          responsive
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={areaColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(iso) => formatXAxisLabel(iso, period)}
          />
          <YAxis
            yAxisId="price"
            domain={([dataMin, dataMax]) => {
              const range = dataMax - dataMin;
              const padding = range * 0.35;
              return [dataMin - padding, dataMax];
            }}
            tickFormatter={(v) => `$${v.toFixed(0)}`}
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            orientation="right"
            type="number"
            allowDecimals={false}
          />
          <YAxis
            yAxisId="volume"
            scale="sqrt"
            domain={([dataMin, dataMax]) => {
              const range = dataMax - dataMin;
              const padding = range * 15;
              return [0, dataMax + padding];
            }}
            hide
          />
          <Tooltip content={<CustomTooltip />} />

          <Bar
            yAxisId="volume"
            dataKey="volume"
            opacity={0.5}
            barSize={1000}
            radius={[2, 2, 0, 0]}
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  entry.close < entry.open
                    ? "hsl(0, 70%, 55%)"
                    : "hsl(142, 70%, 45%)"
                }
              />
            ))}
          </Bar>
          <Area
            yAxisId="price"
            type="bump"
            dataKey="close"
            stroke={areaColor}
            fill="url(#colorPrice)"
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
