export const API = process.env.NEXT_PUBLIC_API_URL!;

type Opts = RequestInit & { authToken?: string };

export async function api<T = any>(
  url: string,
  options: RequestInit = {}
) {
  try {
    const res = await fetch(`http://127.0.0.1:8000${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    const data = await res.json().catch(() => ({}));

    // SI EL BACKEND RESPONDIÓ CON ERROR, LO PASAMOS TAL CUAL
    return {
      ok: res.ok,
      status: res.status,
      data: data,
    };
  } catch (error: any) {
    // ESTE CATCH SOLO OCURRE CUANDO FALLA LA RED
    return {
      ok: false,
      status: 500,
      data: { detail: "Error de conexión con el servidor" },
    };
  }
}
