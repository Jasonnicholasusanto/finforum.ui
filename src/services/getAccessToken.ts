"use server";

import { apiFetch } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { User, UserResponse } from "@/models/user";
import { redirect } from "next/navigation";

export async function getAccessToken() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session) {
    redirect("/auth/login");
  }
  return data.session?.access_token ?? null;
}

// export async function getUserData() {
//   const accessToken = await getAccessToken();
//   const me: User | null = accessToken
//     ? await apiFetch("/api/v1/me/profile", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       })
//     : null;
//   return me;
// }

export async function getUserData(): Promise<UserResponse | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  return await apiFetch<UserResponse>("/api/v1/me/profile", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
