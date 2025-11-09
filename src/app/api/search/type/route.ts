import { NextResponse } from "next/server";
import { fetchSearchTypes } from "@/services/api/modules/search";

/**
 * GET /api/search/types
 * Returns the list of available search types (enum values) from backend
 */
export async function GET() {
  try {
    const types = await fetchSearchTypes();
    return NextResponse.json(types, { status: 200 });
  } catch (err) {
    console.error("Error fetching search types:", err);
    return NextResponse.json(
      { error: "Failed to fetch search types" },
      { status: 500 }
    );
  }
}
