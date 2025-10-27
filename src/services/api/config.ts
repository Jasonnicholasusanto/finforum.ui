import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_FINFORUM_API_URL || "http://localhost:8000";

export async function getAccessToken(): Promise<string | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session) {
    redirect("/auth/login");
  }
  return data.session?.access_token ?? null;
}
