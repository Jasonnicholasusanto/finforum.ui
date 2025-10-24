"use server";

import { createClient } from "@/lib/supabase/server";
import { getAccessToken } from "./getUserDataActions";
import { ApiError, apiFetch } from "@/lib/api";
import { NavbarRoute, NavbarRouteResponse } from "@/models/navbarRoute";

export async function getNavbarRoutes(): Promise<NavbarRoute[] | null> {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const data = await apiFetch<NavbarRouteResponse>("/api/v1/navbar/items", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data?.navbar_routes ?? null;
  } catch (e: unknown) {
    if (e instanceof ApiError && e.status === 404) {
      return null;
    }
    throw e;
  }
}
