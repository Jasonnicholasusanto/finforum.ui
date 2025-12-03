import { getStockInfo } from "@/services/api/modules/stocks";
import { StockInfoResponse } from "@/models/stocks";
import StockHeader from "./components/stockHeader";
import { Suspense } from "react";
import StockChartBody from "./components/stockChartBody";
import StockDetails from "./components/stockDetails";

export default async function StocksPage({
  params,
}: {
  params: { ticker: string };
}) {
  const { ticker } = await params;

  let stock: StockInfoResponse | null = null;

  try {
    stock = await getStockInfo(ticker.toUpperCase());
  } catch (err) {
    console.error("Error fetching stock info:", err);
  }

  if (!stock)
    return (
      <p className="text-muted-foreground text-center mt-8">Stock not found.</p>
    );

  return (
    <div className="space-y-8">
      <Suspense
        fallback={
          <p className="text-muted-foreground">Loading stock details...</p>
        }
      >
        <StockHeader stock={stock} />
      </Suspense>

      <Suspense
        fallback={<p className="text-muted-foreground">Loading charts...</p>}
      >
        <StockChartBody symbol={stock.symbol} />
      </Suspense>

      <Suspense
        fallback={
          <p className="text-muted-foreground">Loading information...</p>
        }
      >
        <StockDetails stock={stock} />
      </Suspense>
    </div>
  );
}
