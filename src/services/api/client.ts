import { ApiError, apiFetch } from "@/lib/api";
import { getAccessToken } from "./config";
import { environment } from "@/lib/environment/env";

interface ApiClientOptions extends RequestInit {
  version?: string;
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const token = await getAccessToken();
  const version = options.version || environment.apiVersion;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fullUrl = `${environment.nextPublicFinforumApiUrl}/api/${version}${path}`;

  try {
    return await apiFetch<T>(fullUrl, { ...options, headers });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null as unknown as T;
    }
    throw error;
  }
}
