"use server";

import { apiClient } from "../client";
import { Endpoints } from "../endpoints";
import { NavbarRoute, NavbarRouteResponse } from "@/models/navbarRoute";

export async function getNavbarRoutes(): Promise<NavbarRoute[] | null> {
  try {
    const data = await apiClient<NavbarRouteResponse>(
      `${Endpoints.Navbar.Base}${Endpoints.Navbar.Routes}`,
      {
        version: Endpoints.Navbar.BaseVersion,
      }
    );
    return data?.navbar_routes ?? null;
  } catch (e: any) {
    if (e?.status === 404) {
      return null;
    }
    throw e;
  }
}
