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

  const res = await fetch(`${API}${path}`, { ...opts, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.detail || "Error en la solicitud");
  return data as T;
}