"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  UTCTimestamp,
  HistogramSeries,
} from "lightweight-charts";
import { HistoryPoint } from "@/models/stocks";
import { motion } from "motion/react";

interface CandlestickChartProps {
  data: HistoryPoint[];

  height?: number;
}

export default function CandlestickChart({
  data,
  height = 500,
}: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);

  //   useEffect(() => {
  //     if (!chartContainerRef.current) return;

  //     const chart = createChart(chartContainerRef.current, {
  //       width: chartContainerRef.current.clientWidth,
  //       height,
  //       layout: {
  //         background: { type: ColorType.Solid, color: "transparent" },
  //         textColor: "#ccc",
  //       },
  //       grid: {
  //         vertLines: { color: "rgba(197,203,206,0.2)" },
  //         horzLines: { color: "rgba(197,203,206,0.2)" },
  //       },
  //       timeScale: {
  //         borderColor: "#444",
  //         timeVisible: true,
  //         secondsVisible: false,
  //       },
  //       crosshair: {
  //         mode: 0,
  //       },
  //     });

  //     chartRef.current = chart;

  //     // Candlestick series
  //     const candleSeries = chart.addSeries(CandlestickSeries, {
  //       upColor: "rgb(34, 195, 93)",
  //       borderUpColor: "rgb(34, 195, 93)",
  //       wickUpColor: "rgb(34, 195, 93)",
  //       downColor: "rgb(221, 60, 60)",
  //       borderDownColor: "rgb(221, 60, 60)",
  //       wickDownColor: "rgb(221, 60, 60)",
  //       borderVisible: false,
  //     });

  //     candleSeries.priceScale().applyOptions({
  //       scaleMargins: {
  //         top: 0.1,
  //         bottom: 0.3,
  //       },
  //     });

  //     // Volume area series
  //     const barSeries = chart.addSeries(HistogramSeries, {
  //       color: "#26a69a",
  //       priceFormat: {
  //         type: "volume",
  //       },
  //       priceScaleId: "",
  //     });

  //     // Apply scale margins properly
  //     barSeries.priceScale().applyOptions({
  //       scaleMargins: {
  //         top: 0.7,
  //         bottom: 0,
  //       },
  //     });

  //     // Convert your data to TV format
  //     const formatted = data.map((d) => ({
  //       time: Math.floor(new Date(d.timestamp).getTime() / 1000) as UTCTimestamp,
  //       open: d.open,
  //       high: d.high,
  //       low: d.low,
  //       close: d.close,
  //     }));

  //     const volumeData = data.map((d) => {
  //       const utc = Math.floor(
  //         new Date(d.timestamp).getTime() / 1000
  //       ) as UTCTimestamp;

  //       const isUp = d.close >= d.open;

  //       return {
  //         time: utc,
  //         value: d.volume,
  //         color: isUp ? "rgb(34, 195, 93, 0.5)" : "rgb(221, 60, 60, 0.5)",
  //       };
  //     });

  //     candleSeries.setData(formatted);
  //     barSeries.setData(volumeData);

  //     // Resize handler
  //     const handleResize = () => {
  //       if (!chartContainerRef.current) return;
  //       chart.applyOptions({ width: chartContainerRef.current.clientWidth });
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //       chart.remove();
  //     };
  //   }, [data, height]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    let animationFrameId: number;
    let disposed = false;

    animationFrameId = requestAnimationFrame(() => {
      if (disposed || !chartContainerRef.current) return;

      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height,
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: "#ccc",
        },
        grid: {
          vertLines: { color: "rgba(197,203,206,0.2)" },
          horzLines: { color: "rgba(197,203,206,0.2)" },
        },
        timeScale: {
          borderColor: "#444",
          timeVisible: true,
          secondsVisible: false,
        },
        crosshair: {
          mode: 0,
        },
      });

      chartRef.current = chart;

      // ----------------------
      // Candlestick series
      // ----------------------
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: "rgb(34, 195, 93)",
        borderUpColor: "rgb(34, 195, 93)",
        wickUpColor: "rgb(34, 195, 93)",
        downColor: "rgb(221, 60, 60)",
        borderDownColor: "rgb(221, 60, 60)",
        wickDownColor: "rgb(221, 60, 60)",
        borderVisible: false,
      });

      candleSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.1,
          bottom: 0.3,
        },
      });

      // ----------------------
      // Volume series
      // ----------------------
      const barSeries = chart.addSeries(HistogramSeries, {
        color: "#26a69a",
        priceFormat: { type: "volume" },
        priceScaleId: "",
      });

      barSeries.priceScale().applyOptions({
        scaleMargins: {
          top: 0.7,
          bottom: 0,
        },
      });

      // ----------------------
      // Format candle data
      // ----------------------
      const formatted = data.map((d) => ({
        time: Math.floor(
          new Date(d.timestamp).getTime() / 1000
        ) as UTCTimestamp,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }));

      // ----------------------
      // Format volume data
      // ----------------------
      const volumeData = data.map((d) => {
        const utc = Math.floor(
          new Date(d.timestamp).getTime() / 1000
        ) as UTCTimestamp;
        const isUp = d.close >= d.open;

        return {
          time: utc,
          value: d.volume,
          color: isUp ? "rgba(34,195,93,0.5)" : "rgba(221,60,60,0.5)",
        };
      });

      candleSeries.setData(formatted);
      barSeries.setData(volumeData);

      // ----------------------
      // Resize handler
      // ----------------------
      const handleResize = () => {
        if (!chartContainerRef.current) return;
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      };

      window.addEventListener("resize", handleResize);

      // Cleanup chart
      return () => {
        window.removeEventListener("resize", handleResize);
        chart.remove();
      };
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrameId);
      chartRef.current?.remove();
    };
  }, [data, height]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full"
      style={{ height: `${height}px`, position: "relative" }}
    />
  );
}
