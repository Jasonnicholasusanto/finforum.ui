import { NextRequest, NextResponse } from "next/server";
import {
  addSearchHistoryEntry,
  searchQuotes,
} from "@/services/api/modules/search";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q") || "";

    const maxResult = searchParams.get("maxResult")
      ? parseInt(searchParams.get("maxResult")!)
      : undefined;
    const recommended = searchParams.get("recommended")
      ? parseInt(searchParams.get("recommended")!)
      : undefined;
    const enableFuzzyQuery = searchParams.get("enableFuzzyQuery")
      ? searchParams.get("enableFuzzyQuery") === "true"
      : undefined;

    const data = await searchQuotes(q, {
      maxResult,
      recommended,
      enableFuzzyQuery,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, type } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid query" },
        { status: 400 }
      );
    }

    // Import and call your shared API function
    const result = await addSearchHistoryEntry(query, type || "GENERAL");

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("Search History POST error:", err);
    return NextResponse.json(
      { error: "Failed to record search history" },
      { status: 500 }
    );
  }
}
