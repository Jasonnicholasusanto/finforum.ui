import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { environment } from "./environment/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  environment.nextPublicSupabaseUrl &&
  environment.nextPublicSupabasePublishableOrAnonKey;

export function convertEpochToDate(epoch: number, timezone: string): string {
  const date = new Date(epoch * 1000);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
    timeZoneName: "short",
  };

  // Format like: "Fri, 04 Nov 2025, 16:30 AEDT"
  const formatted = new Intl.DateTimeFormat("en-AU", options).format(date);

  // Clean up comma spacing to match "Fri, 04 Nov 2025 16:30 AEDT"
  return formatted.replace(",", "");
}

export function convertEpochToShortDate(
  epoch: number,
  timezone: string
): string {
  const date = new Date(epoch * 1000);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: timezone,
  };

  // Example result: "04 Nov 2025"
  return new Intl.DateTimeFormat("en-AU", options).format(date);
}

export const stockDataPeriods = [
  { label: "D", period: "1d", interval: "5m", description: "Day" },
  { label: "W", period: "5d", interval: "5m", description: "Week" },
  { label: "M", period: "1mo", interval: "30m", description: "Month" },
  { label: "6M", period: "6mo", interval: "1d", description: "6 Months" },
  { label: "Y", period: "1y", interval: "1d", description: "Year" },
  { label: "5Y", period: "5y", interval: "1wk", description: "5 Years" },
  { label: "MAX", period: "max", interval: "1mo", description: "Max" },
];

export const formatPrice = (v?: number) =>
  v == null
    ? ""
    : v.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
