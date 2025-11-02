export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const rawBody = await res.text();

  let parsedBody;
  try {
    parsedBody = rawBody ? JSON.parse(rawBody) : {};
  } catch {
    parsedBody = rawBody;
  }

  if (!res.ok) {
    const message =
      (parsedBody && (parsedBody.detail || parsedBody.error)) ||
      (typeof parsedBody === "string"
        ? parsedBody
        : JSON.stringify(parsedBody)) ||
      `Request failed with status ${res.status}`;

    throw new ApiError(message, res.status);
  }

  return parsedBody as T;
}
