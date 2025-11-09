import { SearchHistoryEntry, SearchQuotesResponse } from "@/models/search";
import { apiClient } from "../client";
import { Endpoints } from "../endpoints";

export async function searchQuotes(
  query: string,
  params: {
    maxResult?: number;
    recommended?: number;
    enableFuzzyQuery?: boolean;
  } = {}
): Promise<SearchQuotesResponse> {
  if (!query.trim()) return { query, results: [] };

  const { maxResult = 8, recommended = 8, enableFuzzyQuery = true } = params;

  return apiClient<SearchQuotesResponse>(
    `${Endpoints.Yfinance.Base}${
      Endpoints.Yfinance.Stocks.Base
    }${Endpoints.Yfinance.Stocks.SearchQuotes(
      query,
      maxResult,
      recommended,
      enableFuzzyQuery
    )}`,
    { method: "GET", version: Endpoints.Yfinance.Stocks.BaseVersion }
  );
}

export async function searchHistory(
  limit: number
): Promise<SearchHistoryEntry[]> {
  return apiClient<SearchHistoryEntry[]>(
    `${Endpoints.SearchHistory.Base}/?limit=${limit}`,
    { method: "GET", version: Endpoints.SearchHistory.BaseVersion }
  );
}

export async function fetchSearchTypes(): Promise<string[]> {
  return apiClient<string[]>(`${Endpoints.SearchHistory.Base}/types`, {
    method: "GET",
    version: Endpoints.SearchHistory.BaseVersion,
  });
}

export async function addSearchHistoryEntry(
  query: string,
  type: string
): Promise<SearchHistoryEntry> {
  return apiClient<SearchHistoryEntry>(
    `${Endpoints.SearchHistory.Base}/?query=${encodeURIComponent(
      query
    )}&type=${type}`,
    {
      method: "POST",
      version: Endpoints.SearchHistory.BaseVersion,
      body: JSON.stringify({ query }),
    }
  );
}
