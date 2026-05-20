const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

function apiUrl(path: string) {
  return `${API_BASE}${path}`;
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(apiUrl(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

export function submitContactMessage(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return postJson<{ id: number }>("/api/contact", data);
}

export function submitDriverApplication(data: {
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  cdlType: string;
  experience: string;
}) {
  return postJson<{ id: number }>("/api/driver-applications", data);
}
