import { put } from "@vercel/blob";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import Busboy from "busboy";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import multer from "multer";

type UploadedFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
  destination: string;
  filename: string;
  path: string;
};

const MAX_BYTES = 10 * 1024 * 1024;

const ALLOWED_CONTENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const config = { maxDuration: 15 };

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES },
});

export async function uploadFileToBlob(file: UploadedFile): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const blob = await put(file.originalname, file.buffer, {
    access: "public",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
    contentType: file.mimetype || undefined,
  });

  return blob.url;
}

export async function directBlobUploadHandler(req: ExpressRequest, res: ExpressResponse) {
  const file = req.file as UploadedFile | undefined;
  if (!file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  try {
    const url = await uploadFileToBlob(file);
    res.status(200).json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    res.status(400).json({ error: message });
  }
}

export async function runBlobUpload(body: HandleUploadBody, request: ExpressRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  return handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: ALLOWED_CONTENT_TYPES,
      maximumSizeInBytes: MAX_BYTES,
      addRandomSuffix: true,
      tokenPayload: JSON.stringify({ access: "public" }),
    }),
    onUploadCompleted: async () => {},
  });
}

export async function blobUploadHandler(req: ExpressRequest, res: ExpressResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const jsonResponse = await runBlobUpload(req.body as HandleUploadBody, req);
    res.status(200).json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    res.status(400).json({ error: message });
  }
}

export async function blobUploadRoute(req: ExpressRequest, res: ExpressResponse) {
  if (req.file) {
    await directBlobUploadHandler(req, res);
    return;
  }
  await blobUploadHandler(req, res);
}

async function parseMultipartFile(
  req: NodeJS.ReadableStream & { headers?: Record<string, string | string[] | undefined> },
): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: req.headers as Busboy.BusboyConfig["headers"],
      limits: { fileSize: MAX_BYTES },
    });

    const chunks: Buffer[] = [];
    let fileMeta: { fieldname: string; filename: string; encoding: string; mimetype: string } | null =
      null;

    busboy.on("file", (fieldname, file, info) => {
      fileMeta = {
        fieldname,
        filename: info.filename,
        encoding: info.encoding,
        mimetype: info.mimeType,
      };
      file.on("data", (chunk: Buffer) => chunks.push(chunk));
      file.on("limit", () => reject(new Error("File exceeds 10MB limit")));
    });

    busboy.on("finish", () => {
      if (!fileMeta) {
        reject(new Error("No file provided"));
        return;
      }
      const buffer = Buffer.concat(chunks);
      resolve({
        fieldname: fileMeta.fieldname,
        originalname: fileMeta.filename,
        encoding: fileMeta.encoding,
        mimetype: fileMeta.mimetype,
        buffer,
        size: buffer.length,
        destination: "",
        filename: fileMeta.filename,
        path: "",
      });
    });

    busboy.on("error", reject);
    req.pipe(busboy);
  });
}

export default async function handler(
  req: NodeJS.ReadableStream & {
    method?: string;
    body?: unknown;
    headers?: Record<string, string | string[] | undefined>;
  },
  res: {
    status: (code: number) => { json: (body: unknown) => void };
  },
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const contentType = String(req.headers?.["content-type"] ?? "");

  try {
    if (contentType.includes("multipart/form-data")) {
      const file = await parseMultipartFile(req);
      const url = await uploadFileToBlob(file);
      res.status(200).json({ url });
      return;
    }

    const jsonResponse = await runBlobUpload(
      req.body as HandleUploadBody,
      req as unknown as ExpressRequest,
    );
    res.status(200).json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    res.status(400).json({ error: message });
  }
}
