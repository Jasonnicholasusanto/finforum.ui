import { WatchlistDetailCreateRequest } from "@/models/watchlist";
import { createWatchlist } from "@/services/api/modules/watchlist";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as WatchlistDetailCreateRequest;
    const result = await createWatchlist(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Failed to fetch watchlists:", error);
    return NextResponse.json(
      { error: "Failed to load watchlists" },
      { status: 500 }
    );
  }
}
