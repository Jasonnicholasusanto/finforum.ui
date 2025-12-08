import { getMyWatchlists } from "@/services/api/modules/watchlist";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getMyWatchlists();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch watchlists:", error);
    return NextResponse.json(
      { error: "Failed to load watchlists" },
      { status: 500 }
    );
  }
}
