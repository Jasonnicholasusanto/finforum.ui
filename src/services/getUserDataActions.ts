"use server";

import { ApiError, apiFetch } from "@/lib/api";
import { createClient } from "@/lib/supabase/server";
import { UserResponse } from "@/models/user";
import { redirect } from "next/navigation";

export async function getAuthUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getAccessToken() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session) {
    redirect("/auth/login");
  }
  return data.session?.access_token ?? null;
}

export async function getUserData(): Promise<UserResponse | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    return await apiFetch<UserResponse>("/api/v1/me/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (e: unknown) {
    if (e instanceof ApiError && e.status === 404) {
      return null;
    }
    throw e;
  }
}
