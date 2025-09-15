import { apiFetch } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { getAccessToken } from "@/services/getAccessToken";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const access_token = await getAccessToken();

  const me = await apiFetch("/api/v1/me/profile", {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border">
          {JSON.stringify(me, null, 2)}
        </pre>
      </div>
    </div>
  );
}
