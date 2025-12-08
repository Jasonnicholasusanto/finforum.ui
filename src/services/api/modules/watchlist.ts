import {
  CreatedWatchlistResponse,
  GetMyWatchlistsResponse,
  WatchlistDetailCreateRequest,
} from "@/models/watchlist";
import { apiClient } from "../client";
import { Endpoints } from "../endpoints";

export async function getWatchlistTypes(): Promise<string[] | null> {
  return apiClient<string[]>(
    `${Endpoints.Watchlists.Base}${Endpoints.Watchlists.WatchlistTypes}`,
    {
      method: "GET",
      version: Endpoints.Watchlists.BaseVersion,
    }
  );
}

export async function getMyWatchlists(): Promise<GetMyWatchlistsResponse> {
  return apiClient<GetMyWatchlistsResponse>(
    `${Endpoints.Watchlists.Base}${Endpoints.Watchlists.MyWatchlists}`,
    {
      method: "GET",
      version: Endpoints.Watchlists.BaseVersion,
    }
  );
}

export async function createWatchlist(
  payload: WatchlistDetailCreateRequest
): Promise<CreatedWatchlistResponse> {
  return apiClient<CreatedWatchlistResponse>(`${Endpoints.Watchlists.Base}`, {
    method: "POST",
    version: Endpoints.Watchlists.BaseVersion,
    body: JSON.stringify(payload),
  });
}
