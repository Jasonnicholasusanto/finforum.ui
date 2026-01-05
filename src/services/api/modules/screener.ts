"use server";

import { ScreenerCuratedResult } from "@/models/screener";
import { apiClient } from "../client";
import { Endpoints } from "../endpoints";

export async function fetchCuratedScreens(
  assetType: "equity" | "fund",
  limit = 25
): Promise<ScreenerCuratedResult> {
  return apiClient<ScreenerCuratedResult>(
    `${Endpoints.Yfinance.Base}${
      Endpoints.Yfinance.Screener.Base
    }${Endpoints.Yfinance.Screener.Curated(assetType, limit)}`,
    { method: "GET", version: Endpoints.Yfinance.Screener.BaseVersion }
  );
}
