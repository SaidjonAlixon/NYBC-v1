export type HandlerResult = { status: number; body: unknown };

type DocumentInput = { label: string; url: string };

function isHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateDocuments(documents: unknown): DocumentInput[] | null {
  if (!Array.isArray(documents)) return [];
  const result: DocumentInput[] = [];

  for (const item of documents) {
    if (
      !item ||
      typeof item !== "object" ||
      typeof (item as DocumentInput).label !== "string" ||
      typeof (item as DocumentInput).url !== "string"
    ) {
      return null;
    }
    const doc = item as DocumentInput;
    if (!isHttpUrl(doc.url)) return null;
    result.push({ label: doc.label.trim(), url: doc.url.trim() });
  }

  return result;
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`Telegram API error: ${response.status} ${detail}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatDriverApplication(body: Record<string, unknown>, documents: DocumentInput[]): string {
  const lines = [
    "<b>🚛 Driver Application</b>",
    "",
    `<b>Position:</b> ${escapeHtml(String(body.position ?? "—"))}`,
    `<b>Name:</b> ${escapeHtml(String(body.name ?? "—"))}`,
    `<b>Phone:</b> ${escapeHtml(String(body.phone ?? "—"))}`,
    `<b>Email:</b> ${escapeHtml(String(body.email ?? "—"))}`,
    `<b>Address:</b> ${escapeHtml(String(body.address ?? "—"))}`,
    `<b>Experience:</b> ${escapeHtml(String(body.experience ?? "—"))}`,
    `<b>CDL Type:</b> ${escapeHtml(String(body.cdlType ?? "—"))}`,
  ];

  if (body.ssn) {
    lines.push(`<b>SSN:</b> ${escapeHtml(String(body.ssn))}`);
  }

  if (documents.length > 0) {
    lines.push("", "<b>Documents:</b>");
    for (const doc of documents) {
      lines.push(`• <a href="${escapeHtml(doc.url)}">${escapeHtml(doc.label)}</a>`);
    }
  }

  return lines.join("\n");
}

function formatApplyStep1(body: Record<string, unknown>): string {
  return [
    "<b>📋 Get in Touch — Step 1</b>",
    "",
    `<b>Name:</b> ${escapeHtml(String(body.name ?? "—"))}`,
    `<b>Phone:</b> ${escapeHtml(String(body.phone ?? "—"))}`,
    `<b>Email:</b> ${escapeHtml(String(body.email ?? "—"))}`,
    body.company ? `<b>Company:</b> ${escapeHtml(String(body.company))}` : "",
    body.message ? `<b>Message:</b> ${escapeHtml(String(body.message))}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function formatApplyStep2(body: Record<string, unknown>, documents: DocumentInput[]): string {
  const lines = [
    "<b>📋 Get in Touch — Step 2</b>",
    "",
    `<b>Name:</b> ${escapeHtml(String(body.name ?? "—"))}`,
    `<b>Phone:</b> ${escapeHtml(String(body.phone ?? "—"))}`,
    `<b>Email:</b> ${escapeHtml(String(body.email ?? "—"))}`,
    body.company ? `<b>Company:</b> ${escapeHtml(String(body.company))}` : "",
    body.service ? `<b>Service:</b> ${escapeHtml(String(body.service))}` : "",
    body.message ? `<b>Message:</b> ${escapeHtml(String(body.message))}` : "",
  ];

  if (documents.length > 0) {
    lines.push("", "<b>Attachments:</b>");
    for (const doc of documents) {
      lines.push(`• <a href="${escapeHtml(doc.url)}">${escapeHtml(doc.label)}</a>`);
    }
  }

  return lines.filter(Boolean).join("\n");
}

function formatContact(body: Record<string, unknown>): string {
  return [
    "<b>✉️ Contact Message</b>",
    "",
    `<b>Name:</b> ${escapeHtml(String(body.name ?? "—"))}`,
    body.company ? `<b>Company:</b> ${escapeHtml(String(body.company))}` : "",
    `<b>Email:</b> ${escapeHtml(String(body.email ?? "—"))}`,
    body.phone ? `<b>Phone:</b> ${escapeHtml(String(body.phone))}` : "",
    `<b>Message:</b> ${escapeHtml(String(body.message ?? "—"))}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formatQuote(body: Record<string, unknown>): string {
  return [
    "<b>📦 Freight Quote Request</b>",
    "",
    `<b>Name:</b> ${escapeHtml(String(body.name ?? "—"))}`,
    body.company ? `<b>Company:</b> ${escapeHtml(String(body.company))}` : "",
    `<b>Email:</b> ${escapeHtml(String(body.email ?? "—"))}`,
    body.phone ? `<b>Phone:</b> ${escapeHtml(String(body.phone))}` : "",
    body.origin ? `<b>Origin:</b> ${escapeHtml(String(body.origin))}` : "",
    body.destination ? `<b>Destination:</b> ${escapeHtml(String(body.destination))}` : "",
    body.equipment ? `<b>Equipment:</b> ${escapeHtml(String(body.equipment))}` : "",
    body.message ? `<b>Details:</b> ${escapeHtml(String(body.message))}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function processApplication(body: Record<string, unknown>): Promise<HandlerResult> {
  const flow = typeof body.flow === "string" ? body.flow : "";

  try {
    if (flow === "apply_step1") {
      if (!body.name || !body.phone || !body.email) {
        return { status: 400, body: { error: "name, phone, and email are required" } };
      }
      await sendTelegram(formatApplyStep1(body));
      return { status: 201, body: { ok: true } };
    }

    if (flow === "apply_step2") {
      const documents = validateDocuments(body.documents);
      if (documents === null) {
        return { status: 400, body: { error: "Invalid document URLs" } };
      }
      if (!body.name || !body.email) {
        return { status: 400, body: { error: "name and email are required" } };
      }
      await sendTelegram(formatApplyStep2(body, documents));
      return { status: 201, body: { ok: true } };
    }

    const documents = validateDocuments(body.documents ?? []);
    if (documents === null) {
      return { status: 400, body: { error: "Invalid document URLs — only http(s) links allowed" } };
    }

    const required = ["position", "name", "phone", "email"] as const;
    for (const field of required) {
      if (!body[field] || typeof body[field] !== "string" || !String(body[field]).trim()) {
        return { status: 400, body: { error: `${field} is required` } };
      }
    }

    await sendTelegram(formatDriverApplication(body, documents));
    return { status: 201, body: { ok: true } };
  } catch (error) {
    console.error("applications handler error:", error);
    return { status: 500, body: { error: "Failed to process application" } };
  }
}

export async function processContact(body: Record<string, unknown>): Promise<HandlerResult> {
  if (!body.name || !body.email || !body.message) {
    return { status: 400, body: { error: "name, email, and message are required" } };
  }

  try {
    await sendTelegram(formatContact(body));
    return { status: 201, body: { ok: true } };
  } catch (error) {
    console.error("contact handler error:", error);
    return { status: 500, body: { error: "Failed to send message" } };
  }
}

export async function processQuote(body: Record<string, unknown>): Promise<HandlerResult> {
  if (!body.name || !body.email) {
    return { status: 400, body: { error: "name and email are required" } };
  }

  try {
    await sendTelegram(formatQuote(body));
    return { status: 201, body: { ok: true } };
  } catch (error) {
    console.error("quote handler error:", error);
    return { status: 500, body: { error: "Failed to submit quote" } };
  }
}
