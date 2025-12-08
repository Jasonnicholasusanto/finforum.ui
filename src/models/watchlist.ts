export interface WatchlistOut {
  id: string;
  name: string;
  description?: string | null;
  visibility: "PRIVATE" | "PUBLIC" | "SHARED";
  created_at: string;
  updated_at: string;
  owner_profile_id: string;
  is_fork?: boolean;
  forked_from_id?: string | null;
}

export interface UserWatchlistCounts {
  owned: number;
  forked: number;
  shared: number;
  bookmarked: number;
}

export interface UserWatchlistGroups {
  created: WatchlistOut[];
  forked: WatchlistOut[];
  shared: WatchlistOut[];
  bookmarked: WatchlistOut[];

  total_count: number;

  counts: UserWatchlistCounts;
}

export interface GetMyWatchlistsResponse {
  limit: number;
  offset: number;
  results: UserWatchlistGroups;
}

export interface WatchlistDataCreate {
  name: string;
  description?: string | null;
  visibility: string;
  is_default: boolean;
}

export interface WatchlistItemBase {
  symbol: string;
  exchange: string;
  note?: string | null;
  position?: number | null;
  percentage?: number | null;
  quantity?: number | null;
}

export interface WatchlistDetailCreateRequest {
  watchlist_data: WatchlistDataCreate;
  items?: WatchlistItemBase[];
}

export interface CreatedWatchlistResponse {
  message: string;
  watchlist: WatchlistOut;
  watchlist_items: WatchlistItemBase[];
}
