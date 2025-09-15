"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getAccessToken() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session) {
    redirect("/auth/login");
  }
  return data.session?.access_token ?? null;
}
