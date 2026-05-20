# NYBC — Vercel deploy

## Frontend (Vercel)

1. Import this repo in [Vercel](https://vercel.com/new).
2. **Framework preset:** Vite (or use root `vercel.json`).
3. **Root directory:** repository root (default).
4. Build/install commands are set in `vercel.json`:
   - Install: `pnpm install`
   - Build: `pnpm --filter @workspace/truck-logistics run build`
   - Output: `artifacts/truck-logistics/dist/public`
5. **Environment variables** (Project → Settings → Environment Variables):

   | Name | Value |
   |------|--------|
   | `VITE_API_URL` | Your public API URL, e.g. `https://your-app.up.railway.app` (no trailing slash) |

6. Deploy. Client-side routes (`/about`, `/drivers`, etc.) are handled via SPA rewrite in `vercel.json`.

## API (Railway / Render / VPS)

The Express API is **not** deployed by Vercel in this setup. Run `artifacts/api-server` on Railway (or similar) with:

- `DATABASE_URL` — PostgreSQL connection string
- `PORT` — provided by the host (e.g. Railway sets this)

Then run migrations from your machine:

```bash
pnpm db:push
```

CORS is open on the API; set `VITE_API_URL` on Vercel to that host so forms work in production.

## Local development

```bash
pnpm install
cp .env.example .env
# Edit .env with DATABASE_URL, etc.
pnpm db:push
pnpm dev:api    # terminal 1 — port 8080
pnpm dev:web    # terminal 2 — Vite + /api proxy
```
