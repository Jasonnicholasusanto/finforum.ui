"use client";

import { motion } from "motion/react";
import { Greeting } from "@/app/(app)/dashboard/greeting";
import { Card } from "@/components/ui/card";

export function DashboardClient() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="grid grid-cols-12 md:grid-cols-6 gap-6">
        <div className="col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center">
          <Greeting />
        </div>

        <div className="col-span-2">
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Trending Stocks</h2>
            <div className="text-sm text-muted-foreground">
              Popular tickers & movers here.
            </div>
          </Card>
        </div>

        <div className="col-span-10">
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Your Watchlists</h2>
            <div className="text-sm text-muted-foreground">
              User’s created & followed watchlists.
            </div>
          </Card>
        </div>

        <div className="col-span-12">
          <Card className="p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3">Followed Discussions</h2>
            <div className="text-sm text-muted-foreground">
              Topics & entries user follows.
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
