import { processContact } from "./lib/shared.js";

export const config = { maxDuration: 15 };

type VercelRequest = { method?: string; body?: unknown };
type VercelResponse = {
  status: (code: number) => { json: (body: unknown) => void };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const result = await processContact((req.body ?? {}) as Record<string, unknown>);
  res.status(result.status).json(result.body);
}
