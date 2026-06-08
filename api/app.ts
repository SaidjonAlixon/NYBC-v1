import express from "express";
import type { Express } from "express";
import { blobUploadRoute, uploadMiddleware } from "./blob-upload.js";
import { processApplication, processContact, processQuote } from "./lib/shared.js";

export const app: Express = express();

app.use(express.json({ limit: "1mb" }));

app.post(
  "/api/blob-upload",
  uploadMiddleware.single("file") as unknown as express.RequestHandler,
  blobUploadRoute,
);

app.post("/api/applications", async (req, res) => {
  const result = await processApplication(req.body as Record<string, unknown>);
  res.status(result.status).json(result.body);
});

app.post("/api/contact", async (req, res) => {
  const result = await processContact(req.body as Record<string, unknown>);
  res.status(result.status).json(result.body);
});

app.post("/api/quote", async (req, res) => {
  const result = await processQuote(req.body as Record<string, unknown>);
  res.status(result.status).json(result.body);
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});
