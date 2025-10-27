import { ApiError, apiFetch } from "@/lib/api";
import { API_BASE_URL, getAccessToken } from "./config";

interface ApiClientOptions extends RequestInit {
  version?: string;
}

export async function apiClient<T>(
  path: string,
  options: ApiClientOptions = {}
): Promise<T> {
  const token = await getAccessToken();
  const version = options.version || process.env.API_VERSION;

  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const fullUrl = `${API_BASE_URL}/api/${version}${path}`;

  try {
    return await apiFetch<T>(fullUrl, { ...options, headers });
  } catch (error) {
    console.log("API Client Error:", error);
    if (error instanceof ApiError && error.status === 404) {
      return null as unknown as T;
    }
    throw error;
  }
}
