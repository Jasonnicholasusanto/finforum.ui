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

  const rawBody = await res.text();

  // if (!res.ok) {
  //   let message: string;

  //   try {
  //     const data = await res.json();
  //     if (typeof data === "object" && data.detail) {
  //       message = data.detail;
  //     } else {
  //       message = JSON.stringify(data);
  //     }
  //   } catch {
  //     message = await res.text();
  //   }

  //   throw new ApiError(message, res.status);
  // }

  // return res.json();

  let parsedBody: any;
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
