import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".env"),
});

import { app } from "./api/applications.js";

const port = Number(process.env.API_PORT ?? "4000");

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid API_PORT: "${process.env.API_PORT}"`);
}

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
  console.log(
    `Telegram: ${process.env.TELEGRAM_BOT_TOKEN ? "configured" : "missing"}, Blob: ${process.env.BLOB_READ_WRITE_TOKEN ? "configured" : "missing"}`,
  );
});
