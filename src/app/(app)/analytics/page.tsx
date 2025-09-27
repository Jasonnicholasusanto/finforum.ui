"use client";

import { User } from "@/models/user";
import { motion } from "motion/react";

export default function AnalyticsPage({ user }: { user: User | null }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <p>Coming soon!</p>
    </motion.div>
  );
}
