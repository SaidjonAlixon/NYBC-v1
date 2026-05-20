import { Router, type IRouter } from "express";
import { db, contactMessagesTable, insertContactMessageSchema } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = insertContactMessageSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const [row] = await db
      .insert(contactMessagesTable)
      .values(parsed.data)
      .returning({ id: contactMessagesTable.id });
    res.status(201).json({ id: row.id });
  } catch (err) {
    req.log?.error({ err }, "Failed to save contact message");
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
