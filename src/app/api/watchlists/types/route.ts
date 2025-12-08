import { getWatchlistTypes } from "@/services/api/modules/watchlist";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getWatchlistTypes();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch watchlist types:", error);
    return NextResponse.json(
      { error: "Failed to load watchlist types" },
      { status: 500 }
    );
  }
}
