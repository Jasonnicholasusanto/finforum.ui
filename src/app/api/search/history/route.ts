import { NextResponse } from "next/server";
import { searchHistory } from "@/services/api/modules/search";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : 5;

    const history = await searchHistory(limit);
    return NextResponse.json({ results: history }, { status: 200 });
  } catch (err) {
    console.error("Search history API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch search history" },
      { status: 500 }
    );
  }
}
