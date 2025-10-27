"use server";

import { UserPublicResponse } from "@/models/publicUser";
import { apiClient } from "../client";
import { Endpoints } from "../endpoints";

export async function getUserByUsername(
  username: string
): Promise<UserPublicResponse | null> {
  try {
    return await apiClient<UserPublicResponse>(
      `${Endpoints.Users.Base}${Endpoints.Users.UserByUsername(username)}`,
      {
        version: Endpoints.Users.BaseVersion,
      }
    );
  } catch (e: any) {
    if (e?.status === 404) return null;
    throw e;
  }
}
