import { getWatchlistQuantityTypes } from "@/services/api/modules/watchlist";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await getWatchlistQuantityTypes();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch watchlist quantity types:", error);
    return NextResponse.json(
      { error: "Failed to load watchlist quantity types" },
      { status: 500 }
    );
  }
}
