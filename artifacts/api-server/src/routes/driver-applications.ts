import { Router, type IRouter } from "express";
import {
  db,
  driverApplicationsTable,
  insertDriverApplicationSchema,
} from "@workspace/db";

const router: IRouter = Router();

router.post("/driver-applications", async (req, res) => {
  const parsed = insertDriverApplicationSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  try {
    const [row] = await db
      .insert(driverApplicationsTable)
      .values(parsed.data)
      .returning({ id: driverApplicationsTable.id });
    res.status(201).json({ id: row.id });
  } catch (err) {
    req.log?.error({ err }, "Failed to save driver application");
    res.status(500).json({ error: "Failed to save application" });
  }
});

export default router;
