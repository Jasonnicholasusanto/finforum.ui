export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function getBaseUrl() {
  if (process.env.FINFORUM_API_URL) {
    return process.env.FINFORUM_API_URL;
  }

  return process.env.NEXT_PUBLIC_FINFORUM_API_URL!;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_FINFORUM_API_URL!;
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    let message: string;

    try {
      const data = await res.json();
      if (typeof data === "object" && data.detail) {
        message = data.detail;
      } else {
        message = JSON.stringify(data);
      }
    } catch {
      message = await res.text();
    }

    throw new ApiError(message, res.status);
  }

  return res.json();
}
