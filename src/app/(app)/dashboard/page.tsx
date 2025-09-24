"use client";

import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-12 md:grid-cols-6 gap-6">
        <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground">
              Stay updated with your portfolio and the market
            </p>
          </div>
          {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button> */}
        </div>

        {/* Trending Stocks */}
        <div className="col-span-2 gap-6">
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Trending Stocks</h2>
            {/* TODO: Trending stocks component */}
            <div className="text-sm text-muted-foreground">
              Popular tickers & market movers here.
            </div>
          </Card>
        </div>

        {/* Watchlists - spans 2/3 */}
        <div className="col-span-10 gap-6">
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Your Watchlists</h2>
            <div className="text-sm text-muted-foreground">
              User’s created & followed watchlists go here.
            </div>
          </Card>
        </div>

        {/* Discussions */}
        <div className="col-span-12 gap-8">
          <Card className="md:col-span-3 p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Followed Discussions</h2>
            {/* TODO: Discussions feed component */}
            <div className="text-sm text-muted-foreground">
              Topics & entries user follows.
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
