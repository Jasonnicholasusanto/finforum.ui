import { environment } from "@/lib/environment/env";
import { getStockHistory } from "@/services/api/modules/stocks";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const { ticker } = await params;
    const interval = searchParams.get("interval") || "1d";
    const period = searchParams.get("period") || "1mo";

    const stockData = await getStockHistory(ticker, interval, period);

    return NextResponse.json({ results: stockData }, { status: 200 });
  } catch (err) {
    console.error("Ticker history API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch ticker history" }),
      { status: 500 }
    );
  }
}
