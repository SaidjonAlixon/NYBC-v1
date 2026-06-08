// Production: always same-origin /api (Vercel serverless). Dev: optional VITE_API_URL or Vite proxy.
const API_BASE = (
  import.meta.env.PROD ? "" : (import.meta.env.VITE_API_URL ?? "")
).replace(/\/$/, "");

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

export async function uploadToBlob(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file, file.name);

  const res = await fetch(apiUrl("/api/blob-upload"), {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { error?: string }).error ?? "File upload failed");
  }

  const data = (await res.json()) as { url: string };
  if (!data.url) {
    throw new Error("File upload failed — no URL returned");
  }

  return data.url;
}

export function submitContactMessage(data: {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return postJson<{ ok: true }>("/api/contact", data);
}

export function submitDriverApplication(data: {
  position: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  experience?: string;
  cdlType?: string;
  ssn?: string;
  documents: { label: string; url: string }[];
}) {
  return postJson<{ ok: true }>("/api/applications", data);
}

export function submitApplyStep1(data: {
  name: string;
  phone: string;
  email: string;
  company?: string;
  message?: string;
}) {
  return postJson<{ ok: true }>("/api/applications", { flow: "apply_step1", ...data });
}

export function submitApplyStep2(data: {
  name: string;
  phone?: string;
  email: string;
  company?: string;
  service?: string;
  message?: string;
  documents?: { label: string; url: string }[];
}) {
  return postJson<{ ok: true }>("/api/applications", { flow: "apply_step2", ...data });
}
