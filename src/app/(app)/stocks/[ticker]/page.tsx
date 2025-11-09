import { getStockInfo } from "@/services/api/modules/stocks";
import { StockInfoResponse } from "@/models/stocks";
import StockDetails from "./components/stockDetails";

export const dynamic = "force-dynamic"; // this ensures fresh fetch on navigation

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

  return (
    <div className="">
      {stock ? (
        <StockDetails stock={stock} />
      ) : (
        <p className="text-muted-foreground">Stock not found.</p>
      )}
    </div>
  );
}
