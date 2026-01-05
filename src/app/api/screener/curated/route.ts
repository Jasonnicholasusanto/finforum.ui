import { NextRequest, NextResponse } from "next/server";
import { fetchCuratedScreens } from "@/services/api/modules/screener";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const assetType = searchParams.get("asset_type") as
      | "equity"
      | "fund"
      | null;

    const limit = Number(searchParams.get("limit") ?? 25);

    if (!assetType) {
      return NextResponse.json(
        { message: "asset_type is required" },
        { status: 400 }
      );
    }

    const curatedData = await fetchCuratedScreens(assetType, limit);

    return NextResponse.json({ results: curatedData }, { status: 200 });
  } catch (error: any) {
    console.error("Failed to fetch curated screener", error);

    return NextResponse.json(
      { message: "Failed to fetch curated screener" },
      { status: 500 }
    );
  }
}
