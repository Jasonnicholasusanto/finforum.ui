export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.FINFORUM_API_URL!;
  const url = `${baseUrl}${path}`;

  // By default, include credentials if your API uses cookies
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // needed if FastAPI sets cookies
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new ApiError(msg || `Request failed`, res.status);
  }

  return res.json();
}
