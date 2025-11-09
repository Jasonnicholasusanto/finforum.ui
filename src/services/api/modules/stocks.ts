import { StockInfoResponse } from "@/models/stocks";
import { apiClient } from "../client";
import { Endpoints } from "../endpoints";

export async function getStockInfo(ticker: string) {
  return apiClient<StockInfoResponse>(
    `${Endpoints.Yfinance.Base}${
      Endpoints.Yfinance.Stocks.Base
    }${Endpoints.Yfinance.Stocks.Info(ticker)}`,
    {
      method: "GET",
      version: Endpoints.Yfinance.Stocks.BaseVersion,
    }
  );
}
