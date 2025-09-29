"use server";

import { apiFetch } from "@/lib/api";
import { getAccessToken } from "./getUserDataActions";

export async function createProfile(data: {
  full_name: string;
  dob: string;
  username: string;
  email_address: string;
}) {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  return apiFetch("/api/v1/me/profile", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify(data),
  });
}
