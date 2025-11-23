"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchResults } from "./searchResult";
import { useRouter } from "next/navigation";
import { SearchHistoryDropdown } from "./searchHistory";

interface ExpandableSearchProps {
  placeholder?: string;
  className?: string;
}

export function ExpandableSearch({
  placeholder = "Search…",
  className,
}: ExpandableSearchProps) {
  const [focused, setFocused] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingRecentSearches, setLoadingRecentSearches] =
    React.useState(false);
  const [hasSearched, setHasSearched] = React.useState(false);
  const [history, setHistory] = React.useState<any[]>([]);
  const [showHistory, setShowHistory] = React.useState(false);
  const router = useRouter();

  // Debounce search input by 400 ms
  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      setShowHistory(true);
      return;
    }

    const timeout = setTimeout(() => {
      fetchResults(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  /** Fetch live search results */
  async function fetchResults(q: string) {
    setLoading(true);
    setShowHistory(false);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Failed to search");
      const data = await res.json();
      setResults(data.results || []);
      setHasSearched(true);

      await fetch("/api/search/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  /** Fetch recent search history */
  const historyCache = React.useRef<{ data: any[]; timestamp: number } | null>(
    null
  );

  async function fetchHistory(force = false) {
    const now = Date.now();
    const cacheTTL = 60 * 1000; // 1 minute

    // Serve from cache if recent and not forced
    if (
      !force &&
      historyCache.current &&
      now - historyCache.current.timestamp < cacheTTL
    ) {
      setHistory(historyCache.current.data);
      setShowHistory(true);

      // Silently refresh in background (stale-while-revalidate)
      refreshHistoryInBackground();
      return;
    }

    setLoadingRecentSearches(true);
    try {
      const res = await fetch("/api/search/history?limit=5");
      if (!res.ok) throw new Error("Failed to fetch history");
      const data = await res.json();

      setHistory(data.results || []);
      setShowHistory(true);

      // Cache the result
      historyCache.current = { data: data.results || [], timestamp: now };
    } catch (err) {
      console.error("Error fetching search history:", err);
    } finally {
      setLoadingRecentSearches(false);
    }
  }

  async function refreshHistoryInBackground() {
    try {
      const res = await fetch("/api/search/history?limit=5");
      if (!res.ok) return;
      const data = await res.json();

      setHistory(data.results || []);
      historyCache.current = {
        data: data.results || [],
        timestamp: Date.now(),
      };
    } catch {
      /* ignore background errors */
    }
  }

  let cachedTypes: string[] | null = null;

  async function getSearchType(): Promise<string> {
    if (cachedTypes) return cachedTypes.includes("stock") ? "stock" : "general";
    const res = await fetch("/api/search/types");
    if (!res.ok) return "general";
    cachedTypes = await res.json();
    return cachedTypes?.includes("stock") ? "stock" : "general";
  }

  /** Handle input focus */
  const handleFocus = async () => {
    setFocused(true);
    if (!query.trim()) await fetchHistory();
  };

  /** Handle input blur (with small delay to allow click) */
  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
      setShowHistory(false);
    }, 150);
  };

  /** Handle selecting a recent search */
  const handleSelectHistory = (entry: any) => {
    setQuery(entry.query);
    fetchResults(entry.query);
    setShowHistory(false);
  };

  const showDropdown = focused && (showHistory || query.length > 0);

  return (
    <div
      className={cn(
        "relative flex items-center transition-all duration-300",
        focused ? "w-112" : "w-32 md:w-64",
        className
      )}
    >
      <SearchIcon
        size={16}
        className="absolute left-2 text-muted-foreground/70 pointer-events-none"
      />
      <Input
        id="navbar-expandable-search"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "h-8 ps-8 pe-2 w-full text-sm transition-all duration-300",
          "border-muted focus-visible:ring-1 focus-visible:ring-accent"
        )}
      />

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-10 left-0 w-full bg-popover shadow-md rounded-lg z-50">
          {/* --- Show Search History --- */}
          {showHistory && !query.trim() && (
            <SearchHistoryDropdown
              loading={loadingRecentSearches}
              history={history}
              onSelect={handleSelectHistory}
            />
          )}

          {/* --- Show Live Search Results --- */}
          {!showHistory && query.trim() && (
            <SearchResults
              results={results}
              loading={loading}
              hasSearched={hasSearched}
              onSelect={async (r) => {
                try {
                  const queryType = await getSearchType();

                  await fetch("/api/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ query: r.symbol, type: queryType }),
                  });
                } catch (err) {
                  console.error("Failed to save search history:", err);
                }

                setQuery("");
                setFocused(false);
                router.push(`/stocks/${r.symbol}`);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
