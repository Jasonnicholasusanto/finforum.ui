"use client";

import { apiFetch } from "@/lib/api";

export async function checkUsername(username: string) {
  return apiFetch<{ available: boolean }>(
    `/api/v1/users/check-username?username=${username}`
  );
}

export async function createProfile(data: {
  full_name: string;
  dob: string;
  username: string;
}) {
  return apiFetch("/api/v1/me/profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
