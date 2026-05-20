# NYBC — Vercel deploy

## Muhim: qaysi loyiha?

Vercelda **faqat frontend** (veb-sayt) deploy qilinadi.

| To‘g‘ri | Noto‘g‘ri |
|--------|-----------|
| Loyiha nomi: `nybc-v1` (yoki shunga o‘xshash) | `nybc-v1-api-server` |
| **Root Directory:** `.` (repo ildizi, bo‘sh qoldiring) | `artifacts/api-server` |

`api-server` Express server — Vercel static/Vite loyihasi emas. API ni **Railway** (yoki boshqa host) da ishga tushiring.

---

## Vercel sozlamalari

1. [vercel.com](https://vercel.com) → Import → `SaidjonAlixon/NYBC-v1`
2. **Root Directory:** bo‘sh (repository root)
3. `vercel.json` avtomatik ishlatiladi:
   - Install: `pnpm@9.15.9` + `pnpm install`
   - Build: `@workspace/truck-logistics`
   - Output: `artifacts/truck-logistics/dist/public`
4. **Environment variables:**

   | Name | Value |
   |------|--------|
   | `VITE_API_URL` | API URL, masalan `https://your-app.up.railway.app` (slashsiz) |

5. Deploy

Agar `pnpm install` xato bersa: Settings → General → **Node.js Version** → `20.x`, keyin **Redeploy**.

---

## API (Railway)

`artifacts/api-server` da:

- `DATABASE_URL` — PostgreSQL
- `PORT` — host beradi

```bash
pnpm db:push
```

Vercelda `VITE_API_URL` shu API manziliga qarab qo‘yiladi.

---

## Local

```bash
pnpm install
cp .env.example .env
pnpm db:push
pnpm dev:api   # 8080
pnpm dev:web   # Vite
```
