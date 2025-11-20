export const API = process.env.NEXT_PUBLIC_API_URL!;

type Opts = RequestInit & { authToken?: string };

export async function api<T>(path: string, opts: Opts = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>) || {},
  };

  if (opts.authToken) {
    headers["Authorization"] = `Bearer ${opts.authToken}`;
  }

  try {
    const res = await fetch(`${API}${path}`, { ...opts, headers });

    let data: any = {};

    try {
      data = await res.json();
    } catch {
      data = {};
    }

    return {
      ok: res.ok,
      status: res.status,
      data: data as T,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 500,
      data: {
        detail: err.message || "Error de conexión con el servidor",
      } as T,
    };
  }
}
